import React, { Fragment } from 'react';
import { HiOutlineSearch, HiOutlineBell, HiOutlineChat, HiOutlineUser, HiOutlineLogout, HiOutlineCog } from 'react-icons/hi';
import { Menu, Popover, Transition } from '@headlessui/react'
import { useAuth } from '../../../hooks/auth-hook';

function Header() {
    const { token, login, logout, userId} = useAuth();

    const handleLogout = (e) => {
        e.preventDefault()
        logout();
    }

    return (
        <div className='h-14 w-full px-5 flex items-center justify-between bg-white shadow-sm'>

            <div className='relative'>
                <HiOutlineSearch fontSize={20} className='absolute text-gray-400 font-light -top-2 md:top-3 left-0 md:left-3' />
                <input className='py-2 hidden md:block px-10 focus:outline-none active:outline-none border border-gray-300 rounded-sm' placeholder='Search...' />
            </div>

            <div className='flex gap-2 md:gap-4'>
                <Popover>
                    {({ open }) => (
                        /* Use the `open` state to conditionally change the direction of the chevron icon. */
                        <>
                            <Popover.Button className='inline-flex items-center text-gray-700 hover:text-opacity-100 active:bg-gray-50 p-1.5 rounded-md focus:outline-none'>
                                <HiOutlineBell fontSize={24} className=' text-slate-600' />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter='transition easy-out duration-200'
                                enterFrom='opacity-0 translate-y-1'
                                enterTo='opacity-100 translate-y-0'
                                leave='transition easy-in duration-150'
                                leaveFrom='opacity-100 translate-y-0'
                                leaveTo='opacity-0 translate-y-1'
                            >
                                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-60'>
                                    <div className='bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
                                        <strong className='text-gray-700 font-medium'>Notifications</strong>
                                        <div className='mt-2 px-1 text-sm'>
                                            <a href="/insights">Insights</a>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>

                        </>
                    )}
                </Popover>
                <Popover>
                    {({ open }) => (
                        /* Use the `open` state to conditionally change the direction of the chevron icon. */
                        <>
                            <Popover.Button className='inline-flex items-center text-gray-700 hover:text-opacity-100 active:bg-gray-50 p-1.5 rounded-md focus:outline-none'>
                                <HiOutlineChat fontSize={24} className='text-slate-600' />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter='transition easy-out duration-200'
                                enterFrom='opacity-0 translate-y-1'
                                enterTo='opacity-100 translate-y-0'
                                leave='transition easy-in duration-150'
                                leaveFrom='opacity-100 translate-y-0'
                                leaveTo='opacity-0 translate-y-1'
                            >
                                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-60'>
                                    <div className='bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
                                        <strong className='text-gray-700 font-medium'>Messages</strong>
                                        <div className='mt-2 px-1 text-sm'>
                                            <a href="/insights">Insights</a>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
                <Menu as='div' className='relative'>
                    <div>
                        <Menu.Button className='ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400'>
                            <div className='h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center'
                                style={{ backgroundImage: 'url("https://source.unsplash.com/80x80?face")' }}
                            >
                                <span className='sr-only'>Jackson Muller</span>
                            </div>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-3 py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <React.Fragment>
                                                <button
                                                    className={`${active ? 'bg-gray-50 text-gray-700' : 'text-gray-900'
                                                        } group flex gap-5 w-full hover:bg-gray-50 items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    <HiOutlineUser size={20}/>
                                                    <span>Profile</span>
                                                </button>
                                                <button
                                                    className={`${active ? 'bg-gray-50 text-gray-700' : 'text-gray-900'
                                                        } group flex gap-5 w-full hover:bg-gray-50 items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    <HiOutlineCog size={20}/>
                                                    <span>Settings</span>
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className={`${active ? 'bg-gray-50 text-gray-700' : 'text-gray-900'
                                                        } group flex gap-5 w-full hover:bg-gray-50 items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    <HiOutlineLogout size={20}/>
                                                    <span>Logout</span>
                                                </button>
                                            </React.Fragment>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </div>
                </Menu>
            </div>
        </div>
    )
}

export default Header