"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useStore } from "@/store/state";
import { sampleProducts, sampleProduct } from "@/lib/data";
import BarcodeScanner from "../barcode-scanner/barcode-scanner";
import { TextResult } from "dynamsoft-javascript-barcode";
import React from "react";
import { Button } from "antd";

export interface Product {
  id: string;
  brandName: string;
  name: string;
  size: string;
  weight: number;
  price: number;
  quantity: number;
  imageURL: string;
  isWeighting: boolean;
  barCode: string;
}

interface ItemListProps {
  onSelection: () => void;
}

const sampleData = sampleProducts;

export async function BarCodeScanner() {
  let license: string | undefined = process.env.DBRLicense;
  return { props: { license: license } };
}

export default function ItemList({ onSelection }: ItemListProps, props: any) {
  const availableItems = useStore((state) => state.availableItems);
  const setSelectedItem = useStore((state) => state.setSelectedItem);
  const [filteredItems, setFilteredItems] = useState<Product[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const updateAvailableProducts = useStore((state) => state.updateProducts);
  const barCode = useStore((state) => state.barCode);
  const [barcodeButtonTriggerd, setBarCodeButtonTriggered] = useState(false);
  const isCameraActive = useStore((state) => state.isCameraActive);
  const setIsCameraActive = useStore((state) => state.setCameraState);
  const showBill = useStore((state) => state.showBill);
  const setShowBill = useStore((state) => state.setShowBill);

  const [selectedProduct, setSelectedProduct] =
    useState<Product>(sampleProduct);
  function handleSelectingItem(product: Product) {
    setSelectedProduct(product);
    setSelectedItem(product); // Assuming setSelectedItem is a function to set the selected item in the store
    onSelection();
  }

  function handleSearchItems(name: string) {
    const filtereditems: Product[] = availableItems.filter(
      (item) =>
        item.name.toLowerCase().includes(name.toLowerCase()) ||
        item.barCode === name
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

  const [isActive, setIsActive] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);

  const toggleScanning = () => {
    setIsActive(!isActive);
    setIsCameraActive(!isCameraActive);
    console.log("is  active", isActive);
    console.log("isCameraActive", isCameraActive);
  };

  const onScanned = (results: TextResult[]) => {
    if (results.length > 0) {
      let text = "";
      for (let index = 0; index < results.length; index++) {
        const result = results[index];
        text =
          text + result.barcodeFormatString + ": " + result.barcodeText + "\n";
      }
      alert(text);
      setIsActive(false);
      setIsCameraActive(false);
    }
  };

  //Functions to filter products using the barcode
  function handleSearchItemsByBarcode(barCode: string) {
    const filtereditems: Product[] = availableItems.filter(
      (item) => item.barCode === barCode
    );
    if (filtereditems) {
      filtereditems.map((item) => {
        console.log(item);
        handleSelectingItem(item);
      });
    }
  }

  function searchForBarCode(barCode: any) {
    console.log("Searching for items with the barcode", barCode);
    handleSearchItemsByBarcode(barCode);
    setBarCodeButtonTriggered(false);
    setIsActive(false);
    setIsCameraActive(false);
  }

  //useEffect to load items when a camera detetted a barcode
  useEffect(() => {
    console.log("Barcode in the use effect", barCode);
    searchForBarCode(barCode);
  }, [barCode]);

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
        <div className="flex justify-center">
          <Button
            className="mt-2 mr-0 bg-slate-700 text-white py-1 px-2 rounded-lg hover:bg-blue-700 w-2/3 "
            onClick={() => {
              searchForBarCode(barCode);
              setBarCodeButtonTriggered(true);
            }}
          >
            Search using the barcode
          </Button>
        </div>
        <div className="flex sm:hidden justify-end ">
          <Button
            className=" mt-2 mr-0 bg-green-900 text-white py-1 px-2 rounded-lg hover:bg-blue-700 w-2/6 "
            onClick={() => {
              setShowBill(true);
            }}
          >
            Continue
          </Button>
        </div>

        <div>
          {barcodeButtonTriggerd ? (
            <div>
              <h1 className="mt-6">Scanned Barcode: {barCode}</h1>

              {initialized ? (
                <div className="flex justify-center">
                  <button
                    className="m-2 mr-0 bg-slate-700 text-white py-1 px-2 rounded hover:bg-blue-700  "
                    onClick={toggleScanning}
                  >
                    {isCameraActive ? "Stop Scanning" : "Start Scanning"}
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div>Initializing...</div>
                </div>
              )}
              <div>
                <BarcodeScanner
                  license={props.license}
                  onInitialized={() => setInitialized(true)}
                  isActive={isCameraActive}
                  onScanned={(results) => onScanned(results)}
                ></BarcodeScanner>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {filteredItems ? (
          filteredItems.length > 0 ? (
            <div className="w-full flex justify-center ">
            <div className="w-2/3 sm:w-full flex flex-col justify-center  mt-6 sm:grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
             
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
          <div className="w-full flex justify-center ">
            <div className="w-2/3 sm:w-full flex flex-col justify-center  mt-6 sm:grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {availableItems.map((product) => (
                <div key={product.id} className="group relative">
                  <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 min-h-60">
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
          </div>
        )}
      </div>
    </div>
  );
}
// export default ItemList;
