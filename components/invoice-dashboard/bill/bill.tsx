// components/OrderSummary.tsx

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/state";

interface OrderSummaryProps {
  onConfirm: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onConfirm }) => {
  const billedItems = useStore((state) => state.billedItems);
  const setTotal = useStore((state) => state.setTotal);

  let subtotal = 0;
  let total = 0;
  let discount = 0.1;

  const handlePrint = () => {
    setTotal(total);

    const printableArea = document.getElementById("printable-area");
    onConfirm();
    if (printableArea) {
      const printContents = printableArea.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // This line is to reload the page to its original state after printing
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full h-full min-h-screen">
      <h2 className="text-lg font-semibold mb-4">Order summary</h2>
      {billedItems.map(
        (item) => (
          (subtotal += item.price * item.quantity),
          (total = subtotal - subtotal * discount),
          (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 py-4"
            >
              <Image
                src={item.imageURL}
                alt={item.name}
                width={100}
                height={100}
              />
              <div className="flex-1 ml-4">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.size}kg</p>
                <p className="text-xs ">
                  Unit Price: Rs. {item.price.toFixed(2)}
                </p>
                <p className="text-sm font-medium">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex justify-center font-semibold rounded-lg">
                x {item.quantity} Items
                </div>

                {/* <select
                  value={item.quantity}
                  className="block w-full py-2 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {[...Array(10).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select> */}


                <button className="ml-4 text-red-500 hover:text-red-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )
        )
      )}
      <div className="mt-6 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Discount</span>
          <span>Rs. {(subtotal * discount).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>Rs. {total.toFixed(2)}</span>
        </div>
      </div>
      <button
        // onClick={onConfirm}
        onClick={handlePrint}
        className="w-full mt-6 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Print Bill
      </button>
    </div>
  );
};

export default OrderSummary;
