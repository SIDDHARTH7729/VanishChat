"use client"; // Ensure this is at the top

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

type Props = {
  userdata: {
    email: string;
    username: string;
    showname: boolean;
    likes?: any[];
    posts?: any[];
    activities?: any[];
    notifications?: any[];
  };
};

const Header = ({ userdata }: Props) => {
  const [checkname, setCheckname] = useState(userdata.username);
  const [tempName, setTempName] = useState<string>("");
  const [errorChangingUsername, setErrorChangingUsername] = useState<string | null>(null);

  // Mutation for changing the username
  const changeUsernameMutation = useMutation({
    mutationFn: async (newUsername: string) => {
      const response = await axios.patch("/api/change-username", { username: newUsername });
      if (response.data.status !== 200) throw new Error(response.data.message || "Error Changing Username");
      return response.data.username;
    },
    onMutate: (newUsername) => {
      // Optimistically update the UI before the API call
      setCheckname(newUsername);
      setErrorChangingUsername(null);
    },
    onSuccess: (updatedUsername) => {
      setCheckname(updatedUsername);
    },
    onError: (error) => {
      setErrorChangingUsername(error.message);
      setCheckname(userdata.username); // Revert back in case of error
    },
  });

  return (
    <div className="flex flex-col gap-4 text-white p-6 justify-center items-center min-h-[26rem]">
      {checkname === "Anonymous" ? (
        <div className="flex flex-col gap-4">
          <h3 className="font-bold">Let others know you with a unique name</h3>
          <Input
            value={tempName}
            placeholder="Anonymous"
            onChange={(e) => setTempName(e.target.value)}
          />
          <Button
            className="mt-2 text-black bg-white max-w-[150px] hover:bg-white/20"
            onClick={() => changeUsernameMutation.mutate(tempName)}
            disabled={changeUsernameMutation.isPending}
          >
            {changeUsernameMutation.isPending ? "Updating..." : "Change Username"}
          </Button>
          {errorChangingUsername && <p className="text-red-500">{errorChangingUsername}</p>}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="font-bold text-4xl bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <h3 className="text-2xl font-mono">{checkname}</h3>
          <div className="mt-12 text-xl bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
            <p>"The digital world awaits your next move! 🌍✨ Thousands of unseen eyes are ready to engage—what will you share today?"</p>
          </div>
          <Link href="/createPost">
            <Button
              variant={"outline"}
              className="mt-4 p-6 text-white bg-gradient-to-r from-cyan-500 to-purple-500 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-110 hover:shadow-cyan-500/50 hover:text-white"
            >
              Make A post <MessageCircleQuestion className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

