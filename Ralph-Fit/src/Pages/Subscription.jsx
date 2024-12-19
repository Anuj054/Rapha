import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Import Sidebar component

const Subscription = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    startDate: "",
    endDate: "",
    membershipName: "",
    session: "",
    plan: "",
    diet: "",
    trainer: "",
    trainingSlot: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle payment status change
  const handlePaymentStatus = (status) => {
    setPaymentStatus(status.toLowerCase()); // Ensure status is stored as "paid" or "unpaid" in lowercase
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add payment status to form data
    const data = { ...formData, paymentStatus };
  
    try {
      const response = await fetch("https://web-ai-gym-project.vercel.app/api/membership/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      // Log the response to the console
      console.log(result);
  
      if (response.ok) {
        alert("Membership created successfully");
        // You can redirect or reset the form here
      } else {
        alert(`Error: ${result.message || "Server Error"}`);
      }
    } catch (error) {
      console.error("Error during request:", error); // Log the error
      alert("Error: Could not connect to server");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="main flex-1 p-5">
        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-left mt-5 font-semibold justify-start text-2xl text-gray-600 mb-5">
            Membership
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-5 justify-between">
              <div className="flex flex-col w-full sm:w-56">
                <label className="text-sm text-gray-600 mb-1">User Name*</label>
                <input
                  type="text"
                  placeholder="Enter user name"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-full"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col w-full sm:w-56">
                <label className="text-sm text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-full"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col w-full sm:w-56">
                <label className="text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-full"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-5 justify-between">
              <div className="flex flex-col w-full sm:w-80">
                <label className="text-sm text-gray-600 mb-1">Membership Name*</label>
                <input
                  type="text"
                  placeholder="Enter membership name"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-full"
                  name="membershipName"
                  value={formData.membershipName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col w-full sm:w-80">
                <label className="text-sm text-gray-600 mb-1">Sessions*</label>
                <input
                  type="number"
                  placeholder="Enter number of sessions"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-full"
                  name="session"
                  value={formData.session}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-5 justify-between">
              <div className="flex flex-col w-full sm:w-80">
                <label className="text-sm text-gray-600 mb-1">Plan*</label>
                <input
                  type="text"
                  placeholder="Enter plan details"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-full"
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col w-full sm:w-80">
                <label className="text-sm text-gray-600 mb-1">Diet*</label>
                <input
                  type="text"
                  placeholder="Enter diet details"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-full"
                  name="diet"
                  value={formData.diet}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-5 justify-between">
              <div className="flex flex-col w-full sm:w-80">
                <label className="text-sm text-gray-600 mb-1">Trainer*</label>
                <input
                  type="text"
                  placeholder="Enter trainer name"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-full"
                  name="trainer"
                  value={formData.trainer}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col w-full sm:w-80">
                <label className="text-sm text-gray-600 mb-1">Training Slot</label>
                <input
                  type="text"
                  placeholder="Enter training slot"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-full"
                  name="trainingSlot"
                  value={formData.trainingSlot}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm text-gray-600 mb-1">Payment</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm border text-gray-500 bg-gray-200 rounded-md cursor-pointer w-24 hover:bg-gray-300 ${
                    paymentStatus === "paid" ? "text-black" : "bg-gray-200"
                  }`}
                  onClick={() => handlePaymentStatus("paid")}
                >
                  Paid
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm border text-gray-500 bg-gray-200 rounded-md cursor-pointer w-24 hover:bg-gray-300 ${
                    paymentStatus === "unpaid" ? "text-black" : "bg-gray-200"
                  }`}
                  onClick={() => handlePaymentStatus("unpaid")}
                >
                  Unpaid
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-5">
              <button type="button" className="px-5 py-2 text-sm bg-white border border-purple-600 rounded-md hover:bg-gray-100">
                Renew
              </button>
              <button type="submit" className="px-5 py-2 text-sm bg-purple-600 text-white rounded-md">
                Complete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
