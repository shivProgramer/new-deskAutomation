import { useEffect, useState, useRef } from "react";
import React from "react";

const Header = ({ toggleDrawer }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null); //
const user_data = JSON.parse(localStorage.getItem("userData"))

  const token = localStorage.getItem("token")
  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  console.log("user_data ---" , user_data)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  return (
    <header className="bg-gray-800 text-white flex items-center justify-between p-3 shadow-md sticky top-0">
      <button onClick={toggleDrawer} className="md:hidden text-2xl">
        ☰
      </button>

      <h1 className="block md:hidden">
        <span className="text-red-700 font-extrabold text-2xl font-serif">
          D
        </span>
        esk{" "}
        <span className="text-green-600 font-extrabold text-2xl font-serif">
          A
        </span>
        utomation{" "}
      </h1>

      {/* User Avatar and Dropdown */}
      <div className="flex items-center space-x-4 relative ml-auto">
        {" "}
        {/* ml-auto to move the avatar to the right */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={handleDropdownToggle}
            className="relative"
          >
            <span className="uppercase w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white">
            {user_data?.username?.charAt(0)}
            </span>
          </button>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-gray-700 text-white rounded-lg shadow-lg w-40"
            >
              <ul className="py-2">
                {/* Login Option */}
                {/* <li>
                  <a
                    href="/login"
                    className="block px-4 py-2 text-sm hover:bg-gray-600 rounded-t-lg"
                  >
                    Login
                  </a>
                </li> */}
                {/* Signup Option */}
                {/* <li>
                  <a
                    href="/signup"
                    className="block px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    Signup
                  </a>
                </li> */}
                {/* Checkout Option */}
                {token && <li onClick={()=>  localStorage.clear()}>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm hover:bg-gray-600 rounded-b-lg"
                  >
                    Logout
                  </a>
                </li>}
              </ul>
            </div>
          )}
        </div>
        <div className="hidden md:block text-sm">
          <p>{user_data?.username}</p>
          <p className="text-gray-400">{user_data?.role}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
