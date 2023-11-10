import React, { useEffect, useState } from "react";
import { GetTransactionDetailQuery, GetUserQuery } from "../api/user";
import Loading from "./Loading";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString(undefined, options);
}

function TransactionTable() {
  const user = GetUserQuery();
  const transactionsData = GetTransactionDetailQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setloading] = useState(true);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const allTransactions = transactionsData?.data;

  const receivedTransactions = allTransactions?.filter(
    (transaction) => transaction.senderId !== user?.data.id
  );

  const sentTransactions = allTransactions?.filter(
    (transaction) => transaction.senderId === user?.data.id
  );

  useEffect(() => {
    console.log(receivedTransactions);
  }, []);

  const currentTransactions = () => {
    switch (selectedTab) {
      case "received":
        return receivedTransactions;
      case "sent":
        return sentTransactions;
      default:
        return allTransactions;
    }
  };
  const transactions = currentTransactions()?.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(currentTransactions()?.length / transactionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabClick = (tab) => {
    setCurrentPage(1);
    setSelectedTab(tab);
  };

  const openTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeTransactionDetails = () => {
    setSelectedTransaction(null);
  };
  useEffect(() => {
    if (allTransactions) {
      setloading(false);
    }
  }, [transactions]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="bg-white rounded-2xl p-4 mx-6 my-10 w-[90%] shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => handleTabClick("all")}
          className={`px-3 py-2 ${
            selectedTab === "all" ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded`}
        >
          All Transactions
        </button>
        <button
          onClick={() => handleTabClick("received")}
          className={`px-3 py-2 ${
            selectedTab === "received"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          } rounded`}
        >
          Received
        </button>
        <button
          onClick={() => handleTabClick("sent")}
          className={`px-3 py-2 ${
            selectedTab === "sent" ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded`}
        >
          Sent
        </button>
      </div>

      {transactions.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone number</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => openTransactionDetails(transaction)}
              >
                <td className="px-4 py-2">
                  {transaction.senderId !== user?.data.id
                    ? transaction?.sender?.name
                    : transaction?.receiver?.name}
                </td>
                <td className="px-4 py-2">
                  {transaction.senderId !== user?.data.id
                    ? transaction?.senderPhoneNumber
                    : transaction?.recieverPhoneNumber}
                </td>
                <td className="px-4 py-2">
                  {transaction.amount > 0 ? (
                    <span className="text-green-500 font-bold">{`₹ ${transaction.amount}`}</span>
                  ) : (
                    <span className="text-red-500">{` ₹ ${Math.abs(
                      transaction.amount
                    )}`}</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {formatTimestamp(transaction.timestamp)}
                </td>
                <td>
                  <span
                    className={
                      transaction.senderId !== user?.data.id
                        ? "bg-green-200 text-green-800 px-2 py-1 w-10 rounded"
                        : "bg-blue-200 text-blue-800 px-2 py-1 w-10 rounded"
                    }
                  >
                    {transaction.senderId !== user?.data.id
                      ? "Received"
                      : "Sent"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No transactions</p>
      )}

      <div className="mt-4 flex justify-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={`mx-1 px-3 py-2 ${
              currentPage === number ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded`}
          >
            {number}
          </button>
        ))}
      </div>

      {selectedTransaction && (
        <div className="fixed top-0 left-0 w-[1700px] h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-white w-full  rounded p-6 max-w-md">
            <h3 className="text-xl font-semibold mb-4">Transaction Details</h3>
            <p>Date: {formatTimestamp(selectedTransaction.timestamp)}</p>
            <p>Description: {selectedTransaction.description}</p>
            <p>Amount: {selectedTransaction.amount}</p>
            <p>
              Status:{" "}
              {selectedTransaction.senderId !== user?.data.id
                ? "Received"
                : "Sent"}
            </p>
            <button
              onClick={closeTransactionDetails}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
