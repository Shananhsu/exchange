import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ChipResponse } from "../libs/type/chip";
import { APIURL } from "@/env";

export const chipApi = createApi({
    reducerPath: "chip",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APIURL}`,
    }),

    endpoints: build => ({
        getChip: build.query<ChipResponse, string>({
            query: token => ({
                url: `/player/betchips`,
                method: "GET",
                headers: { "playertoken": token }
            })
        }),
    }),
});

export const { useGetChipQuery } = chipApi;

export default chipApi;
