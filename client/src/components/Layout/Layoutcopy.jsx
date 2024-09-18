import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomizerContext from "../Context/Customizer";
import Footer from "./Footer/Footer";
import Header from "./Header";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import TapTop from "./TapTop";
import Themecustomizer from "./ThemeCustomizer";

const Layout = () => {
  const {sidebar_types,setTogglSidebar,setSidebarTypes,defaultClass,setDefaultClass} = useContext(CustomizerContext);
  const windowWidth = useRef(window.innerWidth);

  const compactSidebar = () => {
    let sidebar_types1 =localStorage.getItem("sidebar_types")

    if ( windowWidth.current <= 1200 || sidebar_types1 === "compact-wrapper") {
      setDefaultClass(true)
            setTogglSidebar(true);
            setSidebarTypes("compact-wrapper");
    }
      else{
        setDefaultClass(false)
            setTogglSidebar(false);
            setSidebarTypes("horizontal-wrapper");
    }
  };


  useEffect(() => {
    compactSidebar();
    window.addEventListener("resize", () => {
      compactSidebar();
       if (window.innerWidth  <= 1200) {
         setDefaultClass(true);
         setTogglSidebar(true);
       } else {
         setTogglSidebar(false);
         setDefaultClass(false);
       } 
    });
  }, [windowWidth.current, sidebar_types]);
  return (
    <>
      <Loader />
      <TapTop />
      <div
        className={`page-wrapper ${ defaultClass ? "compact-wrapper" : sidebar_types}`} id="pageWrapper"
      >
        <Header />
        <div className={`page-body-wrapper `}>
          <Sidebar />
          <Outlet />
          <Footer />
          <Themecustomizer />
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Layout;
