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
  // Fetch data from the database to the server
  const items: Item[] = await prisma.item.findMany();
  return items;
};

// Getting all the Products in the database
export async function GET() {
  const fetchedProducts = await fetchProducts();
  return new Response(JSON.stringify(fetchedProducts), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

// Function to update the server and the database
export async function POST(request: Request) {
  try {
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

    // Validate newProduct data structure
    if (
      !newProduct.id ||
      !newProduct.brandName ||
      !newProduct.name ||
      !newProduct.size ||
      !newProduct.imageURL
    ) {
      return new Response(JSON.stringify({ error: "Invalid product data" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    const addNewProduct = await prisma.item.create({
      data: newProduct,
    });

    // Optionally update the local products array
    products.push(newProduct);

    return new Response(JSON.stringify(addNewProduct), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    // Return the detailed error message in the response
    return new Response(JSON.stringify({ error: error }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
