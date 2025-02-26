"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

const FrontCard = () => {
  const [stats, setStats] = useState<{ username: string; totalPosts: number; totalLikes: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/userStats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <Card className="w-[350px] md:w-[500px] text-center shadow-xl border border-gray-800 bg-gradient-to-br from-gray-800 to-gray-800/20 text-white pd-20 pt-10">
        <CardHeader>
          <CardTitle className="text-xl font-bold">User Stats</CardTitle>
          <CardDescription className="text-gray-400">Your profile insights</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {loading ? (
            <p className="text-gray-300 text-center">Loading...</p>
          ) : stats ? (
            <>
              <p className="text-lg">
                <span className="font-semibold text-blue-400">Username:</span> {stats.username}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-green-400">Total Posts:</span> {stats.totalPosts}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-yellow-400">Total Likes:</span> {stats.totalLikes}
              </p>
            </>
          ) : (
            <p className="text-red-400 text-center">Failed to load data</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button onClick={fetchStats} variant="outline" className="border-blue-500 hover:bg-blue-500 text-black">
            Refresh
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FrontCard;
