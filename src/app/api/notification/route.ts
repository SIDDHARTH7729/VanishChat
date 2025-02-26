import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId: clerkId } = await auth(); // Fetch the logged-in user's Clerk ID

  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch the corresponding internal user ID from the database
  const user = await client.user.findUnique({
    where: { clerkId },
    select: { id: true }, // Only fetch the internal user ID
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = user.id; // Internal user ID

  try {
    console.log("Fetching notifications for userId:", userId);

    const notifications = await client.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    console.log("Fetched notifications:", notifications);

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Error fetching notifications" }, { status: 500 });
  }
}


// import { client } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { userId } = await auth(); // Fetch the logged-in user

//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user = await client.user.findUnique({where:{clerkId:userId}})
//   const userId2 = user?.id

//   try {
//     console.log("Fetching notifications for user:", userId);

//     const notifications = await client.notification.findMany({
//       where: { userId:userId2 }, 
//       orderBy: { createdAt: "desc" },
//     });

//     console.log("Fetched notifications:", notifications);

//     return NextResponse.json({ notifications });
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     return NextResponse.json({ error: "Error fetching notifications" }, { status: 500 });
//   }
// }
