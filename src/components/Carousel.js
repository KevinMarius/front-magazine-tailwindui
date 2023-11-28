import React from 'react';

import { FaAngleLeft, FaAngleRight, FaClock, FaUserAlt } from 'react-icons/fa';
import Button from './Button';

const items = [
    { id: 0, title: 'carousel1', category: 'Sport', description: 'Ipsum est irure aliqua voluptate. Consequat ex sint ex excepteur elit eiusmod ad aute aliqua enim qui. Laboris sint quis minim aliqua nulla excepteur...', url: 'https://media.istockphoto.com/id/1419530650/photo/leadership-management-and-teamwork-between-ceo-and-senior-manager-in-a-business-meeting-in.webp?b=1&s=170667a&w=0&k=20&c=CJOhQ2EVC8t3JrWilqAPo4ys7FJ48GMoU8ahitoQ_c4=' },
    { id: 1, title: 'carousel2', category: 'Animal', description: 'Sit tempor minim dolore sit ut amet est cillum ea. Ipsum sunt velit culpa quis dolore. Et nisi duis sint deserunt sit velit et est qui sit deserunt...', url: 'https://media.istockphoto.com/id/1398462038/photo/online-exam-or-test.webp?b=1&s=170667a&w=0&k=20&c=rPmfkbaVJ5zY_WcFe5TV9LfLGaamTIW6F-YGrC1jzmc=' },
    { id: 2, title: 'carousel3', category: 'Features', description: 'Irure veniam fugiat ullamco fugiat magna qui cillum quis culpa ad ex. Nostrud tempor pariatur deserunt aliqua eiusmod do dolor ad non. Ea ipsum... ', url: 'https://plus.unsplash.com/premium_photo-1661868906940-5d8443acf49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNwb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60' },
    { id: 3, title: 'carousel4', category: 'Company', description: 'Nisi ullamco anim qui irure. Velit do nulla voluptate nulla excepteur eu proident cillum. Cupidatat eiusmod cillum tempor amet eu cupidatat sit...' , url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNwb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60'},
    { id: 4, title: 'carousel5', category: 'Astrologie', description: 'Consequat cupidatat id culpa commodo duis reprehenderit amet Lorem aliquip Lorem nostrud sint aliqua. Adipisicing aliqua ipsum aliqua dolor sit...', url: 'https://images.unsplash.com/photo-1517954279551-7c2220d719c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmVhdHVyZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60' },
]

function Carousel() {
    return (
        <div id="indicators-carousel" className="relative w-full" data-carousel="slide">

            <div className="relative h-96 lg:h-screen">
                {items.map((item, index) => (
                    <div className="hidden duration-700 ease-in-out" data-carousel-item key={index}>
                        <img src={item.url} className="absolute w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 brightness-75" alt="..." />
                        <div className='absolute top-16 lg:top-60 left-5 sm:left-11 md:left-14 mr-12'>
                            <Button bgColor='orange-600' textSize='xs' href={`blog/post/category/${item.id}`}>
                                {item.category}
                            </Button>
                            <div className='mt-7'>
                                <Button textSize='3xl' href={`blog/post/${item.id}`}>
                                    {item.title}
                                </Button>
                            </div>
                            <p className='text-white font-semibold text-sm mt-7'>{item.description}</p>
                            <div className='flex gap-3 mt-7 text-slate-50 text-xs font-normal'>
                                <div className='flex gap-2 items-center'>
                                    <FaUserAlt />
                                    <p>Admin</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <FaClock />
                                    <p>2022-05-04</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden absolute z-30 md:flex space-x-3 -translate-x-1/2 bottom-16 left-28">
                <button type="button" className="w-3 h-3 rounded-full border-2 active:bg-orange-600 m-2" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full border-2 active:bg-orange-600 m-2" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full border-2 active:bg-orange-600 m-2" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full border-2 active:bg-orange-600 m-2" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" className="w-3 h-3 rounded-full border-2 active:bg-orange-600 m-2" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>

            <button type="button" className="absolute right-8 md:right-0 bottom-8 md:top-[8%] z-30 flex items-center justify-center h-auto px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-7 md:w-10 h-7 md:h-10 rounded-md bg-orange-600 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-transparent dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <FaAngleLeft className='w-4 h-4 text-white dark:text-gray-800'/>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute right-0 md:right-0 bottom-8 md:top-[30%] z-30 flex items-center justify-center h-auto px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-7 md:w-10 h-7 md:h-10 rounded-md bg-orange-600 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-transparent dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <FaAngleRight className='w-4 h-4 text-white dark:text-gray-800'/>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    )
}

export default Carousel