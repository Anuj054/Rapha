import React, { useEffect, useState } from "react";
import { FaFire, FaRunning } from "react-icons/fa";

// Get backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UpcomingClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/class/getAll`
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

  const totalPages = Math.ceil(classes.length / itemsPerPage);
  const paginatedClasses = classes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
      <div className="grid grid-cols-3 gap-4">
        {paginatedClasses.map((cls, index) => (
          <div
            key={cls._id || index}
            className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200"
          >
            <h3 className="text-lg text-purple-700 font-semibold mb-2">
              {cls.className}
            </h3>

            <div className="flex items-center text-gray-600 text-sm mb-2">
              <span className="text-green-500 mr-2">🗓️</span>
              <span>{new Date(cls.date).toLocaleDateString()}</span>
            </div>

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

            <div className="flex items-center text-sm text-gray-600">
              <FaRunning className="text-blue-500 mr-1" />
              <span>Trainer: {cls.trainerName}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UpcomingClasses;