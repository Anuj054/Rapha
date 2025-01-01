import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "Name",
    email: "example@gmail.com",
    address: "address",
    gender: "",
    number: "1234567890",
  });

  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profilePhotos/${file.name}`);
      try {
        await uploadBytes(storageRef, file); // Upload the file
        const downloadURL = await getDownloadURL(storageRef); // Get the file's URL
        setImageUrl(downloadURL);
        console.log("Image uploaded successfully:", downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data saved:", { ...formData, imageUrl });
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col p-4 lg:p-8">
        <div className="mt-6 ml-6">
          <h1 className="text-2xl font-semibold mt-4 text-start ml-4 mb-4 text-gray-600">
            General Settings
          </h1>
        </div>
        <div className="flex m-3 h-full border rounded-lg justify-items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-full h-full items-center justify-center"
          >
            <div className="flex flex-col justify-between gap-5">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <label className="text-blue-400 text-sm cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                      />
                      Upload Photo
                    </label>
                  )}
                </div>
              </div>

              {/* Other form fields */}

              <div className="flex flex-col sm:flex-row gap-5 justify-between">
                <div className="flex flex-col w-full sm:w-80">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-2 text-gray-600 rounded-sm border shadow-sm bg-gray-100 sm:text-sm"
                  />
                </div>
                <div className="flex flex-col w-full sm:w-80">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 text-gray-600 rounded-sm border shadow-sm bg-gray-100 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 justify-between">
                <div className="flex flex-col w-full sm:w-80">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 p-2 text-gray-600 rounded-sm border shadow-sm bg-gray-100 sm:text-sm"
                  />
                </div>
                <div className="flex flex-col w-full sm:w-80">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 p-2 text-gray-600 rounded-sm border shadow-sm bg-gray-100 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 justify-between">
                <div className="flex flex-col w-full sm:w-80">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Number
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.number}
                    onChange={handleChange}
                    className="mt-1 p-2 text-gray-600 rounded-sm border shadow-sm bg-gray-100 sm:text-sm"
                  />
                </div>
              </div>

              {/* Add other fields similarly */}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="w-[150px] bg-[#8920FE] text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8920FE] focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
