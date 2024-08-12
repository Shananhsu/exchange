import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import axios from "axios";
import { APIURL } from "@/env";
import moment from "moment";

//api
import { useGetCommodityQuery } from "../../redux/commoditySlice";
import { useGetBalanceQuery } from "../../redux/balanceSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useGetChipQuery } from "../../redux/chipSlice";
import { setDeal } from "../../redux/dealSlice";

//type
import { Commodity } from "../../libs/type/commodity";
import { KLineResponse } from "../../libs/type/kline";
import { RangeResponse, Range } from "../../libs/type/range";
import { ProfitResponse } from "../../libs/type/profit";
import { KeepDirection, KeepType } from "../../libs/type/order";

//components
import Pinary from "./Pinary";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import FilterBar from "./FilterBar";
import ItemsList from "./ItemsList";
import Navbar from "./Navbar";
import ChartComponent from "./ChartComponent";
import Announcement from "./Announcement";
import BetInput from "./BetInput";
import BetChips from "./BetChips";
import BetButton from "./BetButton";
import AutoBet from "./AutoBet";
import NickName from "./Nickname";
import TotalAssets from "./TotalAssets";
import LinksMenu from "./LinksMenu";
import LanguageSelector from "./LanguageSelector";
import DepositHistory from "./DepositHistory/DepositHistory";
import LoadingTrade from "./components/LoadingTrade";
import SuccessfulPopups from "./components/SuccessfulPopups";
import Order from "./Order/Order";
import AutoBetPopups from "./AutoBetPopups";
import ErrorMsgPopups from "./ErrorMsgPopups";


//images
import Icon_Marquee from "/src/assets/Icon_Marquee.png";
import Icon_MarqueeYellow from "/src/assets/Icon_MarqueeYellow.png";
import Icon_OrderWhite from "/src/assets/Icon_OrderWhite.png";
import Icon_OrderYellow from "/src/assets/Icon_OrderYellow.png";
import Icon_User from "/src/assets/Icon_User.png";
import Icon_UserYellow from "/src/assets/Icon_UserYellow.png";


let initialRange: Range = {
	seq: 0,
	winpercent: "0",
	losepercent: "0",
};

//右側導覽列選單
const sidebarMenu = [
	{ id: 1, alt: "公告", image: Icon_Marquee, yellowImage: Icon_MarqueeYellow },
	{
		id: 2,
		alt: "訂單",
		image: Icon_OrderWhite,
		yellowImage: Icon_OrderYellow,
	},
	{ id: 3, alt: "資產", image: Icon_User, yellowImage: Icon_UserYellow },
];

//取得k線 api
function fetchKLine(url: string, token: string) {
	let headers = { playertoken: token };
	return axios.get(`${APIURL}${url}`, { headers }).then((r) => r.data);
}

function getKLine([url, token]: [string, string]) {
	return fetchKLine(url, token);
}

//勝負區間api
function fetchRange(url: string, token: string) {
	let headers = { playertoken: token };
	return axios.get(`${APIURL}${url}`, { headers }).then((r) => r.data);
}

function getRange([url, token]: [string, string]) {
	return fetchRange(url, token);
}

//投注api
function buy(
	symbol: string,
	longshort: number,
	rangeseq: number,
	betamount: number,
	auto: boolean,
	autotype: number,
	autodir: number,
	token: string
) {
	let headers = { playertoken: token };
	let body = {
		symbol,
		longshort,
		rangeseq,
		betamount,
		auto,
		autotype,
		autodir,
	};
	return axios.post(`${APIURL}/order`, body, { headers }).then((r) => r.data);
}

//取得今日損益api
function fetchProfit(token: string) {
	let headers = { playertoken: token };
	let date = moment().format("YYYY-MM-DD");
	let timeZone = moment().utcOffset() / 60;
	return axios
		.get(`${APIURL}/player/day/profit?d=${date}&tz=${timeZone}`, { headers })
		.then((r) => r.data);
}

function getProfit([_, token]: [string, string]) {
	return fetchProfit(token);
}

const Desk = () => {
	const token = useAppSelector((state) => state.token.token);

	const deal = useAppSelector((state) => state.deal.deal);

	const dispatch = useAppDispatch();

	// Logo 之後根據條件或需求來做state設定
	const [logoState, setLogoState] = useState(false);

	//公告,訂單,資產 預設停留的位置
	//1 = 公告, 2 = 訂單, 3 = 資產, 4 = 出入金歷史紀錄
	const [sidebarState, setSidebarState] = useState(1);

	//選單預設的停留位置
	const [menuState, setMenuState] = useState(1);

	//顯示的商品
	const [symbol, setSymbol] = useState("");

	//使用者輸入的金額
	const [betMoney, setBetMoney] = useState("");

	//使用者暱稱
	const [userNickName, _setUserNickName] = useState("USERID");

	//勝負區間
	const [range, setRange] = useState(initialRange);
	const [auto, setAuto] = useState(false);
	const [autoType, setAutoType] = useState(0);
	const [autoDir, setAutoDir] = useState(KeepDirection.None);

	const [autoTypeSame, setAutoTypeSame] = useState(KeepType.None);
	const [autoTypeReverse, setAutoTypeReverse] = useState(KeepType.None);
	const [dealId, setDealId] = useState("");
	const [errorText, setErrorText] = useState("");

	//自動投注選項彈窗
	const [autoBetPopupsState, setAutoBetPopupsState] = useState(false);

	//投注彈窗顯示
	const [successfulPopopsState, setSuccessfulPopopsState] = useState(false);

	//錯誤訊息
	const [errorMsgState, setErrorMsgState] = useState(false);

	//自動投注顯示明顯
	const [clickDirection, setClickDirection] = useState(KeepDirection.None);

	//取得全部商品
	const { data: commodityResponse, isSuccess: isCommoditySuccess } =
		useGetCommodityQuery({ maincategory: "finance", token });

	//取得錢包餘額, 錢包總額
	const {
		data: balanceResponse,
		isSuccess: isBalanceSuccess,
		refetch: refetchBalance,
	} = useGetBalanceQuery(token);

	//取得圖表K線圖
	const { data: klineResponse } = useSWR<KLineResponse>(
		[`/commodity/kline/history?symbol=${symbol}&period=1`, token],
		getKLine
	);
	//   console.log(symbol);
	//取得勝負區間
	const { data: rangeResponse } = useSWRImmutable<RangeResponse>(
		[`/commodity/range/EURUSD`, token],
		getRange
	);

	//取頭籌碼api
	const { data: chipResponse, isSuccess: isChipSuccess } =
		useGetChipQuery(token);

	//可用餘額
	const balance = useMemo(() => {
		if (!isBalanceSuccess) return "-";
		return balanceResponse.data.balance;
	}, [isBalanceSuccess]);

	//錢包總額
	const totalasset = useMemo(() => {
		if (!isBalanceSuccess) return "-";
		return balanceResponse.data.totalasset;
	}, [isBalanceSuccess]);

	//取得商品導覽列
	const subcategories = useMemo(() => {
		let subcategories: string[] = [];
		if (!isCommoditySuccess) return subcategories;
		return [
			"favorite",
			"popular",
			...new Set(
				commodityResponse.data.commodities.map(
					(commodity) => commodity.subcategory
				)
			),
		];
	}, [commodityResponse, isCommoditySuccess]);

	//取得左側倉品列表
	const commodities = useMemo(() => {
		let commodities: Commodity[] = [];
		if (!isCommoditySuccess) return commodities;
		if (menuState === 1) {
			return commodityResponse.data.commodities.filter(
				(commodity) => commodity.ishot
			);
		} else {
			return commodityResponse.data.commodities.filter(
				(commodity) => commodity.subcategory === subcategories[menuState]
			);
		}
	}, [commodityResponse, isCommoditySuccess, menuState]);

	//取得導覽列資訊
	const commodityData = useMemo(() => {
		let commodityData: Commodity = {
			maincategory: "", // 主類別
			subcategory: "", // 次類別
			symbol: "", // 商品代碼
			symbolname: "", // 商品名稱
			ishot: false, // 是否為熱門商品
			refclose: 0, // 前一天收盤價
			high: 0, // 最高價
			low: 0, // 最低價
			lastclose: 0, // 現價
			change: 0,
			changepercent: 0,
			floatdigit: 0, //顯示到小數點第幾位
		};
		if (!isCommoditySuccess) return commodityData;
		if (symbol === "") {
			setSymbol(commodityResponse.data.commodities[0].symbol);
			return commodityResponse.data.commodities[0];
		} else {
			let commoditySyobol =
				commodityResponse.data.commodities.find(
					(data) => data.symbol === symbol
				) || commodityResponse.data.commodities[0];
			setSymbol(commoditySyobol.symbol);
			return (
				commodityResponse.data.commodities.find(
					(data) => data.symbol === symbol
				) || commodityResponse.data.commodities[0]
			);
		}
	}, [commodityResponse, isCommoditySuccess, menuState]);

	//取得曲線圖
	const kline = useMemo(() => {
		if (!klineResponse || symbol === "") return [];
		if (symbol === "") {
			setSymbol(commodityData.symbol);
		}
		return klineResponse.data.lines.map((l) => [l.ts * 1000, l.close]);
	}, [klineResponse, symbol]);

	//取得勝負區間
	const ranges = useMemo(() => {
		if (!rangeResponse || symbol === "") return [];
		if (symbol === "") {
			setSymbol(commodityData.symbol);
		}
		setRange({ ...rangeResponse.data.ranges[0] });
		return rangeResponse.data.ranges;
	}, [rangeResponse, symbol]);

	//取得快速投注籌碼
	const chips = useMemo(() => {
		if (!isChipSuccess) return [];
		return chipResponse.data.chips;
	}, [isChipSuccess]);

	const handleSetRange = useCallback(
		(e: any) => {
			let r = ranges.find((range) => range.seq === Number(e.target.value));
			setRange({ ...r! });
		},
		[ranges]
	);

	//取得今日損益
	const { data: profitResponse } = useSWR<ProfitResponse>(
		["profit", token],
		getProfit
	);

	//送出投注api
	const handlBuy = useCallback(
		(longshort: number) => {
			let rangeseq = range.seq;
			if (rangeseq === 0) return;
			if (!betMoney.match(/^-?[0-9]+(\.[0-9]+)?$/)) return;
			setSuccessfulPopopsState(true);
			let autoType = autoDir === KeepDirection.Same ? autoTypeSame : autoTypeReverse;
			buy(
				symbol!,
				longshort,
				rangeseq,
				Number(betMoney),
				auto,
				autoType,
				autoDir,
				token
			).then((data) => {
				if (data.data === null) {
					setSuccessfulPopopsState(false);
					setErrorMsgState(true);
					if (data.status.code === "30001") {
						setErrorText("投注金額超出範圍");
					} else {
						setErrorText("投注時發生錯誤");
					}
				} else {
					setDealId(data.data.orderid);
					refetchBalance();
				}
			});
		},
		[betMoney, range, auto, autoTypeSame, autoTypeReverse, autoDir]
	);

	// 蜘蛛LOGO彈窗之後看需求決定內容
	const handleLogoState = () => {
		setLogoState(false);
	};

	// 篩選列 畫面左側
	const handleFilterMenu = (i: number) => {
		setMenuState(i);
	};

	//篩選列 畫面右側
	const handleFilterSidebar = (i: number) => {
		setSidebarState(i);
	};

	const handleShowDepositHistory = () => {
		setSidebarState(4);
	};

	//篩選單一商品出來 只存symbol
	const handleCommdity = (commdity: Commodity) => {
		setSymbol(commdity.symbol);
	};

	//輸入投注金額
	const handleSetBetMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBetMoney(e.target.value);
	};

	//點擊籌碼的時候設定投注金額
	const handleSetChipsValue = useCallback((e: any) => {
		setBetMoney(e);
	}, []);

	// 按取消
	const handleCancelAutoBet = () => {
		setAuto(false);
		setAutoDir(0);
		setAutoType(0);
	};

	// 關閉下單成功彈窗
	const handleCloseSuccessfulPopups = () => {
		dispatch(setDeal(null));
		setBetMoney("");
		handleCancelAutoBet();
		setSuccessfulPopopsState(false);
	};

	// 按同方向
	const handleSameWayAutoBet = useCallback(() => {
		setClickDirection(KeepDirection.Same);
		setAutoBetPopupsState(true);
	}, []);

	// 按反方向
	const handleReverseAutoBet = useCallback(() => {
		setClickDirection(KeepDirection.Reverse);
		setAutoBetPopupsState(true);
	}, []);

	// 彈窗選項
	const handleChangePopups = (type: KeepType) => {
		if (clickDirection === KeepDirection.Same) setAutoTypeSame(type);
		else setAutoTypeReverse(type);
	};

	// 彈窗確認
	const handleConfirmPopups = () => {
		if (clickDirection === KeepDirection.Same) {
			if (autoTypeSame === KeepType.None) return;
		} else {
			if (autoTypeReverse === KeepType.None) return;
		}

		setAuto(true);
		setAutoDir(clickDirection);
		setAutoBetPopupsState(false);
		if (clickDirection === KeepDirection.Same) setAutoTypeReverse(KeepType.None);
		else setAutoTypeSame(KeepType.None);
	};

	// 彈窗取消
	const handleCancelPopups = () => {
		if (autoDir === clickDirection) handleCancelAutoBet();
		else if (clickDirection === KeepDirection.Same) setAutoTypeSame(KeepType.None);
		else setAutoTypeReverse(KeepType.None);
		setAutoBetPopupsState(false);
	};

	// 關閉錯誤訊息視窗
	const handleCloseErrorPopups = () => {
		setErrorText("");
		setErrorMsgState(false);
	}

	//今日損益計算
	let profit: string | number = "-";
	if (profitResponse) {
		profit = profitResponse.data.profit;
	}

	return (
		<div className="flex w-full bg-bodyBgc">
			{logoState && <Logo handleLogoState={handleLogoState} />}
			<div className="h-screen w-3/12 bg-arerBgc">
				<Pinary />
				<SearchBar />
				<FilterBar
					menuState={menuState}
					filterBarMenu={subcategories}
					handleFilterMenu={handleFilterMenu}
				/>
				<ItemsList
					merchandiseData={commodities}
					handleCommdity={handleCommdity}
				/>
			</div>
			<div className="w-9/12">
				<Navbar
					commodity={commodityData}
					sidebarMenu={sidebarMenu}
					handleFilterSidebar={handleFilterSidebar}
					sidebarState={sidebarState}
				/>
				<div className="ml-3 mt-3 flex">
					<div className="w-8/12">
						<ChartComponent
							commodity={commodityData}
							symbol={symbol || ""}
							kline={kline}
						/>
					</div>
					<div className="w-4/12 px-3">
						{sidebarState === 1 && <Announcement />}
						{sidebarState === 2 && <Order />}
						{sidebarState === 3 && (
							<div>
								<NickName userNickName={userNickName} />
								<TotalAssets
									balance={balance}
									totalasset={totalasset}
									profit={profit}
								/>
								<LinksMenu
									handleShowDepositHistory={handleShowDepositHistory}
								/>
								<LanguageSelector />
							</div>
						)}
						{sidebarState === 4 && (
							<DepositHistory />
						)}
					</div>
				</div>
				<div className="flex w-full">
					<BetInput
						balance={balance}
						ranges={ranges}
						handleSetBetMoney={handleSetBetMoney}
						betMoney={betMoney}
						handleSetRange={handleSetRange}
					/>
					<BetChips chips={chips} handleSetChipsValue={handleSetChipsValue} />
					<div className="w-5/12">
						<BetButton
							commodity={commodityData}
							range={range}
							handlBuy={handlBuy}
						/>
						<AutoBet
							autoDir={autoDir}
							handleSameWayAutoBet={handleSameWayAutoBet}
							handleReverseAutoBet={handleReverseAutoBet}
							handleCancelAutoBet={handleCancelAutoBet}
						/>
					</div>
				</div>
			</div>
			{autoBetPopupsState && (
				<AutoBetPopups
					clickDirection={clickDirection}
					autoTypeSame={autoTypeSame}
					autoTypeReverse={autoTypeReverse}
					handleChangePopups={handleChangePopups}
					handleConfirmPopups={handleConfirmPopups}
					handleCancelPopups={handleCancelPopups}
				/>
			)}
			{successfulPopopsState &&
				(deal === null || deal.orderID !== dealId ? (
					<LoadingTrade />
				) : (
					<SuccessfulPopups
						deal={deal}
						betMoney={betMoney}
						handleCloseSuccessfulPopups={handleCloseSuccessfulPopups}
					/>
				))}
			{
				errorMsgState && <ErrorMsgPopups errorMessage={errorText} handleCloseErrorPopups={handleCloseErrorPopups} />
			}
		</div>
	);
};
export default Desk;
