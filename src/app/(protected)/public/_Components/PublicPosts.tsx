"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { fetchPublicPosts } from "@/lib/api";
import { ThumbsUp, MessageCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

// Type Definitions
type Post = {
  id: string;
  content: string;
  authorId: string;
  author: { username: string };
  createdAt: string; // Add the timestamp
  likesCount: number;
  hasLiked: boolean;
};

const PublicPostsPage = () => {
  const { user } = useUser();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (user?.id) {
      axios.get(`/api/get-user-id?clerkId=${user.id}`).then((res) => {
        setCurrentUserId(res.data.userId);
      });
    }
  }, [user?.id]);

  // Fetch posts
  const { data, isFetching } = useQuery({
    queryKey: ["publicPosts"],
    queryFn: fetchPublicPosts,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data?.posts) {
      setPosts(data.posts);
    }
  }, [data]);

  const handleLike = async (postId: string) => {
    try {
      const response = await axios.post("/api/like", { postId, clerkId: user?.id });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likesCount: Number(response.data.likeCount) || 0,
                hasLiked: response.data.hasLiked,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Format timestamp to relative time
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  // Get initials for avatar
  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
        Let's watch what others are saying
      </h2>
      
      <div className="space-y-5">
        <AnimatePresence>
          {posts
            .filter((post) => post.authorId !== currentUserId)
            .map((post) => (
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium mr-3">
                      {getInitials(post.author.username)}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-800">{post.author.username}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimestamp(post.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-700 text-lg mb-4 leading-relaxed">{post.content}</div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 py-1 px-3 rounded-full transition-all duration-200 hover:bg-gray-100"
                    >
                      <ThumbsUp
                        className="w-5 h-5"
                        fill={post.hasLiked ? "#6366f1" : "transparent"}
                        stroke={post.hasLiked ? "#6366f1" : "#64748b"}
                        strokeWidth={post.hasLiked ? 2 : 1.5}
                      />
                      <span className={`text-sm font-medium ${post.hasLiked ? "text-indigo-600" : "text-gray-600"}`}>
                        {post.likesCount ?? 0}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
        
        {posts.filter((post) => post.authorId !== currentUserId).length === 0 && !isFetching && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No posts yet. Be the first to share!</p>
          </div>
        )}
        
        {isFetching && (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPostsPage;

// "use client";

// import { useEffect, useState } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import { fetchPublicPosts } from "@/lib/api";
// import { getSocket } from "@/lib/socket";
// import { ThumbsUp } from "lucide-react";
// import { motion } from "framer-motion";

// // Type Definitions
// type Post = {
//   id: string;
//   content: string;
//   authorId: string;
//   author: { username: string };
//   likes: { userId: string }[];
// };

// const PublicPostsPage = () => {
//   const { user } = useUser();
//   const [currentUserId, setCurrentUserId] = useState<string | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     if (user?.id) {
//       axios.get(`/api/get-user-id?clerkId=${user.id}`).then((res) => {
//         setCurrentUserId(res.data.userId);
//       });
//     }
//   }, [user?.id]);

//   // Infinite scroll
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
//     queryKey: ["publicPosts"],
//     queryFn: async ({ pageParam }: { pageParam: number }) => fetchPublicPosts(String(pageParam)), // Convert pageParam to string
//     initialPageParam: 0, // Use a number
//     getNextPageParam: (lastPage) => (lastPage.nextCursor ? lastPage.nextCursor : null), // No need to convert if nextCursor is already a number
//   });
  

//   // Sync posts on data fetch
//   useEffect(() => {
//     if (data) {
//       const allPosts = data.pages.flatMap((page) => page.posts);
//       setPosts([...new Map(allPosts.map((post) => [post.id, post])).values()]);
//     }
//   }, [data]);

//   // WebSocket updates
//   useEffect(() => {
//     const socket = getSocket();

//     socket.on("postLiked", ({ postId, userId }) => {
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId
//             ? {
//                 ...post,
//                 likes: post.likes.some((like) => like.userId === userId)
//                   ? post.likes.filter((like) => like.userId !== userId)
//                   : [...post.likes, { userId }],
//               }
//             : post
//         )
//       );
//     });

//     return () => {
//       socket.off("postLiked");
//     };
//   }, []);

//   return (
//     <div className="w-full max-w-3xl mx-auto space-y-6 p-4 text-center">
//       <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
//         Let's watch what others are saying
//       </h2>

//       {posts
//         .filter((post) => post.authorId !== currentUserId)
//         .map((post) => {
//           const hasLiked = post.likes.some((like) => like.userId === currentUserId);

//           return (
//             <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//               <div className="shadow-md border border-gray-200 space-y-4 p-4 rounded-md">
//                 <div className="text-sm text-gray-600">{post.author.username}</div>
//                 <div className="text-gray-800">{post.content}</div>
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={() => getSocket().emit("likePost", { postId: post.id, clerkId: user?.id })}
//                     className="flex items-center gap-1 text-sm"
//                   >
//                     <ThumbsUp className={`w-5 h-5 ${hasLiked ? "text-red-500" : "text-gray-500"}`} />
//                     <span>{post.likes.length}</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}

//       {isFetchingNextPage && <p>Loading more...</p>}
//       {hasNextPage && (
//         <button
//           className="p-2 mt-8 border-gray-200 border rounded-md bg-white text-black font-extralight"
//           onClick={() => fetchNextPage()}
//         >
//           Load More
//         </button>
//       )}
//     </div>
//   );
// };

// export default PublicPostsPage;


// "use client"
// import { useEffect, useState } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import { fetchPublicPosts } from "@/lib/api";
// import socket from "@/lib/socket";
// import { ThumbsUp } from "lucide-react";
// import { motion } from "framer-motion";

// type Post = {
//   id: string;
//   content: string;
//   authorId: string;
//   author: { username: string };
//   likes: { userId: string }[];
// };

// const PublicPostsPage = () => {
//   const { user } = useUser();
//   const [currentUserId, setCurrentUserId] = useState<string | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     if (user?.id) {
//       axios.get(`/api/get-user-id?clerkId=${user.id}`).then((res) => {
//         setCurrentUserId(res.data.userId);
//       });
//     }
//   }, [user?.id]);

//   // infinite scroll
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
//     queryKey: ["publicPosts"],
//     queryFn: ({ pageParam = 0 }) => fetchPublicPosts(pageParam),
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
//   });

//   // Sync posts on data fetch
//   useEffect(() => {
//     if (data) {
//       const allPosts = data.pages.flatMap((page) => page.posts);
//       setPosts([...new Map(allPosts.map((post) => [post.id, post])).values()]);
//     }
//   }, [data]);

//   // web sockets upate
//   useEffect(() => {
//     socket.on("postLiked", ({ postId, userId }) => {
//       setPosts((prevPosts) =>
//         prevPosts.map((post) =>
//           post.id === postId
//             ? {
//                 ...post,
//                 likes: post.likes.some((like) => like.userId === userId)
//                   ? post.likes.filter((like) => like.userId !== userId) // Unlike
//                   : [...post.likes, { userId }], // Like
//               }
//             : post
//         )
//       );
//     });

//     return () => {
//       socket.off("postLiked");
//     };
//   }, []);

//   return (
//     <div className="w-full max-w-3xl mx-auto space-y-6 p-4 text-center ">
//       <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">Let's watch what others are saying</h2>

//       {posts
//         .filter((post) => post.authorId !== currentUserId) 
//         .map((post) => {
//           const hasLiked = post.likes.some((like) => like.userId === currentUserId);

//           return (
//             <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//               <div className="shadow-md border border-gray-200 space-y-4 p-4 rounded-md">
//                 <div className="text-sm text-gray-600">{post.author.username}</div>
//                 <div className="text-gray-800">{post.content}</div>
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={() => socket.emit("likePost", { postId: post.id, clerkId: user?.id })}
//                     className="flex items-center gap-1 text-sm"
//                   >
//                     <ThumbsUp className={`w-5 h-5 ${hasLiked ? "text-red-500" : "text-gray-500"}`} />
//                     <span>{post.likes.length}</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}

//       {isFetchingNextPage && <p>Loading more...</p>}
//       {hasNextPage && <button className="p-2 mt-8 border-gray-200 border rounded-md bg-white text-black font-extralight" onClick={() => fetchNextPage()}>Load More</button>}
//     </div>
//   );
// };

// export default PublicPostsPage;







