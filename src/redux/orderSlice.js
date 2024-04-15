import { createSlice } from "@reduxjs/toolkit";

const initState = { 
  orderList: [],
  orderView: null,
  orderEdit: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initState,
  reducers: {
    getOrder: (state, { payload }) => {
      state.orderList = payload;
    },
    setOrderView: (state, { payload }) => {
      state.orderView = payload;
    },
    setOrderEdit: (state, { payload }) => {
      state.orderEdit = payload;
    },
  },
});

export const { getOrder, setOrderView, setOrderEdit } =
orderSlice.actions;
export default orderSlice.reducer;