import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { UpdateBankDetails } from "../api/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function BankDetails() {
  const navigate = useNavigate();

  const [bankname, setBankName] = useState("");
  const [mpin, setmpin] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [IFSCCode, setIFSCCode] = useState("");
  const [AccountHolderName, setAccountHolderName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await UpdateBankDetails(
      mpin,
      accountNumber,
      bankname,
      IFSCCode,
      AccountHolderName
    );
    if (data.success) {
      toast.success(data.message);
      navigate("/");
    }
  };
  return (
    <div className="p-10 space-y-6">
      <form className="p-10 space-y-6" onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4">
          <h1 className="w-48 text-right">Account Number:</h1>
          <TextField
            value={accountNumber}
            required
            onChange={(e) => setAccountNumber(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div className="flex items-center space-x-4">
          <h1 className="w-48 text-right">Bank Name:</h1>
          <TextField
            value={bankname}
            required
            onChange={(e) => setBankName(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div className="flex items-center space-x-4">
          <h1 className="w-48 text-right">IFSC Code:</h1>
          <TextField
            value={IFSCCode}
            required
            onChange={(e) => setIFSCCode(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div className="flex items-center space-x-4">
          <h1 className="w-48 text-right">Enter Mpin</h1>
          <TextField
            value={mpin}
            required
            onChange={(e) => setmpin(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <div className="flex items-center space-x-4">
          <h1 className="w-48 text-right">Name of Account Holder:</h1>
          <TextField
            value={AccountHolderName}
            required
            onChange={(e) => setAccountHolderName(e.target.value)}
            id="outlined-basic"
            variant="outlined"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default BankDetails;
