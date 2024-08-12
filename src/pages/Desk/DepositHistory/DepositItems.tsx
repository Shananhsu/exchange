import moment from "moment";

//type
import { Transfer } from "../../../libs/type/transfer";

interface Props {
	transfers: Transfer[];
}
const DepositItems = ({ transfers }: Props) => {
	return (
		<div className="px-2">
			<div className="mx-auto max-h-[calc(100vh-26rem)] flex-1 overflow-y-auto font-black">
				{transfers.map((item) => (
					<div
						className="mx-auto my-2 flex items-center rounded-lg bg-arerBgc p-2 text-sm text-white"
						key={item.recordtime}
					>
						<div className="w-2/3">
							<div className="my-1 flex">
								<p>{moment(item.recordts * 1000).format("YYYY.MM.DD")}</p>
								<p className="ml-2">
									{moment(item.recordts * 1000).format("hh:mm:ss")}
								</p>
							</div>
							<div className="my-1 flex">
								<p>{item.inout === 1 ? "入金" : "出金"}:</p>
								<p className="ml-1">{item.amount}</p>
								<p className="ml-1">USDT</p>
							</div>
						</div>
						<div className="flex w-1/3 justify-center">
							<p
								className={
									item.state === -1
										? "text-lose"
										: item.state === 1
											? "text-deepYellow"
											: "text-win"
								}
							>
								{item.state === -1 && "失敗"}
								{item.state === 1 && "審核中"}
								{item.state === 2 && "成功"}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default DepositItems;
