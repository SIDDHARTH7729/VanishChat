import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });
  
  try {
    const posts = await client.post.findMany({
      include: {
        author: { select: { username: true } },
        likes: { select: { userId: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    
    const transformedPosts = posts.map((post) => ({
      id: post.id,
      content: post.content,
      authorId: post.authorId,
      author: post.author,
      createdAt: post.createdAt.toISOString(), // Include the timestamp
      likesCount: post.likes.length,
      hasLiked: post.likes.some((like) => like.userId === userId), // Check if current user liked the post
    }));
    
    return new Response(JSON.stringify({ posts: transformedPosts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: "Error fetching posts" }), { status: 500 });
  }
}
// import { client } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function GET(req: Request) {
//   const { userId } = await auth();
//   if (!userId) return new Response("Unauthorized", { status: 401 });

//   try {
//     const posts = await client.post.findMany({
//       include: {
//         author: { select: { username: true } },
//         likes: { select: { userId: true } },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     const transformedPosts = posts.map((post) => ({
//       id: post.id,
//       content: post.content,
//       authorId: post.authorId,
//       author: post.author,
//       likesCount: post.likes.length,
//       hasLiked: post.likes.some((like) => like.userId === userId), // Check if current user liked the post
//     }));

//     return new Response(JSON.stringify({ posts: transformedPosts }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return new Response(JSON.stringify({ error: "Error fetching posts" }), { status: 500 });
//   }
// }


