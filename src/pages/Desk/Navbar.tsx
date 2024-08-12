import { useTranslation } from "react-i18next";

//type
import { Commodity } from "../../libs/type/commodity";

interface SidebarMenu {
	id: number;
	alt: string;
	image: string;
	yellowImage: string;
}

interface Props {
	commodity: Commodity;
	sidebarMenu: SidebarMenu[];
	handleFilterSidebar: (i: number) => void;
	sidebarState: number;
}

const Navbar = ({
	commodity,
	sidebarMenu,
	handleFilterSidebar,
	sidebarState,
}: Props) => {
	const { t } = useTranslation();
	return (
		<div className="ml-3 flex bg-arerBgc py-3">
			<div className="flex w-8/12 justify-evenly">
				<div className="w-2/12 text-center font-black">
					<p className="py-1 text-2xl text-white">{commodity.symbol}</p>
					<p className="py-1 text-xl text-gray-400">{t(commodity.symbol)}</p>
				</div>
				<div className="w-2/12">
					<p className="py-1 text-center text-2xl font-black text-gray-400">
						成交價
					</p>
					{commodity.change < 0 && (
						<p className="py-1 text-center text-xl text-lose">
							{commodity.lastclose
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
					{commodity.change === 0 && (
						<p className="py-1 text-center text-xl text-white">
							{commodity.lastclose
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
					{commodity.change > 0 && (
						<p className="py-1 text-center text-xl text-win">
							{commodity.lastclose
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
				</div>
				<div className="w-2/12 text-white">
					<p className="py-1 text-center text-2xl font-black text-gray-400">
						漲跌幅
					</p>
					{commodity.change < 0 && (
						<div className="mx-auto w-7/12 rounded-md bg-lose py-1">
							<p className="text-center text-xl">{commodity.changepercent}%</p>
						</div>
					)}
					{commodity.change === 0 && (
						<div className="mx-auto w-7/12 rounded-md bg-gray-700 py-1">
							<p className="text-center text-xl">{commodity.changepercent}%</p>
						</div>
					)}
					{commodity.change > 0 && (
						<div className="mx-auto w-7/12 rounded-md bg-darkGreen py-1">
							<p className="text-center text-xl">+{commodity.changepercent}%</p>
						</div>
					)}
				</div>
				<div className="w-2/12 text-white">
					<p className="py-1 text-center text-2xl  font-black text-gray-400">
						昨收
					</p>
					{commodity.refclose > commodity.lastclose && (
						<p className="py-1 text-center text-xl text-win">
							{commodity.refclose
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
					{commodity.refclose === commodity.lastclose && (
						<p className="py-1 text-center text-xl text-white">
							{commodity.refclose
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
					{commodity.refclose < commodity.lastclose && (
						<p className="py-1 text-center text-xl text-lose">
							{commodity.refclose
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
				</div>
				<div className="w-2/12 text-white">
					<p className="py-1 text-center text-2xl font-black text-gray-400">
						最高
					</p>
					{commodity.high > commodity.lastclose && (
						<p className="py-1 text-center text-xl text-win">
							{commodity.high
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
					{commodity.high === commodity.lastclose && (
						<p className="py-1 text-center text-xl text-white">
							{commodity.high
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
					{commodity.high < commodity.lastclose && (
						<p className="py-1 text-center text-xl text-lose">
							{commodity.high
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
				</div>
				<div className="w-2/12 text-white">
					<p className="py-1 text-center text-2xl font-black text-gray-400">
						最低
					</p>
					{commodity.low > commodity.lastclose && (
						<p className="py-1 text-center text-xl text-win">
							{commodity.low
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
					{commodity.low === commodity.lastclose && (
						<p className="py-1 text-center text-xl text-white">
							{commodity.low
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
					{commodity.low < commodity.lastclose && (
						<p className="py-1 text-center text-xl text-lose">
							{commodity.low
								.toString()
								.replace(
									new RegExp(`^(\\d+\\.\\d{0,${commodity.floatdigit}})\\d*$`),
									"$1"
								)}
						</p>
					)}
				</div>
			</div>
			<div className="flex h-14 w-4/12 items-center justify-around space-x-4 text-center text-xl font-black text-white">
				{sidebarMenu.map((item) => (
					<button
						className={`mt-5 w-4/12 hover:opacity-100 ${sidebarState === item.id
							? "text-deepYellow opacity-100"
							: "opacity-50"
							}`}
						key={item.id}
						onClick={() => handleFilterSidebar(item.id)}
					>
						<img
							src={sidebarState === item.id ? item.yellowImage : item.image}
							alt={item.alt}
							className={`mx-auto h-8 w-auto ${sidebarState === item.id ? "" : "brightness-0 invert filter"
								}`}
						/>
						<p className="p-1">{item.alt}</p>
					</button>
				))}
			</div>
		</div>
	);
};
export default Navbar;
