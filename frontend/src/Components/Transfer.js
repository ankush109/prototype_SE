import React, { useEffect, useState } from "react";
import { GetUserQuery, getUserByPhone, sendMoney } from "../api/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Lottie from "react-lottie-player";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Navbar from "./Navbar";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Loading from "./Loading";
import paymentSuccess from "./paySuccess.json";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import post from "./wallet.json";
function Transfer() {
  const user = GetUserQuery();
  const accounts = user?.data?.bankAccounts || [];
  const [formValues, setFormValues] = useState({
    receiverPhoneNumber: "",
    amount: "",
    description: "",
    paymentMethod: "credit card",
  });
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [found, setFound] = useState(null);
  const [pin, setPin] = useState(false);
  const [pinVal, setPinVal] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const selectedBankAccount = accounts[selectedAccountIndex] || {};

  const handleAccountChange = (index) => {
    setSelectedAccountIndex(index);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === "receiverPhoneNumber" && value.length === 10) {
      try {
        const response = await getUserByPhone(value);
        if (response.success) {
          setFound(response.message);
        } else {
          setFound(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const resetForm = () => {
    setFormValues({
      receiverPhoneNumber: "",
      amount: "",
      description: "",
      paymentMethod: "credit card",
    });
    setFound(null);
  };

  const checkConfirmPayment = async () => {
    if (pinVal === selectedBankAccount.mpin) {
      setLoading(true);
      try {
        const data = await sendMoney(
          selectedBankAccount.phoneNumber,
          found.phoneNumber,
          found.walletId,
          selectedBankAccount.walletId,
          parseFloat(formValues.amount),
          formValues.description,
          "INR",
          formValues.paymentMethod
        );

        if (data.success) {
          setSuccess(true);
          toast.success("Money sent successfully!");
        } else {
          toast.error("Transaction failed. Please try again.");
        }
      } catch (error) {
        toast.error("Error during transaction.");
      } finally {
        setLoading(false);
        setPin(false);
      }
    } else {
      toast.error("Incorrect MPIN. Transaction failed.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.receiverPhoneNumber === user?.data?.phoneNumber) {
      toast.error("Cannot send money to yourself.");
    } else {
      setPin(true);
    }
  };

  return (
    <div className="bg-slate-300 max-h-full p-3">
      <Navbar />
      <div className="container bg-slate-300 flex items-center justify-center mx-auto mt-8">
        <div>
          <Lottie animationData={post} play />
        </div>
        <div className="bg-blue-500 text-white w-1/3 h-1/2 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-4">Payment</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <label className="text-gray-600">Select Bank Account:</label>
              <select
                value={selectedAccountIndex}
                onChange={(e) => handleAccountChange(e.target.value)}
                className="w-full text-black border border-gray-900 rounded"
              >
                {accounts.map((account, index) => (
                  <option key={index} value={index}>
                    {account.bankName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">
                Receiver Phone Number:
              </label>
              <input
                type="text"
                name="receiverPhoneNumber"
                value={formValues.receiverPhoneNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 text-black w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {found ? (
                <div className="mb-4 border p-4">
                  <h2 className="text-lg font-bold mb-2">User Details</h2>
                  <p><strong>Name:</strong> {found.accountHolderName}</p>
                  <p><strong>Bank:</strong> {found.bankName}</p>
                  <p><strong>Account Number:</strong> {found.accountNumber}</p>
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
                value={formValues.amount}
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
                value={formValues.description}
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
                value={formValues.paymentMethod}
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
              <div onClick={resetForm}>
                <RestartAltIcon />
              </div>
            </div>
          </form>
        </div>

        {pin && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-70">
            <div className="bg-white rounded p-6 w-[600px] h-[430px] shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-500 mb-4">
                Transferring ₹ {formValues.amount} to {found?.accountHolderName}
              </h3>
              <span className="font-bold">{found.bank} Bank</span>
              <p className="my-6 text-black">
                Please enter your MPIN to continue this payment.
              </p>
              <input
                type="password"
                value={pinVal}
                onChange={(e) => setPinVal(e.target.value)}
                className="w-full border p-4 rounded mb-6"
              />
              <button
                className="bg-blue-500 text-white w-full p-4 rounded hover:bg-blue-600"
                onClick={checkConfirmPayment}
              >
                {loading ? <Loading /> : "Confirm Payment"}
              </button>
            </div>
          </div>
        )}
        {success && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-70">
            <div className="bg-white rounded p-6 w-[600px] h-[430px] shadow-lg flex flex-col  items-center justify-center">
              <Lottie animationData={paymentSuccess} play />
              <h1 className="text-green-500 font-bold text-xl">
                ₹ {formValues.amount} sent successfully to {found?.accountHolderName}
              </h1>
             
              <button
                className="bg-blue-500 text-white p-4 w-[200px] rounded mt-4 hover:bg-blue-600"
                onClick={() => {
                  navigate("/");
                  setSuccess(false);
                  resetForm();
                }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transfer;
