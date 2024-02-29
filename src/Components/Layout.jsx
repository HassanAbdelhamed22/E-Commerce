import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

export default function Layout() {
  return (
    <>
      <div className="parent">
        <Navbar></Navbar>
        <div className="">
          <Outlet></Outlet>
        </div>
        <div className="spikes"></div>
        <Footer></Footer>
      </div>
    </>
  );
}
