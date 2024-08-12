import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Commodity } from "../../libs/type/commodity";

interface Props {
	merchandiseData: Commodity[];
}

const ItemsList = ({ merchandiseData }: Props) => {
	const { t } = useTranslation();

	return (
		<div className="mt-2 pb-7">
			<div className="mx-auto max-h-[calc(100vh-14rem)] w-full flex-1 overflow-y-auto">
				<div className="mx-auto flex w-10/12 text-xs text-white">
					<p className="w-2/4">品種</p>
					<p className="w-1/4 text-right">成交價</p>
					<p className="w-1/4 text-right">漲跌幅</p>
				</div>
				{merchandiseData.map((item) => (
					<Link to={`/trade/${item.symbol}`} key={item.symbol}>
						<div className="mx-auto w-11/12 border-b border-b-gray-500">
							<div className="mx-auto mt-2 flex w-11/12 items-center pb-3 text-sm text-white">
								<div className="w-2/4 font-black">
									<p>{item.symbol}</p>
									<p className="text-xs text-gray-500">{t(item.symbol)}</p>
								</div>
								<div className="w-1/4 items-center justify-end text-right">
									{item.change < 0 && (
										<p className="text-lose">{item.lastclose.toString().toDigital(item.floatdigit)}</p>
									)}
									{item.change === 0 && (
										<p className="text-white">{item.lastclose.toString().toDigital(item.floatdigit)}</p>
									)}
									{item.change > 0 && (
										<p className="text-win">{item.lastclose.toString().toDigital(item.floatdigit)}</p>
									)}
									<p className="text-xs text-gray-500">
										{moment().format("hh:mm:ss")}
									</p>
								</div>
								<div className="flex w-1/4 items-center justify-end">
									{item.changepercent < 0 && (
										<div className="w-3/4 rounded-md bg-lose p-1">
											<p className="text-right">{item.changepercent}%</p>
										</div>
									)}
									{item.changepercent >= 0 && (
										<div className="w-3/4 rounded-md bg-darkGreen p-1">
											<p className="text-right">+{item.changepercent}%</p>
										</div>
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
export default ItemsList;
