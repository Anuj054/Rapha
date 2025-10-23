import React, { useState, useEffect } from "react";

// Get backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserDetailModal = ({ isOpen, onClose, userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userId) {
      const fetchUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`${BACKEND_URL}/api/users/getById/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          const data = await response.json();
          setUserDetails(data);
        } catch (error) {
          console.error("Error fetching user details:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-4/5 md:w-1/2 p-6">
        <button className="text-gray-600 hover:text-gray-800 float-right" onClick={onClose}>
          ✖
        </button>
        {loading ? (
          <div className="text-center">Loading user details...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : (
          userDetails && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={userDetails.profilePicture || "https://via.placeholder.com/150"}
                  alt={`${userDetails.name}'s profile`}
                  className="w-16 h-16 rounded-full"
                />
                <h2 className="text-xl font-bold">{userDetails.name}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Phone:</strong> {userDetails.phone}</p>
                <p><strong>Gender:</strong> {userDetails.gender}</p>
                <p><strong>Class:</strong> {userDetails.class}</p>
                <p><strong>Package:</strong> {userDetails.package}</p>
                <p><strong>Age:</strong> {userDetails.age}</p>
                <p><strong>Height:</strong> {userDetails.height} cm</p>
                <p><strong>Weight:</strong> {userDetails.weight} kg</p>
                <p><strong>BMI:</strong> {userDetails.bmi}</p>
                <p><strong>Body Fat:</strong> {userDetails.bodyFat}%</p>
                <p><strong>Body Water:</strong> {userDetails.bodyWater}%</p>
                <p><strong>Skeletal Muscle:</strong> {userDetails.skeletalMuscle}%</p>
                <p><strong>Bone Mass:</strong> {userDetails.boneMass} kg</p>
                <p><strong>Visceral Fat:</strong> {userDetails.visceralFat}</p>
                <p><strong>BMR:</strong> {userDetails.bmr} kcal/day</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserDetailModal;