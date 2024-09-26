import React from "react";
import { GetUserQuery } from "../api/user";
import { Link } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Lottie from "react-lottie-player";
import postanime from "./op.json";
import { AccordionDetails } from "@mui/material";

function RightSide() {
  const user = GetUserQuery();

  return (
    <div className="bg-slate-300 flex justify-center">
      {user?.data?.bankAccounts?.length > 0 ? (
        <div className=" w-full h-full rounded-2xl  p-4 m-10 flex flex-col ">
        
          {/* Display each bank account as a card */}
          <div className="grid grid-cols-2 gap-5 w-full justify-between  ">
            {user?.data?.bankAccounts?.map((account) => (
              <div
                key={account.id}
                className="p-4 rounded-xl  text-white relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-700 transform transition-all hover:scale-105"
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "15px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Bank Icon or Logo */}
                <div className="absolute top-4 left-4">
                  <AccordionDetails fontSize="large" />
                </div>
                
                {/* Bank Name and Balance */}
                <div className="flex flex-col items-end">
                  <h2 className="text-2xl font-bold mb-2">{account.bankName}</h2>
                  <h3 className="text-lg">
                    ₹ {account.wallet.balance.toLocaleString()}
                  </h3>
                </div>
                
                {/* Account Details */}
                <div className="mt-auto text-xs text-gray-200">
                  <p>Account Number: {account.accountNumber}</p>
                  <p>Account Holder: {account.accountHolderName}</p>
                </div>
              </div>
            ))}
          </div>
          
          <hr className="border-t border-gray-300" />
        </div>
      ) : (
        <div className="bg-white h-full rounded-2xl w-full max-w-md p-4 m-10 flex flex-col shadow-lg">
          <h1 className="font-bold">
            Please Link your Bank Account to start transferring payment
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
