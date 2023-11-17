import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

export const cartApi=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:URL_SERVER
    }),
    reducerPath:"cartApi",
    endpoints:(builder)=>({
        getCart:builder.query({
            query:(id)=>`/cart/${id}`,
            providesTags:["cart"]
        }),
        putCart:builder.mutation({
            query:({dataUpdate, id_cart})=>({
                url:`/cart/${id_cart}`,
                method:"PUT",
                body:dataUpdate
            }),
        })
    })
})

export const {useGetCartQuery, usePutCartMutation}=cartApi