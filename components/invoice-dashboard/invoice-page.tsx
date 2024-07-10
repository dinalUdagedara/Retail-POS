"use client";
import ItemList from "./item-list/item-list";
import Bill from "./bill/bill";
import Confirmation from "./confirm-item/confirm-item";
import { useState } from "react";
import { useStore } from "@/store/state";
import PrintBill from "./print-bill/print-bill";
import Cashbalance from "./balance/cash-balanace";

const InvoicePage = () => {
  const itemSelected = useStore((state) => state.itemSelected);

  const amountGiven = useStore((state) => state.amountGiven);
  
  const balanceEntered = useStore((state) => state.balanceEntered);
  const setBalanceEntered = useStore((state) => state.setBalanceEntered);

  const setAmountGiven = useStore((state) => state.setAmountGiven);

  const setItemSelected = useStore((state) => state.setItemSelected);

  const [showPrintBill, setShowPrintBill] = useState(false);

  const handleConfirmOrder = () => {
    // Handle order confirmation logic here
    // setItemSelected("selected");
    setItemSelected(false);
    setShowCashbalance(true);

    console.log("Order confirmed!", itemSelected);
  };

  const handleConfirmItem = () => {
    setItemSelected(true);
    console.log("Item Selected Successfully", itemSelected);
  };

  const closePrintBill = () => {
    setShowPrintBill(false);
  };

  const [showCashbalance, setShowCashbalance] = useState(false);

  const closeCashbalance = () => {
    setShowCashbalance(false);
  };

  const displayCashbalance = () => {
    setShowCashbalance(true);
  };

  const displayPrintBill = () => {
    setShowPrintBill(true);
    setShowCashbalance(false);
    setBalanceEntered(false)
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

        <div className="w-screen h-full sm:w-2/3 mt-10 sm:mt-0 flex justify-center border-2">
          <Bill onConfirm={handleConfirmOrder} />
        </div>
      </div>

      {showPrintBill && (
        <div className="fixed  inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white w-1/2 p-8 rounded-lg shadow-lg z-10 flex flex-col ">
            <PrintBill />
            <div className="flex justify-end gap-5">
              <button
                className="mt-4 p-2 bg-red-800 text-white rounded-3xl w-40"
                onClick={closePrintBill}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCashbalance && (
        <div className="fixed  inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white w-1/2 p-8 rounded-lg shadow-lg z-10 flex flex-col ">
            <Cashbalance />
            <div className="flex justify-end gap-4">
              <button
                className="mt-4 p-2 bg-red-800 text-white rounded-3xl w-20"
                onClick={closeCashbalance}
              >
                Cancel
              </button>
              
              <button
                className={`${
                  balanceEntered === false
                    ? 'bg-slate-300 text-gray-500 cursor-not-allowed'
                    : 'bg-slate-700 hover:bg-slate-500 text-white'
                } rounded-3xl p-2 mt-4 w-[100px]`} onClick={displayPrintBill}
                disabled={balanceEntered === false}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
