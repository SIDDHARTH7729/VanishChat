import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    
    const user = await client.user.findUnique({
      where: { clerkId: userId }, 
      select: {
        username: true,
        posts: {
          select: { id: true, likes: { select: { id: true } } },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const totalPosts = user.posts.length;
    const totalLikes = user.posts.reduce((acc, post) => acc + post.likes.length, 0);

    return new Response(JSON.stringify({ username: user.username, totalPosts, totalLikes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// import { auth } from "@clerk/nextjs/server";
// import { client } from "@/lib/prisma";

// export async function GET() {
//   try {
//     const { userId } = await auth(); 

//     if (!userId) {
//       return { error: "Unauthorized", status: 401 };
//     }

//     // Fetch user details, total posts, and likes
//     const user = await client.user.findUnique({
//       where: { id: userId },
//       select: {
//         username: true,
//         posts: {
//           select: { id: true, likes: { select: { id: true } } },
//         },
//       },
//     });

//     if (!user) {
//       return { error: "User not found", status: 404 };
//     }

//     const totalPosts = user.posts.length;
//     const totalLikes = user.posts.reduce((acc: number, post: { likes: { id: string }[] }) => {
//       return acc + post.likes.length;
//     }, 0);

//     return { username: user.username, totalPosts, totalLikes };
//   } catch (error) {
//     console.error("Error fetching user stats:", error);
//     return { error: "Internal Server Error", status: 500 };
//   }
// }

