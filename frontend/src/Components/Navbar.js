import React from "react";
import { GetUserQuery } from "../api/user";
import { Link } from "react-router-dom";

function Navbar() {
  const user = GetUserQuery();

  return (
    <div className=" h-20 flex items-center justify-between ">
      <div className="pl-4">
        <h1 className="font-bold text-3xl text-black">APay</h1>
      </div>
      <div className="flex items-center gap-6 pr-4">
        <div>
          <Link
            to="/Balance"
            className="font-bold text-blue-800 hover:text-blue-600"
          >
            My Balance
          </Link>
        </div>
        <div>
          <Link
            to="/Transfer"
            className="font-bold text-blue-800 hover:text-blue-600"
          >
            Send Money
          </Link>
        </div>
        <div>
          <Link
            to="/History"
            className="font-bold text-blue-800 hover:text-blue-600"
          >
            History
          </Link>
        </div>
        <div>
          {!user?.data?.bank ? (
            <Link
              to="/connectBank"
              className="font-bold text-blue-800 hover:text-blue-600"
            >
              Connect Bank
            </Link>
          ) : (
            ""
          )}
        </div>
        {user?.data ? (
          <div className="font-bold text-blue-800">Hello, {user.data.name}</div>
        ) : (
          <div>
            <Link
              to="/login"
              className="font-bold text-blue-800 hover:text-blue-600"
            >
              Login/Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
