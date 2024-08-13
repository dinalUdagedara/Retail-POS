"use client";
import { useStore } from "@/store/state";

const PrintBill = () => {
  const billedItems = useStore((state) => state.billedItems);

  const amountGiven = useStore((state) => state.amountGiven);
  const balanceGiven = useStore((state) => state.balanceGiven);

  let subtotal = 0;
  let total = useStore((state) => state.total);
  let discount = 0.1;

  const handlePrint = () => {
    const printableArea = document.getElementById("printable-area");
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
    <div>
      <div
        id="printable-area"
        className="print-container p-6 bg-white rounded-lg shadow-md h-full"
      >
        <h2 className="text-lg font-semibold mb-4">Order summary</h2>
        {billedItems.map(
          (item) => (
            (subtotal += item.isWeighting
              ? item.price * item.weight
              : item.price * item.quantity),
            (total = subtotal - subtotal * discount),
            (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className=" grid grid-cols-5 gap-10">
                  <h3 className="text-sm font-medium">
                    {item.brandName} {item.name}
                  </h3>

                  {item.isWeighting ? (
                    <p className="text-sm text-gray-500">{item.weight} kg</p>
                  ) : (
                    <p className="text-sm text-gray-500">{item.size}</p>
                  )}

                  <p className="text-sm font-medium">
                    Rs. {item.price}
                  </p>

                  <p className="text-sm font-medium">x {item.quantity}</p>
                </div>
                {item.isWeighting ? (
                  <div className="flex items-center">
                    Rs.{(item.price * item.weight).toFixed(2)}
                  </div>
                ) : (
                  <div className="flex items-center">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </div>
                )}
              </div>
            )
          )
        )}
        <div className="mt-6 space-y-1 text-sm">
          <div className="flex justify-between ">
            <span>Given Amount</span>
            <span>Rs. {amountGiven.toFixed(2)}</span>
          </div>

          <div className="flex justify-between ">
            <span>Balance Given</span>
            <span>Rs. {balanceGiven.toFixed(2)}</span>
          </div>
          <div>
            <div className="flex justify-between mt-10">
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
        <div className="flex justify-center ">
          <button
            onClick={handlePrint}
            className="w-40 py-3 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Print order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintBill;
