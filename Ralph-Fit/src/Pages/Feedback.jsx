import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SideBar";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Settings = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    byCategory: {},
    byStatus: {},
  });

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const categories = ["Trainers", "Hygiene", "Equipment", "Facilities", "Classes", "Staff", "General"];
  const statuses = ["pending", "reviewed", "resolved"];

  useEffect(() => {
    fetchFeedback();
    fetchStats();
  }, [currentPage, selectedCategory, selectedStatus, minRating, maxRating]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
      };

      if (selectedCategory) params.category = selectedCategory;
      if (selectedStatus) params.status = selectedStatus;
      if (minRating) params.minRating = minRating;
      if (maxRating) params.maxRating = maxRating;

      const response = await axios.get(`${BACKEND_URL}/api/feedback/all`, { params });

      if (response.data.success) {
        setFeedbackData(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      alert("Failed to fetch feedback: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/feedback/stats`);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setNewStatus(feedback.status);
    setAdminResponse(feedback.adminResponse || "");
    setShowModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedFeedback) return;

    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/feedback/${selectedFeedback._id}/status`,
        {
          status: newStatus,
          adminResponse: adminResponse,
        }
      );

      if (response.data.success) {
        alert("Feedback status updated successfully!");
        setShowModal(false);
        fetchFeedback();
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status: " + error.message);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const response = await axios.delete(`${BACKEND_URL}/api/feedback/${feedbackId}`);

      if (response.data.success) {
        alert("Feedback deleted successfully!");
        fetchFeedback();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback: " + error.message);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedStatus("");
    setMinRating("");
    setMaxRating("");
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-white border-b shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-600 mb-4">
            Feedback and Reviews
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Feedback</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {stats.averageRating} ⭐
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.byStatus?.pending || 0}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {stats.byStatus?.resolved || 0}
              </div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              <option value="">All Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={minRating}
              onChange={(e) => {
                setMinRating(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              <option value="">Min Rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}+ Stars
                </option>
              ))}
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-5 bg-gray-50">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : feedbackData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No feedback found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-200 text-gray-600 text-sm">
                    <tr>
                      <th className="py-3 px-6 text-left">Rating</th>
                      <th className="py-3 px-6 text-left">Category</th>
                      <th className="py-3 px-6 text-left">Date</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Feedback</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {feedbackData.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-6 text-left">
                          <span className="font-semibold">
                            {item.rating}/5 {getRatingStars(item.rating)}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-6 text-left">{item.userName}</td>
                        <td className="py-3 px-6 text-left">
                          <div className="max-w-xs truncate">{item.feedback}</div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <span
                            className={`px-2 py-1 rounded text-xs ${getStatusBadgeColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleViewDetails(item)}
                              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteFeedback(item._id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Feedback Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">User:</label>
                  <p className="text-gray-800">{selectedFeedback.userName}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Category:</label>
                  <p className="text-gray-800">{selectedFeedback.category}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Rating:</label>
                  <p className="text-gray-800">
                    {selectedFeedback.rating}/5 {getRatingStars(selectedFeedback.rating)}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Feedback:</label>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {selectedFeedback.feedback}
                  </p>
                </div>

                {selectedFeedback.className && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Class:</label>
                    <p className="text-gray-800">{selectedFeedback.className}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-gray-600">Date:</label>
                  <p className="text-gray-800">
                    {new Date(selectedFeedback.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Status:
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Admin Response:
                  </label>
                  <textarea
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter admin response..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpdateStatus}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;