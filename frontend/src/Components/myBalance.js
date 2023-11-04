import React from "react";
import { GetUserQuery } from "../api/user";
import Navbar from "./Navbar";

function Balance() {
  const user = GetUserQuery();
  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{user?.data.bank}</h1>
            <h1 className="text-lg">{user?.data.phonenumber}</h1>
            <h1 className="text-lg">{user?.data.AccountNumber}</h1>
            <h1 className="text-lg">{user?.data.AccountHolderName}</h1>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <h1 className="text-xl font-bold text-blue-500">
              ₹ {user?.data.wallet[0].balance}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Balance;
