import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import BankDetails from "./Components/BankDetails";
import Navbar from "./Components/Navbar";
import Balance from "./Components/myBalance";
import Transfer from "./Components/Transfer";
import Landingpage from "./Components/Landingpage";

function App() {
  function isJWTValid() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    if (!isJWTValid()) {
      let val = localStorage.getItem("token");
      if (val !== null) {
        toast.error("Session expired! Please Login");
      }
      if (val === null) {
        toast.success("Please Login");
      }
    }
  }, []);

  const MAX_TOAST_LIMIT = 2;
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= MAX_TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <div className="App">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Balance" element={<Balance />} />
          <Route path="/connectBank" element={<BankDetails />} />
          <Route path="/Transfer" element={<Transfer />} />
          <Route path="/home" element={<Landingpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
