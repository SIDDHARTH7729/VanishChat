
import axios from "axios";

export const fetchPublicPosts = async () => {
  const response = await axios.get("/api/public-posts");
  return response.data;
};


// getting for infinite scroll
// export const fetchPublicPosts = async (page: number) => {
//   const res = await axios.get(`/api/public-posts?page=${page}&limit=5`);
//   return res.data; // Ensure API response contains { posts: Post[], nextCursor: number | null }
// };

// // Handle Like Toggle (Uses WebSocket)
// export const toggleLike = async (postId: string, userId: string) => {
//   await axios.post("/api/like", { postId, userId });
// };

  