import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="py-4 border-t-2 bg-slate-300">
    <div className="container mx-auto flex justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">EXPLORER GUIDE</h1>
    </div>
  
    <nav className="mt-8 container mx-auto px-6">
      <ul className="flex space-x-4 justify-center font-semibold">
        <li><NavLink key='/' to='/' className="no-underline hover:underline">Home</NavLink></li>
          <li><NavLink key='/destinations' to='/destinations' className="no-underline hover:underline">Destinations</NavLink></li>
          <li><NavLink  key='/unesco-site' to='/unesco-site' className="no-underline hover:underline">UNESCO Sites</NavLink></li>
          <li><NavLink key='/news' to='/news' className="no-underline hover:underline">News</NavLink></li>
      </ul>
    </nav>
    <p className="mt-8 text-center">&copy; 2024 Explorer Guide. All rights reserved.</p>
  </footer>
  )
}

export default Footer
