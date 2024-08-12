import { useState, useMemo } from "react";
import axios from "axios";
import { APIURL } from "@/env";
import { useAppSelector } from "../../../redux/hooks";
import useSWR from "swr";

//components
import FilterBar from "./FilterBar";
import Navbar from "./Navbar";
import DepositItems from "./DepositItems";

//type
import { TransferResponse } from "../../../libs/type/transfer";

interface filterBarMenu {
	id: number;
	text: string;
}

//filterBar Menu Array
const filterBarMenu = [
	{ id: 1, text: "全部" },
	{ id: 2, text: "轉出" },
	{ id: 3, text: "轉入" },
];

function fetchTransfer(token: string) {
	let headers = { "playertoken": token };
	return axios.get(`${APIURL}/player/transfer/list?inout=0`, { headers }).then(r => r.data);
}

function getTransfer([_, token]: [string, string]) {
	return fetchTransfer(token);
}

const DepositHistory = () => {
	const token = useAppSelector((state) => state.token.token);

	// 預設導覽列位置 1全部, 2轉出, 3轉入 之後如果需要記錄使用者最後瀏覽頁面可以考入存入 Local Storage
	const [menuState, setMenuState] = useState(1);

	const { data: transferResponse } = useSWR<TransferResponse>(["transfer", token], getTransfer);

	let transfers = useMemo(() => {
		if (!transferResponse) return [];
		switch (menuState) {
			case 1:
				return transferResponse.data.list;
			case 2:
				return transferResponse.data.list.filter((data) => data.inout === -1);
			case 3:
				return transferResponse.data.list.filter((data) => data.inout === 1);
			default:
				return [];
		}
	}, [menuState, transferResponse]);

	// handle Filter Menu
	const handleFilterMenu = (item: filterBarMenu) => {
		setMenuState(item.id);
	};

	return (
		<div className="flex flex-col bg-bodyBgc">
			<Navbar />
			<FilterBar
				filterBarMenu={filterBarMenu}
				handleFilterMenu={handleFilterMenu}
				menuState={menuState}
			/>
			<DepositItems transfers={transfers} />
		</div>
	);
};
export default DepositHistory;
