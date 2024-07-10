"use client"

import { useStore } from "@/store/state";

const Cashbalance = () => {

    const total = useStore((state) => state.total);


    return ( 
        <>
        Cash Balance:{total}
        </>
     );
}
 
export default Cashbalance;