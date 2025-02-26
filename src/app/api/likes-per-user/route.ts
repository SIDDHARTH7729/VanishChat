import { client } from "@/lib/prisma";
import { subDays, startOfDay, endOfDay, format } from "date-fns";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    const today = startOfDay(new Date());
    const last7Days = Array.from({ length: 7 }, (_, i) =>
      format(subDays(today, i), "yyyy-MM-dd")
    ).reverse();

    // Get likes count grouped by date, considering the Post relationship
    const likesData = await client.like.groupBy({
      by: ['createdAt'],
      where: {
        userId,
        createdAt: {
          gte: startOfDay(subDays(today, 6)),
          lte: endOfDay(today),
        },
        post: {
          isVisible: true, // Only count likes on visible posts
        },
      },
      _count: {
        _all: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const likesMap = new Map(
      likesData.map((entry) => [format(entry.createdAt, "yyyy-MM-dd"), entry._count._all])
    );

    const formattedData = last7Days.map((date) => ({
      date,
      count: likesMap.get(date) || 0,
    }));

    return new Response(JSON.stringify({ data: formattedData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching likes data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}





// import { client } from '@/lib/prisma';
// import { type NextApiRequest, type NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   try {
//     const likesPerUserPerDay = await client.like.groupBy({
//       by: ['userId', 'createdAt'],
//       _count: { id: true },
//       orderBy: [{ createdAt: 'asc' }],
//     });

//     // Transform data for frontend use
//     const transformedData = likesPerUserPerDay.map(like => ({
//       userId: like.userId,
//       date: like.createdAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
//       count: like._count.id,
//     }));

//     return res.status(200).json({ data: transformedData });
//   } catch (error) {
//     return res.status(500).json({ error: 'Error fetching likes data' });
//   }
// }
