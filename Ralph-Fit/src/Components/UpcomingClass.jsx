import React, { useEffect, useState } from "react";
import { FaFire, FaUserAlt, FaRunning } from "react-icons/fa"; // Icons for session, trainer, etc.

const UpcomingClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          "https://web-ai-gym-project.vercel.app/api/class/getAll"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setClasses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <p>Loading upcoming classes...</p>;
  }

  if (error) {
    return <p>Error fetching classes: {error}</p>;
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {classes.map((cls, index) => (
          <div
            key={cls._id || index} // Use `_id` if available, fallback to index
            className="flex-shrink-0 bg-white rounded-lg shadow-lg p-6 w-72 text-left border-2 border-gray-200"
          >
            {/* Class name with color */}
            <h3 className="text-lg text-purple-700 font-semibold mb-2">{cls.className}</h3>

            {/* Date */}
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <span className="text-green-500 mr-2">🗓️</span> 
              <span>{new Date(cls.date).toLocaleDateString()}</span>
            </div>

            {/* Session & Slots */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center text-sm">
                <FaFire className="text-red-500 mr-1" />
                <span>{cls.session} Sessions</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-bold">{cls.slots}</span>
                <span> Students</span>
              </div>
            </div>

            {/* Trainer Info */}
            <div className="flex items-center text-sm text-gray-600">
              <FaRunning className="text-blue-500 mr-1" />
              <span>Trainer: {cls.trainerName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClasses;
