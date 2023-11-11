import React, { useState } from "react";
import { GetUserQuery } from "../api/user";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import postanime from "./op.json";
import Lottie from "react-lottie-player";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

function RightSide() {
  const user = GetUserQuery();

  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

  const handleAccountChange = (index) => {
    setSelectedAccountIndex(index);
  };

  return (
    <div className="bg-slate-300  flex justify-center">
      {user?.data?.bankAccounts.length > 0 ? (
        <div className="bg-white  h-full rounded-2xl w-full max-w-md p-4 m-10 flex flex-col shadow-lg">
          <h1 className="text-center font-bold text-xl text-gray-800">
            Available Balance
          </h1>
          {/* <h1>{selectedBankAccount.phoneNumber}</h1> */}
          <div className="flex justify-between items-center mb-4">
            <label className="text-gray-600">Select Bank Account:</label>
            <select
              value={selectedAccountIndex}
              onChange={(e) => handleAccountChange(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              {user?.data?.bankAccounts?.map((account, index) => (
                <option key={index} value={index}>
                  {account.bankName}
                </option>
              ))}
            </select>
          </div>
          <h1 className="text-center py-2 text-cyan-500 font-bold text-3xl">
            ₹ {user?.data?.bankAccounts[selectedAccountIndex]?.wallet.balance}
          </h1>
          <Link
            to="/Transfer"
            className="bg-blue-500 text-center hover:bg-blue-600 text-white font-bold py-3 m-4 rounded transition-colors duration-300"
          >
            Transfer Funds
            <CurrencyExchangeIcon
              style={{
                marginLeft: "8px",
              }}
            />
          </Link>
          <hr className="border-t border-gray-300" />
          {/* ... rest of the code remains unchanged ... */}
        </div>
      ) : (
        <div className="bg-white  h-full rounded-2xl w-full max-w-md p-4 m-10 flex flex-col shadow-lg">
          <h1 className="font-bold">
            Please Link your Bank Account to start transferring payment{" "}
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
