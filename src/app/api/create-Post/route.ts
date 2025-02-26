import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { client } from "@/lib/prisma"; // Ensure Prisma is correctly set up

export const POST = async (req: Request) => {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    if (!req.body) {
      return NextResponse.json({ error: "Request body is missing" }, { status: 400 });
    }

    const body = await req.json(); 
    const { content } = body || {}; 

    if (!content || content.trim() === "") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

   
    const user = await client.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const post = await client.post.create({
      data: {
        content,
        authorId: user.id, 
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

