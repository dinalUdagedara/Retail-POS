"use client";
import Form from "./form";
import prisma from "@/lib/db";

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
  barcode: string;
}

const AddnewComponent = () => {
  const handleAddProduct = async (productData: Item) => {
    try {

      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
        console.log(productData);
      }

      const newProduct = await response.json();
      // Handle successful addition here (e.g., clear form, show success message)
      console.log("Product added successfully!", newProduct);
    } catch (error) {
      // Handle errors here (e.g., show error message)
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex w-screen m-6 justify-center ">
      <Form onSubmit={handleAddProduct} />
      {/* <Form onSubmit={handleAddProduct} /> */}
    </div>
  );
};

export default AddnewComponent;
