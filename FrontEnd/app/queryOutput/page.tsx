// pages/index.js

import { queryData } from "@/prisma/utils/getQueryOutput";

const Page = () => {
    const fetchData = async () => {
        try {
            const queryOutput = await queryData();
            console.log("Query Output:", queryOutput);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData(); // Call fetchData function when component mounts

    return ( 
        <div>
            Hello World
        </div>
    );
};

export default Page;
