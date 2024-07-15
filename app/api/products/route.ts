//used only for updating the datasbase
import { products } from "./data";

import prisma from "@/lib/db";

export interface Item {
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

export const fetchProducts = async () => {
  //Fetch data from the database to the server
  const items: Item[] = await prisma.item.findMany();
  return items;
};
//Getting all the Products in the  database
export async function GET() {
  const fetchedProducts = await fetchProducts();
  return Response.json(fetchedProducts);
}

// function to update the server but this wont update the databse find a way to update the database
export async function POST(request: Request) {
  const product = await request.json();
  const newProduct: Item = {
    id: product.id,
    brandName: product.brandName,
    name: product.name,
    size: product.size,
    weight: product.weight,
    price: product.price,
    quantity: product.quantity,
    imageURL: product.imageURL,
    isWeighting: product.isWeighting,
  };
  products.push(newProduct);
  return new Response(JSON.stringify(newProduct), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
