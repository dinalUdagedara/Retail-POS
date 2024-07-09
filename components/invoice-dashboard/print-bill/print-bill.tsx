"use client";
import { useStore } from "@/store/state";

const PrintBill = () => {
  const billedItems = useStore((state) => state.billedItems);
  let subtotal = 0;
  let total = 0;
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
        className="print-container p-6 bg-white rounded-lg shadow-md w-full h-screen"
      >
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
                <div className="flex justify-start gap-10">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.size}kg</p>
                  <p className="text-sm font-medium">
                    Rs. {item.price.toFixed(2)}
                  </p>

                  <p className="text-sm font-medium">x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  Rs.{(item.price * item.quantity).toFixed(2)}
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
          onClick={handlePrint}
          className="w-full mt-2 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Print order
        </button>
      </div>
    </div>
  );
};

export default PrintBill;
