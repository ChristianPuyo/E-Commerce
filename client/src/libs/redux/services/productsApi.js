import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

export const productsApi=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:URL_SERVER
    }),
    tagTypes: ['products'],
    reducerPath:"productsApi",
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:({name, minPrice, maxPrice, category, order, type, is_Delete}) => `/products?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&type=${type}&order=${order}&is_Delete=${is_Delete}`,
            providesTags:["products"]
        }),
        createProduct:builder.mutation({
            query:(newProduct)=>({
                url:"/products",
                method:"POST",
                body:newProduct
            }),
            invalidatesTags:["products"]
        }),
        getProductById:builder.query({
            query:(id) => `/products/${id}`
        }),
        softDelete: builder.mutation({
            query: ({id_product, is_Delete}) => {
                console.log('MUTATION ID', id_product)
                return {
                    url: `/products/${id_product}`,
                    body: {is_Delete},
                    method: 'PATCH'
                }
            },
            invalidatesTags:["products"]
        }),
        updateProduct: builder.mutation({
            query: ({ id, updatedProduct }) => ({
              url: `/products/${id}`,
              method: "PUT",
              body: updatedProduct,
            }),
            invalidatesTags: ["products"],
          }),
    })
})

export const {useCreateProductMutation, useGetAllProductsQuery, useGetProductByIdQuery, useSoftDeleteMutation, useUpdateProductMutation }=productsApi
