import {createSlice} from "@reduxjs/toolkit"

const initialState={
    allCategories:[]
}

export const categoriesSlice=createSlice({
    name:"categories",
    initialState,
    reducers:{
        addCategories (state, {payload}){
            state.allCategories=[
                ...payload
            ]
        }
    }
})

export const {addCategories}=categoriesSlice.actions

export default categoriesSlice.reducer