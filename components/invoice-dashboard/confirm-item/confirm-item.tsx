"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store/state";
import { SizeSelect } from "./size-select";
import Image from "next/image";
import { Checkbox, InputNumber, Space } from "antd";

const Confirmation = () => {
  const [keyboard, setKeyboard] = useState(true);
  const [isWeightingItem, setIsWeightingItem] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState([
    {
      id: 1,
      name: "",
      size: "",
      price: 0.0,
      quantity: 0,
      imageURL: "",
      isWeighting: false,
    },
  ]);

  //Zustand setup
  const selectedItem = useStore((state) => state.selectedItem);
  const setBilledItems = useStore((state) => state.setBilledItems);
  const setItemSelected = useStore((state) => state.setItemSelected);

  const updatedProduct = { ...selectedProduct[0] };

  function handleFormSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.forEach((value, key) => {
      if (key === "quantity") {
        updatedProduct.quantity = Number(value);
      } else if (key === "weight") {
        updatedProduct.size = value.toString();
      } else if (key === "size") {
        updatedProduct.size = value.toString();
      }
    });

    setSelectedProduct([updatedProduct]);
    setBilledItems(updatedProduct);

    //Back to main page
    setItemSelected(false);

    console.log("Updated product:", updatedProduct);
  }
  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.isWeighting) {
        setIsWeightingItem(true);
      } else {
        setIsWeightingItem(false);
      }
      updatedProduct.name = selectedItem.name ?? "";
      updatedProduct.price = selectedItem.price ?? 0;
      updatedProduct.imageURL = selectedItem.imageURL ?? "";
    }
    setSelectedProduct([updatedProduct]);
  }, [selectedItem]);
  return (
    <div className=" w-full p-20 pt-2">
      <form onSubmit={handleFormSubmit}>
        <div className="space-y-12  w-full ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 ">
              Hiru
            </h2>

            <div className="flex justify-between">
              <div className="ml-5">
                <Image
                  src={"/assets/hiru.jpg"}
                  height={200}
                  width={200}
                  alt="Product Image"
                />
                <p className="mt-1 text-md leading-6 text-gray-600 text-center">
                  {selectedItem?.name}
                </p>
              </div>

              <div className="sm:col-span-3">
                <div className="flex flex-row gap-6 m-20">
                  <label
                    htmlFor="numberOfItems"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Number of Items
                  </label>
                  <div>
                    <select
                      id="quantity"
                      name="quantity"
                      autoComplete="quantity"
                      className="block w-[60px]  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option className="text-center">1</option>
                      <option className="text-center">2</option>
                      <option className="text-center">3</option>
                      <option className="text-center">4</option>
                      <option className="text-center">5</option>
                      <option className="text-center">6</option>
                      <option className="text-center">7</option>
                      <option className="text-center">8</option>
                      <option className="text-center">9</option>
                      <option className="text-center">10</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center mt-5 border-t p-6 pb-0">
              {isWeightingItem ? (
                <>
                  <div className="sm:col-span-3">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Weight
                  </label>
                  <div className="mt-2 items-center">
                    <Space>
                      <InputNumber
                        id="weight"
                        name="weight"
                        keyboard={keyboard}
                        defaultValue={selectedItem?.size}
                        addonAfter="Kg"
                      />
                      <Checkbox
                        onChange={() => {
                          setKeyboard(!keyboard);
                        }}
                        checked={keyboard}
                      >
                        Toggle keyboard
                      </Checkbox>
                    </Space>
                  </div>
                </div>
                </>
                
              ) : (
                <div>
                  <div className="sm:col-span-3 ">
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Size
                  </label>
                  <SizeSelect />
                </div>
                </div>
                
              )}
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Price Per Unit
            </h2>

            <div className=" space-y-8">
              <fieldset>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Rs. {selectedItem?.price.toFixed(2)}
                </p>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Confirmation;
