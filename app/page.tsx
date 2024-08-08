"use client"
import InvoicePage from "@/app/(root)/invoice/page";
import { redirect } from 'next/navigation'

import { useEffect } from "react";

export default function Home() {
  
  useEffect(() => {
    redirect('/invoice')
}, []);

  return (
    <div>
      <InvoicePage />
    </div>
  );
}
