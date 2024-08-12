import { TOTrder } from "../../../libs/type/order";

// type
interface InvoiceBtn {
	id: number;
	text: string;
	state: string;
}

interface PositionAndHistoryBtn {
	invoiceState: string;
	handleInvoiceState: (state: InvoiceBtn) => void;
}

interface SubProps {
	order: TOTrder;
	handleCancelOrder: (uuid: string) => void;
}

interface Props {
	invoiceState: string;
	order: TOTrder | null;
	handleInvoiceState: (state: InvoiceBtn) => void;
	handleCancelOrder: (uuid: string) => void;
}

// 持倉 歷史按鈕
const invoiceBtn: InvoiceBtn[] = [
	{ id: 1, text: "持倉", state: "Position" },
	{ id: 2, text: "歷史", state: "History" },
];

// 持倉、歷史按鈕元件
const PositionAndHistoryBtn = ({
	invoiceState,
	handleInvoiceState,
}: PositionAndHistoryBtn) => {
	return (
		<div className="flex">
			{invoiceBtn.map((item) => (
				<div className="mx-2" key={item.id}>
					<button
						className={`${invoiceState === item.state ? "text-footerChoose" : "text-white"
							}`}
						onClick={() => handleInvoiceState(item)}
					>
						{item.text}
					</button>
					{invoiceState === item.state && (
						<div className="mx-auto w-1/2 border-b-2 border-b-footerChoose" />
					)}
				</div>
			))}
		</div>
	);
};

const AutoBet = ({ order, handleCancelOrder }: SubProps) => {
	return (
		<div className="flex items-center justify-center text-xs text-amber-400">
			{/* <div className="mx-1 rounded bg-arerBgc px-1 py-2">
                <button>同向自動續單</button>
            </div>
            <div className="mx-1 rounded bg-arerBgc px-1 py-2">
                <button>反向自動續單</button>
            </div> */}
			{order.auto && (
				<div className="mx-1 rounded-md border border-solid border-amber-400 px-1 py-2">
					<button className="" onClick={() => handleCancelOrder(order.orderid)}>
						取消續單
					</button>
				</div>
			)}
		</div>
	);
};

const FilterBar = ({
	invoiceState,
	order,
	handleInvoiceState,
	handleCancelOrder,
}: Props) => {
	const hasOrder = !!order;
	return (
		<div className="mx-auto flex w-11/12">
			<div className="mx-auto flex w-full justify-between">
				<PositionAndHistoryBtn
					invoiceState={invoiceState}
					handleInvoiceState={handleInvoiceState}
				/>
				{invoiceState === "Position" && hasOrder && (
					<AutoBet order={order} handleCancelOrder={handleCancelOrder} />
				)}
			</div>
		</div>
	);
};

export default FilterBar;
