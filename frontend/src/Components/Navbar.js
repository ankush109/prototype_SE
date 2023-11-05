import React from "react";
import { GetUserQuery } from "../api/user";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PaymentsIcon from "@mui/icons-material/Payments";
function Navbar() {
  const user = GetUserQuery();
  const navigate = useNavigate();
  return (
    <div className=" h-20 p-4 m-3 rounded-xl w-[90%] bg-gray-200  flex items-center justify-between ">
      <div className=" p-3 m-2 rounded-lg">
        <Link to="/" className="font-bold text-3xl text-blue-800">
          APay
        </Link>
      </div>
      <div className="flex items-center gap-6 pr-4">
        <div>
          <Link to="/" className="font-bold text-blue-800 hover:text-blue-600">
            <HomeIcon
              style={{
                width: "60px",
              }}
            />
          </Link>
        </div>
        <div></div>
        <div>
          <Link
            to="/Transfer"
            className="font-bold text-blue-800 hover:text-blue-600"
          >
            <PaymentsIcon
              style={{
                width: "60px",
              }}
            />
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
          <>
            <div className="font-bold bg-blue-600 p-2 rounded-lg text-white">
              Hello, {user.data.name}
            </div>
            <div>
              {user?.data ? (
                <div
                  className="text-lg text-blue-800 font-bold cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Logout
                </div>
              ) : (
                ""
              )}
            </div>
          </>
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
