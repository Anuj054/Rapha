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
    <div className=" h-full w-60 bg-[#6f5c47] flex flex-col">
      {/* Sidebar Header */}

      {/* Menu Items */}
      <ul className="list-none p-4 m-0 flex-2">
        <Link
          to="/dashboard/usermanagement"
          style={{ textDecoration: "none" }}
          className="text-white"
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/usermanagement"
                ? "bg-[#45413c]"
                : ""
            }`}
          >
            <div className=" p-2">
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
            <div className=" p-2">
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
              location.pathname === "/dashboard/attendance"
                ? "bg-[#45413c]"
                : ""
            }`}
          >
            <div className=" p-2">
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
              location.pathname === "/dashboard/subscriptions"
                ? "bg-[#45413c]"
                : ""
            }`}
          >
            <div className=" p-2">
              <img src={sub} alt="Subscriptions" />
            </div>
            <span>Subscriptions</span>
          </li>
        </Link>
      </ul>
      <hr />

      {/* Footer Section */}
      <div className="pt-3">
        <ul className="list-none p-4 m-0 ">
          <Link
            to="/dashboard/notifications"
            style={{ textDecoration: "none" }}
            className="text-white"
          >
            <li
              className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
                location.pathname === "/dashboard/notifications"
                  ? "bg-[#45413c]"
                  : ""
              }`}
            >
              <div className=" p-2">
                <img src={notification} alt="Notifications" />
              </div>
              <span>Notifications</span>
            </li>
          </Link>
          <Link
            to="/dashboard/settings"
            style={{ textDecoration: "none" }}
            className="text-white"
          >
            <li
              className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c]  rounded-md ${
                location.pathname === "/dashboard/settings"
                  ? "bg-[#45413c]"
                  : ""
              }`}
            >
              <div className=" p-2">
                <img src={settings} alt="Settings" />
              </div>
              <span>Settings</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
