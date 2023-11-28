import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useHttpClient } from '../hooks/http-hook'

const items = [
    { id: 0, title: 'Ipsum est irure', category: 'Sport', description: 'Ipsum est irure aliqua voluptate...', url: 'https://flowbite.com/docs/images/blog/image-1.jpg' },
    { id: 10, title: 'Ipsum est irure', category: 'Sport', description: 'Consequat cupidatat id culpa...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 11, title: 'Ipsum est irure', category: 'Sport', description: 'Consequat cupidatat id culpa...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 12, title: 'Ipsum est irure', category: 'Sport', description: 'Consequat cupidatat id culpa...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
]

function Category() {
    const { sendRequest } = useHttpClient();
    const [ posts, setPosts ] = useState([]);
    const categoryId = useParams().id;

    useEffect(() => {
        const getCategoriesData = async () => {
          let responseData;
          try{
            responseData = await sendRequest(`http://localhost:3500/api/post/getPostByCategory/${categoryId}`);
            setPosts(responseData.posts);
          }catch(err) {}
        }
    
        getCategoriesData();
      }, [sendRequest]);
      console.log(posts)
    return (
        <React.Fragment>
            { posts && <div className='mb-20'>
                <div className='h-72 bg-orange-50 w-full flex items-center justify-center'>
                    <h1 className='flex text-4xl font-semibold'><span className='text-gray-800'>Category</span><FaAngleRight /><span className='text-orange-700'>{posts[0].categoryId?.title}</span> </h1>
                </div>
                <div className='grid grid-cols-4 gap-y-6 gap-3 mx-10 mt-5'>
                    <div className='col-span-4 lg:col-span-3 divide-y'>
                        <div className='grid grid-cols-2 gap-1'>
                            {posts.map((item, index) => (
                                <div key={index} className='col-span-2 md:col-span-1'>
                                    <Card item={item} />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Next
                                </a>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                        {/* Current: "z-10 bg-orange-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                        <a
                                            href="#"
                                            aria-current="page"
                                            className="relative z-10 inline-flex items-center bg-orange-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                        >
                                            1
                                        </a>
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        >
                                            2
                                        </a>
                                        <a
                                            href="#"
                                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                        >
                                            3
                                        </a>
                                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                            ...
                                        </span>
                                        <a
                                            href="#"
                                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                        >
                                            8
                                        </a>
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        >
                                            9
                                        </a>
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        >
                                            10
                                        </a>
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        >
                                            <span className="sr-only">Next</span>
                                            <FaAngleRight className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 lg:col-span-1 mt-4 lg:mt-0'>
                        <Sidebar />
                    </div>
                </div>
            </div> }
        </React.Fragment>
    )
}

export default Category