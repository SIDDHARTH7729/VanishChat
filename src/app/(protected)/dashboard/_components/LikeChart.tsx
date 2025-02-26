"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { subDays, format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LikeData {
  date: string;
  count: number;
}

interface UserData {
  userId: string;
  username: string;
  showname: boolean;
}

const fetchUserLikesData = async (userId: string): Promise<LikeData[]> => {
  try {
    const response = await axios.get(`/api/likes-per-user?userId=${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching likes data:", error);
    throw new Error("Failed to fetch likes data");
  }
};

const LikesChart = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`/api/get-user-id?clerkId=${user.id}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (user?.id) {
      fetchUserData();
    }
  }, [user?.id]);

  const { data: likesData, isLoading, error } = useQuery({
    queryKey: ["likesPerUser", userData?.userId],
    queryFn: () => (userData?.userId ? fetchUserLikesData(userData.userId) : Promise.resolve([])),
    enabled: !!userData?.userId && isUserLoaded,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
    retry: 3,
  });

  const prepareChartData = () => {
    if (!likesData || likesData.length === 0) {
      return null;
    }

    const last7Days = Array.from({ length: 7 }, (_, i) =>
      format(subDays(new Date(), i), "yyyy-MM-dd")
    ).reverse();

    const dataset = last7Days.map((date) => {
      const entry = likesData.find((like) => like.date === date);
      return entry ? entry.count : 0;
    });

    const maxValue = Math.max(...dataset, 1);
    let yAxisMax;
    if (maxValue <= 50) {
      yAxisMax = Math.ceil(maxValue / 5) * 5;
    } else {
      yAxisMax = Math.ceil(maxValue / 10) * 10;
    }

    const stepSize = yAxisMax <= 20 ? 5 : 10;

    const data: ChartData<"line"> = {
      labels: last7Days.map(date => format(new Date(date), 'MMM d')),
      datasets: [
        {
          label: "Likes Given",
          data: dataset,
          borderColor: "hsl(var(--chart-1))",
          backgroundColor: "hsl(var(--chart-1) / 0.2)",
          tension: 0.2,
          fill: true,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: userData?.showname 
            ? `Likes Given by ${userData.username}`
            : "Your Likes Activity",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "hsl(var(--foreground))",
        },
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "hsl(var(--card))",
          titleColor: "hsl(var(--card-foreground))",
          bodyColor: "hsl(var(--card-foreground))",
          borderColor: "hsl(var(--border))",
          borderWidth: 1,
          callbacks: {
            label: (context) => `${context.parsed.y} likes given`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { 
            display: true, 
            text: "Likes",
            color: "hsl(var(--foreground))",
          },
          ticks: {
            stepSize: stepSize,
            precision: 0,
            color: "hsl(var(--foreground))",
          },
          suggestedMax: yAxisMax,
          grid: {
            display: true,
            color: "hsl(var(--border))",
          },
        },
        x: {
          title: { 
            display: true, 
            text: "Date",
            color: "hsl(var(--foreground))",
          },
          ticks: {
            color: "hsl(var(--foreground))",
          },
          grid: {
            display: false,
          },
        },
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 6,
        },
      },
      interaction: {
        intersect: false,
        mode: "nearest",
      },
    };

    return { data, options };
  };

  const chartConfig = likesData ? prepareChartData() : null;

  if (!isUserLoaded || isLoading) {
    return (
      <Card className="w-full p-6 space-y-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-[200px] w-full" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full p-6">
        <div className="flex flex-col items-center justify-center h-64 rounded-lg border border-destructive bg-destructive/10">
          <p className="text-destructive font-medium">Failed to load likes data</p>
          <p className="text-sm text-muted-foreground">Please try again later</p>
        </div>
      </Card>
    );
  }

  if (!chartConfig) {
    return (
      <Card className="w-full p-6">
        <div className="flex flex-col items-center justify-center h-64 rounded-lg border border-muted bg-muted/50">
          <p className="text-muted-foreground">No likes activity yet</p>
          <p className="text-sm text-muted-foreground">Start liking posts to see your activity here</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full p-6">
      <div className="h-64 relative">
        <Line data={chartConfig.data} options={chartConfig.options} />
      </div>
    </Card>
  );
};

export default LikesChart;




