"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sampleProducts } from "@/lib/data";
import { useEffect, useState } from "react";
import { Product } from "@/components/invoice-dashboard/item-list/item-list";

export function StockTable() {
  const [stock, setStock] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Fetching data from the route handler
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");

        if (response.ok) {
          const products: Product[] = await response.json();
          setStock(products);
        } else {
          setStock(sampleProducts);
        }
      } catch (error) {
        console.log("Error", error);
        setStock(sampleProducts);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [stock]);

  function calculateTotal() {
    let total1 = 0;
    if (stock) {
      stock.map((item) => {
        total1 += item.price;
      });
      setTotal(total1);
    }
  }

  const filteredStock = stock.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.barCode.includes(searchQuery)
  );

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <Table>
        <TableCaption>A list of stock.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Bar Code</TableHead>
            <TableHead>Brand Name</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStock.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.barCode}</TableCell>
              <TableCell>{product.brandName}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.size}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">Rs.{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">Rs.{total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
