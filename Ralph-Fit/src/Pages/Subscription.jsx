import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Import Sidebar component
import Navbar from "../Components/NavBar";

const Subscription = () => {
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePaymentStatus = (status) => {
    setPaymentStatus(status);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="main flex-1 p-10">
        {/* Main Content */}
        <div className="navbar">
          <Navbar />
        </div>
        <div className="membership-container">
          <h1 className="text-left text-xl text-gray-800 mb-5">Membership</h1>
          <form className="flex flex-col gap-4">
            <div className="flex gap-5">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">User Name*</label>
                <input
                  type="text"
                  placeholder="Enter user name"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-72"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  placeholder="Start Date"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-72"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-72"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Membership Name*</label>
                <input
                  type="text"
                  placeholder="Enter membership name"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-72"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Sessions*</label>
                <input
                  type="number"
                  placeholder="Enter number of sessions"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-72"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Plan*</label>
              <input
                type="text"
                placeholder="Enter plan details"
                className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-72"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Diet*</label>
              <input
                type="text"
                placeholder="Enter diet details"
                className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-72"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Trainer*</label>
              <input
                type="text"
                placeholder="Enter trainer name"
                className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-72"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Training Slot</label>
              <input
                type="text"
                placeholder="Enter training slot"
                className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-72"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm text-gray-600 mb-1">Payment</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm border border-gray-300 rounded-md cursor-pointer ${
                    paymentStatus === "Paid" ? "bg-purple-600 text-white" : "bg-white"
                  }`}
                  onClick={() => handlePaymentStatus("Paid")}
                >
                  Paid
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm border border-gray-300 rounded-md cursor-pointer ${
                    paymentStatus === "Unpaid" ? "bg-purple-600 text-white" : "bg-white"
                  }`}
                  onClick={() => handlePaymentStatus("Unpaid")}
                >
                  Unpaid
                </button>
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-5">
              <button
                type="button"
                className="px-5 py-2 text-sm bg-white border border-gray-300 rounded-md"
              >
                Renew
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm bg-purple-600 text-white rounded-md"
              >
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
