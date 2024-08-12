import { useState, useEffect } from "react";
import { useGetBalanceQuery } from "../../redux/balanceSlice";
import axios from "axios";
import useSWR from "swr";
import moment from "moment";
import { APIURL } from "@/env";
import { useAppSelector } from "../../redux/hooks";
import { ProfitResponse } from "../../libs/type/profit";

// 元件
import LinksMenu from "./LinksMenu";
import NickName from "./Nickname";
import TotalAssets from "./TotalAssets";
import LanguageSelector from "./LanguageSelector";

function fetchProfit(token: string) {
    let headers = { "playertoken": token };
    let date = moment().format("YYYY-MM-DD");
    let timeZone = moment().utcOffset() / 60;
    return axios.get(`${APIURL}/player/day/profit?d=${date}&tz=${timeZone}`, { headers }).then(r => r.data);
}

function getProfit([_, token]: [string, string]) {
    return fetchProfit(token);
}

const Property = () => {
    const token = useAppSelector((state) => state.token.token);

    const [userNickName, _setUserNickName] = useState("USERID");

    const { data: balanceResponse, refetch: refetchBalance } = useGetBalanceQuery(token);

    const { data: profitResponse } = useSWR<ProfitResponse>(["profit", token], getProfit);

    let balance: string | number = "-";
    let totalasset: string | number = "-";
    if (balanceResponse) {
        balance = balanceResponse.data.balance;
        totalasset = balanceResponse.data.totalasset;
    }

    let profit: string | number = "-";
    if (profitResponse) {
        profit = profitResponse.data.profit;
    }

    useEffect(() => { refetchBalance(); }, []);

    return (
        <div className="h-screen bg-bodyBgc">
            <NickName userNickName={userNickName} />
            <TotalAssets balance={balance} totalasset={totalasset} profit={profit} />
            <LinksMenu />
            <LanguageSelector />
        </div>
    );
};

export default Property;
