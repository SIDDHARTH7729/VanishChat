import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await client.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Extract postId from query params
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    console.log("Received delete request for postId:", postId); // Debugging

    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    // ✅ Ensure post exists
    const post = await client.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      console.error("Post not found in DB:", postId); // Debugging
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // ✅ Check if the user is the author
    if (post.authorId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Delete the post
    await client.post.delete({ where: { id: postId } });

    console.log("Post deleted successfully:", postId); // Debugging
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

