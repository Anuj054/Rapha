import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SideBar";
import AddUserPopup from "../Components/AddUser";
import UserDetailModal from "../Components/UserDetailModal"; // Import the new modal

const UserManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null); // State for selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const usersPerPage = 8;
  const [error, setError] = useState(null);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const toggleModal = (userId = null) => {
    setSelectedUserId(userId);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://web-ai-gym-project.vercel.app/api/users/getAll");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-5">
          <div className="flex justify-between mb-5">
            <button
              className="bg-[#8920FE] text-white px-4 py-2 rounded-md"
              onClick={togglePopup}
            >
              Add User
            </button>
            <input
              type="text"
              placeholder="Search for a user by name or email"
              className="p-2 bg-gray-50 rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {loading ? (
            <div>Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div>No users found.</div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Package</th>
                  <th>Class</th>
                  <th>Number</th>
                  <th>Gender</th>
                  <th>More Details</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.package}</td>
                    <td>{user.class}</td>
                    <td>{user.phone}</td>
                    <td>{user.gender}</td>
                    <td>
                      <button
                        onClick={() => toggleModal(user._id)}
                        className="bg-gray-200 p-2 rounded"
                      >
                        ⟩
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-center mt-4">
            {totalPages > 1 &&
              Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1 ? "bg-[#8920FE] text-white" : "bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
          </div>
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
