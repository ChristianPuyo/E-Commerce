import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLog:null,
    userCartId:"",
    userByUid:{},
    allUsers:[],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAllUsers:(state, action) =>{
            state.allUsers = action.payload
        },
        getUsersByName: (state, action) =>{
            state.allUsers = action.payload
        },
        addUser (state, {payload}){
            
            state.userLog=payload
            if(payload!==null){
                state.userCartId=payload.Cart.id_Cart
            }else{
                state.userCartId="" 
            }
        },

        userByUid: (state, action)=>{ 

            
            state.userByUid = action.payload 

        },
        
        userLog: (state, action)=>{ 
            localStorage.setItem('userLog', JSON.stringify(action.payload));
            state.userLog = action.payload 
            


        }, 
        
        updateUserState: (state, action) => {
        },
    },
})
export const {addUser, userByUid, updateUser, getAllUsers, getUsersByName, userLog}=userSlice.actions
export default userSlice.reducer