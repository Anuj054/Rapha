import React from "react";
import Sidebar from "../Components/SideBar"; // Adjust the path based on your project structure

const Notifications = () => {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Content */}
        <div className=" h-screen p-4">
          <h1 className="text-2xl font-semibold text-gray-600  mb-6">
            ADD Notifications
          </h1>

          {/* New Notification Section */}
          <div className="bg-[#F9F3FF] rounded-lg p-4 mb-6 ">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#B7B8CA]  mr-4"></div>
              <div className=" flex flex-col ml-4">
                <input
                  type="text"
                  placeholder="Description......"
                  className="flex bg-transparent border-none outline-none text-gray-600"
                />
                <button className="mt-4 bg-[#EDE8F4] h-8 text-gray-500  px-4 rounded-lg  border shadow ">
                  ADD Notification
                </button>
              </div>
            </div>
          </div>

          {/* Previous Notifications Section */}
          <div className="bg-gray-100 rounded-lg p-4 shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div className=" flex flex-col ml-4">
                <p className="flex-1 text-gray-600">Description......</p>
                <button className="mt-4 bg-[#E8E9EA] h-8 text-gray-500  px-4 rounded-lg  ">
                  ADD Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
