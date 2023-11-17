import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allPayments:[],
    paymentById:null
}

export const paymentsSlice=createSlice({
    name:"payments",
    initialState,
    reducers:{
        addAllPayments (state, {payload}) {
            state.allPayments=payload
        },
        addPaymentById (state, {payload}) {
            state.paymentById=payload
        }
    }
})

export const {addAllPayments, addPaymentById}=paymentsSlice.actions

export default paymentsSlice.reducer