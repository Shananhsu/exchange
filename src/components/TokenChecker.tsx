import axios from "axios";
import useSWR from "swr/immutable";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setState } from "../redux/tokenSlice";
import { TokenCheck } from "../libs/type/token";
import { PeriodResponse } from "../libs/type/period";
import { APIURL } from "@/env";
import { useEffect } from "react";

function checkToken(token: string) {
    let headers = { playertoken: token };
    return axios.get(`${APIURL}/token/ping`, { headers }).then(r => r.data);
}

function getTokenStatus([_, token]: [string, string]) {
    return checkToken(token);
}

const TokenChecker = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.token.token);
    const state = useAppSelector((state) => state.token.state);
    const { data } = useSWR<PeriodResponse>(["token_state", token], getTokenStatus);

    useEffect(() => {
        if (data) {
            if (data.data === "OK") {
                dispatch(setState(TokenCheck.Ok));
            } else if (data.data === null) {
                throw 1;
            } else {
                location.replace(data.data);
            }
        }
    }, [data]);

    if (state === TokenCheck.Error) throw 1;
    if (state === TokenCheck.Ok) return <Outlet />;
    else if (!data) {
        return <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-bodyBgc">
            <span className="relative flex h-5 w-5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-5 w-5 rounded-full bg-sky-500"></span>
            </span>
        </div>;
    }
};
export default TokenChecker;
