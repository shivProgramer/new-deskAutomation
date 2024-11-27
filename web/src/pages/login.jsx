import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from '../redux/slice/Auth_slice';
import { showToast } from '../utils/config'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Correct spelling of navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showToast("Please enter your email", "error");
      return;
    } else if (!emailRegex.test(email)) {
      showToast("Please enter a valid email", "error");
      return;
    }
  
    // Validate password
    if (!password) {
      showToast("Please enter your password", "error");
      return;
    }
  
  
    const formVal = { email, password };
    const res = await dispatch(loginApi({ newData: formVal, navigate }));
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-r flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
             
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
       
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1F2937] text-white py-2 rounded-lg hover:bg-[#1f2b3b] focus:outline-none focus:ring-2 focus:ring-[#1a2027]"
          >
            Login
          </button>
        </form>

        {/* Links for Forgot Password and Signup */}
        <div className="mt-4 text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:text-blue-600">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
