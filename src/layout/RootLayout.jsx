import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Outlet } from "react-router";
import Chatbox from '../component/Chatbox';
const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer/>
      <Chatbox /> 
    </div>
  )
}

export default RootLayout
