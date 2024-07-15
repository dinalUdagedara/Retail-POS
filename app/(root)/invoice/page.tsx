"use client"
import InvoicePageComponent from "@/components/invoice-dashboard/invoice-page";
import prisma from "@/lib/db";

import { useStore,Item } from "@/store/state";
import { useEffect } from "react";

const InvoicePage = () => {
  return (
    <div>
      <InvoicePageComponent />
    </div>
  );
};

export default InvoicePage;


// export default async function InvoicePage (){
  
//   const updateProducts = useStore((state) => state.updateProducts);
//   const availableItems = useStore((state)=>state.availableItems)
  

//   // const Items = await prisma.item.findMany();
//   // {Items.map(item=>(
//   //   console.log("Item Details",item.brandName)
//   // ))}

 
//   const items:Item[] = await LoadItems();

//   console.log("Items Loaded",items)
//   try {
//     updateProducts(items)
//     console.log("Items Updated",availableItems)
//   } catch (error) {

//     console.log("error",availableItems)
//   }


//   return (
//         <div>
//           <InvoicePageComponent />
//         </div>
//   );
// }