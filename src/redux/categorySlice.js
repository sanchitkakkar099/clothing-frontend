import { createSlice } from "@reduxjs/toolkit";

const initState = {
  categoryList: [],
  categoryView: null,
  categoryEdit: null,
  categoryDropdown: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {
    getCategory: (state, { payload }) => {
      state.categoryList = payload;
    },
    setCategoryView: (state, { payload }) => {
      state.categoryView = payload;
    },
    setCategoryEdit: (state, { payload }) => {
      state.categoryEdit = payload;
    },
    setCategoryDropDown: (state, { payload }) => {
      state.categoryDropdown = payload;
    },
  },
});

export const {
  getCategory,
  setCategoryView,
  setCategoryEdit,
  setCategoryDropDown,
} = categorySlice.actions;
export default categorySlice.reducer;
