"use client"
import ItemList from "./item-list/item-list";
import Bill from "./bill/bill";


const items = [
  {
    id: 1,
    name: 'Hiru',
    color: 'Keeri Samba',
    size: '5 kg',
    price: 1300.00,
    quantity: 5,
    image: '/assets/hiru.jpg',
  },
  {
    id: 2,
    name: 'Basic Tee',
    color: 'Sienna',
    size: 'Large',
    price: 32.0,
    quantity: 1,
    image: '/assets/araliya.jpg',
  },
];

const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
const shipping = 5.0;
const taxes = 5.52;
const total = subtotal + shipping + taxes;

const handleConfirmOrder = () => {
  // Handle order confirmation logic here
  console.log('Order confirmed!');
};


const InvoicePage = () => {
  return (
    <div className="flex flex-row justify-between w-full h-full ">
      <div className="hidden w-full sm:flex justify-center">
        <ItemList />
      </div>

      <div className="w-screen sm:w-2/3 mt-10 sm:mt-0 flex justify-center">
        <Bill
          items={items}
          subtotal={subtotal}
          shipping={shipping}
          taxes={taxes}
          total={total}
          onConfirm={handleConfirmOrder} />
      </div>
    </div>
  );
};

export default InvoicePage;
