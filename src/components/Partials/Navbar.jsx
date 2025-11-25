import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../UI/AppButton";
import Breadcrumbs from "../UI/Breadcrumbs"; // ⬅️ USE YOUR COMPONENT
import axiosInstance from "../../api/axiosInstance";

const Navbar = ({ toggleSidebar }) => {
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigateTo = useNavigate();

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleNotif = () => setNotifOpen(!notifOpen);

  // Example notifications data
  const notifications = [
    { id: 1, title: "New message received", time: "2m ago" },
    { id: 2, title: "Server backup completed", time: "1h ago" },
    { id: 3, title: "New user registered", time: "3h ago" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ Directly fetch user with token
        const res = await axiosInstance.get("/user");
        setUserName(res.data.email); // or res.data.name if available
      } catch (err) {
        console.log("No authenticated user", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      // ✅ Logout using token
      await axiosInstance.post("/logout");

      // Clear frontend state
      localStorage.removeItem("token");
      setUserName("");

      // Redirect to login page
      navigateTo("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 dark:text-gray-100 text-gray-800 shadow-sm sticky top-0 z-40">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* LEFT SIDE: Sidebar Button + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <AppButton
            onClick={toggleSidebar}
            variant="text"
            className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </AppButton>

          {/* 🔹 Use your reusable breadcrumbs here */}
          {/* 🔹 Use breadcrumbs in text-only mode for navbar */}
          <div className="hidden md:block">
            <Breadcrumbs textOnly />
          </div>
        </div>

        {/* RIGHT SIDE: Icons + User */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotif}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.743A2 2 0 0113 19H11a2 2 0 01-1.857-1.257m5.714 0A8.967 8.967 0 0112 18c-1.657 0-3.21-.45-4.543-1.243M14.857 17.743L16.5 21M7.457 17.743L5.5 21M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9z"
                />
              </svg>
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                <div className="p-2 font-semibold border-b border-gray-200 dark:border-gray-700">
                  Notifications
                </div>
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <div className="text-sm">{notif.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {notif.time}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-center py-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-blue-500 hover:underline">
                    View All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Light/Dark Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          >
            {darkMode ? (
              // Sun icon for light mode (when darkMode is active)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M18.364 18.364l-1.414-1.414M6.05 6.05L4.636 4.636M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
            ) : (
              // Moon icon for dark mode (when darkMode is inactive)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                />
              </svg>
            )}
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <AppButton
              onClick={toggleAdminDropdown}
              variant="text"
              className="flex items-center gap-2 px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              <span className="font-medium"> Welcome {userName}!</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  adminDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </AppButton>

            {adminDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                <a className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Profile
                </a>
                <a className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumbs for mobile (full width) */}
      <div className="block md:hidden px-4 pb-2">
        <Breadcrumbs />
      </div>
    </header>
  );
};

export default Navbar;
