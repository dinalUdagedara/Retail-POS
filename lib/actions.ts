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
    barCode: string; 
  }

export const fetchProducts = async (): Promise<Item[]> => {
  // Fetch data from the database to the server
  const items: Item[] = await prisma.item.findMany();
  return items;
};