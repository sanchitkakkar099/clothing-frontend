import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const auth = localStorage.getItem("auth");
const user = JSON.parse(auth);

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_PROD_URL;

export const authApi = createApi({
  tagTypes: ["auth"],
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
  }),
  endpoints: (builder) => ({
    loginAuth: builder.mutation({
      query: (payload) => ({
        url: "admin/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"],
    }),
    loginAsAdmin: builder.mutation({
      query: (payload) => ({
        url: "admin/staff/login/admin",
        method: "POST",
        body: payload,
      }),
      providesTags: ["auth"],
    }),
  }),
});
export const { useLoginAuthMutation, useLoginAsAdminMutation } = authApi;




