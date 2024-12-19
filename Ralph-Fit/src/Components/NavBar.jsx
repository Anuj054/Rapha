import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ toggleSidebar }) => {
  return (
    <div className="flex justify-between items-center px-6 py-3 bg-[#6f5c47] text-white shadow-md">
      {/* Left Section (optional - add logo or title if needed) */}
      <div className="text-[#e2f163] text-xl font-bold flex">
        RAPHA-FIT PILATES
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Profile Name */}
        <Link to="/profile">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40" // Replace with actual profile image URL
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <span className="text-white font-medium">Muskan Rathore</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white ml-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 14l-4-4h8l-4 4z" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}  // Trigger the sidebar to show/hide
        className="block md:hidden text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default NavBar;
