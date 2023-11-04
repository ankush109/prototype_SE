import React, { useState } from "react";
import { GetUserQuery } from "../api/user";
import Navbar from "./Navbar";
import RightSide from "./RightSide";
import Transfer from "./Transfer";
import Lottie from "react-lottie-player";
import WalletIcon from "@mui/icons-material/Wallet";
import postanime from "./op.json";
import TransactionTable from "./TransactionTable";

function Home() {
  const user = GetUserQuery();
  const [isSliding, setIsSliding] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1"); // Default to the first tab

  const toggleSlide = () => {
    setIsSliding((prevState) => !prevState);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className="w-full bg-slate-300 py-2"
      style={{ overflowY: "auto", maxHeight: "100vh" }}
    >
      <div className="flex items-center justify-center">
        <Navbar />
      </div>
      <div className="flex h-screen">
        <div className="w-1/3 max-h-full bg-slate-300">
          <RightSide />
        </div>
        <div className="w-3/4 bg-slate-300 py-2">
          <h1 className="text-2xl font-bold my-6 mx-10">Dashboard</h1>
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
          <div className="bg-white rounded-2xl w-[270px] p-2 m-7 flex flex-col shadow-lg">
            <h1 className="text-lg font-semibold">Right Side Box</h1>
            <p>
              This is some dummy text inside the white box on the right side.
              You can add more content here as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
