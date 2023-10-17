import React, { useEffect, useState } from "react";
import { GetUserQuery } from "../api/user";

function Home() {
  const user = GetUserQuery();
  useEffect(() => {
    console.log(user.data.name);
  });
  return (
    <div>
      <div>hello {user.data.name} </div>
    </div>
  );
}

export default Home;
