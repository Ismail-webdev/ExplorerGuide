import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const PageNotFound = () => {
    const {user} = UserAuth()
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'> 
    <h1 className='text-2xl font-bold mb-4'>Oops!</h1> 
    <p className='text-lg mb-6'>Sorry, an unexpected error has occurred.</p> 
    {user ? ( <p className='text-lg text-blue-500 underline'><Link to="/" className='ml-1'>Back to Homepage</Link> </p> ) : ( <p className='text-lg text-blue-500 underline'><Link to="/signin" className='ml-1'>Back to SignIn</Link> </p> )} </div>
  )
}

export default PageNotFound
