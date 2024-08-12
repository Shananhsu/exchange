import moment from "moment";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Commodity } from "../../libs/type/commodity";

// images
import Icon_PopularFire from "/src/assets/Icon_PopularFire.png";

interface Props {
	items: Commodity[];
}

function separator(i: number, len: number): string {
	return i !== len - 1 ? "border-b border-b-gray-500" : "";
}

const PopularItems = ({ items }: Props) => {
	const { t } = useTranslation();
	return (
		<div className="mx-auto mt-5 h-[calc(100vh-22rem)] w-10/12 rounded-lg bg-arerBgc pb-7">
			<h1 className="mx-auto mb-3 px-3 pt-3 text-white">最多關注</h1>
			<div className="max-h-[calc(100vh-25rem)] flex-1 overflow-y-auto px-3">
				{items.map((item, i) => (
					<Link to={`/trade/${item.symbol}`} key={item.symbol}>
						<div className={`flex flex-row py-1 ${separator(i, items.length)}`}>
							<div className="basis-1/3 font-black">
								<p className="text-sm text-white">{item.symbol}</p>
								<p className="text-xs text-gray-500">{t(item.symbol)}</p>
							</div>
							<div className="flex basis-1/4 items-center justify-start">
								<img
									className="h-5 w-auto"
									src={Icon_PopularFire}
									alt="熱門項目"
								/>
							</div>
							<div className="flex basis-1/2 items-center justify-center">
								<div className=" w-2/5 text-end">
									<p className={`text-sm ${item.changepercent >= 0 ? "text-win" : "text-lose"}`}>{item.lastclose.toString().toDigital(item.floatdigit)}</p>
									<p className="text-xs text-gray-500">
										{moment().format("hh:mm:ss")}
									</p>
								</div>
								<div className="flex w-3/5 items-center justify-end text-sm">
									{item.changepercent >= 0 ? (
										<p className="text-win">
											+{item.changepercent.toFixed(2)}%
										</p>
									) : (
										<p className="text-lose">
											{item.changepercent.toFixed(2)}%
										</p>
									)}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};
export default PopularItems;
