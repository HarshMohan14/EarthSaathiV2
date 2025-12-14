import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Outlet } from "react-router";
import Chatbox from '../component/Chatbox';
import { trackPageView } from '../utils/visitorTracking';

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname);
  }, [location.pathname]);

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
