import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

export const requestApi=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:URL_SERVER
    }),
    reducerPath:"requestApi",
    endpoints:(builder)=>({
        getAllRequest:builder.query({
            query:()=>"/request",
            providesTags:["request"],
        }),
        createRequest:builder.mutation({
            query:(newRequest)=>({
                url:"/request",
                method:"POST",
                body:newRequest
            }),
            invalidatesTags:["request"]
        }),
        getRequestById:builder.query({
            query:(id_request)=>`request/${id_request}`,
        }),
        updateRequest:builder.mutation({
            query:({status, id_request})=>({
                url:`request/${id_request}`,
                method:"PUT",
                body:status
            }),
            invalidatesTags:["request"]
        }),
        deleteRequest:builder.mutation({
            query:(id_request)=>({
                url:`request/${id_request}`,
                method:"DELETE"
            }),
            invalidatesTags:["request"]
        })
    })
})

export const {
    useCreateRequestMutation, 
    useGetAllRequestQuery,
    useDeleteRequestMutation,
    useGetRequestByIdQuery,
    useUpdateRequestMutation
} = requestApi