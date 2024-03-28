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
        <div className="w-1/3 max-h-full bg-slate-300">
          <RightSide />
        </div>
        <div className="w-3/4 flex flex-col items-center  bg-slate-300 py-2">
          <h1 className="text-2xl font-bold my-4 w-[60%] text-center bg-blue-600 text-white p-2 rounded-lg">
            Dashboard
          </h1>
          <img
            style={{
              width: "820px",
              margin: "10px",
            }}
            src="https://static.mygov.in/media/blog/2021/07/banner-scaled.jpg"
          />
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

          <TransactionTable />
        </div>
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl w-[330px] p-2 m-7 flex flex-col shadow-lg">
            <h1 className="text-lg font-semibold text-center bg-blue-600 text-white p-2 m-3">
              Contacts
            </h1>
            {uniqueSortedTransactions?.map((x) => (
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
            ))}
            <div>
              <h1 className=" bg-blue-600 text-white text-lg font-semibold text-center p-2 m-3">
                Recent Transactions
              </h1>
              <div
                className="scrollable-div"
                style={{ maxHeight: "500px", overflowY: "auto" }}
              >
                {sortedTransactions?.map((x) => (
                  <div className="flex gap-4 p-2" key={x?.id}>
                    <div className="text-xl font-semibold">
                      {x.senderId !== user?.data?.id
                        ? x?.senderPhoneNumber
                        : x?.recieverPhoneNumber}
                    </div>
                    <div> </div>
                    <div
                      className={
                        x?.senderId !== user?.data?.id
                          ? " font-bold text-green-600"
                          : " font-bold text-red-700"
                      }
                    >
                      {x?.senderId !== user?.data?.id ? "+" : "-"} ₹ {x?.amount}{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
