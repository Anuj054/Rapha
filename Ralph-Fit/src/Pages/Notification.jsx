import React from "react";
import Sidebar from "../Components/SideBar"; // Adjust the path based on your project structure
import NavBar from "../Components/NavBar"; // Adjust the path based on your project structure

const Notifications = () => {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavBar />

        {/* Page Content */}
        <div className="min-h-screen  ">
          <h1 className="text-2xl font-semibold p-2 mt-2 text-start ml-4 mb-4 text-gray-600">
            Add Notifications
          </h1>
          <hr />
          <div className=" m-3">
            {/* First Notification */}
            <div className="flex items-center bg-purple-100 p-4 rounded-lg shadow-sm mb-4 ">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-gray-600">Description.....</p>
              </div>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
                ADD Notification
              </button>
            </div>

            {/* Second Notification */}
            <div className="flex items-center bg-gray-200 p-4 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-gray-600">Description.....</p>
              </div>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                ADD Notification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
