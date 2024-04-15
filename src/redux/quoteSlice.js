import {createSlice} from "@reduxjs/toolkit";

const initState = {
    quoteList:[],
    quoteView: null,
    quoteEdit:null,
    quoteAll:[],
    quoteDropdown:[],
};


export const quoteSlice = createSlice({
    name: "quote",
    initialState:initState,
    reducers:{
        getquote: (state,{payload}) => {
            state.quoteList = payload;
        },
        setquoteView: (state,{payload}) => {
            state.quoteView = payload;
        },
        setquoteEdit: (state,{payload}) => {
            state.quoteEdit = payload;
        },
        setquoteAll: (state,{payload}) => {
            state.quoteAll = payload;
        },
        setquoteDropdown:(state,{payload}) => {
            state.quoteDropdown = payload;
        },
    },
});

export const {
    getquote,
    setquoteView,
    setquoteEdit,
    setquoteAll,
    setquoteDropdown
} = quoteSlice.actions;

export default quoteSlice.reducer;