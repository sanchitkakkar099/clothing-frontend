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

export const ordersApi = createApi({
  tagTypes: ["orders"],
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,     
  }),          
  endpoints: (builder) => ({          
      shopifyOrders: builder.query({
      query: () => ({
        url: "orders/list",       
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});
export const { useShopifyOrdersQuery } = ordersApi;

export const approvalApi = createApi({
  tagTypes: ["appApproval"],
  reducerPath: "approvalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,     
  }),          
  endpoints: (builder) => ({          
      shopifyAppapproval: builder.query({
      query: () => ({
        url: "approval/request",       
        method: "GET",
      }),
      providesTags: ["appApproval"],
    }),
    changeApproval: builder.mutation({
      query:(payload) => ({
        url:"appapproval/change",
        method:"POST",
        body:payload,
      }),
      providesTags:["appApproval"],
    }),
  }),
});
export const { useShopifyAppapprovalQuery,useChangeApprovalMutation } = approvalApi;

export const installappApi = createApi({
  tagTypes: ["appHistory"],
  reducerPath: "installappApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,     
  }),          
  endpoints: (builder) => ({          
      appInstallData: builder.query({
      query: () => ({
        url: "installapp/list",       
        method: "GET",
      }),
      providesTags: ["installapp"],
    }),
  }),
});
export const { useAppInstallDataQuery } = installappApi;


