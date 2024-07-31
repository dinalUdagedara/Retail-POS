import prisma from "@/lib/db";

export default async function DatabseCheck() {
  const posts = await prisma.post.findMany();
  const items = await prisma.item.findMany();

//example page for demo how to fetch data from the database to the server
  return (
    <div>
      Databse Posts
      {items.map((item) => (
        <div key={item.id} className="flex flex-col justify-center items-center">
          <div>{item.brandName}</div>

          <div>{item.name}</div>
        </div>
      ))}
    </div>
  );
}
