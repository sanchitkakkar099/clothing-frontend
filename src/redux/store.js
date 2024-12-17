import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  authApi,
  ordersApi,
  installappApi,
  approvalApi,
  storeappInfoApi,
  productsApi,
} from "../service";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice"
import installAppSlice from "./installAppSlice";
import approvalSlice from "./approvalSlice";
import vendorOrderSlice from "./vendorOrderSlice";
const appReducer = combineReducers({
  authState:authSlice,
  orderState:orderSlice,
  installAppDataState:installAppSlice,
  appApprovalState:approvalSlice,
  vendorOrderState: vendorOrderSlice,
  [authApi.reducerPath]: authApi.reducer,
  [ordersApi.reducerPath]:ordersApi.reducer,
  [installappApi.reducerPath]:installappApi.reducer,
  [approvalApi.reducerPath]:approvalApi.reducer,
  [storeappInfoApi.reducerPath]:storeappInfoApi.reducer,
  [productsApi.reducerPath]:productsApi.reducer,
});

export const store = configureStore({
  reducer: appReducer,     
  middleware: (getDefaltMiddleware) =>
    getDefaltMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      ordersApi.middleware,
      installappApi.middleware,
      approvalApi.middleware,
      storeappInfoApi.middleware,
      productsApi.middleware
    ]),
});