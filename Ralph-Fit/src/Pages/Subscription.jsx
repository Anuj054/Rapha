import React, { useState } from "react";
import Sidebar from "../Components/SideBar"; // Import Sidebar component
import Navbar from "../Components/NavBar";

const Subscription = () => {
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePaymentStatus = (status) => {
    setPaymentStatus(status);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="main flex-1 ">
        {/* Main Content */}
        <div className="navbar">
          <Navbar />
        </div>
        <div className=" p-5  w-full pl-48 pr-48">
          <h1 className="text-left mt-5  justify-start text-xl text-gray-800 mb-5">
            Membership
          </h1>
          <form className="flex flex-col gap-4 ">
            <div className="flex justify-between gap-5 ">
              <div className="flex flex-col w-56 ">
                <label className="text-sm text-gray-600 mb-1">User Name*</label>
                <input
                  type="text"
                  placeholder="Enter user name"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-auto"
                />
              </div>

              <div className="flex flex-col w-56 ">
                <label className="text-sm text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  placeholder="Start Date"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-auto"
                />
              </div>
              <div className="flex flex-col w-56 ">
                <label className="text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-auto"
                />
              </div>
            </div>
            <div className="flex  justify-between">
              <div className="flex flex-col w-80 ">
                <label className="text-sm text-gray-600 mb-1">
                  Membership Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter membership name"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-auto"
                />
              </div>

              <div className="flex flex-col w-80 ">
                <label className="text-sm text-gray-600 mb-1">Sessions*</label>
                <input
                  type="number"
                  placeholder="Enter number of sessions"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-auto"
                />
              </div>
            </div>
            <div className="flex gap-5 justify-between">
              <div className="flex flex-col w-80 ">
                <label className="text-sm text-gray-600 mb-1">Plan*</label>
                <input
                  type="text"
                  placeholder="Enter plan details"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-auto"
                />
              </div>

              <div className="flex flex-col w-80 ">
                <label className="text-sm text-gray-600 mb-1">Diet*</label>
                <input
                  type="text"
                  placeholder="Enter diet details"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-auto"
                />
              </div>
            </div>
            <div className="flex  justify-between">
              <div className="flex flex-col w-80 ">
                <label className="text-sm text-gray-600 mb-1">Trainer*</label>
                <input
                  type="text"
                  placeholder="Enter trainer name"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-auto"
                />
              </div>

              <div className="flex flex-col w-80 ">
                <label className="text-sm text-gray-600 mb-1">
                  Training Slot
                </label>
                <input
                  type="text"
                  placeholder="Enter training slot"
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 w-auto "
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm text-gray-600 mb-1">Payment</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm border text-gray-500 bg-gray-200  rounded-md cursor-pointer w-24 hover:bg-gray-300 ${
                    paymentStatus === "Paid" ? " text-black" : "bg-gray-200"
                  }`}
                  onClick={() => handlePaymentStatus("Paid")}
                >
                  Paid
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm border text-gray-500 bg-gray-200  rounded-md cursor-pointer w-24 hover:bg-gray-300 ${
                    paymentStatus === "Unpaid" ? " text-black" : "bg-gray-200"
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
                className="px-5 py-2 text-sm bg-white border border-purple-600 rounded-md hover:bg-gray-100"
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
