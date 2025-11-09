import React, { useState, useEffect } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserDetailModal = ({ isOpen, onClose, userId, onUserUpdated }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserDetails();
    }
  }, [isOpen, userId]);

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
      setEditedUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      // Remove password field if empty (don't update password)
      const updateData = { ...editedUser };
      if (!updateData.password || updateData.password === '') {
        delete updateData.password;
      }

      const response = await fetch(`${BACKEND_URL}/api/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      setUserDetails(data.user);
      setIsEditing(false);
      
      // Notify parent component to refresh the user list
      if (onUserUpdated) {
        onUserUpdated();
      }
      
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.message);
      alert("Failed to update user: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/delete/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      alert("User deleted successfully!");
      
      // Notify parent component to refresh the user list
      if (onUserUpdated) {
        onUserUpdated();
      }
      
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user: " + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-4/5 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">User Details</h2>
          <button 
            className="text-gray-600 hover:text-gray-800 text-2xl" 
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading user details...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">Error: {error}</div>
        ) : (
          userDetails && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={userDetails.profilePicture || "https://via.placeholder.com/150"}
                  alt={`${userDetails.name}'s profile`}
                  className="w-20 h-20 rounded-full object-cover"
                />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-xl font-bold border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  <h3 className="text-xl font-bold">{userDetails.name}</h3>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Basic Information */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg border-b pb-2">Basic Information</h4>
                  
                  <div>
                    <strong>Email:</strong> 
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="ml-2">{userDetails.email}</span>
                    )}
                  </div>

                  <div>
                    <strong>Phone:</strong> 
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="ml-2">{userDetails.phone}</span>
                    )}
                  </div>

                  <div>
                    <strong>Gender:</strong> 
                    {isEditing ? (
                      <select
                        value={editedUser.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-full"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <span className="ml-2">{userDetails.gender}</span>
                    )}
                  </div>

                  <div>
                    <strong>Age:</strong> 
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedUser.age || ''}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="ml-2">{userDetails.age || 'N/A'}</span>
                    )}
                  </div>

                  <div>
                    <strong>Class:</strong> 
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.class}
                        onChange={(e) => handleInputChange('class', e.target.value)}
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="ml-2">{userDetails.class}</span>
                    )}
                  </div>

                  <div>
                    <strong>Package:</strong> 
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.package}
                        onChange={(e) => handleInputChange('package', e.target.value)}
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="ml-2">{userDetails.package}</span>
                    )}
                  </div>

                  {isEditing && (
                    <div>
                      <strong>New Password:</strong> 
                      <input
                        type="password"
                        placeholder="Leave blank to keep current"
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="ml-2 border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    </div>
                  )}
                </div>

                {/* Body Metrics */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg border-b pb-2">Body Metrics</h4>
                  
                  {['height', 'weight', 'bmi', 'bodyFat', 'bodyWater', 'skeletalMuscle', 
                    'boneMass', 'visceralFat', 'bmr', 'protein', 'fatFreeMass', 'subcutaneousFat'].map((field) => (
                    <div key={field}>
                      <strong>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> 
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editedUser[field] || ''}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          className="ml-2 border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span className="ml-2">
                          {userDetails[field] || 'N/A'}
                          {field === 'height' && userDetails[field] ? ' cm' : ''}
                          {field === 'weight' && userDetails[field] ? ' kg' : ''}
                          {field === 'boneMass' && userDetails[field] ? ' kg' : ''}
                          {field === 'bmr' && userDetails[field] ? ' kcal/day' : ''}
                          {['bodyFat', 'bodyWater', 'skeletalMuscle', 'protein', 'subcutaneousFat'].includes(field) && userDetails[field] ? '%' : ''}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedUser(userDetails);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete User
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit User
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserDetailModal;