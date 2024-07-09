"use client";
import { useStore } from "@/store/state";
import Image from "next/image";
const PrintBill = () => {
  const billedItems = useStore((state) => state.billedItems);
  let subtotal = 0;
  let total = 0;
  let discount = 0.1;
  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md w-full h-screen">
        <h2 className="text-lg font-semibold mb-4">Order summary</h2>
        {billedItems.map(
          (item) => (
            (subtotal += item.price*item.quantity),
            (total = subtotal - subtotal * discount),
            (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex justify-start gap-10">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.size}kg</p>
                  <p className="text-sm font-medium">
                    Rs. {item.price.toFixed(2)}
                  </p>

                  <p className="text-sm font-medium">
                    x  {item.quantity} 
                  </p> 
                </div>
                <div className="flex items-center">
                   Rs.{(item.price*item.quantity).toFixed(2)}
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
      </div>
    </div>
  );
};

export default PrintBill;
