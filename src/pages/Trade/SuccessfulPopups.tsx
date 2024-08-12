import moment from "moment";
import { Deal } from "../../libs/type/event";

// type
interface Props {
	deal: Deal;
	betMoney: string;
	handleCloseSuccessfulPopups: () => void;
}

const SuccessfulPopups = ({ deal, betMoney, handleCloseSuccessfulPopups }: Props) => {
	return (
		<div className="fixed flex h-screen w-full items-center justify-center bg-opacityBlack">
			<div className="w-11/12 bg-bodyBgc text-white px-3">
				<h1 className="text-center text-lg font-black">
					下單成功
				</h1>
				<div className="flex justify-between py-1">
					<p>訂單序號</p>
					<p>{deal.orderID}</p>
				</div>
				<div className="flex items-center justify-between py-1">
					<p>訂單時間</p>
					<p>{moment(deal.ts * 1000).format("YYYY-MM-DD hh:mm:ss")}</p>
				</div>
				<div className="flex justify-between py-1">
					<p>投注金額/預期獲利</p>
					<p>{betMoney}/{deal.expectwin}</p>
				</div>
				<div className="flex justify-between py-1">
					<p>買入合約</p>
					{
						deal.longshort === 1 ?
							<p className="bg-win text-black px-1">看漲</p> :
							<p className="bg-lose text-black px-1">看跌</p>
					}
				</div>
				<div className="flex justify-between py-1">
					<p>合約區間</p>
					<p>{deal.winpercent}%</p>
				</div>
				<div className="flex justify-between py-1">
					<p>進場點位</p>
					<p>{deal.dealprice}</p>
				</div>
				<div className="flex justify-between py-1">
					<p>Win/Lose</p>
					<p>{deal.winprice}/{deal.loseprice}</p>
				</div>
				<div className="mt-5 flex w-full justify-center pb-5 py-1">
					<button
						className="w-1/3 rounded-full py-2 text-sm font-black bg-deepYellow text-black"
						onClick={handleCloseSuccessfulPopups}
					>
						確認
					</button>
				</div>
			</div>
		</div>
	);
};

export default SuccessfulPopups;
