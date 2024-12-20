import React from "react";
import userManagement from "../Assets/userManagement.svg";
import sub from "../Assets/sub.svg";
import notification from "../Assets/notification.svg";
import settings from "../Assets/settings.svg";
import Attendence from "../Assets/Attendencs.svg";
import classschedule from "../Assets/classschedule.svg";
import classesIcon from "../Assets/classschedule.svg"; // Add the import for the classes icon
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation(); // Get the current path

  const handleLinkClick = () => {
    // Close the sidebar when any link is clicked (mobile)
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#6f5c47] flex flex-col p-4 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:block`} // Make sure it's visible in desktop
    >
      {/* Sidebar Header */}

      {/* Menu Items */}
      <ul className="list-none flex-1">
        <Link
          to="/dashboard/usermanagement"
          style={{ textDecoration: "none" }}
          className="text-white"
          onClick={handleLinkClick} // Close the sidebar on click (mobile)
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/usermanagement"
                ? "bg-[#45413c]"
                : ""
            }`}
          >
            <div className="p-2">
              <img src={userManagement} alt="User Management" />
            </div>
            <span>User Management</span>
          </li>
        </Link>

        <Link
          to="/dashboard/addclass"
          style={{ textDecoration: "none" }}
          className="text-white"
          onClick={handleLinkClick} // Close the sidebar on click (mobile)
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/addclass" ? "bg-[#45413c]" : ""
            }`}
          >
            <div className="p-2">
              <img src={classschedule} alt="Classes Schedule" />
            </div>
            <span>Classes Schedule</span>
          </li>
        </Link>

        <Link
          to="/dashboard/classes" // New route for the Classes page
          style={{ textDecoration: "none" }}
          className="text-white"
          onClick={handleLinkClick} // Close the sidebar on click (mobile)
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/classes" ? "bg-[#45413c]" : ""
            }`}
          >
            <div className="p-2">
              <img src={classesIcon} alt="Classes" /> {/* Add the icon here */}
            </div>
            <span>Classes</span>
          </li>
        </Link>

        <Link
          to="/dashboard/attendence"
          style={{ textDecoration: "none" }}
          className="text-white"
          onClick={handleLinkClick} // Close the sidebar on click (mobile)
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/attendence"
                ? "bg-[#45413c]"
                : ""
            }`}
          >
            <div className="p-2">
              <img src={Attendence} alt="Attendance" />
            </div>
            <span>Attendance</span>
          </li>
        </Link>

        <Link
          to="/dashboard/subscription"
          style={{ textDecoration: "none" }}
          className="text-white"
          onClick={handleLinkClick} // Close the sidebar on click (mobile)
        >
          <li
            className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
              location.pathname === "/dashboard/subscription"
                ? "bg-[#45413c]"
                : ""
            }`}
          >
            <div className="p-2">
              <img src={sub} alt="Subscriptions" />
            </div>
            <span>Subscriptions</span>
          </li>
        </Link>
      </ul>
      <hr />

      {/* Footer Section */}
      <div className="pt-3">
        <ul className="list-none">
          <Link
            to="/dashboard/notifications"
            style={{ textDecoration: "none" }}
            className="text-white"
            onClick={handleLinkClick} // Close the sidebar on click (mobile)
          >
            <li
              className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
                location.pathname === "/dashboard/notifications"
                  ? "bg-[#45413c]"
                  : ""
              }`}
            >
              <div className="p-2">
                <img src={notification} alt="Notifications" />
              </div>
              <span>Notifications</span>
            </li>
          </Link>

          <Link
            to="/dashboard/settings"
            style={{ textDecoration: "none" }}
            className="text-white"
            onClick={handleLinkClick} // Close the sidebar on click (mobile)
          >
            <li
              className={`flex items-center p-3 cursor-pointer transition-colors duration-100 hover:bg-[#45413c] rounded-md ${
                location.pathname === "/dashboard/settings"
                  ? "bg-[#45413c]"
                  : ""
              }`}
            >
              <div className="p-2">
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
