import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  authApi,
} from "../service";
import authSlice from "./authSlice";

const appReducer = combineReducers({
  authState:authSlice,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaltMiddleware) =>
    getDefaltMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
    ]),
});