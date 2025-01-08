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
  const [events, setEvents] = useState([]); // Added events state

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        "https://web-ai-gym-project.vercel.app/api/class/getAll"
      );
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
        // Update events when classes are fetched
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
        fetchClasses(); // This will update both classes and events
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

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Add Class Form */}
          <div className="col-span-1 md:col-span-8">
            <h2 className="mb-2 text-lg font-semibold">Add Class</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="trainerName"
                value={formData.trainerName}
                onChange={handleInputChange}
                placeholder="Trainer Name"
                className="mb-2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                placeholder="Class Name"
                className="mb-2 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <textarea
              name="classDetails"
              value={formData.classDetails}
              onChange={handleInputChange}
              placeholder="Class Details"
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
              <input
                type="number"
                name="slots"
                value={formData.slots}
                onChange={handleInputChange}
                placeholder="Slots"
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              className="mt-2 p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={handleAddClass}
            >
              Add Class
            </button>
          </div>

          {/* Calendar Section */}
          <div className="col-span-1 md:col-span-4 border border-gray-300 rounded-md shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Calendar</h2>
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
          <div className=" md:col-span-8"></div>
          {/* Class Details and Users */}
          {selectedClassDetails && (
            <div className="col-span-1 md:col-span-4 mt-5 p-4 border border-gray-300 rounded-md">
              {/* First row: Date and Time */}
              <div className="border-b pb-3 mb-3">
                <div className="text-xl font-semibold">
                  {new Date(selectedClassDetails.date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div>
                <div className="text-gray-600 mt-1">
                  Time: {selectedClassDetails.time}
                </div>
              </div>

              {/* Second row: Class and Trainer Info */}
              <div className="border-b pb-3 mb-3">
                <div className="text-xl font-semibold">
                  {selectedClassDetails.className}
                </div>
                <div className="text-gray-600">
                  Trainer: {selectedClassDetails.trainerName}
                </div>
              </div>

              {/* Users Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Class Members</h3>
                <div className="space-y-3">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <div
                        key={user.userId}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                      >
                        <div className="font-medium">{user.name}</div>
                        <div className="text-gray-600">{user.phone}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center py-3">
                      No members enrolled in this class yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Classes List */}
          <div className="col-span-4 md:col-span-12 sm:col-span-8 border border-gray-300 rounded-md shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Classes</h2>
            <div className="flex gap-4 overflow-x-auto">
              {classes.map((cls) => (
                <div
                  key={cls._id}
                  className="flex-shrink-0 bg-gray-100 border rounded-md p-4 w-full md:w-80 shadow-md"
                >
                  <h3 className="font-bold text-lg mb-1">{cls.className}</h3>
                  <p className="text-sm text-gray-600">
                    Trainer: {cls.trainerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Details: {cls.classDetails}
                  </p>
                  <p className="text-sm text-gray-600">Slots: {cls.slots}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(cls.date).toLocaleDateString()} | Time:{" "}
                    {cls.time}
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
