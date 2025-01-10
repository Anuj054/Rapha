import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SideBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const AddClass = () => {
  const [formData, setFormData] = useState({
    trainerName: "",
    className: "",
    classDetails: "",
    slots: "",
    date: "",
    time: "",
  });

  const [classes, setClasses] = useState([]);
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        "https://web-ai-gym-project.vercel.app/api/class/getAll"
      );
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
        const newEvents = data.map((cls) => ({
          title: cls.className,
          start: cls.date,
          extendedProps: cls,
        }));
        setEvents(newEvents);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchUsersByClassId = async (classId) => {
    try {
      const response = await fetch(
        `https://web-ai-gym-project.vercel.app/api/class-booking/users/${classId}`
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        const userAttendance = data.users.reduce((acc, user) => {
          acc[user.userId] = user.attendanceStatus || ""; // Assuming 'attendanceStatus' is the field for status
          return acc;
        }, {});
        setAttendance(userAttendance);
      } else {
        console.error("Failed to fetch users for the class");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddClass = async () => {
    try {
      const response = await fetch(
        "https://web-ai-gym-project.vercel.app/api/class/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Class added successfully!");
        setFormData({
          trainerName: "",
          className: "",
          classDetails: "",
          slots: "",
          date: "",
          time: "",
        });
        fetchClasses();
      } else {
        const errorData = await response.json();
        alert(`Error adding class: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding class:", error);
      alert("An error occurred while adding the class. Please try again.");
    }
  };

  const handleEventClick = (eventInfo) => {
    const selectedClass = eventInfo.event.extendedProps;
    setSelectedClassDetails(selectedClass);
    fetchUsersByClassId(selectedClass._id);
  };

  const handleClassClick = (classData) => {
    setSelectedClassDetails(classData);
    fetchUsersByClassId(classData._id);
  };

  const handleAttendance = async (userId, status) => {
    try {
      setAttendance((prev) => ({
        ...prev,
        [userId]: status,
      }));

      const response = await fetch(
        `https://web-ai-gym-project.vercel.app/api/class-booking/attendance/${userId}/${selectedClassDetails._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (response.ok) {
        console.log("Attendance updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Error updating attendance:", errorData);
        alert(`Error updating attendance: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("An error occurred while updating attendance. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col p-5 overflow-y-auto bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Add Class Form */}
          <div className="col-span-1 md:col-span-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Add Class</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="trainerName"
                value={formData.trainerName}
                onChange={handleInputChange}
                placeholder="Trainer Name"
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                placeholder="Class Name"
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <textarea
              name="classDetails"
              value={formData.classDetails}
              onChange={handleInputChange}
              placeholder="Class Details"
              className="mt-4 p-2 border border-gray-300 rounded-md w-full h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input
                type="number"
                name="slots"
                value={formData.slots}
                onChange={handleInputChange}
                placeholder="Slots"
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
              onClick={handleAddClass}
            >
              Add Class
            </button>
          </div>

          {/* Calendar Section */}
          <div className="col-span-1 md:col-span-4 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="450px"
              events={events}
              eventClick={handleEventClick}
              headerToolbar={{
                start: "prev,next",
                center: "title",
                end: "today",
              }}
            />
          </div>

          {/* Class Details and Users */}
          {selectedClassDetails && (
            <div className="col-span-1 md:col-span-4 bg-white rounded-lg shadow-md p-6">
              <div className="border-b pb-4 mb-4">
                <div className="text-2xl font-semibold">
                  {new Date(selectedClassDetails.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="text-gray-600 mt-2">
                  Time: {selectedClassDetails.time}
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <div className="text-2xl font-semibold">
                  {selectedClassDetails.className}
                </div>
                <div className="text-gray-600 mt-2">
                  Trainer: {selectedClassDetails.trainerName}
                </div>
              </div>

              <div>
                <div className="grid grid-cols-4 gap-7 mb-4 font-semibold text-gray-700">
                  <div>Name</div>
                  <div className="col-span-2 text-center">Attendance</div>
                  <div className="text-right">Contact</div>
                </div>
                <div className="space-y-3">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <div
                        key={user.userId}
                        className="grid grid-cols-4 gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
                        style={{ gridTemplateColumns: "2fr 3fr 3fr" }}
                      >
                        <div className="font-medium">{user.name}</div>
                        <div className="col-span-1 flex justify-center gap-2">
                          <button
                            onClick={() => handleAttendance(user.userId, "present")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                              attendance[user.userId] === "present"
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-green-100"
                            }`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleAttendance(user.userId, "absent")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                              attendance[user.userId] === "absent"
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-red-100"
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                        <div className="text-gray-600 text-right" style={{ textOverflow: "ellipsis" }}>
                          {user.phone}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center py-6">
                      No members enrolled in this class yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Classes List */}
          <div className="col-span-4 md:col-span-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Classes</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {classes.map((cls) => (
                <div
                  key={cls._id}
                  className="flex-shrink-0 bg-gray-50 border rounded-lg p-6 w-full md:w-80 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleClassClick(cls)}
                >
                  <h3 className="font-bold text-lg mb-2">{cls.className}</h3>
                  <p className="text-gray-600">{cls.classDetails}</p>
                  <p className="mt-4 text-sm text-gray-400">
                    {new Date(cls.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                    , {cls.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
