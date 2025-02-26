import React from 'react'
import Sidebar from '../dashboard/_components/Sidebar'
import PublicPostsPage from './_Components/PublicPosts'

type Props = {}

const PublicPage = (props: Props) => {
  return (
    <div>
        <Sidebar/>
        <div className='flex flex-col justify-center p-4' >
          <div>
             <PublicPostsPage/>
          </div>
        </div>
    </div>
  )
}

export default PublicPage