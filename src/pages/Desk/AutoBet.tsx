import React from "react";
//type
import { KeepDirection } from "../../libs/type/order";

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
		<div className="mx-auto flex text-white text-xl py-3 font-black">
			<div className="w-4/12 text-center">
				<button className={`w-10/12 rounded-lg bg-arerBgc px-2 py-2 ${classL}`}
					onClick={handleSameWayAutoBet}
				>
					同向自動續單
				</button>
			</div>
			<div className="w-4/12 text-center">
				<button className={`w-10/12 rounded-lg bg-arerBgc px-2 py-2 ${classR}`}
					onClick={handleReverseAutoBet}
				>
					反向自動續單
				</button>
			</div>
			<div className="w-2/12 text-center">
				<button className="w-10/12 rounded-lg bg-arerBgc px-2 py-2"
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
	);
};
export default React.memo(AutoBet);
