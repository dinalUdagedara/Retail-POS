import { products } from "./data";
import prisma from "@/lib/db";

export interface Item {
    id: string;
    brandName: string;
    name: string;
    size: string;
    weight:number;
    price: number;
    quantity: number;
    imageURL: string;
    isWeighting:boolean;
  }

export const fetchProducts = async ()=>{
    const posts = await prisma.post.findMany();
    const items:Item[] = await prisma.item.findMany();
    {items.map((item)=>{
        console.log("item",item.brandName)
    })}
    return items
}
export async function GET() {
    const fetchedProducts = await fetchProducts()
    console.log("fetchedItems",fetchedProducts)
  return Response.json(fetchedProducts);
}

  
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
