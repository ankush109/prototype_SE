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
  console.log(phonenumber, "req phone number");
  const { data } = await AuthAPI().get("/user/getUserPhone", {
    params: {
      phonenumber: phonenumber,
    },
  });
  console.log(data, "network data");
  return data;
};
const getTransactionDetails = async () => {
  const { data } = await AuthAPI().get("/user/getTransactionDetails");
  return data;
};
const sendMoney = async (
  receiverPhoneNumber,
  amount,
  description,
  currency,
  paymentMethod
) => {
  console.log(receiverPhoneNumber);
  const { data } = await AuthAPI().post("/user/sendmoney", {
    receiverPhoneNumber,
    amount,
    description,
    currency,
    paymentMethod,
  });
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
const GetTransactionDetailQuery = () =>
  useQuery({
    queryKey: ["user-transactions"],
    queryFn: () => getTransactionDetails(),
    select: (data) => {
      return data.message;
    },
  });
export {
  GetUserQuery,
  UpdateBankDetails,
  getUserByPhone,
  sendMoney,
  GetTransactionDetailQuery,
};
