import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const ProtectedRoute = () => {
    const {user} = UserAuth() 
    
    return(
        <>
        <Header />
             {user ? (
        <Outlet /> 
      ) : (
        <Navigate to="/signin" replace /> 
      )}
      {user ?(
         <Footer />
      ): null}
        </>
    )
}

export default ProtectedRoute
