//type
import { Range } from "../../libs/type/range";

interface Props {
	balance: string | number;
	ranges: Range[];
	handleSetBetMoney: (e: React.ChangeEvent<HTMLInputElement>) => void;
	betMoney: string;
	handleSetRange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BetInput = ({ balance, ranges, handleSetBetMoney, betMoney }: Props) => {
	return (
		<div className="w-3/12 text-white">
			<div className="flex text-2xl">
				<p className="mt-10 w-1/2 text-center font-black">投注金額</p>
				<div className="relative w-1/2 border-b border-gray-500">
					<input
						type="text"
						placeholder="輸入金額"
						className="mt-10 w-full bg-transparent text-right text-white placeholder-white"
						value={betMoney}
						onChange={handleSetBetMoney}
					/>
					<p className="absolute bottom-0">$</p>
				</div>
			</div>
			<div className="my-2 w-full text-right">
				<p className="text-deepYellow">
					可用餘額：{Number(balance).toLocaleString()}
				</p>
			</div>
			<div className="mt-10 flex text-2xl">
				<p className="w-1/2 text-center font-black">選擇區間</p>
				<select className="w-1/2 border-b border-gray-500 bg-transparent text-center text-white">
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
export default BetInput;
