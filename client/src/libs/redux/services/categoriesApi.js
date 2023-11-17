import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

export const categoriesApi=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:URL_SERVER
    }),
    reducerPath:"categoriesApi",
    endpoints:(builder)=>({
        getAllCategories:builder.query({
            query:()=>"/categories"
        })
    })
})

export const {useGetAllCategoriesQuery}=categoriesApi