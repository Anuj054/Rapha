import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import Navbar from "../Components/NavBar";
import AddUserPopup from "../Components/AddUser"; // Import the new component
import icons from "../Assets/icons8-search.svg";

const UserManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

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
      photo: "https://via.placeholder.com/50", // Placeholder image URL
    },
    {
      name: "Marvin McKinney",
      email: "debbie.baker@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Female",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Jane Cooper",
      email: "kenzi.lawson@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Female",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Cody Fisher",
      email: "nathan.roberts@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Female",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Bessie Cooper",
      email: "felicia.reid@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Guy Hawkins",
      email: "alma.lawson@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Jerome Bell",
      email: "deanna.curtis@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Savannah Nguyen",
      email: "georgia.young@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Female",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Wade Warren",
      email: "jackson.graham@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
      photo: "https://via.placeholder.com/50",
    },
    {
      name: "Darrell Steward",
      email: "willie.jennings@example.com",
      package: "Month Unlimited G/P",
      classType: "Cardio",
      number: "5783582826",
      gender: "Male",
      photo: "https://via.placeholder.com/50",
    },
  ];

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-5">
          <div className="flex flex-col gap-2 justify-between mb-5">
            <div className="flex justify-end">
              <button
                className="bg-[#8920FE] text-white px-4 py-2 rounded-md w-28"
                onClick={togglePopup}
              >
                Add User
              </button>
            </div>
            <input
              type="text"
              placeholder="Search for a user by name or email"
              className="p-2  bg-gray-50 rounded-md"
            ></input>
          </div>
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-sm text-left">Name</th>
                <th className="p-3 text-sm text-left">Email address</th>
                <th className="p-3 text-sm text-left">Package</th>
                <th className="p-3 text-sm text-left">Class</th>
                <th className="p-3 text-sm text-left">Number</th>
                <th className="p-3 text-sm text-left">Gender</th>
                <th className="p-3 text-sm text-left">More Details</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td className="p-3 flex flex-row">
                    <img
                      src={user.photo}
                      alt={`${user.name}'s photo`}
                      className="w-8 h-8 rounded-full"
                    />

                    <td className="p-3 pt-1 text-sm">{user.name}</td>
                  </td>
                  <td className="p-3 pt-1 text-sm">{user.email}</td>
                  <td className="p-3 pt-1 text-sm">{user.package}</td>
                  <td className="p-3 pt-1 text-sm">{user.classType}</td>
                  <td className="p-3 pt-1 text-sm">{user.number}</td>
                  <td className="p-3 pt-1 text-sm">{user.gender}</td>
                  <td className="p-3 pt-1 text-sm">
                    <button className="bg-gray-100 px-4 py-2 border rounded-full hover:bg-gray-400">
                      ⟩
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 px-4 py-2 rounded-md ${
                  currentPage === i + 1
                    ? "bg-[#8920FE] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Add User Popup */}
          <AddUserPopup isOpen={isPopupOpen} onClose={togglePopup} />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
