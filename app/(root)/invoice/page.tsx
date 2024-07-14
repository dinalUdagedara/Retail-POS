import InvoicePageComponent from "@/components/invoice-dashboard/invoice-page";
import prisma from "@/lib/db";

// const InvoicePage = () => {
//   return (
//     <div>
//       <InvoicePageComponent />
//     </div>
//   );
// };

// export default InvoicePage;


export default async function InvoicePage (){
  
 
  const Items = await prisma.item.findMany();
  {Items.map(item=>(
    console.log("Item Details",item.brandName)
  ))}


  return (
        <div>
          <InvoicePageComponent />
        </div>
  );
}