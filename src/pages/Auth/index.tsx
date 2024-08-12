import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr/immutable";
import { useAppDispatch } from "../../redux/hooks";
import { setState, setToken } from "../../redux/tokenSlice";
import { TokenCheck, TokenResponse } from "../../libs/type/token";
import { APIURL } from "@/env";

import Logo from "./Logo";
import { useEffect } from "react";

function fetchToken(token: string) {
    return axios.get(`${APIURL}/landing?token=${token}`).then(r => r.data);
}

function getToken([_, token]: [string, string]) {
    return fetchToken(token);
}

// 64a79f5713d3de138da65a6f
const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { data, error } = useSWR<TokenResponse>(["token", searchParams.get("token")], getToken);

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.data.jwttoken));
            dispatch(setState(TokenCheck.Ok));
            navigate("/");
        } else if (error) {
            dispatch(setState(TokenCheck.Error));
            navigate("/404");
        }
    }, [data]);

    useEffect(() => {
        let sid = setTimeout(() => {
            dispatch(setState(TokenCheck.Error));
            navigate("/404");
        }, 10000);
        return () => clearTimeout(sid);
    }, []);

    return (
        <>
            <Logo handleLogoState={() => { }} />
        </>
    );
};
export default Auth;
