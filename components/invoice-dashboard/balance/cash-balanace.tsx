"use client";

import { useStore } from "@/store/state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Cashbalance = () => {
  const total = useStore((state) => state.total);

  const [givenAmount, setGivenAmount] = useState(0);

  const balance = givenAmount - total;

  const handleInputChange = (e: { target: { value: any; }; }) => {
    setGivenAmount(Number(e.target.value));
  };


  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Cash Balance</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-semibold text-gray-700">Rs. {total.toFixed(2)}</span>
        </div>

        <div className="space-y-1">

          <Input
            type="number"
            placeholder="Enter Amount"
     
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold">Received:</span>
          <span className="text-lg font-semibold text-gray-700">Rs. {givenAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Balance:</span>
          <span className={`text-lg font-semibold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            Rs. {balance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cashbalance;
