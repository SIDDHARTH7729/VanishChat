import React from 'react'
import Sidebar from '../dashboard/_components/Sidebar'
import PostCreation from './_Components/PostCreation'

const page = () => {
  return (
    <div className='h-full w-full'>
      <Sidebar />
      <div>
        <div className='flex flex-col justify-center mt-5 p-4'>
            <PostCreation />
        </div>
      </div>
    </div>
  )
}

export default page
