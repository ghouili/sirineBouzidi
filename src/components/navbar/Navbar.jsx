import './navbar.css';
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({ data }) => {
  return (
    <div className='h-14  flex flex-row items-center shadow-lg'>
        <div className="n-logo w-1/5 flex justify-center text-2xl font-bold">
            <h1>{data}</h1>
        </div>
        <div className="n-links flex gap-6 text-xl font-semibold w-3/5 ">
            <Link to='/' className='hover:text-blue-700 transition-all duration-300 ease-in-out' >Home</Link>
            <Link to='/about' className='hover:text-blue-700 transition-all duration-300 ease-in-out' >About us</Link>
            <Link to='/contact' className='hover:text-blue-700 transition-all duration-300 ease-in-out' >Contact us</Link>
        </div>
        <div className="n-auth flex justify-center items-center  w-1/5">
            <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                Auth
            </span>
          </button>
        </div>
    </div>
  )
}

export default Navbar