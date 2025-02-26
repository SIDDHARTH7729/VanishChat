import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const user = await currentUser(); // Get logged-in user's details

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the user in the database using Clerk's user ID
    const dbUser = await client.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    // Fetch only the logged-in user's posts
    const posts = await client.post.findMany({
      where: { authorId: dbUser.id },
      skip,
      take: limit,
      include: {
        author: true,
        likes: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      content: post.content,
      authorName: post.author.showname ? post.author.username : "Anonymous",
      createdAt: post.createdAt,
      likes: post.likes.length,
      dislikes: 0,
    }));

    // Count total user posts
    const totalPosts = await client.post.count({ where: { authorId: dbUser.id } });
    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json({ posts: formattedPosts, totalPages });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
