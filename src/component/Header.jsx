import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router"; // Corrected import

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Solutions", path: "/solutions" },
    { text: "News And Media", path: "/news-and-media" },
    { text: "Project", path: "/project" },
    { text: "Carrer", path: "/carrer" },
  ];

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "abyss" : "light");
  };

  return (
    <div className="navbar fixed z-20 bg-base-100 shadow-sm">
      <motion.div
        whileTap={{
          scale: 1.1,
        }}
        className="navbar-start cursor-pointer"
      >
        <img src="/earthSaathiFavicon.jpg" alt="EarthSaathi" className="w-36" />
      </motion.div>

      {/* Center Tabs with Cool Animation */}
      <div className="navbar-center hidden lg:flex">
        <div className="flex space-x-4 relative">
          {tabs.map((tab) => (
            <Link to={tab.path} key={tab.text}>
              <button
                onClick={() => setActiveTab(tab.text)}
                className={`relative px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.text
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {activeTab === tab.text && (
                  <motion.div
                    layoutId="underline"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg z-0"
                    transition={{
                      type: "spring",
                      bounce: 0.3,
                      duration: 0.6,
                    }}
                  />
                )}
                <span className="relative cursor-pointer z-10">{tab.text}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Add the Theme Toggle Button */}
      <div className="navbar-end">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={toggleTheme}
            className="toggle"
            checked={theme === "abyss"}
          />
        </label>
        <a className="btn ml-4">Contact Us</a>
      </div>
    </div>
  );
};

export default Header;
