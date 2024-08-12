import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommodityResponse } from "../libs/type/commodity";
import { APIURL } from "@/env";

export const commodityApi = createApi({
    reducerPath: "commodity",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APIURL}`,
    }),

    endpoints: build => ({
        getCommodity: build.query<CommodityResponse, { maincategory: string, token: string }>({
            query: ({ maincategory, token }) => ({
                url: `/commodity/popular/${maincategory}`,
                method: "GET",
                headers: { "playertoken": token }
            })
        }),
    }),
});

export const { useGetCommodityQuery } = commodityApi;

export const { updateQueryData } = commodityApi.util;

export default commodityApi;
