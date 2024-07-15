import prisma from "@/lib/db";

export default async function DatabseCheck() {
  const posts = await prisma.post.findMany();
  const items = await prisma.item.findMany();


  return (
    <div>
      Databse Posts
      {items.map((item) => (
        <div className="flex flex-col justify-center items-center">
          <div>{item.brandName}</div>

          <div>{item.name}</div>
        </div>
      ))}
    </div>
  );
}
