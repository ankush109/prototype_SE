import React from "react";
import { GetUserQuery } from "../api/user";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import postanime from "./op.json";
import Lottie from "react-lottie-player";
function RightSide() {
  const user = GetUserQuery();

  return (
    <div className="bg-slate-300  flex justify-center">
      {user?.data?.bank ? (
        <div className="bg-white  h-full rounded-2xl w-full max-w-md p-4 m-10 flex flex-col shadow-lg">
          <h1 className="text-center font-bold text-xl text-gray-800">
            Available Balance
          </h1>
          <h1 className="text-center py-2 text-cyan-500 font-bold text-3xl">
            ₹ {user?.data?.wallet[0]?.balance}
          </h1>
          <Link
            to="/Transfer"
            className="bg-blue-500 text-center hover:bg-blue-600 text-white font-bold py-3 m-4 rounded transition-colors duration-300"
          >
            Transfer Funds
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 inline ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
          <hr className="border-t border-gray-300" />
          <div className="py-3">
            <div className="flex items-center gap-2">
              <CardTravelIcon />
              <h1 className="text-lg font-semibold">Employment Information</h1>
            </div>
            <div className="flex gap-1 py-2">
              <h1 className="text-gray-600">Company Name:</h1>
              <h1 className="text-gray-800">Airtel Inc</h1>
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          <div className="py-3">
            <div className="flex items-center gap-2">
              <AccountBalanceIcon />
              <h1 className="text-lg font-semibold">Bank Account Details</h1>
            </div>
            <div className="flex gap-1 py-2">
              <h1 className="text-gray-600">Bank Name:</h1>
              <h1 className="text-gray-800">{user?.data?.bank}</h1>
            </div>
            <div className="flex gap-1 py-2">
              <h1 className="text-gray-600">Account Number:</h1>
              <h1 className="text-gray-800">{user?.data?.AccountNumber}</h1>
            </div>
          </div>
          <Lottie animationData={postanime} play className="w-62 h-84" />
        </div>
      ) : (
        <div className="bg-white  h-full rounded-2xl w-full max-w-md p-4 m-10 flex flex-col shadow-lg">
          <h1 className="font-bold">
            Please Link your Bank Acccount to start transferring payment{" "}
          </h1>
          <Link
            to="/connectBank"
            className="bg-blue-500 text-center hover:bg-blue-600 text-white font-bold py-3 m-4 rounded transition-colors duration-300"
          >
            Link Bank Account
          </Link>
          <Lottie animationData={postanime} play className="w-62 h-84" />
        </div>
      )}
    </div>
  );
}

export default RightSide;
