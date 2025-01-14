import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import UserManagement from "./Pages/UserMangement";
import AddClass from "./Pages/AddClass";
import Attendance from "./Pages/Attendence";
import Subscription from "./Pages/Subscription";
import Settings from "./Pages/Settings";
import Notification from "./Pages/Notification";
import Profile from "./Components/Profile";
import NavBar from "./Components/NavBar"; // Import the NavBar component
import Sidebar from "./Components/SideBar"; // Import the Sidebar component
import Feedback from "./Pages/Feedback";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      {/* Pass the toggleSidebar function to NavBar */}
      <NavBar toggleSidebar={toggleSidebar} />

      <div className="md:hidden">
        {/* Mobile Sidebar is toggled based on isSidebarOpen */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content area */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-60" : "ml-0"
        }`}
      >
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Dashboard with Sidebar */}
          <Route
            path="/dashboard/usermanagement"
            element={<UserManagement />}
          />
          <Route path="/dashboard/addclass" element={<AddClass />} />
          <Route path="/dashboard/attendence" element={<Attendance />} />
          <Route path="/dashboard/subscription" element={<Subscription />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/notifications" element={<Notification />} />
          <Route path="/dashboard/classes" element={<Notification />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
