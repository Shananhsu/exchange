import { KeepDirection, KeepType } from "../../libs/type/order";

// type
interface Props {
	clickDirection: KeepDirection;
	autoTypeSame: KeepType;
	autoTypeReverse: KeepType;
	handleChangePopups: (type: number) => void;
	handleConfirmPopups: () => void;
	handleCancelPopups: () => void;
}

const inputArray = [
	{ id: KeepType.Win, text: "贏續單" },
	{ id: KeepType.Lose, text: "輸續單" },
	{ id: KeepType.Both, text: "都續單" },
];

const AutoBetPopups = ({ clickDirection, autoTypeSame, autoTypeReverse, handleChangePopups, handleConfirmPopups, handleCancelPopups }: Props) => {
	let autoType = clickDirection === KeepDirection.Same ? autoTypeSame : autoTypeReverse;
	return (
		<div className="fixed flex h-screen w-full items-center justify-center bg-opacityBlack">
			<div className="w-1/4 bg-bodyBgc py-5 text-2xl">
				{inputArray.map((item) => (
					<div className="mb-3" key={item.id}>
						<button className="flex w-full items-center justify-center" onClick={() => handleChangePopups(item.id)}>
							<input
								type="radio"
								checked={autoType === item.id}
								className="transform scale-150 mr-2"
							/>
							<p className="ml-2 font-black text-white">{item.text}</p>
						</button>
					</div>
				))}
				<div className="w-full px-1">
					<button className="w-5/12" onClick={handleConfirmPopups}>
						<p className="mx-auto w-10/12 rounded-md bg-deepYellow py-1">
							確認
						</p>
					</button>
					<button className="w-5/12" onClick={handleCancelPopups}>
						<p className="mx-auto w-10/12 rounded-md bg-arerBgc py-1 text-white">
							取消
						</p>
					</button>
					<button className="w-2/12">
						<p className="mx-auto rounded-full bg-arerBgc py-1 font-black text-white">
							?
						</p>
					</button>
				</div>
			</div>
		</div>
	);
};
export default AutoBetPopups;
