


import React from "react";
import { GrProjects } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";  // Import NavLink instead of Link

const Sidebar = ({ isOpen, toggleDrawer }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-64`}
    >
      <div className="p-[16px] text-xl font-bold border-b border-gray-700 pl-10">
        <h1>
          <span className="text-red-700 font-extrabold text-2xl font-serif">
            D
          </span>
          esk{" "}
          <span className="text-green-600 font-extrabold text-2xl font-serif">
            A
          </span>
          utomation{" "}
        </h1>
      </div>
      <ul className="mt-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-4 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"  // Active styles (blue background)
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"  // Hover styles
            }`
          }
        >
          <GrProjects /> Project
        </NavLink>

        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `py-4 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"  // Active styles (blue background)
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"  // Hover styles
            }`
          }
        >
          <FaUserCircle /> Employee
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `py-4 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"  
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"  
            }`
          }
        >
          <FaHospitalUser /> Attendance
        </NavLink>

        <NavLink
          to="/hourly-rate"
          className={({ isActive }) =>
            `py-4 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"  
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"  
            }`
          }
        >
          <RiMoneyDollarCircleLine /> Hourly Rate
        </NavLink>

        <NavLink
          to="/adhoc-report"
          className={({ isActive }) =>
            `py-4 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"  
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"  
            }`
          }
        >
          <RiMoneyDollarCircleLine /> Adhoc_Report
        </NavLink>
        
      </ul>
      <button
        className="absolute top-4 right-4 md:hidden"
        onClick={toggleDrawer}
      >
        ✕
      </button>
    </div>
  );
};

export default Sidebar;

