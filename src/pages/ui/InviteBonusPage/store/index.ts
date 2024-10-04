// taskApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../../app/store/api";
import { TaskCheckResponse } from "./types";

export const checkRefApi = createApi({
  reducerPath: "checkRefApi",
  baseQuery,
  endpoints: (builder) => ({
    checkReferral: builder.mutation<TaskCheckResponse, { checkCount: number }>({
      query: ({ checkCount }) => ({
        url: `/task/check/referral?count=${checkCount}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useCheckReferralMutation } = checkRefApi;
