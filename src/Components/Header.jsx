import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import logo from '../assets/logo.ico'
const Header = () => {
  const [mobile,setMobile] = useState(false);
  const {user, logout} = UserAuth();
  const navigate = useNavigate();
  function toggle(){
    setMobile(!mobile);
  }
 async function handleLogOut() {
  try {
    await logout();
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
}
  const username = user?.email?.split('@')[0];

  const displayNameOrUsername = user?.displayName ? user?.displayName : username;
  return (
    <>
    <nav className='w-full h-12 font-poppins font-medium bg-white flex flex-col md:flex-row md:justify-between px-4 items-center fixed z-50'>
      <div className="flex items-center justify-between w-full md:w-auto md:flex md:items-center">
        <div className='flex items-center space-x-2'>
          <img src={logo} alt="Explorer-Guide" className='w-8 h-8'/>
          <h4 className=' text-xl hover:cursor-pointer'>Explorer Guide</h4>
        </div>
        <button className='md:hidden focus:outline-none' onClick={toggle}>
          <Menu />
        </button>
      </div>
      <div className="hidden md:block">
        <ul className="flex flex-col hover:cursor-pointer md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <li><NavLink key='/' to='/' className="text-black no-underline hover:underline">Home</NavLink></li>
          <li><NavLink key='/destinations' to='/destinations' className=" text-black no-underline hover:underline">Destinations</NavLink></li>
          <li><NavLink  key='/unesco-site' to='/unesco-site' className="text-black no-underline hover:underline">UNESCO Sites</NavLink></li>
          <li><NavLink key='/news' to='/news' className="text-black no-underline hover:underline">News</NavLink></li>
        </ul>
      </div>
      <div className='hidden md:block'>
       <ul className='flex'>
         <li>Username: {displayNameOrUsername}</li>
          <li><button onClick={handleLogOut} className='border px-2 rounded-md mx-2 text-white bg-indigo-700 hover:bg-indigo-600 outline-none'>Logout</button></li>
       </ul>
      </div>
      <div className='md:hidden w-full'>
        {mobile && (
          <>
          <ul className='flex flex-col items-center py-2 bg-slate-200 text-black rounded-lg'>
            <li className='hover:underline'><NavLink key='/' to='/'>Home</NavLink></li>
            <li className='hover:underline'><NavLink key='/destinations' to='/destinations'>Destination</NavLink></li>
            <li className='hover:underline'><NavLink key='/unesco-site' to='/unesco-site'>UNESCO Sites</NavLink></li> 
            <li className='hover:underline'><NavLink key='/news' to='/news'>News</NavLink></li>
            <li>Username: {displayNameOrUsername}</li>
            <li><button onClick={handleLogOut} className='border px-2 rounded-md mx-2 text-white bg-indigo-700 hover:bg-indigo-600'>Logout</button></li>
          </ul>
          </>
        )}
      </div>
    </nav>
  </>
  )
}

export default Header
