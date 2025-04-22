import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie";
import RootLayout from "./layout/RootLayout";
import Body from "./component/Body";
import ErrorB from "./component/ErrorB";
import earthData from "../public/earth-animation.json";
import About from "./pages/About";
import Solution from "./pages/Solution";
import Contact from "./component/Contact";
import Project from "./pages/Project";
import Career from "./pages/Career";
import Resources from "./pages/Resources";
import Community from "./pages/Community";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 18); // ~1.8s to reach 100
      return () => clearInterval(interval);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
      >
        {/* Logo */}
        <img src="/Logo.png" alt="" width={200} height={200} />
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl font-bold bg-gradient-to-r from-[#01DC98] to-[#021358] bg-clip-text text-transparent mb-4"
        >
          EarthSaathi
        </motion.h1>

        {/* Image */}
        {/* <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 12 }}
          className="mb-6"
        >
          <img
            src="/earthSaathiFavicon.jpg"
            alt="EarthSaathi Logo"
            className="w-24 h-24 rounded-full shadow-lg"
          />
        </motion.div> */}

        {/* Progress Bar with Percentage */}
        <div className="w-64 max-w-xs flex flex-col items-center">
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.2 }}
              className="h-full bg-gradient-to-r from-[#01DC98] to-[#021358] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-600 font-medium">{progress}%</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorB />,
    children: [
      {
        path: "",
        element: <Body />,
      },
      {
        path:'/about',
        element: <About />
      },
      {
        path:'/solutions',
        element:<Solution />
      },
      {
        path:'/contact',
        element:<Contact />
      },
      {
        path:'/project',
        element:<Project />
      },
      {
        path:'/resources',
        element:<Resources />
      },
      {
        path:'/career',
        element:<Career />
      },
      {
        path:'/community',
        element:<Community />
      }
    ],
  },
]);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>{isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}</>
  );
};

export default App;
