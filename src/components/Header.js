import React, { useState, Fragment } from 'react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import { FaFacebook, FaTwitter, FaInstagram, FaUserCircle } from 'react-icons/fa'

import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';

import { Dialog, Disclosure, Popover, Transition, Tab } from '@headlessui/react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-hook';
import { useEffect } from 'react';

const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const navigation = {
    home: { name: 'Home', href: '/' },
    categories: [
        {
            id: 'sport',
            name: 'Sport',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
                {
                    name: 'Basic Tees1',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
                {
                    name: 'Basic Tees2',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
        },
        {
            id: 'politic',
            name: 'Politic',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
        },
        {
            id: 'animal',
            name: 'Animal',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
                {
                    name: 'Artwork Tees1',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
        },
    ],
    pages: [
        { name: 'Contact', href: '/contact' },
    ],
}

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { sendRequest } = useHttpClient();
    const [categories, setCategories] = useState([]);
    const [postByCategory, setPostByCategory] = useState([]);

    const getPostData = async (e, categoryId) => {
        e.preventDefault();
        await sendRequest(`http://localhost:3500/api/post/getPostByCategory/${categoryId}`)
          .then((response) => {
            setPostByCategory(response.posts);
          })
      }

    useEffect(() => {
        const getCategoriesData = async () => {
            let responseData;
            try {
                responseData = await sendRequest(`http://localhost:3500/api/category/get`);
                setCategories(responseData.categories);
            } catch (err) { }
        }

        getCategoriesData()
    }, [sendRequest])


    console.log(postByCategory)

    return (
        <div className='relative z-40'>
            <div className='bg-gray-50 h-14 w-full'></div>
            <header className="bg-white shadow-md">
                <div className='sticky top-20'>
                    <nav className="mx-auto flex max-w-7xl sticky top-1 items-center justify-between p-6 lg:px-8" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src={logo} alt="logo" />
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className=" h-9 w-9" aria-hidden="true" />
                            </button>
                        </div>

                        <Popover.Group className="lg:ml-8 hidden lg:block lg:self-stretch">
                            <div className="flex h-full space-x-8">
                                <Link
                                    to='/'
                                    className="flex items-center text-md uppercase font-medium text-gray-700 hover:text-gray-800"
                                >
                                    Home
                                </Link>
                                {categories.map((category) => (
                                    <Popover key={category.title} className="flex">
                                        {({ open }) => (
                                            <>
                                                <div className="relative flex">
                                                    <Popover.Button
                                                        onClick={(e) => getPostData(e, category._id)}
                                                        className={classNames(
                                                            open
                                                                ? 'border-orange-500 text-orange-500'
                                                                : 'border-transparent text-gray-600',
                                                            'relative z-10 -mb-px flex items-center border-b-2 pt-px text-mg uppercase font-medium transition-colors duration-200 ease-out hover:text-orange-500 focus:outline-none active:outline-none focus:font-semibold focus:text-orange-500'
                                                        )}
                                                    >
                                                        {category.title}
                                                        <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                                    </Popover.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                        <div className="relative bg-gray-50">
                                                            <div className="mx-auto max-w-6xl px-3">
                                                                <div className="grid grid-cols-4 gap-x-4 py-16">
                                                                    {postByCategory.map((item) => (
                                                                        <div key={item.title} className="group relative text-base sm:text-sm">
                                                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                <img
                                                                                    src={`http://localhost:3500/${item.picture}`}
                                                                                    className="object-cover object-center"
                                                                                />
                                                                            </div>
                                                                            <a href={`http://localhost:3500/api/post/${item._id}`} className="mt-6 block font-medium text-gray-900">
                                                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                {item.title}
                                                                            </a>
                                                                            <p aria-hidden="true" className="mt-1">
                                                                                Shop now
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Popover>
                                ))}

                                {navigation.pages.map((page) => (
                                    <a
                                        key={page.name}
                                        href={page.href}
                                        className="flex items-center text-md uppercase font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        {page.name}
                                    </a>
                                ))}
                            </div>
                        </Popover.Group>


                        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3 items-center">
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                <FaFacebook size={15} color='gray' className=' hover:text-orange-600' />
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                <FaTwitter size={15} color='gray' className=' hover:text-orange-600' />
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                <FaInstagram size={15} color='gray' className=' hover:text-orange-600' />
                            </a>
                            <a href="/signIn" className="text-sm font-semibold leading-6 text-gray-900 ml-4 divide-x-2">
                                <FaUserCircle size={20} color='gray' className=' hover:text-orange-600' />
                            </a>
                        </div>
                    </nav>
                </div>
                <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-50">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="-translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                    <div className="flex items-center justify-between">
                                        <a href="#" className="-m-1.5 p-1.5">
                                            <span className="sr-only">Your Company</span>
                                            <img
                                                className="h-8 w-auto"
                                                src={logo}
                                                alt=""
                                            />
                                        </a>
                                        <button
                                            type="button"
                                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>


                                    <Tab.Group as="div" className="mt-2">
                                        <div className="border-b border-gray-200">
                                            <Tab.List className="-mb-px flex space-x-8 px-4">
                                                {navigation.categories.map((category) => (
                                                    <Tab
                                                        key={category.name}
                                                        className={({ selected }) =>
                                                            classNames(
                                                                selected ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-900',
                                                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                            )
                                                        }
                                                    >
                                                        {category.name}
                                                    </Tab>
                                                ))}
                                            </Tab.List>
                                        </div>
                                        <Tab.Panels as={Fragment}>
                                            {navigation.categories.map((category) => (
                                                <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                                    <div className="grid grid-cols-2 gap-x-4">
                                                        {category.featured.map((item) => (
                                                            <div key={item.name} className="group relative text-sm">
                                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                    <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                                                </div>
                                                                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                    {item.name}
                                                                </a>
                                                                <p aria-hidden="true" className="mt-1">
                                                                    Shop now
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Tab.Panel>
                                            ))}
                                        </Tab.Panels>
                                    </Tab.Group>

                                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                        <a
                                            key={navigation.home.name}
                                            href={navigation.home.href}
                                            className="text-md font-medium text-gray-900 hover:text-orange-600"
                                        >
                                            {navigation.home.name}
                                        </a>
                                        {navigation.pages.map((page) => (
                                            <div key={page.name} className="flow-root">
                                                <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900 hover:text-orange-600">
                                                    {page.name}
                                                </a>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 flow-root">
                                        <div className="-my-6 divide-y divide-gray-500/10">
                                            <div className='py-6 flex gap-x-4 justify-center'>
                                                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                                    <FaFacebook size={20} color='gray' />
                                                </a>
                                                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                                    <FaTwitter size={20} color='gray' />
                                                </a>
                                                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                                    <FaInstagram size={20} color='gray' />
                                                </a>
                                                <Link to='/signIn' className="text-sm font-semibold leading-6 text-gray-900 ml-4 divide-x-2"><FaUserCircle size={20} color='gray' /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            </header>
        </div>
    )
}

export default Header