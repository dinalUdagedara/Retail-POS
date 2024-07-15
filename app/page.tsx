"use client";
import InvoicePage from "@/components/invoice-dashboard/invoice-page";
import { useEffect } from "react";

export default function Home() {
  //a example of how to fetch data from the server to the frontend componetns using useEffect

  // useEffect(() => {

  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/comments");
  //       const users = await response.json();
  //       console.log("Comments", users);

  //     } catch (error) {
  //       console.log("Error",error)
  //     }

  //   };

  //   fetchProducts();
  // },[]);

  return (
    <div>
      <InvoicePage />
      {/* Please correct the routing later */}
    </div>
  );
}
