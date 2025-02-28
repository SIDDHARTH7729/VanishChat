import React from 'react'
import Sidebar from '../dashboard/_components/Sidebar'
import Interactions from './_Components/Interactions'


const page = () => {
  return (
    <div>
        <Sidebar/>
        <div className='flex flex-col justify-center mt-8 items-center p-4'>
            <Interactions/>
        </div>
    </div>
  )
}

export default page