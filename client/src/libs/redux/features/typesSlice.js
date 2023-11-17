import {createSlice} from "@reduxjs/toolkit"

const initialState={
    allTypes:[]
}

export const TypeSlice=createSlice({
    name:"Types",
    initialState,
    reducers:{
        addTypes (state, {payload}){
            state.allTypes=[
                ...payload
            ]
        }
    }
})

export const {addTypes}=TypeSlice.actions

export default TypeSlice.reducer