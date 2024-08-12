import { TOTrder, KeepDirection, KeepType } from "../../libs/type/order";
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
};

function copy(uuid: string) {
	navigator.clipboard.writeText(uuid).then(() => alert("copied!"));
}

function getDirectionText(autodir: KeepDirection) {
	switch (autodir) {
		case KeepDirection.Same:
			return "同向";
		case KeepDirection.Reverse:
			return "反向";
		default:
			return "";
	}
}

function getTypeText(autotype: KeepType) {
	switch (autotype) {
		case KeepType.Both:
			return "都續單";
		case KeepType.Win:
			return "贏續單";
		case KeepType.Lose:
			return "輸續單";
	}
}

const PositionInvoice = ({ order }: Props) => {
	let data: any = emptyOrder;
	if (order) {
		data = { ...order };
		data.createtimestamp = moment(order.createtimestamp * 1000).format(
			"YYYY-MM-DD hh:mm:ss"
		);
		data.longshort =
			order.longshort === 1
				? `看漲 ${order.rangepercent}%`
				: `看跌 ${order.rangepercent}%`;
		if (order.auto) {
			data.auto = getDirectionText(order.autodir);
			data.auto += " " + getTypeText(order.autotype);
		} else {
			data.auto = "無";
		}
		data.color = order.longshort === 1 ? "bg-green-500" : "bg-red-500";
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
					<p>投注金額 :</p>
					<p className="ml-1">{data.betamount}</p>
				</div>
			</div>
			<div className="m-2 flex">
				<div className="flex w-1/2">
					<p>獲勝點位 :</p>
					<p className="ml-1">{data.winprice}</p>
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
					<p>止損點位 :</p>
					<p className="ml-1">{data.loseprice}</p>
				</div>
				<div className="flex w-1/2">
					<p>續單狀態 :</p>
					<p className="ml-1">{data.auto}</p>
				</div>
			</div>
		</div>
	);
};
export default PositionInvoice;
