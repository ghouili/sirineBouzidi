import React from 'react'
import { Navbar, Sidebar } from '../components'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AboutUs, ContactUs, Landpage, Login, Products, Register } from '../containers'
import HomePage from './HomePage'
import Cookies from 'universal-cookie'

const Mainroute = () => {
  const location = useLocation();
  const cookies = new Cookies();
  let user = cookies.get("user");
  return (
    <div className='w-screen h-screen flex flex-row'>
      {!user || user.role === 'user' || ["/register", "/login"].includes(location.pathname) ? null : <Sidebar />}
      <div className='w-full flex flex-col ' >
      {["/register", "/login"].includes(location.pathname) ? null : <Navbar data={"LOGO"} />}
        {/* <Navbar  /> */}

        <Routes>
          <Route index element={<HomePage/>} />
          {/* <Route path='/' element={<HomePage/>} /> */}
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='products' element={<Products />} />
          <Route path='contact' element={<ContactUs />} />
        </Routes>
      </div>
    </div>
  )
}

export default Mainroute