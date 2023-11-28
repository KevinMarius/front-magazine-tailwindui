import React, { useRef, useEffect, useState } from 'react';

import { FaAngleLeft, FaAngleRight, FaPlus, FaUserAlt, FaClock } from 'react-icons/fa';

const items = [
    { id: 0, title: 'Ipsum est irure', category: 'Sport', description: 'Ipsum est irure aliqua voluptate. Consequat ex sint ex excepteur elit eiusmod ad aute...', url: 'https://flowbite.com/docs/images/blog/image-1.jpg' },
    { id: 1, title: 'Ipsum est irure', category: 'Animal', description: 'Sit tempor minim dolore sit ut amet est cillum ea. Ipsum sunt velit culpa quis dolore...', url: 'https://flowbite.com/docs/images/blog/image-2.jpg' },
    { id: 2, title: 'Ipsum est irure', category: 'Features', description: 'Irure veniam fugiat ullamco fugiat magna qui cillum quis culpa ad ex. Nostrud... ', url: 'https://flowbite.com/docs/images/blog/image-3.jpg' },
    { id: 3, title: 'Ipsum est irure', category: 'Company', description: 'Nisi ullamco anim qui irure. Velit do nulla voluptate nulla excepteur eu proident...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 4, title: 'Ipsum est irure', category: 'Astrologie', description: 'Consequat cupidatat id culpa commodo duis reprehenderit amet Lorem aliquip Lorem...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
]

function CarouselMini() {

    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousel = useRef(null);

    const movePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (
            carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
        ) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const isDisabled = (direction) => {
        if (direction === 'prev') {
            return currentIndex <= 0;
        }

        if (direction === 'next' && carousel.current !== null) {
            return (
                carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
            );
        }

        return false;
    };

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);


    return (

        <React.Fragment>
            <div className='relative z-40'>
                <div className='2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-6'>
                    <div className="flex gap-3 justify-end absolute -top-4 right-6 md:-top-6 md:right-6 w-full h-full">
                        <button
                            onClick={movePrev}
                            className=" text-white w-7 sm:w-10 h-7 sm:h-10 bg-orange-600 rounded-md shadow-lg shadow-slate-300 disabled:opacity-25 disabled:cursor-not-allowed z-10 transition-all ease-in-out duration-300 flex justify-center items-center"
                            disabled={isDisabled('prev')}
                        >
                            <FaAngleLeft size={20} />
                            <span className="sr-only">Prev</span>
                        </button>
                        <button
                            onClick={moveNext}
                            className=" text-white w-7 sm:w-10 h-7 sm:h-10 bg-orange-600 rounded-md shadow-lg shadow-slate-300 disabled:opacity-25 disabled:cursor-not-allowed z-10 transition-all ease-in-out duration-300 flex justify-center items-center"
                            disabled={isDisabled('next')}
                        >
                            <FaAngleRight size={20} />
                            <span className="sr-only">Next</span>
                        </button>
                    </div>
                    <div className="carousel my-8 mx-auto">
                        <div className="overflow-hidden">

                            <div
                                ref={carousel}
                                className="relative flex gap-3 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
                            >
                                {items.map((item, index) => (
                                    <div key={index} className='relative w-96 h-52 snap-start'>
                                        <div className='w-96'>
                                            <img src={item.url} className="absolute w-full h-full -translate-y-1/2 top-1/2 hover:transform hover:scale-110 transition-all duration-200 brightness-75" alt="..." />
                                            <a href={`blog/post/${item.id}`} className='rounded-full bg-white absolute p-3 top-3 left-5 hover:bg-orange-600 text-orange-600 hover:text-white border-4 border-slate-500 transition-all duration-200 border-opacity-95 hover:border-8'><FaPlus /></a>
                                            <a href={`blog/post/category/${item.id}`} className='bg-black bg-opacity-25 absolute p-2 top-5 right-5 hover:bg-orange-600 text-white hover:text-slate-300 text-xs transition-all duration-300'>{item.category}</a>
                                            <div className='absolute bottom-8 px-5 pr-3'>
                                                <h6 className='text-sm font-semibold text-white'><a href={`blog/post/${item.id}`}>{item.title}</a></h6>
                                                <p className='text-xs font-semibold text-white mt-4'>{item.description}</p>
                                                <div className='flex gap-3 mt-4 text-slate-50 text-xs font-normal'>
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )

    {/* <div id="indicators-carousel" className="relative w-full" data-carousel="static">

            <div className="relative h-52 overflow-hidden rounded-md mx-10 md:mx-20">
                {items.map((item, index) => (
                    <div key={index} className="duration-700 ease-in-out w-[100%] md:w-1/2 lg:w-1/3 px-1 cursor-grab" data-carousel-item='active'>
                        <img src={item.url} className="absolute w-full h-full px-2 translate-x-0 -translate-y-1/2 top-1/2 left-0 lg:left-[100%] hover:transform hover:scale-110 transition-all duration-200 brightness-75" alt="..." />
                        <button className='rounded-full bg-white absolute p-3 top-3 left-5 hover:bg-orange-600 text-orange-600 hover:text-white border-4 border-slate-500 transition-all duration-200 border-opacity-95 hover:border-8'><FaPlus /></button>
                        <button className='bg-black bg-opacity-25 absolute p-2 top-5 right-5 hover:bg-orange-600 text-white hover:text-slate-300 text-xs transition-all duration-300'>{item.category}</button>
                        <div className='absolute bottom-8 left-5 pr-3'>
                            <h6 className='text-sm font-semibold text-white'>{item.title}</h6>
                            <p className='text-xs font-semibold text-white mt-4'>{item.description}</p>
                            <div className='flex gap-3 mt-4 text-slate-50 text-xs font-normal'>
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

            <div className="absolute z-30 flex space-x-3 -translate-x-1/4 -top-6 md:-top-8 right-14">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>

            <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-7 md:w-10 h-7 md:h-10 rounded-md bg-orange-600 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-transparent dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <FaCaretLeft className='w-4 h-4 text-white dark:text-gray-800' />
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-7 md:w-10 h-7 md:h-10 rounded-md bg-orange-600 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-transparent dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <FaCaretRight className='w-4 h-4 text-white dark:text-gray-800' />
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div> */}

}

export default CarouselMini