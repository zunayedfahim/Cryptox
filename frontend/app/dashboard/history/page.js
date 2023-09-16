"use client";
import { useStore } from "@/app/store";
import { useEffect, useState } from "react";

const History = () => {
  const { user } = useStore();
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const res = await fetch("http://localhost:5000/getTransaction", {
        method: "POST",
        body: JSON.stringify({ user_id: user?.user_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTransactionHistory(data);
    };
    fetchTransactionHistory();
  }, [transactionHistory]);

  return (
    <div>
      <h1 className="font-semibold pb-2">Transaction History</h1>
      <table className="table-auto w-full text-left text-sm bg-customBlack rounded-xl">
        <thead className="text-xs uppercase border-b border-customWhite/10">
          <tr>
            <th scope="col" className="px-6 py-3">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory?.map((item, index) => {
            const date = new Date(item.date_and_time);
            const color =
              item.transaction_type === "BUY"
                ? "text-customGreen"
                : item.transaction_type === "SELL"
                ? "text-customRed"
                : "text-customBlue";
            return (
              <tr key={index}>
                <td className="px-6 py-4">{item.transaction_id}</td>
                <td className={`px-6 py-4 font-semibold text-sm ${color}`}>
                  {item.transaction_type}
                </td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className={`px-6 py-4 font-semibold text-sm ${color}`}>
                  ${item.transaction_amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">{date.toDateString()}</td>
                <td className="px-6 py-4">{date.toLocaleTimeString()}</td>
                <td className="px-6 py-4">{item.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default History;
