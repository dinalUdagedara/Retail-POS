"use client";
import ItemList from "./item-list/item-list";
import Bill from "./bill/bill";
import Confirmation from "./confirm-item/confirm-item";
import { useState } from "react";
import { useStore } from "@/store/state";

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

  const handleConfirmOrder = () => {
    // Handle order confirmation logic here
    // setItemSelected("selected");
    setItemSelected(false);

    console.log("Order confirmed!", itemSelected);
  };

  const handleConfirmItem = () => {
    setItemSelected(true);
    console.log("Item Selected Successfully", itemSelected);
  };

  return (
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
  );
};

export default InvoicePage;
