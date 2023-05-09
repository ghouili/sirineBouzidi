import React from 'react'
import { Navbar, Sidebar } from '../components'
import { Route, Routes, useLocation, Outlet } from 'react-router-dom'
import { AboutUs, ContactUs, Login, Products, Register, User, Profile } from '../containers'
import HomePage from './HomePage'
import Cookies from 'universal-cookie'
import Cart from '../containers/cart/Cart'

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
        <Outlet />
        <Routes>
          <Route index element={<HomePage />} />
          {/* <Route path='/' element={<HomePage/>} /> */}
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='about' element={<AboutUs />} />
          <Route path='contact' element={<ContactUs />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />} />
          <Route path='users' element={<User />} />
          <Route path='user/:id' element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default Mainroute