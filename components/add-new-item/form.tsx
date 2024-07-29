"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  brandName: string;
  name: string;
  size: string;
  weight: number;
  price: number;
  quantity: number;
  imageURL: string;
  isWeighting: boolean;
}

export default function Form({
  onSubmit,
}: {
  onSubmit: (productData: Item) => void;
}) {
  const [isWeightable, setIsWeightable] = useState(false);

  const handleIsCheckBoxChange = (e: any) => {
    setIsWeightable(e.target.checked);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // ... extract form data as before
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Create product object
    const product: Item = {
      id: uuidv4(), // Assuming static ID or you can generate a unique ID
      brandName: formData.get("brandName")?.toString() || "",
      name: formData.get("productName")?.toString() || "",
      size: formData.get("size")?.toString() || " ",
      weight: Number(formData.get("weight")) || 0,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      imageURL: formData.get("imgURL")?.toString() || "",
      isWeighting: formData.get("isWeightable") === "true",
    };

    // Validation (Optional)
    if (
      !product.brandName ||
      !product.name ||
      product.price <= 0 ||
      product.quantity <= 0 ||
      (!product.isWeighting && !product.size) ||
      (product.isWeighting && product.weight <= 0)
    ) {
      console.error("Validation error: Check required fields.");
      return;
    }

    // Call the prop function with product object
    onSubmit(product);
  }

  return (
    <div className="w-full flex justify-center ">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 flex justify-center ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add a New Product to the System
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="brandName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="brandName"
                      name="brandName"
                      type="text"
                      placeholder="Enter the Brand Name here"
                      autoComplete="brandName"
                      className="block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="productName"
                      name="productName"
                      type="text"
                      placeholder="Enter the Product Name here"
                      autoComplete="productName"
                      className="block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 sm:col-span-4">
                <div className="flex h-6 items-center">
                  <input
                    id="isWeightable"
                    name="isWeightable"
                    checked={isWeightable}
                    onChange={handleIsCheckBoxChange}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="isWeightable"
                    className="font-medium text-gray-900"
                  >
                    Weightable Item
                  </label>
                  <p className="text-gray-500">
                    Item is measured in weight not by the size
                  </p>
                </div>
              </div>

              {isWeightable ? (
                <div className="sm:col-span-4">
                  {/* Only Enabled if the item is weightable  */}

                  <div>
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Weight
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="weight"
                          name="weight"
                          type="text"
                          placeholder={
                            !isWeightable ? "" : "Please Enter the Weight here"
                          }
                          disabled={!isWeightable}
                          autoComplete="weight"
                          className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                            isWeightable ? "bg-white" : "bg-gray-600"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                //   Only Enable if product is not weightable
                <div className="sm:col-span-4">
                  <div>
                    <label
                      htmlFor="size"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Size
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="size"
                          name="size"
                          type="text"
                          placeholder={
                            isWeightable ? "" : "Please Enter the Size here"
                          }
                          disabled={isWeightable}
                          autoComplete="size"
                          className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                            isWeightable ? " bg-gray-600" : "bg-white"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="sm:col-span-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="relative mt-2 rounded-md shadow-sm p-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm ">Rs</span>
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="0.00"
                    className=" block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      placeholder="Enter the no.of products adding"
                      autoComplete="quantity"
                      className="block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="imgURL"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image URL
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="imgURL"
                      name="imgURL"
                      type="text"
                      placeholder="Enter the Image URL in here"
                      autoComplete="imgURL"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full ">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div> */}
              </div>
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
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
