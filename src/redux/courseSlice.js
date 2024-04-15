import { createSlice } from "@reduxjs/toolkit";

const initState = {
  courselist: [],
  courseView: null,
  courseEdit: null,
  courseStep: {
    step1: null,
    step2: [],
    step3: [],
    cdlPrice:null,
    dynacarePrice:null,
    step4: null,
  },
  courseDropdown: [],
};

export const courseSlice = createSlice({
  name: "course",
  initialState: initState,
  reducers: {
    getCourse: (state, { payload }) => {
      state.courselist = payload;
    },
    setCourseView: (state, { payload }) => {
      state.courseView = payload;
    },
    setCourseEdit: (state, { payload }) => {
      state.courseEdit = payload;
    },
    addCourseStepData: (state, { payload }) => {
      state.courseStep = payload;
    },
    setCourseDropDown: (state, { payload }) => {
      state.courseDropdown = payload;
    },
  },
});

export const {
  getCourse,
  setCourseView,
  setCourseEdit,
  addCourseStepData,
  setCourseDropDown,
} = courseSlice.actions;
export default courseSlice.reducer;
