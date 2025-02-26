import { client } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { postId, clerkId } = await req.json();

    console.log("API received request:", { postId, clerkId });

    if (!postId || !clerkId) {
      return NextResponse.json({ error: "Missing postId or clerkId" }, { status: 400 });
    }

    // Get user from DB
    const user = await client.user.findUnique({ where: { clerkId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch post to check authorId
    const post = await client.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if like exists
    const existingLike = await client.like.findFirst({
      where: { userId: user.id, postId },
    });

    let hasLiked = false;

    if (existingLike) {
      console.log("Unliking post...");
      await client.like.delete({ where: { id: existingLike.id } });
    } else {
      console.log("Liking post...");
      await client.like.create({ data: { userId: user.id, postId } });
      hasLiked = true;
    }

    // Get updated like count
    const likeCount = await client.like.count({ where: { postId } });

    // create noti if user not author
    if (post.authorId !== user.id) {
      try {
        await client.notification.create({
          data: {
            userId: post.authorId,
            message: `User ${user.username || "Someone"} ${hasLiked ? "liked" : "unliked"} your post`,
            postId: post.id, 
          },
        });
      } catch (error) {
        console.error("Error creating notification:", error);
      }
    }


    console.log("Like count updated:", likeCount);

    return NextResponse.json({ likeCount, hasLiked });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

// import { client } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export const POST = async (req: Request) => {
//   try {
//     const { postId, clerkId } = await req.json();

//     console.log("API received request:", { postId, clerkId });

//     if (!postId || !clerkId) {
//       return NextResponse.json({ error: "Missing postId or clerkId" }, { status: 400 });
//     }

//     // Get user from DB
//     const user = await client.user.findUnique({ where: { clerkId } });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Check if like exists
//     const existingLike = await client.like.findFirst({
//       where: {
//         userId: user.id,
//         postId: postId,
//       },
//     });

//     let hasLiked = false;

//     if (existingLike) {
//       console.log("Unliking post...");
//       await client.like.delete({ where: { id: existingLike.id } });
//     } else {
//       console.log("Liking post...");
//       await client.like.create({ data: { userId: user.id, postId } });
//       hasLiked = true;
//     }

//     // Get updated like count
//     const likeCount = await client.like.count({ where: { postId } });

//     const post = await client.post.findUnique({
//       where: { id: postId },
//       select: { authorId: true }
//     });
    
//     if (!post) {
//       return NextResponse.json({ error: "Post not found" }, { status: 404 });
//     }

//     if(postId.authorId !== user.id) {
//       await client.notification.create({
//         data: {
//           userId: postId.authorId,
//           message:`User ${user.username} ${hasLiked ? 'liked' : 'unliked'} your post`,
//           postId: postId
//         }
//       })
//     }

//     console.log("Like count updated:", likeCount);

//     return NextResponse.json({ likeCount, hasLiked });
//   } catch (error) {
//     console.error("Server error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// };


