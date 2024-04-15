import { createSlice } from "@reduxjs/toolkit";

const initState = {
  staffList: [],
  staffView: null,
  staffEdit: null,
};

export const staffSlice = createSlice({
  name: "staff",
  initialState: initState,
  reducers: {
    getstaff: (state, { payload }) => {
      state.staffList = payload;
    },
    setstaffView: (state, { payload }) => {
      state.staffView = payload;
    },
    setstaffEdit: (state, { payload }) => {
      state.staffEdit = payload;
    },
  },
});

export const {
  getstaff,
  setstaffView,
  setstaffEdit,
  setstaffDropDown,
} = staffSlice.actions;
export default staffSlice.reducer;
