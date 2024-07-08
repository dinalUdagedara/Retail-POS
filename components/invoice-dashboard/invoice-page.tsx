import ItemList from "./item-list/item-list";
import Bill from "./bill/bill";
const InvoicePage = () => {
  return (
    <div className="flex flex-row justify-between w-full h-full bg-slate-300 ">
      <div className="w-full flex justify-center">
        <ItemList />
      </div>

      <div className="w-2/3 flex justify-center bg-slate-500">
        <Bill />
      </div>
    </div>
  );
};

export default InvoicePage;
