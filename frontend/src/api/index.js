import axios from "axios";

const API = axios.create({
  baseURL: "https://payment-backend-5u4w.onrender.com/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
