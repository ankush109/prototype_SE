import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const AuthAPI = () => {
  if (typeof window !== "undefined") {
    return axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/v1/`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/v1/`,
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
  senderPhonenumber,
  receiverPhoneNumber,
  receiverWalletId,
  senderWalletId,
  amount,
  description,
  currency,
  paymentMethod
) => {
  console.log(receiverPhoneNumber);
  const { data } = await AuthAPI().post("/user/sendmoney", {
    senderPhonenumber,
    receiverPhoneNumber,
    receiverWalletId,
    senderWalletId,
    amount,
    description,
    currency,
    paymentMethod,
  });
  return data;
};
const validateEmail = async (email) => {
  try {
    console.log(email, "email from frontend");
    const { data } = await AuthAPI().post("/user/validateEmail", {
      email,
    });
    return data;
  } catch (error) {
    console.error("Error in validateEmail:", error);
    throw error; // Rethrow the error to handle it at a higher level
  }
};
const UpdateBankDetails = async (
  phoneNumber,
  mpin,
  accountNumber,
  bankName,
  IFSCcode,
  accountHolderName
) => {
  const { data } = await AuthAPI().put("/user/fillBankDetails", {
    phoneNumber,
    mpin,
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
  validateEmail,
};
