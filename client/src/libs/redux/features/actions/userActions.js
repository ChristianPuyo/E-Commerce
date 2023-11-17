import axios from 'axios';
const URL_SERVER = import.meta.env.VITE_URL_SERVER; 

import { userByUid, updateUser, getAllUsers, getUsersByName, userLog } from '../userSlice';

export const getUserByUid = (id)=>{
    
    return async function(dispatch){
            try {
                const response = await axios.get(`${URL_SERVER}/users/${id}`);
                return(dispatch(userByUid(response.data))) ; 
            } catch (error) {
                console.log(error)
            }
    }
}

export const getUserLog= (id)=>{
    
    return async function(dispatch){
            try {
                const response = await axios.get(`${URL_SERVER}/users/${id}`);
                return(dispatch(userLog(response.data))) ; 
            } catch (error) {
                console.log(error)
            }
    }
}

export const usersByName = (name)=>{
    
    return async function(dispatch){
            try {
                const response = await axios.get(`${URL_SERVER}/users?name=${name}`);
                return(dispatch(getUsersByName(response.data))) ; 
            } catch (error) {
                console.log(error)
            }
    }
}

export const getUsers = ()=>{
    return async function(dispatch){
        try {
            const response = await axios.get(`${URL_SERVER}/users`)
            return(dispatch(getAllUsers(response.data)))
        }catch(error){
            console.log(error.message)
        }
    }
}

export const updateUserFromDB = (id, updateData)=>{
    
    return async function(dispatch){
            try {
                await axios.put(`${URL_SERVER}/users/${id}`, updateData);
                return(dispatch(updateUser())) ; 
            } catch (error) {
                console.log(error)
            }
    }
}