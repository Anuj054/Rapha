import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Import Sidebar component
import Navbar from "../Components/NavBar";

const UserManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const users = [
    {
      name: "Kristin Watson",
      email: "michelle.rivera@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Female",
    },
    {
      name: "Marvin McKinney",
      email: "debbie.baker@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Female",
    },
    {
      name: "Jane Cooper",
      email: "kenzi.lawson@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Female",
    },
    {
      name: "Cody Fisher",
      email: "nathan.roberts@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Female",
    },
    {
      name: "Bessie Cooper",
      email: "felicia.reid@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
    },
    {
      name: "Guy Hawkins",
      email: "alma.lawson@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
    },
    {
      name: "Jerome Bell",
      email: "deanna.curtis@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
    },
    {
      name: "Savannah Nguyen",
      email: "georgia.young@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Female",
    },
    {
      name: "Wade Warren",
      email: "jackson.graham@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
    },
    {
      name: "Darrell Steward",
      email: "willie.jennings@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-[160vh]">
        {/* Navbar */}
        <div className="navbar">
          <Navbar />
        </div>
        <div className="p-5">
          <div className="flex justify-between mb-5">
            <input
              type="text"
              placeholder="Search for a user by name or email"
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              onClick={togglePopup}
            >
              Add User
            </button>
          </div>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email address</th>
                <th className="p-3 text-left">Package</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Number</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">More Details</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.package}</td>
                  <td className="p-3">{user.classType}</td>
                  <td className="p-3">{user.number}</td>
                  <td className="p-3">{user.gender}</td>
                  <td className="p-3">
                    <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
                      ⟩
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
              <div className="bg-white w-[80%] max-w-xl rounded-lg p-6 shadow-lg relative">
                <div className="flex justify-between items-center border-b pb-3">
                  <h2 className="text-2xl text-gray-800">Add New User</h2>
                  <button
                    className="text-xl text-gray-800"
                    onClick={togglePopup}
                  >
                    &times;
                  </button>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl mb-4 text-gray-700">User Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button className="bg-white border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-600 hover:text-white">
                      Add Another
                    </button>
                    <button
                      className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                      onClick={togglePopup}
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
