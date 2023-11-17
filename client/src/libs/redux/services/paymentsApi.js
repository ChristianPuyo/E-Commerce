import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

export const paymentsApi=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:URL_SERVER
    }),
    reducerPath:"paymentsApi",
    endpoints:(builder)=>({
        getAllPayments:builder.query({
            query:({param})=>`/payments?param=${param}`,
            providesTags:["payments"]
        }),
        //
        //
        getPaymentById:builder.query({
            query:(id_payment)=>`/payments/${id_payment}`,
        }),
        deletePayment:builder.mutation({
            query:(id_payment)=>({
                url:`/payments/${id_payment}`,
                method:"DELETE"
            }),
            invalidatesTags:["payments"]
        })
    })
})

export const {useDeletePaymentMutation, useGetPaymentByIdQuery, useGetAllPaymentsQuery}=paymentsApi