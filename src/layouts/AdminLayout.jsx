import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Partials/Navbar";
import Sidebar from "../components/Partials/Sidebar";
import Footer from "../components/Partials/Footer";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      const small = window.innerWidth < 768;
      setIsSmallScreen(small);

      if (small) setSidebarOpen(false); // mobile: closed
      else setSidebarOpen(true); // desktop: open
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Toggle sidebar for both small and large screens
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="root-main">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`
    flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300
    ${!isSmallScreen ? (isSidebarOpen ? "ml-64" : "ml-0") : "ml-0"}
  `}
      >
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
