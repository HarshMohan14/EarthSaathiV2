import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";

const Header = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [activeTab, setActiveTab] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [resourcesDrawerOpen, setResourcesDrawerOpen] = useState(false);

  console.log("Drawer open", drawerOpen);

  const tabs = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Solutions", path: "/solutions" },
    // {
    //   text: "Resources",
    //   path: "/resources",
    //   dropdown: [
    //     { text: "Career", path: "/career" },
    //     { text: "Community", path: "/community" },
    //     { text: "Published paper", path: "/published-paper" },
    //   ],
    // },
    { text: "Project", path: "/project" },
    // Remove Career and Community from top level
    // { text: "Career", path: "/career" },
    // { text: "Community", path: "/community" },
    { text: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const currentTab = tabs.find((tab) => location.pathname === tab.path);
    if (currentTab) {
      setActiveTab(currentTab.text);
    }
  }, [location.pathname]);
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "abyss" : "light");
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
              <img
                src="/earthSaathiFavicon.jpg"
                alt="EarthSaathi"
                className="w-36"
              />
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <label className="swap swap-rotate ml-2">
                {/* <input
                  type="checkbox"
                  onChange={toggleTheme}
                  className="toggle"
                  checked={theme === "abyss"}
                /> */}
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
              <img
                src="/earthSaathiFavicon.jpg"
                alt="EarthSaathi"
                className="w-32 mx-auto"
              />
            </li>
            {tabs.map((tab) =>
              !tab.dropdown ? (
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
              ) : (
                <li key={tab.text}>
                  {/* Dropdown toggle */}
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setResourcesDrawerOpen((open) => !open)}
                  >
                    <span>{tab.text}</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={
                          resourcesDrawerOpen
                            ? "M19 15l-7-7-7 7"
                            : "M19 9l-7 7-7-7"
                        }
                      />
                    </svg>
                  </div>
                  {resourcesDrawerOpen && (
                    <ul className="pl-4">
                      {tab.dropdown.map((item) => (
                        <li key={item.text}>
                          <Link
                            to={item.path}
                            onClick={() => {
                              setActiveTab(tab.text);
                              setDrawerOpen(false);
                              setResourcesDrawerOpen(false);
                            }}
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
             <div className="p-4">
      <Link to="/get-quote">
        <button className="w-full btn btn-primary rounded-lg text-white font-semibold">
          Get a Quote
        </button>
      </Link>
    </div>
          </ul>
          
        </div>
        
      </div>

      {/* Desktop Navbar */}
      <div className="navbar fixed z-50 bg-base-100 shadow-sm w-full hidden lg:flex">
        <motion.div
          whileTap={{ scale: 1.1 }}
          className="navbar-start cursor-pointer"
        >
          <img
            src="/earthSaathiFavicon.jpg"
            alt="EarthSaathi"
            className="w-32"
          />
        </motion.div>

        {/* Center Tabs with Cool Animation */}
        <div className="navbar-center flex">
          <div className="flex space-x-4 relative">
            {tabs.map((tab) =>
              !tab.dropdown ? (
                <Link to={tab.path} key={tab.text}>
                  <button
                    onClick={() => setActiveTab(tab.text)}
                    className={`relative text-sm font-semibold px-4 py-2 rounded-lg openSans cursor-pointer transition ${
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
              ) : (
                // Dropdown for Resources
                <div
                  key={tab.text}
                  className="relative"
                  onMouseEnter={() => setResourcesOpen(true)}
                  onMouseLeave={() => setResourcesOpen(false)}
                >
                  <button
                    className={`relative text-sm font-semibold px-4 py-2 rounded-lg openSans cursor-pointer transition ${
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
                    <span className="relative z-10 flex items-center">
                      {tab.text}
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                  {resourcesOpen && (
                    <div className="absolute bg-white left-0  w-60  shadow-lg rounded-lg z-50">
                      {tab.dropdown.map((item) => (
                        <Link to={item.path} key={item.text}>
                          <div
                            className="px-4 py-2 hover:bg-[#01DC98] rounded-lg text-sm openSans hover:text-white cursor-pointer"
                            onClick={() => {
                              setActiveTab(tab.text);
                              setResourcesOpen(false);
                            }}
                          >
                            {item.text}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Theme Toggle and Contact Button */}
        <div className="navbar-end">
          <Link to="/solutions">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-md bg-[#01DC98] text-[#0C1F5E] rounded-xl border-none shadow-lg hover:bg-[#0C1F5E] hover:text-white transition"
            >
              Get a Quote
            </motion.a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
