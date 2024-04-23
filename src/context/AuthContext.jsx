import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signInWithPopup,signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [user,setUser] = useState({})
    const createUser = (email,password) => {
       return createUserWithEmailAndPassword(auth,email,password)
    };
    const signInGoogle = async() =>{
        return await signInWithPopup(auth,googleProvider)
    }
    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout = () =>{
        return(signOut(auth))
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        });
        return ()=>{
            unSubscribe();
        }
    },[])

    return(
        <UserContext.Provider value={{createUser,user,logout,signIn,signInGoogle}}>
           {children} 
        </UserContext.Provider>
    )
}

export const UserAuth =()=>{
    return useContext(UserContext)
}