import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import UpcomingClasses from "../Components/UpcomingClass";

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

  const [activeTab, setActiveTab] = useState("All");
  const [classes, setClasses] = useState([]);

  // Fetch classes from the API
  const fetchClasses = async () => {
    try {
      const response = await fetch(
        "https://web-ai-gym-project.vercel.app/api/class/get-classes"
      );
      if (response.ok) {
        const data = await response.json();
        setClasses(data.classes || []); // Assuming the response has a "classes" field
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

  // Filter classes based on the active tab
  const filteredClasses = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    switch (activeTab) {
      case "Today":
        return classes.filter((cls) => {
          const classDate = new Date(cls.date);
          return classDate.toDateString() === today.toDateString();
        });
      case "Weekly":
        return classes.filter((cls) => {
          const classDate = new Date(cls.date);
          return classDate >= startOfWeek && classDate <= endOfWeek;
        });
      case "Monthly":
        return classes.filter((cls) => {
          const classDate = new Date(cls.date);
          return (
            classDate.getMonth() === today.getMonth() &&
            classDate.getFullYear() === today.getFullYear()
          );
        });
      default:
        return classes; // All classes
    }
  };

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
        fetchClasses(); // Refresh classes after adding a new one
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
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div>
          <NavBar />
        </div>
        <div className="flex justify-between p-5">
          <div className="w-2/5 flex flex-col">
            <h2 className="mb-2 text-lg font-semibold">Add Class</h2>
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-3 gap-2 mb-2">
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
          <div className="col-span-4 border border-gray-300 rounded-md shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Calendar</h2>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="300px"
              headerToolbar={false}
            />
          </div>

          {/* Add Class Section */}
        
        </div>

        {/* Upcoming Classes */}
        <div className="p-5">
          <UpcomingClasses />
          <ul>
            {classes.map((cls, index) => (
              <li
                key={index}
                className="mb-2 p-2 border border-gray-300 rounded-md"
              >
                {cls.className} - {cls.trainerName}, {cls.date} at {cls.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
