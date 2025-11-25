import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { List, Typography } from "@material-tailwind/react";
import AppButton from "../UI/AppButton";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [openUI, setOpenUI] = useState(false);
  const location = useLocation();

  const uiLinks = [
    "/buttons",
    "/cards",
    "/table",
    "/text-inputs",
    "/texts",
    "/modals",
    "/tabs",
  ];

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamically open UI Elements if a child route is active
  useEffect(() => {
    if (uiLinks.some((link) => link === location.pathname)) {
      setOpenUI(true);
    }
  }, [location.pathname]);

  const navItemClass = ({ isActive }) =>
    `rounded-md px-4 py-2 flex items-center gap-3 transition-colors ${
      isActive
        ? "bg-gray-800 text-white font-semibold"
        : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[60] p-2 bg-gray-900 text-white rounded-md shadow-md md:hidden"
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
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-300 shadow-xl z-[70] transition-transform duration-300 overflow-y-auto ${
          isSmallScreen
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : isOpen
            ? "translate-x-0"
            : "-translate-x-64"
        }`}
      >
        {isSmallScreen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600"
          >
            ✕
          </button>
        )}

        <div className="flex items-center gap-5 my-7 ml-4">
          <img
            className="h-20 w-20 object-cover object-center rounded-full"
            src="https://picsum.photos/100"
            alt="Sample"
          />
          <div>
            <Typography variant="h7" color="white">
              Student Service
            </Typography>
            <Typography variant="small" color="white">
              Management Module
            </Typography>
          </div>
        </div>

        <List>
          <NavLink to="/dashboard" className={navItemClass}>
            Dashboard
          </NavLink>
          <NavLink to="/students" className={navItemClass}>
            Students
          </NavLink>

          <NavLink to="/settings" className={navItemClass}>
            Settings
          </NavLink>
        </List>
      </div>

      {isSmallScreen && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[60]"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
