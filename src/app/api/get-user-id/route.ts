import { client } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json({ error: "Clerk ID is required" }, { status: 400 });
    }

    const user = await client.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        username: true,
        showname: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      userId: user.id,
      username: user.username,
      showname: user.showname,
    });
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

