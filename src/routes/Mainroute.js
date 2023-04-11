import React from 'react'
import {Navbar} from '../components'
import { Route, Routes } from 'react-router-dom'
import { AboutUs, ContactUs, Dashboard } from '../containers'

const Mainroute = () => {
  return (
    <div>
      <Navbar data={"LOGO"} />

      <Routes>
        <Route index element={<Dashboard /> } />
        <Route path='about' element={<AboutUs /> } />
        <Route path='contact' element={<ContactUs /> } />
      </Routes>
    </div>
  )
}

export default Mainroute