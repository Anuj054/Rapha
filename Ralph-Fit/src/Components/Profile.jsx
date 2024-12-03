import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Assuming Sidebar is in the same directory

const Settings = () => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data saved:", formData);
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div className="w-60">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Settings Form */}
        <div className=" mt-6 ml-6">
          <h1 className="text-2xl font-semibold mt-4 text-start  mb-4 text-gray-600">
            Profile
          </h1>
        </div>
        <div className="flex m-3 h-full  border rounded-lg justify-items-center ">
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col bg-white shadow-lg rounded-lg p-6 w-full h-full items-center justify-center"
          >
            <div className="flex  flex-col justify-between gap-5 ">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <button
                    type="button"
                    className="text-blue-400 text-sm focus:outline-none"
                  >
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                      ></input>
                      Upload Photo
                    </label>
                  </button>
                </div>
              </div>

              <div className="flex gap-5 justify-between">
                <div className="flex flex-col w-80">
                  <label
                    htmlFor="name"
                    className="block text-sm  font-medium text-gray-500"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder=" Enter Your First Name"
                    onChange={handleChange}
                    className="mt-1 p-2  text-gray-600 rounded-sm border shadow-sm bg-gray-100  sm:text-sm"
                  />
                </div>{" "}
                <div className="flex flex-col w-80 ">
                  <label
                    htmlFor="gender"
                    className="block text-sm  font-medium text-gray-500"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    onChange={handleChange}
                    placeholder=""
                    className="mt-1 p-2  text-gray-600 rounded-sm border shadow-sm bg-gray-100  sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-between">
                <div className="flex flex-col w-80 ">
                  <label
                    htmlFor="email"
                    className="block text-sm  font-medium text-gray-500"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="mt-1 p-2  text-gray-600 rounded-sm border shadow-sm bg-gray-100  sm:text-sm"
                  />
                </div>
                <div className="flex flex-col w-80 ">
                  <label
                    htmlFor="number"
                    className="block text-sm  font-medium text-gray-500"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="number"
                    id="number"
                    onChange={handleChange}
                    className="mt-1 p-2  text-gray-600 rounded-sm border shadow-sm bg-gray-100  sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6  flex   justify-center">
              <button
                type="submit"
                className="w-[150px] bg-[#8920FE] text-white font-medium py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-[#8920FE] focus:ring-offset-2 "
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
