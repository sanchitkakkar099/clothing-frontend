import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  authApi,
  ordersApi,
  installappApi
} from "../service";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice"
import installAppSlice from "./installAppSlice";
const appReducer = combineReducers({
  authState:authSlice,
  orderState:orderSlice,
  installAppDataState:installAppSlice,
  [authApi.reducerPath]: authApi.reducer,
  [ordersApi.reducerPath]:ordersApi.reducer,
  [installappApi.reducerPath]:installappApi.reducer,
});

export const store = configureStore({
  reducer: appReducer,     
  middleware: (getDefaltMiddleware) =>
    getDefaltMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      ordersApi.middleware,
      installappApi.middleware
    ]),
});