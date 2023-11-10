import React, { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { UpdateBankDetails } from "../api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "./Navbar";

function BankDetails() {
  const navigate = useNavigate();

  const [phoneNumber, setphoneNumber] = useState("");
  const [mpin, setmpin] = useState("");
  const [bankname, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [IFSCCode, setIFSCCode] = useState("");
  const [AccountHolderName, setAccountHolderName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await UpdateBankDetails(
      phoneNumber,
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
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        className="bg-blue-200 p-2 flex items-center justify-center rounded-xl"
      >
        <Box mt={4}>
          <Typography variant="h4" align="center">
            Bank Details
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box mt={4}>
            <TextField
              fullWidth
              label="Account Number"
              variant="outlined"
              value={accountNumber}
              required
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Bank Name"
              variant="outlined"
              value={bankname}
              required
              onChange={(e) => setBankName(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Phone number"
              variant="outlined"
              value={phoneNumber}
              required
              onChange={(e) => setphoneNumber(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              label="IFSC Code"
              variant="outlined"
              value={IFSCCode}
              required
              onChange={(e) => setIFSCCode(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Enter MPIN"
              variant="outlined"
              value={mpin}
              required
              onChange={(e) => setmpin(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Name of Account Holder"
              variant="outlined"
              value={AccountHolderName}
              required
              onChange={(e) => setAccountHolderName(e.target.value)}
            />
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default BankDetails;
