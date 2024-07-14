import prisma from "@/lib/db";

export default async function DatabseCheck(){

   const posts = await prisma.post.findMany();

    return(
        <div>
                Databse Posts
                {posts.map(post =>
                <div>
                      <p>{post.title}</p>
                      <p>{post. content}</p>
                </div>
                  
       
                )}
        </div>
    )

}