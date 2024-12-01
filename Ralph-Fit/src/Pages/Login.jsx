import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginbg from "../Assets/loginbg.svg";
import logo from "../Assets/logo.svg";

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
    <div className="flex items-center justify-center fixed inset-0 z-50 p-7">
      <div className="p-10" style={{ padding: "17px", margin: "27px", height: "23px" }}>
        <img src={logo} alt="Logo" />
      </div>

      <div className="relative w-[90%] max-w-[900px] h-[90%] max-h-[555px] flex items-center justify-center">
        <div className="absolute">
          <img
            src={loginbg}
            alt="Background"
            className="hidden md:block mb-20"
            style={{ width: "1480px" }}
          />
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-[90%] max-w-[400px] z-10">
          <h2 className="text-center text-2xl font-bold mb-8">ADMIN</h2>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-300 text-black font-bold rounded-xl hover:bg-green-400"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
