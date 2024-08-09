import InvoicePage from "@/app/(root)/invoice/page";
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/invoice')

  return (
    <div>
      <InvoicePage />
    </div>
  );
}
