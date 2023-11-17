import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

export const favoritesApi=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:URL_SERVER
    }),
    reducerPath:"favoritesApi",
    endpoints:(builder)=>({
        getAllFavProducts:builder.query({
            query:(userId) => ({
                url: `/favorites/${userId}`,
                providesTags:["favs"]
            })
        }),
        getFavProduct:builder.query({
            query:({userId, productId}) => ({
                url: `/favorites/${userId}?productId=${productId}`,
            })
        }),
        addFavProduct:builder.mutation({
            query:({userId, productId}) =>({
                url: `/favorites/${userId}?productId=${productId}`,
                method:"POST",
            }),
            invalidatesTags:["favs"]
        }),
        removeFavProduct:builder.mutation({
            query:({userId, productId}) =>({
                url: `/favorites/${userId}?productId=${productId}`,
                method:"DELETE",
            }),
            invalidatesTags:["favs"]
        }),
    })
})

export const {useGetAllFavProductsQuery, useGetFavProductQuery, useAddFavProductMutation, useRemoveFavProductMutation}=favoritesApi