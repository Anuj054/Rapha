import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import NavBar from "../Components/NavBar";

const Attendance = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const [attendanceData, setAttendanceData] = useState([
    { name: "Ayush Mishra", attendance: ["", "", "", "", ""] },
    { name: "Shaneha Verma", attendance: ["", "", "", "", ""] },
  ]);

  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];

  const handleAttendanceChange = (userIndex, dayIndex, isPresent) => {
    const updatedData = [...attendanceData];
    updatedData[userIndex].attendance[dayIndex] = isPresent
      ? "Present"
      : "Absent";
    setAttendanceData(updatedData);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <NavBar />
        <div className="p-5 mt-12 mx-4 rounded-lg shadow-md bg-white text-gray-800">
          <h2 className="text-2xl mb-5">User Attendance</h2>
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b bg-gray-100 font-semibold">Name</th>
                {days.map((day, index) => (
                  <th key={index} className="px-4 py-2 border-b bg-gray-100">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((user, userIndex) => (
                <tr key={userIndex}>
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  {user.attendance.map((status, dayIndex) => (
                    <td key={dayIndex} className="px-4 py-2 border-b">
                      {status === "" ? (
                        <select
                          className="px-2 py-1 text-sm border border-gray-300 rounded-md cursor-pointer bg-gray-50"
                          onChange={(e) =>
                            handleAttendanceChange(
                              userIndex,
                              dayIndex,
                              e.target.value === "Present"
                            )
                          }
                        >
                          <option value="" hidden></option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </select>
                      ) : (
                        <span
                          className={`font-semibold text-sm ${
                            status === "Present" ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {status}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
