import React from 'react'
import { Navbar, Sidebar } from '../components'
import { Route, Routes, useLocation, Outlet } from 'react-router-dom'
import { AboutUs, ContactUs, Login, Products, Register, User, Profile, Orders, Stock } from '../containers'
import HomePage from './HomePage'
import Cookies from 'universal-cookie'

import Cart from '../containers/cart/Cart'
import PrivetRoute from './PrivetRoute';

const Mainroute = () => {
  const location = useLocation();
  const cookies = new Cookies();
  let user = cookies.get("user");
  return (
    <div className=' h-screen flex flex-row' style={{ widt: "98vw"}}>
      {!user || user.role === 'user' || ["/register", "/login"].includes(location.pathname) ? null : 
      <>
      {user?.role !== 'admin' ? null :
      <Sidebar />
      }
      </>
      }
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
          <Route path='orders' element={
          <PrivetRoute permissions={['admin' ]} >
          <Orders />
          </PrivetRoute>
          } />
          <Route path='products' element={
          <PrivetRoute permissions={['admin' ]} >
          <Products />
          </PrivetRoute>
          } />
          <Route path='users' element={
          <PrivetRoute permissions={['admin' ]} >
          <User />
          </PrivetRoute>
          } />
          <Route path='user/:id' element={
          <PrivetRoute permissions={['admin', 'client' ]} >
          <Profile />
          </PrivetRoute>
          } />
          <Route path='stock' element={
          <PrivetRoute permissions={['admin' ]} >
          <Stock />
          </PrivetRoute>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default Mainroute