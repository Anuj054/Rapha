import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginbg from "../Assets/loginbg.svg"; // Replace with actual asset path
import logo from "../Assets/logo.svg"; // Replace with actual asset path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy Authentication Logic
    if (email === "admin@example.com" && password === "password") {
      navigate("/dashboard/usermanagement");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-gray-50">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <img src={logo} alt="Rapha-Fit Pilates Logo" className="h-8" />
      </div>

      {/* Background Illustration */}
      <div className="absolute inset-0 w-auto h-auto">
        <img
          src={loginbg}
          alt="Background"
          className="w-full h-full object-cover hidden md:block"
        />
      </div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-lg shadow-md w-[90%] max-w-[400px]"
        >
          <h2 className="text-center text-xl md:text-2xl font-bold text-gray-800 mb-6">
            ADMIN
          </h2>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-300"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223a10.477 10.477 0 0116.042 0m-2.25 2.217a6.477 6.477 0 00-11.542 0M10.5 15.75a1.5 1.5 0 113 0m-8.25-1.5a9 9 0 0115.75 0"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Sign-In Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#e2f163] text-black font-bold text-sm md:text-base rounded-lg hover:bg-[#d8e755] transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
