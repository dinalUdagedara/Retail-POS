"use client";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useStore } from "@/store/state";

interface Product {
  id: number;
  brandName: string;
  name: string;
  size: string;
  weight:number;
  price: number;
  quantity: number;
  imageURL: string;
  isWeighting:boolean;
}

interface ItemListProps {
  onSelection: () => void;
}

const ItemList: React.FC<ItemListProps> = ({ onSelection }) => {
  const availableItems = useStore((state) => state.availableItems);
  const setSelectedItem = useStore((state) => state.setSelectedItem);



  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: 1,
      brandName:"",
      name: "",
      size: "",
      weight:0,
      price: 0.0,
      quantity: 0,
      imageURL: "",
      isWeighting: false,
  });
  function handleSelectingItem(product: Product) {
    setSelectedProduct(product);
    setSelectedItem(product); // Assuming setSelectedItem is a function to set the selected item in the store
    onSelection();
  }

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="flex justify-center">
          <div className="relative w-2/3 items-center">
            <Input
              type="text"
              placeholder="Search for Products"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 ">
          Items
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {availableItems.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 min-h-60">
                <Image
                  alt={product.imageURL}
                  src={product.imageURL}
                  layout="responsive"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex flex-col">
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className=" block" />
                    {product.name}
                  </h3>
                  <p className="mt-3 ml-1 text-sm text-gray-500">
                    {product.size}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-gray-900">
                    Rs. {product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleSelectingItem(product)}
                    className="mt-2 mr-0 bg-slate-700 text-white py-1 px-2 rounded hover:bg-blue-700 w-2/3 "
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ItemList;
