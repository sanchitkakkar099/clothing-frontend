import {createSlice} from "@reduxjs/toolkit";

const initState = {
    bloodTestList:[],
    bloodTestView: null,
    bloodTestEdit:null,
    bloodTestAll:[],
    bloodTestDropdown:[],
};


export const bloodTestSlice = createSlice({
    name: "bloodTest",
    initialState:initState,
    reducers:{
        getBloodTest: (state,{payload}) => {
            state.bloodTestList = payload;
        },
        setBloodTestView: (state,{payload}) => {
            state.bloodTestView = payload;
        },
        setBloodTestEdit: (state,{payload}) => {
            state.bloodTestEdit = payload;
        },
        setBloodTestAll: (state,{payload}) => {
            state.bloodTestAll = payload;
        },
        setBloodTestDropdown:(state,{payload}) => {
            state.bloodTestDropdown = payload;
        },
    },
});

export const {
    getBloodTest,
    setBloodTestView,
    setBloodTestEdit,
    setBloodTestAll,
    setBloodTestDropdown
} = bloodTestSlice.actions;

export default bloodTestSlice.reducer;