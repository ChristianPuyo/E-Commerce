import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

export const typesApi=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:URL_SERVER
    }),
    reducerPath:"typesAPi",
    endpoints:(builder)=>({
        getAllTypes:builder.query({
            query:()=>"/types"
        })
    })
})

export const {useGetAllTypesQuery}=typesApi