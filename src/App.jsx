import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layout/RootLayout'
import Body from './component/Body'
import ErrorB from './component/ErrorB'


const route=createBrowserRouter([
  {
    path:'/',
    element:<RootLayout />,
    errorElement: <ErrorB />,
    
    children:[
      {
        path:'',
        element:<Body />
      }

    ]
  },
  {},
  {}
])
const App = () => {
  return (
    <RouterProvider router={route} />
  )
}

export default App
