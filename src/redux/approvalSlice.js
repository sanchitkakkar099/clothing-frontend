import { createSlice } from "@reduxjs/toolkit";

const initState = {
  appApproval: [],
};

export const approvalSlice = createSlice({
  name: "staff",
  initialState: initState,
  reducers: {
    getapproval: (state, { payload }) => {
      state.appApproval = payload;
    },
    setShopifyAppUser: (state, { payload }) => {    
      console.log("payload from login page",payload);
      state.shopifyappUser = payload;
  }
  },
});

export const {
  getapproval,
  setShopifyAppUser
} = approvalSlice.actions;
export default approvalSlice.reducer;