import { sampleProducts } from "@/lib/data";
import prisma from "@/lib/db";
import { fetchProducts } from "@/lib/actions";
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

// export const fetchProducts = async (): Promise<Item[]> => {
//   // Fetch data from the database to the server
//   const items: Item[] = await prisma.item.findMany();
//   return items;
// };

// CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow requests from any origin
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};


// Fetching all the Products in the database
export async function GET() {
  try {
    const fetchedProducts = await fetchProducts();
    return new Response(JSON.stringify(fetchedProducts), {
      headers: corsHeaders,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Error fetching products" }), {
      headers: corsHeaders,
      status: 500,
    });
  }
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
      barCode: product.barCode,
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
        headers: corsHeaders,
        status: 400,
      });
    }

    const addNewProduct = await prisma.item.create({
      data: newProduct,
    });

    // Optionally update the local products array
    sampleProducts.push(newProduct);

    return new Response(JSON.stringify(addNewProduct), {
      headers: corsHeaders,
      status: 201,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    // Return the detailed error message in the response
    return new Response(JSON.stringify({ error: error }), {
      headers: corsHeaders,
      status: 500,
    });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    headers: corsHeaders,
    status: 204,
  });
}
