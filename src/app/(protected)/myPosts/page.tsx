import React from 'react'
import Sidebar from '../dashboard/_components/Sidebar'
import PostFeed from './_Components/PostFeed'

type Props = {}

const myPosts = (props: Props) => {
  return (
    <div className='h-full w-full'>
      <Sidebar />
      <div>
        <div className='flex flex-col justify-center mt-5'>
            <PostFeed />
        </div>
      </div>
    </div>
  )
}

export default myPosts