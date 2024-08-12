import React from "react";
import { KeepDirection } from "../../libs/type/order";

// type
interface Props {
	autoDir: KeepDirection;
	handleSameWayAutoBet: () => void;
	handleReverseAutoBet: () => void;
	handleCancelAutoBet: () => void;
}

const AutoBet = ({
	autoDir,
	handleSameWayAutoBet,
	handleReverseAutoBet,
	handleCancelAutoBet,
}: Props) => {
	let classL = autoDir === KeepDirection.Same ? "bg-deepYellow border-2 border-yellow-600" : "bg-arerBgc";
	let classR = autoDir === KeepDirection.Reverse ? "bg-deepYellow border-2 border-yellow-600" : "bg-arerBgc";
	return (
		<div className="w-full mt-7">
			<div className="mx-auto flex w-11/12 border-t border-t-gray-500 py-5 text-white">
				<div className="w-4/12 text-center">
					<button
						className={`rounded-lg px-2 py-2 text-sm ${classL}`}
						onClick={handleSameWayAutoBet}
					>
						同向自動續單
					</button>
				</div>
				<div className="w-4/12 text-center">
					<button
						className={`rounded-lg px-2 py-2 text-sm ${classR}`}
						onClick={handleReverseAutoBet}
					>
						反向自動續單
					</button>
				</div>
				<div className="w-2/12 text-center">
					<button
						className="rounded-lg bg-arerBgc px-2 py-2 text-sm"
						onClick={handleCancelAutoBet}
					>
						取消
					</button>
				</div>
				<div className="w-2/12 text-center">
					<button className="relative rounded-full bg-arerBgc px-4 py-4 text-2xl">
						<p className="absolute inset-0">?</p>
					</button>
				</div>
			</div>
		</div>
	);
};
export default React.memo(AutoBet);
