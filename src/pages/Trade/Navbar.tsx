import BackButton from "../../components/BackButton";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Commodity } from "../../libs/type/commodity";

// image
import Icon_Favourite from "/src/assets/Icon_Favourite.png";

interface Props {
	commodity: Commodity | undefined;
}

const emptyCommodity: Commodity = {
	maincategory: "",
	subcategory: "",
	symbol: "",
	symbolname: "",
	ishot: false,
	refclose: 0,
	high: 0,
	low: 0,
	lastclose: 0,
	change: 0,
	changepercent: 0,
	floatdigit: 5,
};

const Navbar = ({ commodity }: Props) => {
	const { t } = useTranslation();

	if (commodity === undefined) {
		commodity = emptyCommodity;
	}

	const changePercentClass = useMemo(() => {
		if (commodity!.changepercent === 0) {
			return "text-white";
		} else if (commodity!.changepercent > 0) {
			return "text-win";
		} else {
			return "text-lose";
		}
	}, [commodity.changepercent]);

	const changeRefcloseClass = useMemo(() => {
		if (commodity!.refclose === commodity!.lastclose) {
			return "text-white";
		} else if (commodity!.lastclose > commodity!.refclose) {
			return "text-win";
		} else {
			return "text-lose";
		}
	}, [commodity.lastclose]);

	return (
		<div className="relative bg-bodyBgc pb-3">
			<BackButton backButtonLink={"/merchandise"} />
			<div className="mx-auto flex w-10/12 items-center justify-evenly pt-1">
				<div className="w-3/12 font-black">
					<p className="text-lg text-white">{commodity.symbol}</p>
					<p className="text-sm text-gray-500">{t(commodity.symbol)}</p>
				</div>
				<div className="w-3/12 text-right">
					<p className={changePercentClass}>{commodity.lastclose.toString().toDigital(commodity.floatdigit)}</p>
					<p className={changePercentClass}>{commodity.changepercent >= 0 && "+"}{commodity.changepercent}%</p>
				</div>
				<div className="w-1/12 text-center text-xs text-white">
					<p>昨收</p>
					<p>最高</p>
					<p>最低</p>
				</div>
				<div className="w-2/12 text-right text-xs text-white">
					<p className={changeRefcloseClass}>{commodity.refclose}</p>
					<p>{commodity.high}</p>
					<p>{commodity.low}</p>
				</div>
				<div className="absolute right-2">
					<img
						className="h-auto w-auto max-w-[20px] brightness-0 invert filter"
						src={Icon_Favourite}
						alt="CustomerService"
					/>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
