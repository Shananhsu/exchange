import { TOTrder } from "../../../libs/type/order";
import moment from "moment";

interface Props {
	order: TOTrder | null;
}

const emptyOrder = {
	symbol: "-",
	orderid: "-",
	longshort: "-",
	betamount: "-",
	winprice: "-",
	loseprice: "-",
	auto: "-",
	autotype: "-",
	createtimestamp: "-",
	rangepercent: "-",
	dealprice: "-",
	orderresult: "-",
	color: "",
};

function copy(uuid: string) {
	navigator.clipboard.writeText(uuid).then(() => alert("copied!"));
}

const HistoryInvoice = ({ order }: Props) => {
	let data: any = emptyOrder;
	if (order) {
		data = { ...order };
		data.createtimestamp = moment(order.createtimestamp * 1000).format(
			"YYYY-MM-DD hh:mm:ss"
		);
		data.longshort =
			order.longshort === 1
				? `看漲 ${data.rangepercent} %`
				: `看跌 ${data.rangepercent}%`;
		data.auto = order.auto ? "有" : "無";
		data.color = order.longshort === 1 ? "bg-green-500" : "bg-red-500";
		data.orderresult =
			order.orderresult === 1 ? (
				<p className="ml-1 text-green-500">WIN</p>
			) : (
				<p className="ml-1 text-red-500">LOSE</p>
			);
	}

	return (
		<div className="mx-auto mt-2 w-11/12 rounded-lg bg-arerBgc p-2 text-xs text-white">
			<div className="m-2 flex items-center">
				<p>訂單序號 :</p>
				<p className="ml-1">{data.orderid}</p>
				{data.orderid !== "-" && <button onClick={() => copy(data.orderid)}
					className="p-1 bg-black text-white rounded-md ml-2"
				>copy</button>}
			</div>
			<div className="m-2 flex">
				<p>生成時間 :</p>
				<p className="ml-1">{data.createtimestamp}</p>
			</div>
			<div className="m-2 flex">
				<div className="flex w-1/2">
					<p>進場點位 :</p>
					<p className="ml-1">{data.dealprice}</p>
				</div>
				<div className="flex w-1/2">
					<p>買入合約 :</p>
					<div className="ml-1 flex items-center">
						<p
							className={`flex h-6 items-center justify-center rounded ${data.color}`}
						>
							{data.longshort}
						</p>
					</div>
				</div>
			</div>
			<div className="m-2 flex">
				<div className="flex w-1/2">
					<p>獲利點位 :</p>
					<p className="ml-1">{data.winprice}</p>
				</div>
				<div className="flex w-1/2">
					<p>止損點位 :</p>
					<p className="ml-1">{data.loseprice}</p>
				</div>
			</div>
			<div className="m-2 flex">
				<div className="flex w-1/2">
					<p>投注金額 :</p>
					<p className="ml-1">{data.betamount}</p>
				</div>
				<div className="flex w-1/2">
					<p>最終結果 :</p>
					{data.orderresult}
				</div>
			</div>
		</div>
	);
};
export default HistoryInvoice;
