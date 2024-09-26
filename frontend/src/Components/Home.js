import React, { useEffect, useState } from "react";
import { GetTransactionDetailQuery, GetUserQuery } from "../api/user";
import Navbar from "./Navbar";
import RightSide from "./RightSide";
import Transfer from "./Transfer";
import Lottie from "react-lottie-player";
import WalletIcon from "@mui/icons-material/Wallet";
import postanime from "./op.json";
import TransactionTable from "./TransactionTable";
import AddIcon from "@mui/icons-material/Add";
function Home() {
  const user = GetUserQuery();
  const transaction = GetTransactionDetailQuery();
  const allTransactions = transaction;
  const [isSliding, setIsSliding] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1"); // Default to the first tab
  const uniqueNamesSet = new Set();
  const uniqueSortedTransactions = transaction.data?.filter((x) => {
    if (!uniqueNamesSet.has(x.name)) {
      uniqueNamesSet.add(x.name);
      return true;
    }
    return false;
  });
  const sortedTransactions = allTransactions.data?.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  useEffect(() => {
    console.log(
      sortedTransactions,

      "srot"
    );
  });

  return (
    <div
      className="w-full bg-slate-300 py-2"
      style={{ overflowY: "auto", maxHeight: "100vh" }}
    >
      <div className="flex items-center justify-center">
        <Navbar />
      </div>
      <div className="flex  h-screen">
        <div className=" max-h-full bg-slate-300">
             <div className="flex justify-center">
          <div className="bg-white rounded-2xl w-[430px] p-2 m-7 flex flex-col shadow-lg">
           
            {/* {uniqueSortedTransactions?.map((x) => (
              <div
                className="flex gap-4 p-2 border-b border-gray-300"
                key={x?.id}
              >
                <div className="text-xl font-semibold">
                  {x.senderId !== user?.data?.id
                    ? x?.sender?.name
                    : x?.receiver?.name}
                </div>
              </div>
            ))} */}
           <div>
  <h1 className="bg-blue-600 text-white text-lg font-semibold text-center p-2 m-3">
    Recent Transactions
  </h1>
  <div className="scrollable-div" style={{ maxHeight: "500px", overflowY: "auto" }}>
    <table className="min-w-full bg-white border rounded-lg shadow-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-2 border-b-2">Phone Number</th>
          <th className="text-left p-2 border-b-2">Type</th>
          <th className="text-right p-2 border-b-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        {sortedTransactions?.map((x) => (
          <tr key={x?.id} className="hover:bg-gray-100">
            <td className="p-2 border-b">
              {x.senderId !== user?.data?.id ? x?.senderPhoneNumber : x?.recieverPhoneNumber}
            </td>
            <td className="p-2 border-b">
              {x?.senderId !== user?.data?.id ? (
                <span className="font-bold text-green-600">Credit</span>
              ) : (
                <span className="font-bold text-red-700">Debit</span>
              )}
            </td>
            <td className="p-2 border-b text-right">
              {x?.senderId !== user?.data?.id ? "+" : "-"} ₹ {x?.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

          </div>
        </div>
        </div>
        <div className="">
           <img
            style={{
              width: "820px",
              margin: "10px",
            }}
            src="https://static.mygov.in/media/blog/2021/07/banner-scaled.jpg"
          />
        <RightSide/>
         
          {/* <div className="bg-white rounded-2xl w-72 max-w-md p-4 m-10 flex flex-col shadow-lg">
            <h1 className="text-lg font-semibold">Invite a friend, get ₹5</h1>
            <h2>
              Invite a Friend, and you will get ₹5 after they make their first
              purchase.
            </h2>
          </div>
          <div className="bg-white rounded-2xl w-72 max-w-md p-4 m-10 flex flex-col shadow-lg">
            <h1 className="text-lg font-semibold">Invite a friend, get ₹5</h1>
            <h2>
              Invite a Friend, and you will get ₹5 after they make their first
              purchase.
            </h2>
          </div> */}

        
        </div>
       
      </div>
    </div>
  );
}

export default Home;
