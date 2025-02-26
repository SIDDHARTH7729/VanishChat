"use client"
import React, { useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ThumbsUp } from 'lucide-react';
import { ThumbsDown } from 'lucide-react';
import { messages } from '@/constants'

type Props = {}

const FrontReviws = (props: Props) => {
    const [reactions,setReactions] = useState(
        messages.map(()=>({liked:false,disliked:false}))
    )

    const handleLike = (index: number) => {
        setReactions((prev) => prev.map((reactions, i) =>
            i === index
              ? { liked: !reactions.liked, disliked: false } // toggling like and resetting dislike
              : reactions
          )
        );
    };
    const handleDislike = (index: number) => {
        setReactions((prev) =>
          prev.map((reactions, i) =>
            i === index
              ? { liked: false, disliked: !reactions.disliked } // toggling dislike and resetiing dislike 
              : reactions
          )
        );
      };

    return (
        <div className='p-4 bg-[#343434] flex flex-col justify-center'>
            <div className='flex grid grid-cols-2 md:grid-cols-3 gap-3'>
          {messages.map((message, index) => (
              <Card key={index}>
              <CardHeader>
                  <CardTitle>Anonymous</CardTitle>
                  <CardDescription>Random Take</CardDescription>
              </CardHeader>
              <CardContent>
                  <p>{message}</p>
                  <div className='flex flex-row gap-4 py-4'>
                     <div>
                        <ThumbsUp className='hover:text-blue-600 cursor-pointer transition-all duration-100' fill={reactions[index].liked ? "red" : "none"} onClick={()=>handleLike(index)} />
                     </div>
                     <div>
                        <ThumbsDown className='hover:text-blue-600 cursor-pointer transition-all duration-100' fill={reactions[index].disliked ? "blue" : "none"} onClick={()=>handleDislike(index)}/>
                     </div>
                  </div>
              </CardContent>
          </Card>
          ))}
        </div>
        </div>
    )
}

export default FrontReviws


