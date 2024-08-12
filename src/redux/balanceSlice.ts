import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BalanceResponse } from "../libs/type/balance";
import { APIURL } from "@/env";

export const balanceApi = createApi({
    reducerPath: "balance",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APIURL}`,
    }),

    endpoints: build => ({
        getBalance: build.query<BalanceResponse, string>({
            query: token => ({
                url: `/player/wallet/balance`,
                method: "GET",
                headers: { "playertoken": token }
            })
        }),
    }),
});

export const { useGetBalanceQuery } = balanceApi;

export default balanceApi;
