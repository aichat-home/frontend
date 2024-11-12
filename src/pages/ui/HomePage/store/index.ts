import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../../app/store/api";
import { NewsItem, MarketItem, MarketQueryParams } from "./types";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchNews: builder.query<NewsItem[], void>({
      query: () => "/news",
    }),
    fetchMarketData: builder.query<MarketItem[], MarketQueryParams>({
      query: ({ sort_by, sort }) => ({
        url: "/market/popular",
        method: "GET",
        params: {
          sort_by,
          sort,
        },
      }),
    }),
  }),
});

export const { useFetchNewsQuery, useFetchMarketDataQuery } = newsApi;
