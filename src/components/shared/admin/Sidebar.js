import React, { useContext } from 'react';
import { FaChartLine, FaHeadset, FaUser, FaTools, FaAppStore } from 'react-icons/fa';
import { FcBullish } from 'react-icons/fc'
import { HiOutlineChat, HiOutlineUserGroup, HiOutlineLogout, HiScale, HiOutlineCog } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth-hook';

function Sidebar() {
    const navigate = useNavigate();
    const { token, login, logout, userId } = useAuth();
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }
    return (
        <div className=' w-16 md:w-60 h-screen bg-neutral-800 flex flex-col px-3 text-white py-5 divide-y-2'>
            <div className=' flex-1'>
                <div className=' divide-y-2'>
                    <div className='flex gap-4 px-3 items-center pb-4'>
                        <a className='flex items-center gap-0 md:gap-6' href='#'>
                            <FcBullish className='text-orange-600 h-6 w-6' />
                            <span className='hidden md:inline-block'>Dashboard</span>
                        </a>
                    </div>
                    <div className='pt-6 flex flex-col gap-4'>
                        <Link to="/dashboard/post" className='hover:bg-neutral-500 active:bg-neutral-500 focus:bg-neutral-500 rounded-md py-2 px-3 transition-all duration-200 flex items-center gap-0 md:gap-6'><FaHeadset className='h-5 w-5' /><span className='hidden md:inline-block'>Articles</span></Link>
                        <Link to="/dashboard/user" className='hover:bg-neutral-500 active:bg-neutral-500 focus:bg-neutral-500 rounded-md py-2 px-3 transition-all duration-200 flex items-center gap-0 md:gap-6'><HiOutlineUserGroup className='h-5 w-5' /><span className='hidden md:inline-block'>Users</span></Link>
                        <Link to="/dashboard/category" className='hover:bg-neutral-500 active:bg-neutral-500 focus:bg-neutral-500 rounded-md py-2 px-3 transition-all duration-200 flex items-center gap-0 md:gap-6'><FaTools className='h-5 w-5' /><span className='hidden md:inline-block'>Category</span></Link>
                        <Link to="/dashboard/role" className='hover:bg-neutral-500 active:bg-neutral-500 focus:bg-neutral-500 rounded-md py-2 px-3 transition-all duration-200 flex items-center gap-0 md:gap-6'><HiScale className='h-5 w-5' /><span className='hidden md:inline-block'>Role</span></Link>

                    </div>
                </div>
            </div>
            <div className=''>
                <ul className='flex flex-col gap-0'>
                    <li className='rounded-md py-2 px-3 transition-all duration-200'><a className='flex items-center gap-0 md:gap-6' href='#'><HiOutlineCog className='h-5 w-5' /><span className='hidden md:inline-block'>Settings</span></a></li>
                    <li className='rounded-md py-2 px-3 transition-all duration-200 text-red-600'><button className='flex items-center gap-0 md:gap-6' onClick={handleLogout}><HiOutlineLogout className='h-5 w-5' /><span className='hidden md:inline-block'>Logout</span></button></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar