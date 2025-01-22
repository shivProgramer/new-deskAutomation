import React, { useState } from "react";
import { GrProjects } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { BiSolidReport } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { FcSalesPerformance } from "react-icons/fc";
import { SiGooglemarketingplatform } from "react-icons/si";
import { GoProjectSymlink } from "react-icons/go";
import { FaCalendarDay } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md";
const Sidebar = ({ isOpen, toggleDrawer }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleAccordionToggle = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const handleDropdown = () => {
    setIsAccordionOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 bg-gray-800 text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-64`}
    >
      <div className="p-[16px] text-xl font-bold border-b border-gray-700 pl-10 text-shadow-custom ">
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
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center   ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"
            }`
          }
          onClick={handleDropdown}
        >
          <GrProjects className="text-green-500" /> Dashboard
        </NavLink>

        <NavLink
          to="/project"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500" // Active styles (blue background)
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white" // Hover styles
            }`
          }
          onClick={handleDropdown}
        >
          <GoProjectSymlink className="text-green-500" /> Project
        </NavLink>

        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500" // Active styles (blue background)
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white" // Hover styles
            }`
          }
          onClick={handleDropdown}
        >
          <FaUserCircle className="text-green-500"/> Employee
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"
            }`
          }
          onClick={handleDropdown}
        >
          <FaHospitalUser className="text-green-500" /> Attendance
        </NavLink>

        <NavLink
          to="/hourly-rate"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"
            }`
          }
          onClick={handleDropdown}
        >
          <RiMoneyDollarCircleLine  className="text-green-500"/> Hourly Rate
        </NavLink>

        <NavLink
          to="/adhoc-report"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"
            }`
          }
          onClick={handleDropdown}
        >
          <TbReportAnalytics className="text-green-500" /> Adhoc_Report
        </NavLink>

        <NavLink
          to="/daly_reports"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"
            }`
          }
          onClick={handleDropdown}
        >
          <BiSolidReport className="text-green-500" /> Daily Reports
        </NavLink>
        <NavLink
          to="/project-list"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"
            }`
          }
          onClick={handleDropdown}
        >
          <BsReverseListColumnsReverse className="text-green-500" /> Ecomm Project List
        </NavLink>
 
        <NavLink
          to="/dme"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"
            }`
          }
          onClick={handleDropdown}
        >
          <SiGooglemarketingplatform className="text-green-500" /> DME
        </NavLink>

        <div>
          {/* Accordion for Sales Section */}

          <div className="">
            <div
              className={`py-2.5 my-1 px-10 cursor-pointer shadow-2xl flex gap-4 items-center justify-between text-white transition-all duration-300 ${
                isAccordionOpen
                  ? "bg-gray-700 border-l-2 border-green-500"
                  : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500"
              }`}
              onClick={handleAccordionToggle}
            >
              <span className="font-semibold flex items-center gap-2"> <FcSalesPerformance/> Sales</span>

              {/* Accordion Indicator Icon */}
              {isAccordionOpen ? (
                <IoMdArrowDropup className="mt-1 text-white" size={18} />
              ) : (
                <IoMdArrowDropdown className="mt-1 text-white" size={18} />
              )}
            </div>

            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isAccordionOpen
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-14">
                {/* Reward Link */}
                <NavLink
                  to="/sales/reward"
                  className={({ isActive }) =>
                    `block py-2 my-1 px-4 text-white ${
                      isActive
                        ? "bg-gray-500 text-white border-l-2 border-green-500"
                        : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500"
                    }`
                  }
                >
                  Reward
                </NavLink>
                {/* Transaction Link */}
                <NavLink
                  to="/sales/transaction"
                  className={({ isActive }) =>
                    `block py-2 my-1 px-4 text-white ${
                      isActive
                        ? "bg-gray-500 text-white border-l-2 border-green-500"
                        : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500"
                    }`
                  }
                >
                  Transaction
                </NavLink>
                {/* Teams Target Link */}
                <NavLink
                  to="/sales/teams-target"
                  className={({ isActive }) =>
                    `block py-2 my-1 px-4 text-white ${
                      isActive
                        ? "bg-gray-500 text-white border-l-2 border-green-500"
                        : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500"
                    }`
                  }
                >
                  Teams Target
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <NavLink
          to="/employee_offdays"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"
            }`
          }
          onClick={handleDropdown}
        >
          <FaCalendarDay className="text-green-500" /> Employee Offdays
        </NavLink>

        
        <NavLink
          to="/holidays"
          className={({ isActive }) =>
            `py-2.5 my-1 pl-10 cursor-pointer flex gap-4 items-center ${
              isActive
                ? "bg-gray-500 text-white border-l-2 border-green-500"
                : "hover:bg-gray-700 hover:border-l-2 hover:border-green-500 text-white"
            }`
          }
          onClick={handleDropdown}
        >
          <MdHolidayVillage className="text-green-500" /> Holidays
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
