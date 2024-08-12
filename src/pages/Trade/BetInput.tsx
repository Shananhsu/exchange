import React from "react";
import { Range } from "../../libs/type/range";

interface Props {
	balance: string | number;
	ranges: Range[];
	handleSetBetMoney: (e: React.ChangeEvent<HTMLInputElement>) => void;
	betMoney: string;
	handleSetRange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BetInput = ({
	balance,
	ranges,
	handleSetBetMoney,
	betMoney,
	handleSetRange,
}: Props) => {
	return (
		<div className="w-1/2 text-sm text-white">
			<div className="flex">
				<p className="w-1/2 text-center text-base font-black">投注金額</p>
				<div className="w-1/2 border-b border-gray-500 relative">
					<input
						type="text"
						placeholder="輸入金額"
						className="w-full bg-transparent text-right text-white placeholder-white"
						value={betMoney}
						inputMode="numeric"
						onChange={handleSetBetMoney}
					/>
					<p className="absolute bottom-0">$</p>
				</div>
			</div>
			<div className="my-2 w-full text-right text-xs">
				<p className="text-xs text-deepYellow">
					可用餘額：{balance.toLocaleString()}
				</p>
			</div>
			<div className="flex">
				<p className="w-1/2 text-center text-base font-black">選擇區間</p>
				<select
					className="w-1/2 bg-transparent text-center text-base text-white"
					onChange={handleSetRange}
				>
					{ranges.map((range) => (
						<option key={range.seq} value={range.seq} className="bg-arerBgc">
							{range.winpercent} %
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
export default React.memo(BetInput);
