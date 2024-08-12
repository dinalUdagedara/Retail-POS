// "use client"
// import BarcodeScanner from '@/components/invoice-dashboard/barcode-scanner/barcode-scanner';
// import React from 'react';

// import { TextResult } from 'dynamsoft-javascript-barcode';

// export async function BarCodeScanner() {
//   let license:string|undefined = process.env.DBRLicense;
//   return { props: { license:license } };
// }

// export default function Home(props:any) {
//   const [isActive,setIsActive] = React.useState(false);
//   const [initialized,setInitialized] = React.useState(false);
//   const toggleScanning = () => {
//     setIsActive(!isActive);
//   }

//   const onScanned = (results:TextResult[]) => {
//     if (results.length>0) {
//       let text = "";
//       for (let index = 0; index < results.length; index++) {
//         const result = results[index];
//         text = text + result.barcodeFormatString + ": " + result.barcodeText + "\n";
//       }
//       alert(text);
//       setIsActive(false);
//     }
//   }

//   return (
//     <>
//         <div>
//           <h2>Next.js Barcode Scanner</h2>
//           {initialized ? (
//             <button onClick={toggleScanning}>{isActive ? "Stop Scanning" : "Start Scanning"}</button>
//           ) : (
//             <div>Initializing...</div>
//           )}
//           <div >
//             <BarcodeScanner
//               license={props.license}
//               onInitialized={() => setInitialized(true)}
//               isActive={isActive}
//               onScanned={(results) => onScanned(results)}
//             ></BarcodeScanner>
//           </div>
//         </div>
//     </>
//   )
// }
const BarcodeScannerPage = () => {
  return ( 
    <></>
   );
}
 
export default BarcodeScannerPage;