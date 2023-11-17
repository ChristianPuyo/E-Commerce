import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allRequest:[],
    requestById:null
}

export const requestSlice=createSlice({
    name:"request",
    initialState,
    reducers:{
        addAllRequest (state, {payload}) {
            state.allRequest=payload
        },
        addRequestById (state, {payload}) {
            state.requestById=payload
        }
    }
})

export const {addAllRequest, addRequestById}=requestSlice.actions

export default requestSlice.reducer