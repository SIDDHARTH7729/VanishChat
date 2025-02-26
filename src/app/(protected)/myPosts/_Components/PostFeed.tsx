"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

// Fetch paginated posts from API
const fetchPosts = async (page: number) => {
  const res = await axios.get(`/api/get-my-posts?page=${page}&limit=5`);
  return res.data;
};

interface Post {
  id: string;
  content: string;
  authorName: string;
  likes: number;
  dislikes: number;
}

const PostFeed = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { toast } = useToast()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: (previousData) => previousData,
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      console.log("Sending DELETE request to:", `/api/delete-post?postId=${postId}`); // Debugging
  
      await axios.delete(`/api/delete-post?postId=${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Post deleted successfully",
        description: "Your post has been deleted successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error("Failed to delete post:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      toast({
        title: "Failed to delete post",
        description: "Failed to delete post. Please try again later.",
        variant: "destructive",
        action: <ToastAction altText="Close">Close</ToastAction>,
      })
    } 
  });
  

  if (isLoading)
    return (
      <p className="text-center p-10 font-bold text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Loading posts...
      </p>
    );
  if (isError) return <p className="text-center text-red-500">Error loading posts.</p>;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>

      {data.posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        data.posts.map((post: Post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-md border border-gray-200">
              <CardHeader>
                <CardTitle className="text-sm text-gray-600">{post.authorName}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-800">{post.content}</CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="hover:text-blue-600 cursor-pointer" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="hover:text-red-600 cursor-pointer" />
                      <span>{post.dislikes}</span>
                    </div>
                  </div>
                  <Button
                    className="bg-red-500"
                    onClick={() => deletePostMutation.mutate(post.id)}
                    disabled={deletePostMutation.isPending}
                  >
                    {deletePostMutation.isPending ? "Deleting..." : "Delete Post"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center pt-4">
        <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button disabled={page === data.totalPages} onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PostFeed;

// "use client";

// import { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { ThumbsUp, ThumbsDown } from "lucide-react";
// import axios from "axios";
// import { toast } from "sonner";

// // get paginated posts from API
// const fetchPosts = async (page: number) => {
//     const res = await axios.get(`/api/get-my-posts?page=${page}&limit=5`);
//     return res.data; // Axios already parses JSON, no need for `.json()`
//   };
  

// interface Post {
//     id: string;
//     content: string;
//     authorName: string;
//     likes: number;
//     dislikes: number;
// }
  

// const PostFeed = () => {
//   const [page, setPage] = useState(1);
//   const queryClient = useQueryClient();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["posts", page],
//     queryFn: () => fetchPosts(page),
//     placeholderData: (previousData) => previousData,
//   });

//   const deletePostMutation = useMutation({
//     mutationFn: async (postId: string) => {
//       await axios.delete(`/api/delete-post/${postId}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["posts"] });
//       toast.success("Post deleted successfully");
//     },
//     onError: () => {
//       toast.error("Failed to delete post");
//     },
//   });
//   // const deletePost = async (postId: string) => {
//   //   try {
//   //     await axios.delete(`/api/delete-post/${postId}`);
//   //     window.location.reload();
//   //   } catch (error) {
//   //     console.error("Error deleting post:", error);
//   //   }
//   // };

//   if (isLoading) return <p className="text-center p-10 font-bold text-3xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Loading posts...</p>;
//   if (isError) return <p className="text-center text-red-500">Error loading posts.</p>;

//   return (
//     <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
//       <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>

//       {data.posts.length === 0 ? (
//         <p className="text-center text-gray-500">No posts available.</p>
//       ) : (
//         data.posts.map((post: Post) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card className="shadow-md border border-gray-200">
//               <CardHeader>
//                 <CardTitle className="text-sm text-gray-600">{post.authorName}</CardTitle>
//               </CardHeader>
//               <CardContent className="text-gray-800">{post.content}</CardContent>
//               <CardFooter>
//                 <div className="flex">
//                 <div className="flex flex-row gap-4">
//                   <div className="flex items-center gap-1">
//                     <ThumbsUp className="hover:text-blue-600 cursor-pointer" />
//                     <span>{post.likes}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <ThumbsDown className="hover:text-red-600 cursor-pointer" />
//                     <span>{post.dislikes}</span>
//                   </div>
//                 </div>
//                 <div className="ml-10">
//                   <Button className="bg-red-500" onClick={() => deletePostMutation.mutate(post.id)}>Delete Post</Button>
//                 </div>
//                 </div>
//               </CardFooter>
//             </Card>
//           </motion.div>
//         ))
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center pt-4">
//         <Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
//           Previous
//         </Button>
//         <span>Page {page}</span>
//         <Button disabled={page === data.totalPages} onClick={() => setPage((prev) => prev + 1)}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PostFeed;
