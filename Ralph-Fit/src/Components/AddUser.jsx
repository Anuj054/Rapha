import React, { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AddUserPopup = ({ isOpen, onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    gender: "Male",
    email: "",
    phone: "",
    password: "",
    package: "",
    height: "",
    weight: "",
    age: "",
    boneMass: "",
    protein: "",
    fatFreeMass: "",
    skeletalMuscle: "",
    subcutaneousFat: "",
    bmi: "",
    visceralFat: "",
    bmr: "",
    bodyWater: "",
    bodyFat: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear error when user types
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateRequiredFields = () => {
    const required = ['name', 'gender', 'class', 'phone', 'password', 'package'];
    const missing = required.filter(field => !formData[field] || formData[field].trim() === '');
    
    if (missing.length > 0) {
      setError(`Please fill in required fields: ${missing.join(', ')}`);
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      class: "",
      gender: "Male",
      email: "",
      phone: "",
      password: "",
      package: "",
      height: "",
      weight: "",
      age: "",
      boneMass: "",
      protein: "",
      fatFreeMass: "",
      skeletalMuscle: "",
      subcutaneousFat: "",
      bmi: "",
      visceralFat: "",
      bmr: "",
      bodyWater: "",
      bodyFat: "",
      profilePicture: "",
    });
    setError(null);
  };

  const handleAddAnother = async () => {
    if (!validateRequiredFields()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dataToSend = { ...formData };
      
      // Remove empty optional fields
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] === "" || dataToSend[key] === null) {
          delete dataToSend[key];
        }
      });

      const response = await fetch(`${BACKEND_URL}/api/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        alert("User added successfully! You can add another.");
        resetForm();
        if (onUserAdded) {
          onUserAdded();
        }
      } else {
        setError(result.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("An error occurred while adding the user.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateRequiredFields()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dataToSend = { ...formData };
      
      // Remove empty optional fields
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] === "" || dataToSend[key] === null) {
          delete dataToSend[key];
        }
      });

      console.log("Data being sent to API:", dataToSend);

      const response = await fetch(`${BACKEND_URL}/api/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        alert("User added successfully!");
        if (onUserAdded) {
          onUserAdded();
        }
        resetForm();
        onClose();
      } else {
        setError(result.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("An error occurred while adding the user.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white w-[90%] max-w-4xl rounded-lg p-6 shadow-lg relative max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
          <button 
            className="text-2xl text-gray-600 hover:text-gray-800" 
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            ✖
          </button>
        </div>

        <div className="mt-4">
          {/* Basic Information */}
          <h3 className="text-lg font-medium mb-3 text-gray-700 border-b pb-2">
            Basic Information <span className="text-red-500 text-sm">(* Required)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select Class</option>
                <option value="Private">Private</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package <span className="text-red-500">*</span>
              </label>
              <input
                name="package"
                type="text"
                placeholder="e.g., Monthly, Quarterly"
                value={formData.package}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                name="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Body Metrics */}
          <h3 className="text-lg font-medium mb-3 text-gray-700 border-b pb-2">
            Body Metrics <span className="text-gray-500 text-xs">(Optional)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { key: "height", label: "Height (cm)" },
              { key: "weight", label: "Weight (kg)" },
              { key: "bmi", label: "BMI" },
              { key: "bodyFat", label: "Body Fat (%)" },
              { key: "bodyWater", label: "Body Water (%)" },
              { key: "skeletalMuscle", label: "Skeletal Muscle (%)" },
              { key: "boneMass", label: "Bone Mass (kg)" },
              { key: "visceralFat", label: "Visceral Fat" },
              { key: "bmr", label: "BMR (kcal/day)" },
              { key: "protein", label: "Protein (%)" },
              { key: "fatFreeMass", label: "Fat Free Mass" },
              { key: "subcutaneousFat", label: "Subcutaneous Fat (%)" },
            ].map((metric) => (
              <div key={metric.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {metric.label}
                </label>
                <input
                  name={metric.key}
                  type="number"
                  step="0.1"
                  placeholder={`Enter ${metric.label.toLowerCase()}`}
                  value={formData[metric.key]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              className="flex items-center justify-center border-2 border-purple-600 text-purple-600 bg-white px-5 py-2 rounded-md hover:bg-purple-50 text-sm font-medium transition-colors"
              onClick={handleAddAnother}
              disabled={loading}
            >
              <span className="mr-2">➕</span> Add Another
            </button>
            <button
              className={`${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              } text-white px-6 py-2 rounded-md text-sm font-medium transition-colors`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Adding User..." : "Add User & Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPopup;