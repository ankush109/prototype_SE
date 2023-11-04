import React, { useEffect, useState } from "react";
import { GetUserQuery, getUserByPhone, sendMoney } from "../api/user";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import post from "./wallet.json";
import Lottie from "react-lottie-player";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
function Transfer() {
  const user = GetUserQuery();
  const [found, setFound] = useState(null);
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentMethod, setPaymentMethod] = useState("credit card");
  const navigate = useNavigate();
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === "receiverPhoneNumber") {
      setFound(null); // Clear found information when the receiver phone number changes
    }
    if (name === "receiverPhoneNumber") {
      try {
        const response = await getUserByPhone(value);
        console.log(response, "user found");
        if (response.success) {
          setFound(response.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    switch (name) {
      case "receiverPhoneNumber":
        setReceiverPhoneNumber(value);
        break;
      case "amount":
        setAmount(value);
        break;
      case "description":
        setDescription(value);
        break;

      case "paymentMethod":
        setPaymentMethod(value);
        break;
      default:
        break;
    }
  };
  const resetForm = () => {
    setAmount("");
    setReceiverPhoneNumber("");
    setDescription("");
    setFound("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", receiverPhoneNumber);
    if (receiverPhoneNumber === user.data.phonenumber) {
      toast.error("cannot send  to yourself");
    } else {
      const data = await sendMoney(
        receiverPhoneNumber,
        parseFloat(amount),
        description,
        "INR",
        paymentMethod
      );
      console.log(data);
      if (data.success) {
        toast.success("Money sent");
      }
      setReceiverPhoneNumber("");
      setAmount("");
      setDescription("");
      navigate("/");
      navigate("/");
    }
  };

  return (
    <div className="container flex justify-center mx-auto mt-8">
      <div className="bg-blue-400 w-1/3 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold mb-4">Payment </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Receiver Phone Number:
            </label>
            <input
              type="text"
              name="receiverPhoneNumber"
              value={receiverPhoneNumber}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            {found ? (
              <div className="mb-4 border p-4">
                <h2 className="text-lg font-bold mb-2">User Details</h2>
                <p>
                  <strong>Name:</strong> {found.name}
                </p>
                <p>
                  <strong>Bank:</strong> {found.bank}
                </p>
                <p>
                  <strong>Account Number:</strong> {found?.AccountNumber}
                </p>
                {/* Add more user details as needed */}
              </div>
            ) : (
              "No user found"
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              value={amount}
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
              value={description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Payment Method:
            </label>
            <input
              type="text"
              name="paymentMethod"
              value={paymentMethod}
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
          <div onClick={() => resetForm()}>
            <RestartAltIcon />
          </div>
        </form>
      </div>
      <div>
        <Lottie animationData={post} play />
      </div>
    </div>
  );
}

export default Transfer;
