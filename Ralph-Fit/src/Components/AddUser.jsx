import React, { useState } from "react";

const AddUserPopup = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    gender: "Female", // Default gender
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
    profilePhoto: "", // Added profile photo field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle field value changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input and convert to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePhoto: reader.result }); // Store Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Add another user without closing the popup
  const handleAddAnother = () => {
    if (typeof onSubmit === "function") {
      onSubmit(formData);
    } else {
      console.error("onSubmit is not a function");
    }

    setFormData({
      name: "",
      class: "",
      gender: "Female", // Reset to default gender
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
      profilePhoto: "", // Reset profile photo
    });
  };

  // Submit the form data to the server
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
  
      const response = await fetch(
        "https://web-ai-gym-project.vercel.app/api/users/create",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        onSubmit?.(formData);
        onClose();
        alert("User added successfully!");
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white w-[80%] max-w-4xl rounded-lg p-6 shadow-lg relative">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">Add User</h2>
          <button className="text-xl text-gray-800" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mt-4">
          {/* Manually Section */}
          <h3 className="text-lg font-medium mb-3 text-gray-700">Manually</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
            {/* Profile Photo */}
            <div className="p-2 border border-gray-300 rounded-md text-sm">
              <button type="button" className="text-sm focus:outline-none">
                <label className="text-gray-400">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  Upload Photo
                </label>
              </button>
              {formData.profilePhoto && (
                <img
                  src={formData.profilePhoto}
                  alt="Profile Preview"
                  className="mt-2 w-20 h-20 object-cover rounded-full"
                />
              )}
            </div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="class"
              type="text"
              placeholder="Class"
              value={formData.class}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              name="package"
              type="text"
              placeholder="Package"
              value={formData.package}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Body Metrics Section */}
          <h3 className="text-lg font-medium mb-3 text-gray-700">
            Body Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "height",
              "weight",
              "age",
              "boneMass",
              "protein",
              "fatFreeMass",
              "skeletalMuscle",
              "subcutaneousFat",
              "bmi",
              "visceralFat",
              "bmr",
              "bodyWater",
              "bodyFat",
            ].map((metric) => (
              <input
                key={metric}
                name={metric}
                type="number"
                placeholder={metric
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                value={formData[metric]}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md text-sm"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              className="flex items-center justify-center border-2 border-purple-600 text-purple-600 bg-white px-4 py-2 rounded-full hover:bg-purple-100 text-sm"
              onClick={handleAddAnother}
            >
              <span className="mr-2">➕</span> Add Another
            </button>
            <button
              className={`${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600"
              } text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Add User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPopup;
