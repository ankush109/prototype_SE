import React, { useEffect, useState } from "react";
import { GetUserQuery } from "../api/user";
import Navbar from "./Navbar";

function Home() {
  const user = GetUserQuery();
  // useEffect(() => {
  //   console.log(user.data.name);
  // });
  return <div></div>;
}

export default Home;
