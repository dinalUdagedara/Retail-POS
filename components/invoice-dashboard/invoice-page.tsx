"use client";
import ItemList from "./item-list/item-list";
import Bill from "./bill/bill";
import Confirmation from "./confirm-item/confirm-item";
import { useState } from "react";
import { useStore } from "@/store/state";
import PrintBill from "./print-bill/print-bill";

const items = [
  {
    id: 1,
    name: "Hiru",
    color: "Keeri Samba",
    size: "5",
    price: 1300.0,
    quantity: 5,
    imageURL: "/assets/hiru.jpg",
  },
  {
    id: 2,
    name: "Basic Tee",
    color: "Sienna",
    size: "Large",
    price: 32.0,
    quantity: 1,
    imageURL: "/assets/araliya.jpg",
  },
];

const subtotal = items.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

const InvoicePage = () => {
  const itemSelected = useStore((state) => state.itemSelected);
  const setItemSelected = useStore((state) => state.setItemSelected);

  const [showPrintBill, setShowPrintBill] = useState(false);

  const handleConfirmOrder = () => {
    // Handle order confirmation logic here
    // setItemSelected("selected");
    setItemSelected(false);
    setShowPrintBill(true);

    console.log("Order confirmed!", itemSelected);
  };

  const handleConfirmItem = () => {
    setItemSelected(true);
    console.log("Item Selected Successfully", itemSelected);
  };

  const closePrintBill = () => {
    setShowPrintBill(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between w-full h-full ">
        <div className="hidden w-full sm:flex justify-center">
          {itemSelected ? (
            <Confirmation />
          ) : (
            <ItemList onSelection={handleConfirmItem} />
          )}
        </div>

        <div className="w-screen sm:w-2/3 mt-10 sm:mt-0 flex justify-center border-2">
          <Bill onConfirm={handleConfirmOrder} />
        </div>
      </div>

      {showPrintBill && (
        <div className="fixed  inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white w-1/2 p-8 rounded-lg shadow-lg z-10 flex flex-col ">
            <PrintBill />
            <div className="flex justify-end">
              <button
                className="mt-4 p-2 bg-red-800 text-white rounded-3xl w-20"
                onClick={closePrintBill}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
