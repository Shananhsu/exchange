import moment from "moment";
import { useTranslation } from "react-i18next";

interface merchandiseData {
	maincategory: string; //主類別
	subcategory: string; //次類別
	symbol: string; //商品代碼
	symbolname: string; //商品名稱
	ishot: boolean; //是否為熱門商品
	refclose: number; //前一天收盤價
	high: number; //最高價
	low: number; //最低價
	lastclose: number; //現價
	change: number; //漲跌幅度
	changepercent: number; //漲跌幅度
	floatdigit: number; //顯示到小數點第幾位
}

interface Props {
	merchandiseData: merchandiseData[];
	handleCommdity: any;
}

const ItemsList = ({ merchandiseData, handleCommdity }: Props) => {
	const { t } = useTranslation();

	return (
		<div className="mt-5">
			<div className="mx-auto flex w-10/12 text-2xl text-gray-400">
				<p className="w-4/12">品種</p>
				<p className="w-4/12 text-right">成交價</p>
				<p className="w-4/12 text-right">漲跌幅</p>
			</div>
			<div className="mx-auto mt-2 max-h-[calc(100vh-20rem)] w-full flex-1 overflow-y-auto">
				{merchandiseData.map((item) => (
					<div
						className="mx-auto w-11/12 border-b border-b-gray-500"
						onClick={() => handleCommdity(item)}
						key={item.symbol}
					>
						<div className="mx-auto mt-2 flex w-11/12 items-center pb-3 text-white hover:text-deepYellow">
							<div className="w-4/12">
								<p className="text-2xl font-black">{item.symbol}</p>
								<p className="text-xl text-gray-400">{t(item.symbol)}</p>
							</div>
							<div className="w-4/12 items-center justify-end text-right text-xl font-medium">
								{item.change < 0 && (
									<p className="text-lose">
										{item.lastclose
											.toString()
											.replace(
												new RegExp(`^(\\d+\\.\\d{0,${item.floatdigit}})\\d*$`),
												"$1"
											)}
									</p>
								)}
								{item.change === 0 && (
									<p className="text-white">
										{item.lastclose
											.toString()
											.replace(
												new RegExp(`^(\\d+\\.\\d{0,${item.floatdigit}})\\d*$`),
												"$1"
											)}
									</p>
								)}
								{item.change > 0 && (
									<p className="text-win">
										{item.lastclose
											.toString()
											.replace(
												new RegExp(`^(\\d+\\.\\d{0,${item.floatdigit}})\\d*$`),
												"$1"
											)}
									</p>
								)}
								<p className="text-lg text-gray-500">
									{moment().format("hh:mm:ss")}
								</p>
							</div>
							<div className="flex w-4/12 items-center justify-end text-xl font-medium text-white">
								{item.change < 0 && (
									<div className="w-3/4 rounded-md bg-lose p-1">
										<p className="text-right">{item.changepercent}%</p>
									</div>
								)}
								{item.change === 0 && (
									<div className="w-3/4 rounded-md bg-gray-700 p-1">
										<p className="text-right">{item.changepercent}%</p>
									</div>
								)}
								{item.change > 0 && (
									<div className="w-3/4 rounded-md bg-darkGreen p-1">
										<p className="text-right">+{item.changepercent}%</p>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default ItemsList;
