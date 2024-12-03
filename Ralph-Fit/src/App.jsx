import React from "react";
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

function App() {
  return (
    <Router>
      <NavBar /> {/* Include NavBar component */}
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard with Sidebar */}

        <Route path="/dashboard/usermanagement" element={<UserManagement />} />
        <Route path="/dashboard/addclass" element={<AddClass />} />
        <Route path="/dashboard/attendence" element={<Attendance />} />
        <Route path="/dashboard/subscription" element={<Subscription />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/notifications" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
