import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Assuming Sidebar is in the same directory
import NavBar from "../Components/NavBar"; // Assuming NavBar is in the same directory

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "Muskan",
    email: "All rights Reserved@gmail.com",
    address: "abcdefg",
    gender: "",
    number: "1234567890",
  });

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
        {/* Navbar */}
        <NavBar />

        {/* Settings Form */}
        <div>
          <h1 className="text-2xl font-semibold mt-4 text-start ml-4 mb-4 text-gray-600">
            General Settings
          </h1>
          <hr />
        </div>
        <div className="flex  h-full  justify-items-center ">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 w-full h-full items-center justify-center"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <button
                  type="button"
                  className="text-gray-500 text-sm focus:outline-none"
                >
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                    ></input>
                    Add Photo
                  </label>
                </button>
              </div>
            </div>
            <div className=" flex flex-row items-stretch justify-around">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2  rounded-sm border-gray-300 shadow-sm bg-gray-100 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2  rounded-sm border-gray-300 shadow-sm bg-gray-100 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>
            <div className=" flex flex-row items-stretch justify-around">
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-600"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 p-2  rounded-sm border-gray-300 shadow-sm bg-gray-100 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-600"
                >
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="................."
                  className="mt-1 p-2  rounded-sm border-gray-300 shadow-sm bg-gray-100 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
            </div>
            <div className=" flex  items-stretch justify-around flex-row">
              <div className="mb-4">
                <label
                  htmlFor="number"
                  className="block text-sm  font-medium text-gray-600"
                >
                  Number
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="mt-1 pl-2 rounded-sm border-gray-300 shadow-sm bg-gray-100 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
              </div>
              <div></div>
            </div>
            <div className="mt-6  flex   justify-center">
              <button
                type="submit"
                className="w-[150px] bg-purple-700 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 "
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
