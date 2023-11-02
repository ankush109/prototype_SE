import React, { useEffect, useState } from "react";
import { getUserByPhone } from "../api/user";

function Transfer() {
  const [formData, setFormData] = useState({
    receiverPhoneNumber: "",
    amount: "",
    description: "",
    currency: "USD",
    paymentMethod: "credit card",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "receiverPhoneNumber") {
      try {
        const response = await getUserByPhone(value);
        console.log(response, "user found");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Transfer Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Receiver Phone Number:
          </label>
          <input
            type="text"
            name="receiverPhoneNumber"
            value={formData.receiverPhoneNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Amount:
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Currency:
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            {/* Add more currency options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Payment Method:
          </label>
          <input
            type="text"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Transfer;
