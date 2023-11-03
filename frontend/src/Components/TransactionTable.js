import React from "react";

function TransactionTable() {
  return (
    <div className="bg-white rounded-2xl p-5 mx-6 w-[60%] shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">2023-11-01</td>
            <td className="px-4 py-2">Payment from John Doe</td>
            <td className="px-4 py-2">$100.00</td>
          </tr>
          <tr>
            <td className="px-4 py-2">2023-10-15</td>
            <td className="px-4 py-2">Withdrawal</td>
            <td className="px-4 py-2">-$50.00</td>
          </tr>
          {/* Add more transaction rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
