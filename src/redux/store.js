import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  authApi,
  ordersApi,
  installappApi,
  approvalApi
} from "../service";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice"
import installAppSlice from "./installAppSlice";
import approvalSlice from "./approvalSlice";
const appReducer = combineReducers({
  authState:authSlice,
  orderState:orderSlice,
  installAppDataState:installAppSlice,
  appApprovalState:approvalSlice,
  [authApi.reducerPath]: authApi.reducer,
  [ordersApi.reducerPath]:ordersApi.reducer,
  [installappApi.reducerPath]:installappApi.reducer,
  [approvalApi.reducerPath]:approvalApi.reducer
});

export const store = configureStore({
  reducer: appReducer,     
  middleware: (getDefaltMiddleware) =>
    getDefaltMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      ordersApi.middleware,
      installappApi.middleware,
      approvalApi.middleware
    ]),
});