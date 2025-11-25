import { Outlet } from "react-router-dom";
import Header from "../components/Partials/Header";
import Footer from "../components/Partials/Footer";

const RootLayout = () => {
  return (
    <div className="root-main">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
