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
  },
});

export const {
  getapproval,
} = approvalSlice.actions;
export default approvalSlice.reducer;