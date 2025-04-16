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

const LoadingScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: earthData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-gradient-to-br from-base-100 to-base-300 flex flex-col items-center justify-center z-50 gap-8"
      >
        {/* Floating Earth Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            rotate: 360,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            repeat: Infinity,
            duration: 10,
          }}
        >
          <Lottie options={defaultOptions} height={200} width={200} />
        </motion.div>

        {/* Animated Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#01DC98] to-[#021358] bg-clip-text text-transparent">
            EarthSaathi
          </h1>

          <motion.p
            className="text-lg text-neutral-content"
            animate={{ y: [-5, 5, -5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🌱 Transforming Challenges into Sustainable Solutions 🌱
          </motion.p>
        </motion.div>

        {/* Animated Progress Bar */}
        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 2 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
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
