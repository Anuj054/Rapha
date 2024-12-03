import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Import Sidebar component

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import UpcomingClasses from "../Components/UpcomingClass";

const AddClass = () => {
  const [classes, setClasses] = useState([]);

  const handleAddClass = () => {
    alert("Class added!");
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between p-5">
          <div className="w-2/5 flex flex-col">
            <h2 className="mb-2 text-lg font-semibold">Add Class</h2>
            <input
              type="text"
              placeholder="Trainer Name"
              className="mb-2 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Class Name"
              className="mb-2 p-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Class Details"
              className="mb-2 p-2 border border-gray-300 rounded-md"
            />
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="Slots"
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <input
              type="text"
              placeholder="Session"
              className="mb-2 p-2 border border-gray-300 rounded-md"
            />
            <button className="mt-2 p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              + Add another
            </button>
            <button
              className="mt-2 p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={handleAddClass}
            >
              Add Class
            </button>
          </div>
          <div className="w-3/5">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
            />
          </div>
        </div>
        <UpcomingClasses />
      </div>
    </div>
  );
};

export default AddClass;
