import React, { useEffect, useState } from "react";
import Sidebar from "../Components/SideBar";
import axios from "axios";

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedWeek, setSelectedWeek] = useState("1");
  const [attendanceData, setAttendanceData] = useState([]);
  const [weekDates, setWeekDates] = useState([]);

  // Fetch all classes and users
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "https://web-ai-gym-project.vercel.app/api/class/getAll"
        );
        setClasses(response.data);
        if (response.data.length > 0) {
          setSelectedClass(response.data[0]._id);
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
          attendance: Array(5).fill("Absent"), // Initialize for Monday-Friday
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

  // Calculate dates for the selected week and month
  useEffect(() => {
    const calculateWeekDates = (month, week) => {
      const monthIndex = months.indexOf(month); // Convert month name to index
      const firstDay = new Date(new Date().getFullYear(), monthIndex, 1); // First day of the month
      const firstMonday =
        firstDay.getDay() === 1
          ? firstDay
          : new Date(
              firstDay.setDate(
                firstDay.getDate() + ((1 - firstDay.getDay() + 7) % 7)
              )
            ); // Get first Monday of the month

      const weekStart = new Date(
        firstMonday.setDate(firstMonday.getDate() + (week - 1) * 7)
      ); // Start of the selected week
      const weekDates = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        return date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        }); // Format date
      });

      return weekDates;
    };

    if (selectedMonth && selectedWeek) {
      const dates = calculateWeekDates(selectedMonth, parseInt(selectedWeek));
      setWeekDates(dates);
    }
  }, [selectedMonth, selectedWeek]);

  // Fetch attendance data when selections change
  useEffect(() => {
    if (selectedClass && selectedMonth && selectedWeek) {
      const fetchAttendance = async () => {
        try {
          const url = `https://web-ai-gym-project.vercel.app/api/attendance/${selectedClass}/week${selectedWeek}/${selectedMonth}`;
          const response = await axios.get(url);

          if (
            response.status === 404 ||
            !response.data.data ||
            response.data.data.length === 0
          ) {
            const updatedAttendance = users.map((user) => ({
              userId: user._id,
              userName: user.name,
              attendance: Array(5).fill("Absent"),
            }));
            setAttendanceData(updatedAttendance);
          } else {
            const fetchedAttendance = response.data.data;

            const updatedAttendance = users.map((user) => {
              const userAttendance = fetchedAttendance.find(
                (item) => item.userId === user._id
              );

              const attendance = userAttendance
                ? weekDates.map(
                    (date) => userAttendance?.weekAttendance?.[date] || "Absent"
                  )
                : Array(5).fill("Absent");

              return {
                userId: user._id,
                userName: user.name,
                attendance: attendance,
              };
            });

            setAttendanceData(updatedAttendance);
          }
        } catch (error) {
          const updatedAttendance = users.map((user) => ({
            userId: user._id,
            userName: user.name,
            attendance: Array(5).fill("Absent"),
          }));
          setAttendanceData(updatedAttendance);
        }
      };

      fetchAttendance();
    }
  }, [selectedClass, selectedMonth, selectedWeek, users, weekDates]);

  const handleClassChange = (e) => setSelectedClass(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleWeekChange = (e) => setSelectedWeek(e.target.value);

  const handleAttendanceChange = async (userIndex, dayIndex, value) => {
    const updatedAttendance = [...attendanceData];
    updatedAttendance[userIndex].attendance[dayIndex] = value;
    setAttendanceData(updatedAttendance);

    if (!selectedClass || !selectedMonth || !selectedWeek) {
      alert(
        "Please select a class, month, and week before marking attendance."
      );
      return;
    }

    const attendancePayload = {
      userId: updatedAttendance[userIndex].userId,
      classId: selectedClass,
      attendanceData: {
        [selectedMonth]: {
          [`week${selectedWeek}`]: {
            [weekDates[dayIndex]]: value || "Absent",
          },
        },
      },
    };

    try {
      await axios.post(
        "https://web-ai-gym-project.vercel.app/api/attendance/markAttendance",
        attendancePayload
      );
    } catch (error) {
      console.error("Error marking attendance:", error.message);
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

  const weeks = [1, 2, 3, 4, 5]; // Added week 5

  const getStatusTextColor = (status) => {
    if (status === "Present") return "text-green-600";
    if (status === "Absent") return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="p-4 bg-white border-b shadow-sm flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-700">
            User Attendance
          </h2>
          <div className="flex space-x-4">
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
            <select
              className="border rounded-md px-3 py-1 text-gray-600 bg-gray-50"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="border rounded-md px-3 py-1 text-gray-600 bg-gray-50"
              value={selectedWeek}
              onChange={handleWeekChange}
            >
              {weeks.map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-5 mx-4 mt-4 border rounded-lg shadow-sm bg-white overflow-x-auto">
          <div
            className="grid gap-4"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${
                weekDates.length + 1
              }, minmax(100px, 1fr))`,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div className="font-semibold px-4 py-2 text-gray-600">Name</div>
            {weekDates.map((date, index) => (
              <div
                key={index}
                className="font-semibold px-4 py-2 text-gray-600"
              >
                {date}
              </div>
            ))}

            {attendanceData.map((user, userIndex) => (
              <React.Fragment key={user.userId}>
                <div className="p-2 text-gray-700 font-medium">
                  {user.userName}
                </div>
                {user.attendance.map((status, dayIndex) => (
                  <div key={dayIndex} className="p-2">
                    <div
                      className={`px-2 py-1 text-sm border rounded-md cursor-pointer ${getStatusTextColor(
                        status
                      )}`}
                      onClick={() =>
                        handleAttendanceChange(
                          userIndex,
                          dayIndex,
                          status === "Present" ? "Absent" : "Present"
                        )
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
