import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MasterLayout = () => {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <main>
                <Outlet />
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
