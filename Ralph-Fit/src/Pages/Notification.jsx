import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SideBar";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });
  
  // Form states
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("general");
  const [notificationPriority, setNotificationPriority] = useState("medium");
  const [sendToAll, setSendToAll] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Get current user ID from localStorage or context
  const currentUserId = localStorage.getItem("userId") || "admin_user_id";

  // Fetch users for recipient selection
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch notifications and stats
  useEffect(() => {
    fetchNotifications();
    fetchStats();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/names-and-ids`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/notifications`, {
        params: {
          userId: currentUserId,
          page: currentPage,
          limit: 10,
        },
      });
      
      if (response.data.success) {
        setNotifications(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/notifications/stats`, {
        params: { userId: currentUserId },
      });
      
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSendNotification = async () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) {
      alert("Please enter both title and message");
      return;
    }

    if (!sendToAll && selectedRecipients.length === 0) {
      alert("Please select at least one recipient or check 'Send to All'");
      return;
    }

    try {
      setLoading(true);
      
      const recipients = sendToAll 
        ? users.map(user => user._id) 
        : selectedRecipients;

      const payload = {
        recipients,
        title: notificationTitle,
        message: notificationMessage,
        type: notificationType,
        priority: notificationPriority,
      };

      const response = await axios.post(
        `${BACKEND_URL}/api/notifications/bulk`,
        payload
      );

      if (response.data.success) {
        alert(`Notification sent to ${recipients.length} users successfully!`);
        // Reset form
        setNotificationTitle("");
        setNotificationMessage("");
        setSelectedRecipients([]);
        setSendToAll(false);
        setNotificationType("general");
        setNotificationPriority("medium");
        
        // Refresh notifications list
        fetchNotifications();
        fetchStats();
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/notifications/${notificationId}/read`,
        { userId: currentUserId }
      );

      if (response.data.success) {
        fetchNotifications();
        fetchStats();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/notifications/read-all`,
        { userId: currentUserId }
      );

      if (response.data.success) {
        alert(response.data.message);
        fetchNotifications();
        fetchStats();
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    if (!confirm("Are you sure you want to delete this notification?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/notifications/${notificationId}`,
        { data: { userId: currentUserId } }
      );

      if (response.data.success) {
        fetchNotifications();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleDeleteAllRead = async () => {
    if (!confirm("Are you sure you want to delete all read notifications?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/notifications/read/all`,
        { data: { userId: currentUserId } }
      );

      if (response.data.success) {
        alert(response.data.message);
        fetchNotifications();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  const toggleRecipient = (userId) => {
    setSelectedRecipients((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      class_reminder: "⏰",
      booking_confirmation: "✅",
      booking_cancellation: "❌",
      membership_expiry: "⚠️",
      payment: "💳",
      promotion: "🎉",
      general: "📢",
    };
    return icons[type] || "📢";
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-600">
              Notifications Management
            </h1>
            
            {/* Stats */}
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="text-center px-4 py-2 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{stats.unread}</div>
                <div className="text-xs text-gray-600">Unread</div>
              </div>
              <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.read}</div>
                <div className="text-xs text-gray-600">Read</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Create Notification Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Create New Notification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Title */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  placeholder="Enter notification title"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Message */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Enter notification message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="class_reminder">Class Reminder</option>
                  <option value="booking_confirmation">Booking Confirmation</option>
                  <option value="booking_cancellation">Booking Cancellation</option>
                  <option value="membership_expiry">Membership Expiry</option>
                  <option value="payment">Payment</option>
                  <option value="promotion">Promotion</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={notificationPriority}
                  onChange={(e) => setNotificationPriority(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Recipients */}
              <div className="col-span-2">
                <div className="flex items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 mr-4">
                    Recipients
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sendToAll}
                      onChange={(e) => setSendToAll(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">Send to All Users</span>
                  </label>
                </div>

                {!sendToAll && (
                  <div className="border rounded-lg p-4 max-h-48 overflow-y-auto bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {users.map((user) => (
                        <label key={user._id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedRecipients.includes(user._id)}
                            onChange={() => toggleRecipient(user._id)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{user.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSendNotification}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Notifications;