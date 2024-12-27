import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SideBar";
import UserDetailModal from "../Components/UserDetailModal"; // Import the new modal

import AddUserPopup from "../Components/AddUser"; // Import the new component

const UserManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedUserId, setSelectedUserId] = useState(null); // State for selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const usersPerPage = 8; // Pagination limit
  const [error, setError] = useState(null); // For catching errors

  // Toggle Popup visibility
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const toggleModal = (userId = null) => {
    setSelectedUserId(userId);
    setIsModalOpen(!isModalOpen);
  };

  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://web-ai-gym-project.vercel.app/api/users/getAll"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();

        // Check the response
        console.log("Fetched users from API:", data);

        setUsers(data); // Assuming the data is an array of users
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message); // Set the error message in state
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term (by name or email)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
              className="p-2 bg-gray-50 rounded-md"
              value={searchTerm} // Bind the search input to the state
              onChange={handleSearchChange} // Handle input change
            />
          </div>

          {/* Show error message */}
          {error && (
            <div className="text-center text-red-500">Error: {error}</div>
          )}

          {/* Show loading state */}
          {loading ? (
            <div className="text-center text-gray-600">Loading users...</div>
          ) : (
            <>
              {/* Check if users are available */}
              {filteredUsers.length === 0 ? (
                <div className="text-center text-gray-600">No users found.</div>
              ) : (
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
                          <span className=" text-sm">{user.name}</span>
                        </td>
                        <td className="p-3 pt-1 text-sm">{user.email}</td>
                        <td className="p-3 pt-1 text-sm">{user.package}</td>
                        <td className="p-3 pt-1 text-sm">{user.class}</td>
                        <td className="p-3 pt-1 text-sm">{user.phone}</td>
                        <td className="p-3 pt-1 text-sm">{user.gender}</td>
                        <td className="p-3 pt-1 text-sm">
                          <button
                            onClick={() => toggleModal(user._id)}
                            className="bg-gray-100 px-4 py-2 border rounded-full hover:bg-gray-400"
                          >
                            ⟩
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* Pagination (if applicable) */}
          <div className="flex justify-center items-center mt-4">
            {totalPages > 1 &&
              Array.from({ length: totalPages }, (_, i) => (
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
      <UserDetailModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        userId={selectedUserId}
      />
    </div>
  );
};

export default UserManagement;
