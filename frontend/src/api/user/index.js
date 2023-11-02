import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const AuthAPI = () => {
  if (typeof window !== "undefined") {
    return axios.create({
      baseURL: `http://localhost:5000/v1/`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: `http://localhost:5000/v1/`,
      headers: {
        authorization: `Bearer }`,
        "Content-Type": "application/json",
      },
    });
  }
};
const GetUser = async () => {
  const { data } = await AuthAPI().get("/user/user-details");
  return data;
};
const getUserByPhone = async (phonenumber) => {
  const { data } = await AuthAPI().get("/user/getUserPhone", {
    phonenumber,
  });
  console.log(data, "network data");
  return data;
};
const UpdateBankDetails = async (
  accountNumber,
  bankName,
  IFSCcode,
  accountHolderName
) => {
  const { data } = await AuthAPI().put("/user/fillBankDetails", {
    accountNumber,
    bankName,
    IFSCcode,
    accountHolderName,
  });
  return data;
};
const GetUserQuery = () =>
  useQuery({
    queryKey: ["user-details"],
    queryFn: () => GetUser(),
    select: (data) => {
      return data.message;
    },
  });
// const GetUserByPhoneQuery = (phonenumber) =>
//   useQuery({
//     queryKey: ["user-Phone"],
//     queryFn: () => getUserByPhone(phonenumber),
//     select: (data) => {
//       return data.message;
//     },
//   });
export { GetUserQuery, UpdateBankDetails, getUserByPhone };
