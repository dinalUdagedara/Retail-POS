"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useStore } from "@/store/state";
import { sampleProducts,sampleProduct } from "@/lib/data";

interface Product {
  id: string;
  brandName: string;
  name: string;
  size: string;
  weight: number;
  price: number;
  quantity: number;
  imageURL: string;
  isWeighting: boolean;
  barcode: string;
}

interface ItemListProps {
  onSelection: () => void;
}

const sampleData = sampleProducts;

const ItemList: React.FC<ItemListProps> = ({ onSelection }) => {
  const availableItems = useStore((state) => state.availableItems);
  const setSelectedItem = useStore((state) => state.setSelectedItem);
  const [filteredItems, setFilteredItems] = useState<Product[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const updateAvailableProducts = useStore((state) => state.updateProducts);

  const [selectedProduct, setSelectedProduct] = useState<Product>(sampleProduct);
  function handleSelectingItem(product: Product) {
    setSelectedProduct(product);
    setSelectedItem(product); // Assuming setSelectedItem is a function to set the selected item in the store
    onSelection();
  }

  function handleSearchItems(name: string) {
    const filtereditems: Product[] = availableItems.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase()) ||   item.barcode === name
    );
    
    console.log("results", filtereditems);
    setFilteredItems(filtereditems);
    return filtereditems;
  }

  const handleSearchInputChange = (event: { target: { value: any } }) => {
    setSearchValue(event.target.value);
  };

  function handleReturnClick() {
    setFilteredItems(null);
  }

  useEffect(() => {
    //fetching data from the route handler

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");

        if (response) {
          const products: Product[] = await response.json();
          //updating the zustand state of products
          updateAvailableProducts(products);
        } else {
          updateAvailableProducts(sampleData);
        }
      } catch (error) {
        console.log("Error", error);
        updateAvailableProducts(sampleData);
      }
    };

    fetchProducts();
  }, [updateAvailableProducts]);

  return (
    <div className="bg-white w-full ">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6  lg:max-w-7xl lg:px-8 w-full ">
        <div className="flex justify-center">
          <div className="relative w-2/3 items-center">
            <Input
              type="text"
              placeholder="Search for Products"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchValue}
              onChange={handleSearchInputChange}
            />
            <button
              onClick={() => {  
                handleSearchItems(searchValue);
              }}
            >
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 ">
          Items
        </h2>
        {filteredItems ? (
          filteredItems.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {filteredItems.map((product) => (
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
          ) : (
            <div className="mt-6 gap-x-6 gap-y-10 flex justify-center w-full flex-col text-center items-center ">
              <p>Sorry There are No Such Items</p>
              <button
                onClick={handleReturnClick}
                className="bg-slate-400 rounded-xl max-w-20 p-2"
              >
                Return
              </button>
            </div>
          )
        ) : (
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
                    {product.isWeighting ? (
                      <p className="mt-3 ml-1 text-sm text-gray-500">
                        {product.weight}
                      </p>
                    ) : (
                      <p className="mt-3 ml-1 text-sm text-gray-500">
                        {product.size}
                      </p>
                    )}
                    {/* <p className="mt-3 ml-1 text-sm text-gray-500">
                      {product.size}
                    </p> */}
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
        )}
      </div>
    </div>
  );
};
export default ItemList;
