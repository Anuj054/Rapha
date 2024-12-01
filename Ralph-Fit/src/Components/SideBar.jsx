import React from "react";
import userManagement from "../Assets/userManagement.svg";
import sub from "../Assets/sub.svg";
import notification from "../Assets/notification.svg";
import settings from "../Assets/settings.svg";
import Attendence from "../Assets/Attendencs.svg";
import classschedule from "../Assets/classschedule.svg";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Get the current path

  return (
    <div className="h-screen w-60 bg-[#6f5c47] flex flex-col">
      {/* Sidebar Header */}
      <div className="text-[#e2f163] p-4 text-xl font-bold">RAPHA- FIT PILATES</div>

      {/* Menu Items */}
      <ul className="list-none p-4 pt-12 m-0 flex-1">
        <Link
          to="/dashboard/usermanagement"
          style={{ textDecoration: "none" }}
          className="text-white"
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/usermanagement" ? "bg-[#45413c]" : ""
            }`}
          >
            <div className="w-5 h-5 bg-gray-400 rounded-full mr-4">
              <img src={userManagement} alt="User Management" />
            </div>
            <span>User Management</span>
          </li>
        </Link>

        <Link
          to="/dashboard/addclass"
          style={{ textDecoration: "none" }}
          className="text-white"
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/classes" ? "bg-[#45413c]" : ""
            }`}
          >
            <div className="w-5 h-5 bg-gray-400 rounded-full mr-4">
              <img src={classschedule} alt="Classes Schedule" />
            </div>
            <span>Classes Schedule</span>
          </li>
        </Link>

        <Link
          to="/dashboard/attendence"
          style={{ textDecoration: "none" }}
          className="text-white"
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/attendance" ? "bg-[#45413c]" : ""
            }`}
          >
            <div className="w-5 h-5 bg-gray-400 rounded-full mr-4">
              <img src={Attendence} alt="Attendance" />
            </div>
            <span>Attendance</span>
          </li>
        </Link>

        <Link
          to="/dashboard/subscription"
          style={{ textDecoration: "none" }}
          className="text-white"
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/subscriptions" ? "bg-[#45413c]" : ""
            }`}
          >
            <div className="w-5 h-5 bg-gray-400 rounded-full mr-4">
              <img src={sub} alt="Subscriptions" />
            </div>
            <span>Subscriptions</span>
          </li>
        </Link>
      </ul>

      {/* Footer Section */}
      <div>
        <ul className="list-none p-4 m-0">
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/notifications" ? "bg-[#45413c]" : ""
            }`}
          >
            <div className="w-5 h-5 bg-gray-400 rounded-full mr-4">
              <img src={notification} alt="Notifications" />
            </div>
            <span>Notifications</span>
          </li>

          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/settings" ? "bg-[#45413c]" : ""
            }`}
          >
            <div className="w-5 h-5 bg-gray-400 rounded-full mr-4">
              <img src={settings} alt="Settings" />
            </div>
            <span>Settings</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
