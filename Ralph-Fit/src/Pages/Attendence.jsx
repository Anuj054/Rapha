import React, { useEffect, useState } from "react";
import Sidebar from "../Components/SideBar";
import axios from "axios";

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedClass, setSelectedClass] = useState(""); // Default to first class
  const [selectedMonth, setSelectedMonth] = useState("January"); // Default to January
  const [selectedWeek, setSelectedWeek] = useState("1"); // Default to week 1
  const [attendanceData, setAttendanceData] = useState([]);

  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];

  // Fetch all classes and users
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "https://web-ai-gym-project.vercel.app/api/class/getAll"
        );
        setClasses(response.data);
        if (response.data.length > 0) {
          setSelectedClass(response.data[0]._id); // Set default to the first class
        }
      } catch (error) {
        console.error("Error fetching classes:", error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://web-ai-gym-project.vercel.app/api/users/names-and-ids"
        );
        const initialAttendance = response.data.map((user) => ({
          userId: user._id,
          userName: user.name,
          attendance: Array(days.length).fill("Absent"), // Empty for initial state
        }));
        setUsers(response.data);
        setAttendanceData(initialAttendance);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchClasses();
    fetchUsers();
  }, []);

  // Fetch attendance data when default selections are set or dropdowns change
  useEffect(() => {
    if (selectedClass && selectedMonth && selectedWeek) {
      const fetchAttendance = async () => {
        try {
          const url = `https://web-ai-gym-project.vercel.app/api/attendance/${selectedClass}/week${selectedWeek}/${selectedMonth}`;
          console.log(`Fetching attendance data from: ${url}`); // Log the full URL
          const response = await axios.get(url);
  
          if (response.status === 404 || !response.data.data || response.data.data.length === 0) {
            // If no data or 404 error, mark all users as "Absent"
            const updatedAttendance = users.map((user) => ({
              userId: user._id,
              userName: user.name,
              attendance: Array(days.length).fill("Absent"), // All days marked as "Absent"
            }));
            setAttendanceData(updatedAttendance);
          } else {
            // Handle the case where data is returned
            const fetchedAttendance = response.data.data;
  
            const updatedAttendance = users.map((user) => {
              const userAttendance = fetchedAttendance.find(
                (item) => item.userId === user._id
              );
  
              // If no attendance data is found for this user, mark all days as "Absent"
              const attendance = userAttendance
                ? days.map(
                    (day) => userAttendance?.weekAttendance?.[day] || "Absent"
                  )
                : Array(days.length).fill("Absent");
  
              return {
                userId: user._id,
                userName: user.name,
                attendance: attendance,
              };
            });
  
            setAttendanceData(updatedAttendance);
          }
        } catch (error) {
          // If there's any error (including 404), fallback to marking all users as "Absent"
          const updatedAttendance = users.map((user) => ({
            userId: user._id,
            userName: user.name,
            attendance: Array(days.length).fill("Absent"), // All days marked as "Absent"
          }));
          setAttendanceData(updatedAttendance);
        }
      };
  
      fetchAttendance();
    }
  }, [selectedClass, selectedMonth, selectedWeek, users]);
  
  
  

  const handleClassChange = (e) => setSelectedClass(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleWeekChange = (e) => setSelectedWeek(e.target.value);

  const handleAttendanceChange = async (userIndex, dayIndex, value) => {
    const updatedAttendance = [...attendanceData];
    updatedAttendance[userIndex].attendance[dayIndex] = value;
    setAttendanceData(updatedAttendance);

    if (!selectedClass || !selectedMonth || !selectedWeek) {
      alert("Please select a class, month, and week before marking attendance.");
      return;
    }

    const attendancePayload = {
      userId: updatedAttendance[userIndex].userId,
      classId: selectedClass,
      attendanceData: {
        [selectedMonth]: {
          [`week${selectedWeek}`]: {
            [days[dayIndex]]: value || "Absent",
          },
        },
      },
    };

    try {
      await axios.post(
        "https://web-ai-gym-project.vercel.app/api/attendance/markAttendance",
        attendancePayload
      );
      console.log("Attendance updated successfully!");
    } catch (error) {
      console.error("Error marking attendance:", error.message);
      alert("Failed to mark attendance.");
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weeks = [1, 2, 3, 4];

  // Function to determine text color for the attendance status
  const getStatusTextColor = (status) => {
    if (status === "Present") return "text-green-600"; // Green for present
    if (status === "Absent") return "text-red-600"; // Red for absent
    return "text-gray-600"; // Default gray text for other status
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Header Section */}
        <div className="p-4 bg-white border-b shadow-sm flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-700">User Attendance</h2>
          <div className="flex space-x-4">
            {/* Class Dropdown */}
            <select
              className="border rounded-md px-3 py-1 text-gray-600 bg-gray-50"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="" disabled>
                Class
              </option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className}
                </option>
              ))}
            </select>

            {/* Month Dropdown */}
            <select
              className="border rounded-md px-3 py-1 text-gray-600 bg-gray-50"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="" disabled>
                Month
              </option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>

            {/* Week Dropdown */}
            <select
              className="border rounded-md px-3 py-1 text-gray-600 bg-gray-50"
              value={selectedWeek}
              onChange={handleWeekChange}
            >
              <option value="" disabled>
                Week
              </option>
              {weeks.map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance Grid */}
        <div className="p-5 mx-4 mt-4 border rounded-lg shadow-sm bg-white">
          <div
            className="grid gap-4"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${days.length + 1}, 1fr)`,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Header Row */}
            <div className="font-semibold px-4 py-2 text-gray-600">Name</div>
            {days.map((day, index) => (
              <div key={index} className="font-semibold px-4 py-2 text-gray-600">
                {day}
              </div>
            ))}

            {/* Data Rows */}
            {attendanceData.map((user, userIndex) => (
              <React.Fragment key={user.userId}>
                <div className="p-2 text-gray-700 font-medium">{user.userName}</div>
                {user.attendance.map((status, dayIndex) => (
                  <div key={dayIndex} className="p-2">
                    <div
                      className={`px-2 py-1 text-sm border rounded-md cursor-pointer ${getStatusTextColor(
                        status
                      )}`}
                      onClick={() =>
                        handleAttendanceChange(userIndex, dayIndex, status === "Present" ? "Absent" : "Present")
                      }
                    >
                      {status}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
