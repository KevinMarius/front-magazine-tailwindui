import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout() {
  return (
    <React.Fragment>
      <div className='flex h-screen w-screen bg-neutral-50'>
        <Sidebar />
        <div className='w-full flex flex-col'>
          <Header />
          <div className='px-2 w-[100%] pb-16 mb-10 flex justify-center flex-1 overflow-y-auto'>{<Outlet />}</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout