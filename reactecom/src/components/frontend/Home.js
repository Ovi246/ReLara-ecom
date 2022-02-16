import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
