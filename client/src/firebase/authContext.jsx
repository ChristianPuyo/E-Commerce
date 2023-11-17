import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        GoogleAuthProvider,
        signInWithPopup,
        sendPasswordResetEmail
       } from "firebase/auth";
import { auth } from "./firebase";

import { useCreateUsersMutation } from "../libs/redux/services/usersApi";


export const authContext = createContext();

export const useAuth = ()=>{
    const context = useContext(authContext)
    return context
}

export function AuthProvider({children}){
    const [mutate] = useCreateUsersMutation();
    let [user, setUser] = useState(null)
    const signup = async(email, password, name, lastName, phone, address)=>{
        try {
            const userCreated = await createUserWithEmailAndPassword(auth, email, password)
            // console.log("User createdeeeeeeeeeeeeeeeeee:",userCreated)
            await mutate({
                uid: userCreated.user.uid, 
                email: userCreated.user.email,
                
                name: name,
                lastName: lastName,
                phone: phone,
                address: address 
            })
                // console.log(user);
                
            } catch (error) {
            throw error
        } 
    }

    const login = async(email, password)=>{
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            // console.log("User credentials:",userCredentials)
        } catch (error) {
             throw error
         }
    }

    const logout = async() => await signOut(auth)

    const loginWithGoogle = async() => {
        try {
            const googleProvider = new GoogleAuthProvider()
            // console.log("Este es el google provider:", googleProvider)
            const userCreated = await signInWithPopup(auth, googleProvider)
            // console.log("Este es el signInWithPopup:", userCreated )
            await mutate({uid: userCreated.user.uid, email: userCreated.user.email})
        } catch (error) {
            throw error
        }

    }

    const resetPassword = (email) =>{
        try {
            sendPasswordResetEmail(auth, email)
        } catch (error) {
            throw error
        }
        
    }

    useEffect(()=>{
        onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            // console.log("current user:",currentUser)
        })

    }, [])


   


    return(
        <authContext.Provider value={{signup, login, user, logout, loginWithGoogle, resetPassword }}>
            {children}
        </authContext.Provider>  
    )

} 

