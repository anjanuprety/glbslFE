// import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import ScrollToTop from "../ScrollToTop";
import GoToTop from "../Shared/GoToTop";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HelmetChanger from "../Shared/Helmet/Helmet";

const Main: React.FC = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <HelmetChanger title="Hotel Booking" />
      <ScrollToTop />
      <GoToTop />
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Main;
