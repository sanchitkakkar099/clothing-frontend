import { createSlice } from "@reduxjs/toolkit";

const initState = { 
  installappList: [],
  installappView: null,
};

export const installAppSlice = createSlice({
  name: "installApp",
  initialState: initState,
  reducers: {
    getInstallAppData: (state, { payload }) => {
      state.installappList = payload;
    },       
    setInstallAppDataView: (state, { payload }) => {    
      state.installappView = payload;
    },   
  },
});

export const { getInstallAppData, setInstallAppDataView } =
installAppSlice.actions;
export default installAppSlice.reducer;