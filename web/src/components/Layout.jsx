import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isDrawerOpen ? "ml-64" : "ml-0 md:ml-64"
        }`}
      >
        {/* Header */}
        <div className="w-full bg-gray-100 shadow-md">
          <Header toggleDrawer={toggleDrawer} />
        </div>

        {/* Page Content */}
        <div className="flex-grow p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
