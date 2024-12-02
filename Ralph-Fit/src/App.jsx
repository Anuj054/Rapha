import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import UserManagement from "./Pages/UserMangement";
import AddClass from "./Pages/AddClass";
import Attendance from "./Pages/Attendence";
import DashBoard from "./Pages/DashBoard";
import Subscription from "./Pages/Subscription";
import Settings from "./Pages/Settings";
import Notification from "./Pages/Notification";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard with Sidebar */}
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/dashboard/usermanagement" element={<UserManagement />} />

        <Route path="/dashboard/addclass" element={<AddClass />} />
        <Route path="/dashboard/attendence" element={<Attendance />} />
        <Route path="/dashboard/subscription" element={<Subscription />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/notifications" element={<Notification />} />
      </Routes>
    </Router>
  );
}

export default App;
