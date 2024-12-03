import React from "react";

const UpcomingClasses = () => {
  const classes = [
    {
      title: "Month Unlimited G/P",
      date: "10 Feb, 2024",
      session: 30,
      trainer: "Jane Cooper",
      students: 32,
    },
    {
      title: "Month Unlimited G/P",
      date: "15 Mar, 2024",
      session: 30,
      trainer: "Jane Cooper",
      students: 32,
    },
    {
      title: "Month Unlimited G/P",
      date: "20 Apr, 2024",
      session: 30,
      trainer: "Jane Cooper",
      students: 32,
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {classes.map((cls, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-gray-100 rounded-lg shadow-lg p-5 w-72 text-left"
          >
            <h3 className="text-purple-700 mb-2">{cls.title}</h3>
            <p>Date: {cls.date}</p>
            <p>Session: {cls.session}</p>
            <p>Trainer: {cls.trainer}</p>
            <p>Students: {cls.students}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClasses;
