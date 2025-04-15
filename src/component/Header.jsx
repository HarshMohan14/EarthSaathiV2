import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link,useLocation  } from "react-router";

const Header = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "lemonade");
  const [activeTab, setActiveTab] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  console.log("Drawer open",drawerOpen)
  

  const tabs = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Solutions", path: "/solutions" },
    { text: "Research&Insights", path: "/research-and-insights" },
    { text: "Project", path: "/project" },
    { text: "Career ", path: "/career " },
  ];
  useEffect(() => {
    const currentTab = tabs.find(tab => location.pathname === tab.path);
    if (currentTab) {
      setActiveTab(currentTab.text);
    }
  }, [location.pathname]);
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "lemonade" ? "abyss" : "lemonade");
  };

  return (
    <div>
      {/* Drawer for mobile */}
      <div className="drawer drawer-end lg:hidden z-50">
        <input
          id="mobile-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
      
        />
        <div className="drawer-content">
          {/* Navbar */}
          <div className="navbar fixed z-20 bg-base-100 shadow-sm w-full">
            <motion.div
              whileTap={{ scale: 1.1 }}
              className="navbar-start cursor-pointer"
            >
              <img src="/earthSaathiFavicon.jpg" alt="EarthSaathi" className="w-36" />
            </motion.div>

            {/* Hamburger button for mobile */}
            <div className="navbar-end flex items-center">
              <label
                htmlFor="mobile-drawer"
                className="btn btn-square btn-ghost lg:hidden"
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <label className="swap swap-rotate ml-2">
                <input
                  type="checkbox"
                  onChange={toggleTheme}
                  className="toggle"
                  checked={theme === "abyss"}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="mobile-drawer"
            className="drawer-overlay"
            onClick={() => setDrawerOpen(false)}
          ></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
            <li className="mb-4">
              <img src="/earthSaathiFavicon.jpg" alt="EarthSaathi" className="w-32 mx-auto" />
            </li>
            {tabs.map((tab) => (
              <li key={tab.text}>
                <Link
                  to={tab.path}
                  onClick={() => {
                    setActiveTab(tab.text);
                    setDrawerOpen(false);
                  }}
                >
                  {tab.text}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <a className="btn w-full" onClick={() => setDrawerOpen(false)}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="navbar fixed z-50 bg-base-100 shadow-sm w-full hidden lg:flex">
        <motion.div
          whileTap={{ scale: 1.1 }}
          className="navbar-start cursor-pointer"
        >
          <img src="/earthSaathiFavicon.jpg" alt="EarthSaathi" className="w-32" />
        </motion.div>

        {/* Center Tabs with Cool Animation */}
        <div className="navbar-center flex">
          <div className="flex space-x-4 relative">
            {tabs.map((tab) => (
              <Link to={tab.path} key={tab.text}>
                <button
                  onClick={() => setActiveTab(tab.text)}
                  className={`relative px-4 py-2 rounded-lg font-medium cursor-pointer transition ${
                    activeTab === tab.text
                      ? "text-white"
                      : "text-[#0C1F5E] hover:text-[#01DC98]"
                  }`}
                >
                  {activeTab === tab.text && (
                    <motion.div
                      layoutId="underline"
                      className="absolute inset-0 bg-[#01DC98] rounded-lg z-0"
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab.text}</span>
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Theme Toggle and Contact Button */}
        <div className="navbar-end">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={toggleTheme}
              className="toggle"
              checked={theme === "abyss"}
            />
          </label>
          <a className="btn ml-4">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
