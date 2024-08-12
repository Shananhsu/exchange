import { useParams } from "react-router-dom";
import { useMemo, useState, useCallback } from "react";
import axios from "axios";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useGetBalanceQuery } from "../../redux/balanceSlice";
import { useGetCommodityQuery } from "../../redux/commoditySlice";
import { useGetChipQuery } from "../../redux/chipSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setDeal } from "../../redux/dealSlice";
import { RangeResponse, Range } from "../../libs/type/range";
import { KLineResponse } from "../../libs/type/kline";
import { KeepDirection, KeepType } from "../../libs/type/order";
import { APIURL } from "@/env";

// components
import Navbar from "./Navbar";
import ChartComponent from "./ChartComponent";
import BetInput from "./BetInput";
import BetChips from "./BetChips";
import BetButton from "./BetButton";
import AutoBet from "./AutoBet";
import AutoBetPopups from "./AutoBetPopups";
import SuccessfulPopups from "./SuccessfulPopups";
import LoadingTrade from "../../components/LoadingTrade";
import ErrorMsgPopups from "../../components/ErrorMsgPopups";

let initialRange: Range = {
	seq: 0,
	winpercent: "0",
	losepercent: "0",
};

function fetchRange(url: string, token: string) {
	let headers = { playertoken: token };
	return axios.get(`${APIURL}${url}`, { headers }).then((r) => r.data);
}

function getRange([url, token]: [string, string]) {
	return fetchRange(url, token);
}

function fetchKLine(url: string, token: string) {
	let headers = { playertoken: token };
	return axios.get(`${APIURL}${url}`, { headers }).then((r) => r.data);
}

function getKLine([url, token]: [string, string]) {
	return fetchKLine(url, token);
}

// function starCommodity(symbol: string, action: string, token: string) {
//     let headers = { playertoken: token };
//     // let body = { symbol };
//     let api = `${APIURL}/player/favorite?symbol=${symbol}`;
//     if (action === "add") {
//         axios.post(api, {}, { headers }).then((r) => r.data);
//     } else {
//         axios.delete(api, { headers }).then((r) => r.data);
//     }
// }

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

const Trade = () => {
	const { symbol } = useParams();

	const dispatch = useAppDispatch();

	const token = useAppSelector((state) => state.token.token);

	const deal = useAppSelector((state) => state.deal.deal);

	const [dealId, setDealId] = useState("");

	const [autoBetPopupsState, setAutoBetPopupsState] = useState(false);

	const [successfulPopopsState, setSuccessfulPopopsState] = useState(false);

	const [errorMsgState, setErrorMsgState] = useState(false)

	const [errorText, setErrorText] = useState("");

	const {
		data: balanceResponse,
		isSuccess: isBalanceSuccess,
		refetch: refetchBalance,
	} = useGetBalanceQuery(token);
	const { data: commodityResponse, isSuccess: isCommoditySuccess } =
		useGetCommodityQuery({ maincategory: "finance", token });
	const { data: chipResponse, isSuccess: isChipSuccess } =
		useGetChipQuery(token);
	const { data: rangeResponse } = useSWRImmutable<RangeResponse>(
		[`/commodity/range/${symbol}`, token],
		getRange
	);
	const { data: klineResponse } = useSWR<KLineResponse>(
		[`/commodity/kline/history?symbol=${symbol}&period=1`, token],
		getKLine
	);

	const [betMoney, setBetMoney] = useState("");
	const [auto, setAuto] = useState(false);
	const [autoTypeSame, setAutoTypeSame] = useState(KeepType.None);
	const [autoTypeReverse, setAutoTypeReverse] = useState(KeepType.None);
	const [autoDir, setAutoDir] = useState(KeepDirection.None);
	const [clickDirection, setClickDirection] = useState(KeepDirection.None);
	const [range, setRange] = useState(initialRange);

	let balance = useMemo(() => {
		if (!isBalanceSuccess) return "-";
		return balanceResponse.data.balance;
	}, [balanceResponse, isBalanceSuccess]);

	let commodity = useMemo(() => {
		if (!isCommoditySuccess) return undefined;
		return commodityResponse.data.commodities.find((c) => c.symbol === symbol);
	}, [commodityResponse, isCommoditySuccess]);

	const chips = useMemo(() => {
		if (!isChipSuccess) return [];
		return chipResponse.data.chips;
	}, [isChipSuccess]);

	const ranges = useMemo(() => {
		if (!rangeResponse) return [];
		setRange({ ...rangeResponse.data.ranges[0] });
		return rangeResponse.data.ranges;
	}, [rangeResponse]);

	const kline = useMemo(() => {
		if (!klineResponse) return [];
		return klineResponse.data.lines.map((l) => [l.ts * 1000, l.close]);
	}, [klineResponse]);

	const handleSetBetMoney = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setBetMoney(e.target.value);
	}, []);

	const handleSetChipsValue = useCallback((e: any) => {
		setBetMoney(e);
	}, []);

	const handleSetRange = useCallback((e: any) => {
		let r = ranges.find((range) => range.seq === Number(e.target.value));
		setRange({ ...r! });
	}, [ranges]);

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

	// 按取消
	const handleCancelAutoBet = useCallback(() => {
		setAuto(false);
		setAutoDir(KeepDirection.None);
		setAutoTypeSame(KeepType.None);
		setAutoTypeReverse(KeepType.None);
		setClickDirection(KeepDirection.None);
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

	// 關閉下單成功彈窗
	const handleCloseSuccessfulPopups = () => {
		dispatch(setDeal(null));
		setDealId("");
		setBetMoney("");
		handleCancelAutoBet();
		setSuccessfulPopopsState(false);
	};

	// 關閉錯誤訊息視窗
	const handleCloseErrorPopups = () => {
		setErrorText("");
		setErrorMsgState(false);
	}

	return (
		<div className="flex h-screen flex-col bg-bodyBgc">
			<Navbar commodity={commodity} />
			<ChartComponent commodity={commodity} symbol={symbol || ""} kline={kline} />
			<div className="mt-3 flex items-center">
				<BetInput
					balance={balance}
					ranges={ranges}
					handleSetBetMoney={handleSetBetMoney}
					betMoney={betMoney}
					handleSetRange={handleSetRange}
				/>
				<BetChips chips={chips} handleSetChipsValue={handleSetChipsValue} />
			</div>
			<BetButton commodity={commodity} range={range} handlBuy={handlBuy} />
			<AutoBet
				autoDir={autoDir}
				handleSameWayAutoBet={handleSameWayAutoBet}
				handleReverseAutoBet={handleReverseAutoBet}
				handleCancelAutoBet={handleCancelAutoBet}
			/>
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
			{successfulPopopsState && (
				deal === null || deal.orderID !== dealId ?
					<LoadingTrade /> :
					<SuccessfulPopups
						deal={deal} betMoney={betMoney} handleCloseSuccessfulPopups={handleCloseSuccessfulPopups}
					/>
			)}
			{
				errorMsgState && <ErrorMsgPopups errorMessage={errorText} handleCloseErrorPopups={handleCloseErrorPopups} />
			}
		</div>
	);
};
export default Trade;
