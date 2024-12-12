import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initState = {
    userInfo: cookies?.get('clothing_user'), 
    userToken: cookies?.get('clothing'), 
    isLoggedIn: false,
    timer:0
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setUserToken: (state, { payload }) => {
      state.userToken = payload;
    },
    setUserInfo: (state, { payload }) => {
        state.userInfo = payload;
    },
    setIsFrench: (state, { payload }) => {
      state.isFrench = payload;
    },
    getUserToken: (state, { payload }) => {
        state.userToken = payload;
    },
    getUserInfo: (state, { payload }) => {
        state.userInfo = payload;
    },
    updateUserInfoField: (state, action) => {
      // Update only specific fields of userInfo
      const { key, value } = action.payload;
      if (state.userInfo) {
        state.userInfo[key] = value;
      }
    },
    getIsFrench: (state, { payload }) => {
      state.isFrench = payload;
    },

    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setTimer: (state, { payload }) => {
      state.timer = payload;
    },
  },
});

export const {
  setUserToken,
  setUserInfo,
  setIsFrench,
  getUserToken,
  getUserInfo,
  updateUserInfoField,
  getIsFrench,
  setIsLoggedIn,
  setTimer
} = authSlice.actions;

export default authSlice.reducer;
