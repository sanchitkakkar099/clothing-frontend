import { createSlice } from "@reduxjs/toolkit";

const initState = {
  orderList: [],
};

export const vendorOrderSlice = createSlice({
  name: "vendorOrder",
  initialState: initState,
  reducers: {
    setorderList: (state, { payload }) => {
      state.orderList = payload;
    },
  },
});

export const {
  setorderList,
} = vendorOrderSlice.actions;
export default vendorOrderSlice.reducer;
