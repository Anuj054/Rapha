import React, { useState } from "react";
import Sidebar from "../Components/SideBar";

const feedbackData = [
  {
    rating: "3.5/5",
    category: "Trainers",
    date: "1.1.2025",
    name: "Aman Rana",
    feedback: "The trainers are professional...",
  },
  {
    rating: "4.2/5",
    category: "Hygiene",
    date: "1.1.2025",
    name: "Aman Rana",
    feedback: "The trainers are professional...",
  },
  {
    rating: "4/5",
    category: "Trainers",
    date: "1.1.2025",
    name: "Aman Rana",
    feedback: "The trainers are professional...",
  },
  // Add more entries as needed
];
const Settings = () => {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col p-4 lg:p-8">
        <div className="mt-6 ml-6">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Feedback and Reviews
          </h1>
        </div>
        <div className="flex m-3 h-full border rounded-lg justify-items-center bg-gray-100">
          <div className=" w-full p-3">
            <div className="overflow-x-auto bortder rounded-sm">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Rating</th>
                    <th className="py-3 px-6 text-left">Category</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Feedback</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {feedbackData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left">{item.rating}</td>
                      <td className="py-3 px-6 text-left">{item.category}</td>
                      <td className="py-3 px-6 text-left">{item.date}</td>
                      <td className="py-3 px-6 text-left">{item.name}</td>
                      <td className="py-3 px-6 text-left truncate max-w-xs">
                        {item.feedback}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
