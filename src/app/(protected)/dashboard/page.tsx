import Navbar from '@/components/ui/mainComponents/NavBar'
import React from 'react'
import Sidebar from './_components/Sidebar'
import { currUserInfo, onBoardUser} from '@/actions/users'
import { redirect } from 'next/navigation'
import Header from './_components/Header'
import LikesChart from './_components/LikeChart'
import FrontCard from './_components/FrontCard'

type Props = {}

const DashBoard = async (props: Props) => {
   const currentUser = await onBoardUser()
   if(!currentUser || currentUser.status !== 200) redirect('/sign-in');
   const curr_user_info = await currUserInfo();
   if(!curr_user_info || curr_user_info.status !== 200) redirect('/sign-in');
   const safeUserData = curr_user_info?.data ?? {
    email: "unknown@example.com",    // since curr_user_info returns null, but we take a non user data in header.tsx so we pass a random value
    username: "Guest",
    showname: false,
    likes: [],
    posts: [],
    activities: [],
    notifications: [],
 };
  
  return (
    <div className='h-full w-full'>
        <Sidebar/>
        <div className=' flex flex-col justify-center mt-5'>
          <div className=' flex flex-col gap-8'>
             <div className='bg-gray-800/30 p-5'>
             <Header userdata={safeUserData}/>
             </div>
             <div className='flex flex-col md:flex-row mt-5 justify-evenly items-center gap-8 pr-2 text-center'>
               <div className=' flex flex-col justify-center items-center gap-4 max-w-[600px]'>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent'>Let's compare your latest Trends</h2>
                <LikesChart/>
               </div>
               <div className='md:pr-10 flex flex-col gap-4 text-center'>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent'>See your All Time Stats</h2>
               <FrontCard/>
               </div>
             </div>
          </div>
        </div>
    </div>
    // <div className='h-full w-full'>
    //     <Navbar/>
    //     <div className='mt-[5rem] text-white'>
    //          page
    //     </div>
    // </div>
  )
}

export default DashBoard