// components/OrderSummary.tsx

import React from 'react';
import Image from 'next/image';

interface OrderItem {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  onConfirm: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  taxes,
  total,
  onConfirm,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full h-screen">
      <h2 className="text-lg font-semibold mb-4">Order summary</h2>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">

          <Image
            src={item.image}
            alt={item.name} 
            width={100}
            height={100}
          />
          <div className="flex-1 ml-4">
            <h3 className="text-sm font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.color}</p>
            <p className="text-sm text-gray-500">{item.size}</p>
            <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center">
            <select
              value={item.quantity}
              className="block w-full py-2 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button className="ml-4 text-red-500 hover:text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <div className="mt-6 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Rs. {shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>Rs. {taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>Rs. {total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={onConfirm}
        className="w-full mt-6 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Confirm order
      </button>
    </div>
  );
};

export default OrderSummary;
