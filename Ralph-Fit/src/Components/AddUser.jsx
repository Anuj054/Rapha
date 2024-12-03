import React from "react";

const AddUserPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white w-[80%] max-w-xl rounded-lg p-6 shadow-lg relative">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl text-gray-800">Add New User</h2>
          <button className="text-xl text-gray-800" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mt-5">
          <h3 className="text-xl mb-4 text-gray-700">User Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="First Name"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Role"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-white border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-600 hover:text-white">
              Add Another
            </button>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              onClick={onClose}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPopup;
