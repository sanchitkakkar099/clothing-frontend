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
    vendorSignUp: builder.mutation({                      
      query: (payload) => ({
        url: "admin",      
        method: "POST",
        body: payload,
      }),
      providesTags: ["auth"], 
    }), 
  }),
});
export const { useLoginAuthMutation, useLoginAsAdminMutation,useVendorSignUpMutation } = authApi;

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
  tagTypes: ["installapp"],
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

export const storeappInfoApi = createApi({
  tagTypes: ["storeappInfo"],
  reducerPath: "storeappInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,     
  }),          
  endpoints: (builder) => ({          
      creatappInfo: builder.mutation({
      query: (payload) => ({
        url: "storeappInfo",      
        method: "POST",
        body: payload,
      }),
      providesTags: ["storeappInfo"],
    }),        
      storeInfoData: builder.mutation({
      query: (payload) => ({
        url: "storeappInfo/list/by/storename",       
        method: "POST",
        body: payload,
      }),
      providesTags: ["storeappInfo"],
    }),
  }),
});
export const { useCreatappInfoMutation,useStoreInfoDataMutation } = storeappInfoApi;

export const productsApi = createApi({
  tagTypes: ["products"],
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,     
  }),          
  endpoints: (builder) => ({          
      fetchProducts: builder.mutation({
      query: (payload) => ({
        url: "products/list",      
        method: "POST",
        body: payload,
      }),
      providesTags: ["products"],
    }),        
      createProduct: builder.mutation({
      query: (payload) => ({
        url: "products/create",       
        method: "POST",
        body: payload,
      }),
      providesTags: ["products"],
    }),
  }),
});
export const { useFetchProductsMutation,useCreateProductMutation } = productsApi;


export const dashboardApi = createApi({
  tagTypes : ["dashboard"],
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
  }),
  endpoints: (builder) => ({
    appStatus: builder.mutation({
      query : (payload) => ({
        url : "vendor/app/status",
        method: "POST",
        body: payload,
      }),
      providesTags: ["dashboard"],
    }),
    appStatusUpdate: builder.mutation({
      query : (payload) => ({
        url : "vendor/app/status",
        method: "POST",
        body: payload,
      }),
      providesTags: ["dashboard"],
    }),
    productCount: builder.mutation({
       query : (payload) => ({
          url : "vendor/products",
          method: "POST",
          body: payload,
       }),
       providesTags: ["dashboard"],
    }),
  })
})

export const {useAppStatusMutation,useAppStatusUpdateMutation,useProductCountMutation} = dashboardApi