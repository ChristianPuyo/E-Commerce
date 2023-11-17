import { createSlice } from "@reduxjs/toolkit";

const initialState={
    id_Cart:"",
    products:[],
    product_quantity:0,
    total_price:0
}

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addCart (state, {payload}){
            state.id_Cart=payload.id_Cart
            state.products=payload.products
            state.product_quantity=Number(payload.product_quantity)
            state.total_price=Number(payload.total_price)
        },
        addProductCart (state, {payload}){
            const { name, price } = payload;
            const existingProductIndex = state.products.findIndex(product => product.name === name);
            if (existingProductIndex !== -1) {
                const productIndex=state.products[existingProductIndex]
                if(productIndex.quantity<10){
                    state.products[existingProductIndex].quantity =Number(state.products[existingProductIndex].quantity + 1)
                    state.products[existingProductIndex].total_price =Number(state.products[existingProductIndex].quantity) * Number(price);
                }
            } else {
                state.products.push({ name:payload.name, price:Number(payload.price), quantity:1, total_price:Number(payload.price), image:payload.image, id:payload.id});
                state.product_quantity=Number(state.products.length)
            }
            state.total_price = state.products.reduce((total, product) => Number(total) + Number(product.total_price), 0);
        },
        deleteProductCart (state, {payload}){
            const filterProduct=state.products.filter((product)=>{
                return product.name !== payload.name
            })
            state.products=[...filterProduct]
            state.product_quantity=Number(state.products.length)
            state.total_price=Number(state.total_price) - Number(payload.price*payload.quantity)
        },
        decrementQuantity (state, {payload}){
            const {name}=payload
            const indexProduct=state.products.findIndex(product=>product.name===name)
            if(indexProduct!==-1){
                const productIndex=state.products[indexProduct]
                if(productIndex.quantity>0){
                    productIndex.quantity-=1
                    productIndex.total_price=productIndex.quantity * productIndex.price
                    state.total_price=state.products.reduce((total, product)=>total + product.total_price, 0)
                }
                state.products=state.products.map((product, index)=>
                index===indexProduct?productIndex:product
                )
            }
        },
        incrementQuantity (state, {payload}){
            const {name}=payload
            const indexProduct=state.products.findIndex((product)=>product.name===name)
            if(indexProduct!==-1){
                const productIndex=state.products[indexProduct]
                if(productIndex.quantity<10){
                    productIndex.quantity+=1
                    productIndex.total_price=productIndex.quantity * productIndex.price
                    state.total_price=state.products.reduce((total, product)=>total + product.total_price, 0)
                }
                state.products=state.products.map((product, index)=>
                index===indexProduct?productIndex:product
                )
            }
        },
        cleanCart (state){
            state.products=[]
            state.total_price=0
            state.product_quantity=0
        }
    }
})

export const {addCart, addProductCart, deleteProductCart, decrementQuantity, incrementQuantity, cleanCart}=cartSlice.actions
export default cartSlice.reducer