import React from "react";
import { GetUserQuery } from "../api/user";
import { Link } from "react-router-dom";
function Navbar() {
  const user = GetUserQuery();
  return (
    <div className="bg-blue-300 h-14 flex items-center justify-between">
      <div className="p-10">
        <h1 className="font-bold text-3xl text-red-700">APay</h1>{" "}
      </div>
      <div className="flex items-center gap-10 p-20">
        <div>
          <h1 className="font-bold">My balance</h1>
        </div>
        <div>
          <h1 className="font-bold">Send Money</h1>
        </div>
        <div>
          <h1 className="font-bold">History</h1>
        </div>
        <div>
          <Link to="/connectBank" className="font-bold">
            Connect Bank
          </Link>
        </div>
        {user?.data ? (
          <div>
            <h1 className="font-bold">Hello, {user?.data?.name}</h1>
          </div>
        ) : (
          <div>
            <Link to="/login">Login/Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
