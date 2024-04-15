import {createSlice} from "@reduxjs/toolkit";

const initState = {
    customBloodTestList:[],
    customBloodTestView: null,
    customBloodTestEdit:null,
    customBloodTestAll:[],
    customBloodTestDropdown:[],
};


export const customBloodTestSlice = createSlice({
    name: "customBloodTest",
    initialState:initState,
    reducers:{
        getCustomBloodTest: (state,{payload}) => {
            state.customBloodTestList = payload;
        },
        setCustomBloodTestView: (state,{payload}) => {
            state.customBloodTestView = payload;
        },
        setCustomBloodTestEdit: (state,{payload}) => {
            state.customBloodTestEdit = payload;
        },
        setCustomBloodTestAll: (state,{payload}) => {
            state.customBloodTestAll = payload;
        },
        setCustomBloodTestDropdown:(state,{payload}) => {
            state.customBloodTestDropdown = payload;
        },
    },
});

export const {
    getCustomBloodTest,
    setCustomBloodTestView,
    setCustomBloodTestEdit,
    setCustomBloodTestAll,
    setCustomBloodTestDropdown
} = customBloodTestSlice.actions;

export default customBloodTestSlice.reducer;