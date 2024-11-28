

import React, { useState } from "react";
import { Registerapi } from "../redux/slice/Auth_slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/config";

const Reg = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      email,
      phone,
      password,
    };
    try {
      const res = await dispatch(Registerapi(formData));
      if (res?.payload?.message) {
        showToast(res?.payload?.message, "success");
        nevigate("/login");
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
      }else{
        showToast(res?.payload?.error, "error")
      }
    } catch (error) {
      showToast(error, "error");
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-r flex items-center justify-center">
      <div className="bg-white  rounded-lg shadow-lg max-w-sm w-full p-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^\d*$/.test(inputValue)) {
                  setPhone(inputValue);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              maxLength="10"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1F2937] text-white py-2 rounded-lg hover:bg-[#1f2b3b] focus:outline-none focus:ring-2 focus:ring-[#1a2027]"
          >
            Sign Up
          </button>
        </form>

        {/* Links for Already Have Account */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reg;
