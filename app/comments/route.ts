import { comments } from "./data";

// route handler to fetch data from the Database
export async function GET() {

    //only got the data from a local file instead of using database
  return Response.json(comments);
}

// route handler to update data in the Database
export async function POST(request: Request) {
  const comment = await request.json();
  const newComment = {
    id: comments.length + 1,
    text: comment.text,
  };
  comments.push(newComment);
  return new Response(JSON.stringify(newComment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
