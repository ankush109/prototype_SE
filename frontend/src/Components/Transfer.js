import React, { useEffect, useState } from "react";
import { GetUserQuery, getUserByPhone, sendMoney } from "../api/user";
import toast, { LoaderIcon } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import post from "./wallet.json";
import Lottie from "react-lottie-player";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Navbar from "./Navbar";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { ListItemSecondaryAction } from "@mui/material";
import Loading from "./Loading";
function Transfer() {
  const user = GetUserQuery();
  const [found, setFound] = useState(null);
  const [pin, setpin] = useState(false);
  const [pinval, setpinval] = useState("");
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(false);
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
  const checkconfirmPayment = async () => {
    if (pinval === user?.data.mpin) {
      const data = await sendMoney(
        receiverPhoneNumber,
        parseFloat(amount),
        description,
        "INR",
        paymentMethod
      );
      setloading(true);
      setTimeout(() => {
        console.log(data);
        if (data.success) {
          toast.success("Money sent");
        }
        setReceiverPhoneNumber("");
        setAmount("");
        setDescription("");
        navigate("/");
        navigate("/");
        setpin(false);
        setloading(false);
      }, 3000);
    } else {
      toast.error("wrong mpin transaction failed");
      setReceiverPhoneNumber("");
      setAmount("");
      setDescription("");
      navigate("/");
      navigate("/");
      setpin(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setpin(true);
    // console.log("Form Data:", receiverPhoneNumber);
    // if (receiverPhoneNumber === user.data.phonenumber) {
    //   toast.error("cannot send  to yourself");
    // } else {
    //   setpin(true);
    //   const data = await sendMoney(
    //     receiverPhoneNumber,
    //     parseFloat(amount),
    //     description,
    //     "INR",
    //     paymentMethod
    //   );
    //   console.log(data);
    //   if (data.success) {
    //     toast.success("Money sent");
    //   }
    //   setReceiverPhoneNumber("");
    //   setAmount("");
    //   setDescription("");
    //   navigate("/");
    // navigate("/");
  };

  return (
    <div className="bg-slate-300 max-h-full p-3">
      <Navbar />
      <div className="container bg-slate-300 flex items-center justify-center mx-auto mt-8 ">
        <div className="">
          <Lottie animationData={post} play />
        </div>
        <div className="bg-blue-500  text-white w-1/3 h-1/2 shadow-lg  rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-4">Payment </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">
                Receiver Phone Number:
              </label>
              <input
                type="text"
                name="receiverPhoneNumber"
                value={receiverPhoneNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 text-black w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {found ? (
                <div className="mb-4 border p-4">
                  <h2 className="text-lg  font-bold mb-2">User Details</h2>
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
              <label className="block text-sm font-medium text-white">
                Amount : ₹
              </label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={handleInputChange}
                className="mt-1 text-black p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">
                Description:
              </label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleInputChange}
                className="mt-1 text-black p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white">
                Payment Method:
              </label>
              <input
                type="text"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handleInputChange}
                className="mt-1 text-black p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-blue-800 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
              >
                Pay
              </button>
              <div onClick={() => resetForm()}>
                <RestartAltIcon />
              </div>
            </div>
          </form>
        </div>

        {pin && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-70">
            <div className="bg-white  rounded p-6 w-[600px]  h-[430px] shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-500 mb-4">
                Transferring ₹ {amount} to {found?.name}
              </h3>
              <span className="font-bold ">{found.bank} Bank</span>
              <p className="text-gray-600 mb-4">Please Enter Your Mpin:</p>
              <div className="mb-4">
                <input
                  type="password" // Set the input type to "password" for MPIN entry
                  name="mpin"
                  autofocus
                  value={pinval}
                  placeholder="enter your Pin here"
                  onChange={(e) => {
                    setpinval(e.target.value);
                  }}
                  className="mt-1  p-2 w-full rounded  focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={checkconfirmPayment}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                  Pay
                </button>
                <button
                  onClick={() => setpin(false)}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none"
                >
                  Close
                </button>
              </div>
              <div className="bg-orange-400 flex p-2 my-3 rounded-lg text-white">
                <PriorityHighIcon />
                <h1>Money Will be send to {found?.name}</h1>
              </div>
              {loading ? <Loading /> : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transfer;
