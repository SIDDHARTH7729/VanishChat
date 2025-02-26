"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Heart } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  message: string;
  postId?: string;
  createdAt: string;
}

// Fetch noti for logged In users only
const fetchNotifications = async (): Promise<Notification[]> => {
    try {
      const response = await axios.get(`/api/notification/`);
      console.log("API Response:", response.data); // Debugging
      return response.data?.notifications ?? [];
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };
  
  

const Interactions = () => {
  const { user } = useUser();

  const { data: notifications = [], isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading notifications...</p>;
  if (error) return <p>Error loading notifications</p>;

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg text-black">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="p-4 flex items-center justify-between border rounded-lg shadow-sm bg-gray-100"
            >
              <div>
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>
  
              {notification.postId && (
                <Heart fill="red" className="w-6 h-6" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default Interactions;


