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
import paymentSuccess from "./paySuccess.json";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function Transfer() {
  const user = GetUserQuery();
  const accounts = user?.data?.bankAccounts;
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [found, setFound] = useState(null);
  const [pin, setpin] = useState(false);
  const [pinval, setpinval] = useState("");
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setsuccess] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit card");
  const [selectedBankAccount, setSelectedBankAccount] = useState(accounts[0]);
  const navigate = useNavigate();

  const handleAccountChange = (index) => {
    if (!index) {
      setSelectedAccountIndex(0);
      setSelectedBankAccount(user?.data?.bankAccounts[0]);
    } else {
      setSelectedAccountIndex(index);
      setSelectedBankAccount(accounts[index]);
    }
  };
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    // Clear found information when the receiver phone number changes
    if (name === "receiverPhoneNumber") {
      setFound(null);
    }

    // Fetch user details when the receiver phone number has 10 digits
    if (name === "receiverPhoneNumber" && value.length === 10) {
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

    // Handle other input changes
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
  useEffect(() => {
    console.log(found, "found");
  });
  const resetForm = () => {
    setAmount("");
    setReceiverPhoneNumber("");
    setDescription("");
    setFound("");
  };
  // const checkconfirmPayment = async () => {
  //   if (pinval === user?.data.mpin) {
  //     const data = await sendMoney(
  //       receiverPhoneNumber,
  //       parseFloat(amount),
  //       description,
  //       "INR",
  //       paymentMethod
  //     );
  //     setloading(true);
  //     setTimeout(() => {
  //       console.log(data);
  //       if (data.success) {
  //         toast.success("Money sent");
  //       }
  //       setReceiverPhoneNumber("");
  //       setAmount("");
  //       setDescription("");
  //       navigate("/");
  //       navigate("/");
  //       setpin(false);
  //       setsuccess(true);
  //       setloading(false);
  //     }, 6000);
  //   } else {
  //     toast.error("wrong mpin transaction failed");
  //     setReceiverPhoneNumber("");
  //     setAmount("");
  //     setDescription("");
  //     navigate("/");
  //     navigate("/");
  //     setpin(false);
  //   }
  // };
  const checkconfirmPayment = async () => {
    console.log(selectedBankAccount, "s");
    if (pinval === selectedBankAccount?.mpin) {
      const data = await sendMoney(
        selectedBankAccount?.phoneNumber,
        found?.phoneNumber,
        found?.walletId, // reciever
        selectedBankAccount.walletId, // senders selected bank accounts wallet
        parseFloat(amount),
        description,
        "INR",
        paymentMethod
      );
      setloading(true);
      setTimeout(() => {
        if (data.success) {
          // Update the success state when payment is successful
          setsuccess(true);
          toast.success("Money sent");
        }
        // setReceiverPhoneNumber("");
        // setAmount("");
        // setDescription("");

        setpin(false);
        setloading(false);
      }, 6000);
    } else {
      toast.error("wrong mpin transaction failed");
    }
  };
  // const selectBank = (bank) => {
  //   setSelectedBankAccount(bank);
  //   console.log(bank, "bank");
  // };
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
            <div className="flex justify-between items-center mb-4">
              <label className="text-gray-600">Select Bank Account:</label>
              <select
                value={selectedAccountIndex}
                onChange={(e) => handleAccountChange(e.target.value)}
                className="w- text-black border border-gray-900 rounded"
              >
                {user?.data?.bankAccounts?.map((account, index) => (
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
                value={receiverPhoneNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 text-black w-full border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              {found ? (
                <div className="mb-4 border p-4">
                  <h2 className="text-lg  font-bold mb-2">User Details</h2>
                  <p>
                    <strong>Name:</strong> {found.accountHolderName}
                  </p>

                  <div className="flex ">
                    <div>
                      <p>
                        <strong>Bank:</strong> {found?.bankName}
                      </p>
                      <p>
                        <strong>Account Number:</strong> {found?.accountNumber}
                      </p>
                    </div>
                    <div></div>
                  </div>

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
                Transferring ₹ {amount} to {found?.accountHolderName}
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
                <h1>Money Will be send to {found?.accountHolderName}</h1>
              </div>
              {loading ? <Loading /> : ""}
            </div>
          </div>
        )}
        {success && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-70">
            <div className="bg-white rounded-lg flex flex-col justify-center items-center   p-6 w-[500px]  h-[300px] shadow-lg">
              <Lottie animationData={paymentSuccess} play />
              <h3 className="text-xl  text-green-500 font-bold mb-4">
                Payment success of ₹ {amount} to {found?.name}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transfer;
