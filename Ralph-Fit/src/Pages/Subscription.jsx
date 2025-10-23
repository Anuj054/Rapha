import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SideBar";

// Get backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    membershipName: "",
    startDate: "",
    endDate: "",
    plan: "",
    diet: "",
    trainer: "",
    trainingSlot: "",
    paymentStatus: "",
    sessions: 0,
    users: [],
  });
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/names-and-ids`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const users = await response.json();

      const formattedUsers = users.map((user) => ({
        _id: user._id,
        username: user.name || "N/A",
      }));

      setUserOptions(formattedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "sessions" ? parseInt(value) || 0 : value,
    }));
  };

  const handleUserSelection = (e) => {
    const userId = e.target.value;
    const selectedUser = userOptions.find((user) => user._id === userId);

    if (selectedUser && !formData.users.some((user) => user.userId === userId)) {
      setFormData({
        ...formData,
        users: [...formData.users, { userId: userId, username: selectedUser.username }],
      });
    } else {
      console.error("Selected user not found or already added.");
    }
  };

  const removeUser = (userId) => {
    setFormData((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user.userId !== userId),
    }));
  };

  const formatDateToISO = (date) => {
    return new Date(date).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Form Data before submission:", formData);

    if (
      !formData.membershipName ||
      !formData.startDate ||
      !formData.endDate ||
      formData.users.length === 0
    ) {
      setError(
        "Please fill in all required fields and select at least one user"
      );
      setLoading(false);
      return;
    }

    const membershipData = {
      ...formData,
      startDate: formatDateToISO(formData.startDate),
      endDate: formatDateToISO(formData.endDate),
    };

    console.log("Membership Data:", membershipData);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/membership/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(membershipData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create membership");
      }

      const result = await response.json();
      alert("Membership created successfully!");

      setFormData({
        membershipName: "",
        startDate: "",
        endDate: "",
        plan: "",
        diet: "",
        trainer: "",
        trainingSlot: "",
        paymentStatus: "",
        sessions: 0,
        users: [],
      });
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to create membership");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-600 mb-6">
          Create Membership
        </h1>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">
                  Select Users <span className="text-red-500">*</span>
                </label>
                <select
                  value=""
                  onChange={handleUserSelection}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                >
                  <option value="">Select a user</option>
                  {userOptions.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>

                <div className="mt-4 p-4 bg-gray-100 rounded border">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Selected Users:
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                    {formData.users.map((user) => (
                      <div
                        key={user.userId}
                        className="flex items-center justify-between bg-white p-1 border rounded"
                      >
                        <span>{user.username}</span>
                        <button
                          type="button"
                          onClick={() => removeUser(user.userId)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    {formData.users.length === 0 && (
                      <p className="text-gray-400 col-span-3">No users selected</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Membership Name *
                </label>
                <select
                  name="membershipName"
                  value={formData.membershipName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Membership</option>
                  <option value="Gold Membership">Gold Membership</option>
                  <option value="Silver Membership">Silver Membership</option>
                  <option value="Bronze Membership">Bronze Membership</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Number of Sessions
                </label>
                <input
                  type="number"
                  name="sessions"
                  value={formData.sessions}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  min="0"
                />
              </div>

              {["plan", "diet", "trainer", "trainingSlot"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}

              <div>
                <label className="block text-gray-700 mb-2">
                  Payment Status *
                </label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select status</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Renew
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#8920FE] text-white rounded-md focus:ring-[#8920FE] "
              >
                {loading ? "Creating..." : "Create Membership"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscription;