"use client";

import { useStore } from "@/store/state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Cashbalance = () => {
  const total = useStore((state) => state.total);
  const amountGiven = useStore((state) => state.amountGiven);
  const setAmountGiven = useStore((state) => state.setAmountGiven);

  const [givenAmount, setGivenAmount] = useState(0);

  const balance = givenAmount - total;
  const [amountEntered,setAmountEntered] = useState(false)
  let givenAmountInput: number = 0;

  const handleInputChange = (e: { target: { value: any } }) => {
    // setGivenAmount(Number(e.target.value));
    givenAmountInput = Number(e.target.value);
  };
  const handleClickBalance = () => {
    setGivenAmount(givenAmountInput);
    setAmountGiven(givenAmountInput)
    setAmountEntered(true)
  };

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === 'Enter' && !amountEntered) {
      handleClickBalance();
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Cash Balance</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-semibold text-gray-700">
            Rs. {total.toFixed(2)}
          </span>
        </div>

        <div className="space-y-1">
          <Input
            disabled={amountEntered}
            type="number"
            placeholder="Enter Amount"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end m-2">
            <button
               className={`${
                amountEntered
                  ? 'bg-slate-300 text-gray-500 cursor-not-allowed'
                  : 'bg-slate-700 hover:bg-slate-500 text-white'
              } rounded-lg p-2 mt-3`}
              onClick={handleClickBalance}
              disabled={amountEntered}
            >
              Enter
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold">Received:</span>
          <span className="text-lg font-semibold text-gray-700">
            Rs. {givenAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Balance:</span>
          <span
            className={`text-lg font-semibold ${
              balance >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            Rs. {balance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cashbalance;
