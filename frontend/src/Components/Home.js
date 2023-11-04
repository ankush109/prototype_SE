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
    <div className="flex h-screen">
      <div className="w-1/4 max-h-full bg-slate-300">
        <RightSide />
      </div>
      <div className="w-3/4 bg-slate-300 py-2">
        <h1 className="text-2xl font-bold my-6 mx-10">Dashboard</h1>
        <div className="flex">
          <div className="bg-white rounded-2xl w-72 items-center max-w-md p-4 m-10 flex flex-col shadow-lg">
            <h1 className="text-lg font-semibold">Invite a friend, get ₹5</h1>
            <h2>
              Invite a Friend, and you will get ₹5 after they make their first
              purchase.
            </h2>
          </div>
          <div className="bg-white rounded-2xl w-72 items-center max-w-md p-4 m-10 flex flex-col shadow-lg">
            <h1 className="text-lg font-semibold">Invite a friend, get ₹5</h1>
            <h2>
              Invite a Friend, and you will get ₹5 after they make their first
              purchase.
            </h2>
          </div>
        </div>
        {/* <div className="bg-white rounded-2xl p-5 mx-6 w-[60%] shadow-lg">
          <div className="flex gap-2">
            <WalletIcon />
            <h1 className="text-lg font-semibold">Available Balance Summary</h1>
          </div>
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            vulputate sapien in est ullamcorper suscipit. Integer elit arcu,
            facilisis sed vehicula nec, ultricies ut tellus. Nullam vitae
            ultricies orci. Cras eu ligula eget nisl interdum feugiat sit amet
            ac sapien. Sed nec interdum felis, non hendrerit dui. Phasellus
            mollis, arcu quis laoreet sagittis, sapien turpis pretium magna, et
            mollis urna magna vel arcu. Pellentesque malesuada magna sed est
          </h2>
        </div> */}
        {/* <div className="w-3/9  bg-slate-300 ">
          <div className="flex bg-white p-4  rounded-lg w-1/2 my-5 mx-10 gap-5">
            <button
              onClick={() => handleTabChange("tab1")}
              className={`tab-button bg-blue-500 p-1 text-white font-semibold rounded-md  ${
                activeTab === "tab1" ? "active" : ""
              }`}
            >
              Transaction Details
            </button>
            <button
              onClick={() => handleTabChange("tab2")}
              className={`tab-button bg-blue-500 p-1 text-white font-semibold rounded-md  ${
                activeTab === "tab2" ? "active" : ""
              }`}
            >
              Transfer Funds
            </button>
          </div>

          {activeTab === "tab1" && (
            <div className="content-for-tab1">
            
            </div>
          )}

          {activeTab === "tab2" && (
            <div className="content-for-tab2">hello</div>
          )}
        </div> */}
        <TransactionTable />
      </div>
    </div>
  );
}

export default Home;
