import React from "react";
import { GetUserQuery } from "../api/user";
import { Link } from "react-router-dom";

function Navbar() {
  const user = GetUserQuery();

  return (
    <div className=" h-20 p-2 bg-gray-200  flex items-center justify-between ">
      <div className=" bg-blue-600 p-3 m-2 rounded-lg">
        <Link to="/" className="font-bold text-2xl text-white">
          APay
        </Link>
      </div>
      <div className="flex items-center gap-6 pr-4">
        <div>
          <Link to="/" className="font-bold text-blue-800 hover:text-blue-600">
            Home
          </Link>
        </div>
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
          <div className="font-bold bg-blue-600 p-2 rounded-lg text-white">
            Hello, {user.data.name}
          </div>
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
