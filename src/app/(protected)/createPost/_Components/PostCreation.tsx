"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface Post {
  content: string;
  showUsername: boolean;
}

const PostCreation = () => {
  const [content, setContent] = useState("");
  const [showUsername, setShowUsername] = useState(false);
  const [submittedPost, setSubmittedPost] = useState<null | Post>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const username = "John Doe"; // can replace with actual Username

  // Handing for submission, and just updating the UI
  const handleSubmit = () => {
    if (!content.trim()) return;
    setSubmittedPost({ content, showUsername });
    setContent("");
  };

  // handling api req when user confirms the post
  const submitPost = async () => {
    if (!submittedPost) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-Post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: submittedPost.content }), // Exclude showUsername
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created successfully:", data);
      setSubmittedPost(null); 
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handling edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setContent(submittedPost?.content || "");
  };

 // saving th edited post
  const handleSaveEdit = () => {
    setSubmittedPost((prev) => prev && { ...prev, content });
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4 gap-8">
      {/* Post Creation Card */}
      <Card className="shadow-xl border border-gray-200 space-y-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Create a Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-32"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={showUsername} onCheckedChange={setShowUsername} />
              Show Username
            </label>
            <Button onClick={handleSubmit}>Preview</Button>
          </div>
        </CardContent>
      </Card>

      {/* Post Preview */}
      {submittedPost && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800/20 shadow-md border p-5 h-[400px] rounded-md flex border-none flex-col space-y-6"
    >
      <h2 className="text-2xl p-4 font-semibold">Your new Post Would Look Like This</h2>
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-sm text-gray-600">
            {submittedPost.showUsername ? username : "Anonymous"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-800">
          {isEditing ? (
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          ) : (
            submittedPost.content
          )}
        </CardContent>
        <CardFooter>
          <div className="flex flex-col -mt-4">
            <div className="flex flex-row gap-4 py-4">
              <ThumbsUp className="hover:text-blue-600 cursor-pointer transition-all duration-100" />
              <ThumbsDown className="hover:text-blue-600 cursor-pointer transition-all duration-100" />
            </div>
            <div className="flex gap-8">
              <Button className="px-5" onClick={submitPost} disabled={isLoading}>
                {isLoading ? "Posting..." : "Post"}
              </Button>
              <Button className="px-5" onClick={isEditing ? handleSaveEdit : handleEdit}>
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  </AnimatePresence>
)}
    </div>
  );
};

export default PostCreation;


