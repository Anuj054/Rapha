import React, { useState } from "react";
import Sidebar from "../Components/SideBar";


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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-5 mt-12 mx-4 border rounded-lg shadow-sm bg-white text-gray-800">
          <h2 className="text-2xl font-semibold mt-4 text-start ml-4 mb-4 text-gray-600">
            User Attendance
          </h2>
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
            <div className="font-semibold  px-4 py-2  ">Name</div>
            {days.map((day, index) => (
              <div
                key={index}
                className="font-semibold border-b px-4 py-2 border-l-2 border-gray-100"
              >
                {day}
              </div>
            ))}

            {/* Data Rows */}
            {attendanceData.map((user, userIndex) => (
              <React.Fragment key={userIndex}>
                <div className="shadow-md rounded-sm p-2 text-gray-400">
                  {user.name}
                </div>
                {user.attendance.map((status, dayIndex) => (
                  <div key={dayIndex} className="shadow-md  rounded-sm p-2 ">
                    {status === "" ? (
                      <select
                        className="px-2 py-1 text-sm border w-6 h-6 border-gray-300 rounded-md cursor-pointer bg-gray-50"
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
                        className={` text-sm ${
                          status === "Present"
                            ? "text-gray-400"
                            : "text-red-500"
                        }`}
                      >
                        {status}
                      </span>
                    )}
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
