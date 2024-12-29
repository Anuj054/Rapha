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
    session: "",
  });

  const [classes, setClasses] = useState([]);
  const scheduleData = [
    { id: 1, day: "Saturday", color: "border-l-orange-400" },
    { id: 2, day: "Saturday", color: "border-l-green-400" },
    { id: 3, day: "Saturday", color: "border-l-red-400" },
    { id: 4, day: "Saturday", color: "border-l-blue-400" },
  ];

  // Fetch classes from the API
  const fetchClasses = async () => {
    try {
      const response = await fetch(
        "https://web-ai-gym-project.vercel.app/api/class/getAll"
      );
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Fetch classes on component mount
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
          session: "",
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
            <input
              type="text"
              name="session"
              value={formData.session}
              onChange={handleInputChange}
              placeholder="Session"
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
            />
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
              height="300px"
              headerToolbar={false}
            />
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-3">Schedule a Class</h2>
              <div className="space-y-3">
                {scheduleData.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 bg-yellow-100 border-l-4 ${item.color} rounded-md`}
                  >
                    <h3 className="font-bold">{item.day}</h3>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Diam.
                    </p>
                    <span className="text-xs text-gray-500">
                      9th April 2022
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Classes Section */}
          <div className=" sm:col-span-8 md:col-span-12 border border-gray-300 rounded-md shadow-md p-4">
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
                  <p className="text-sm text-gray-600">
                    Slots: {cls.slots} | Session: {cls.session}
                  </p>
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
