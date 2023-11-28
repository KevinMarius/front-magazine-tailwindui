import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';

const items = [
    { id: 0, title: 'Ipsum est irure', category: 'Politics', description: 'Ipsum est irure aliqua voluptate...', image: 'https://flowbite.com/docs/images/blog/image-1.jpg' },
    { id: 0, title: 'Ipsum est irure', category: 'Sport', description: 'Ipsum est irure aliqua voluptate...', image: 'https://flowbite.com/docs/images/blog/image-1.jpg' },
    { id: 0, title: 'Ipsum est irure', category: 'Animal', description: 'Ipsum est irure aliqua voluptate...', image: 'https://flowbite.com/docs/images/blog/image-1.jpg' },
    { id: 0, title: 'Ipsum est irure', category: 'Technologie', description: 'Ipsum est irure aliqua voluptate...', image: 'https://flowbite.com/docs/images/blog/image-1.jpg' },
    { id: 0, title: 'Ipsum est irure', category: 'Others', description: 'Ipsum est irure aliqua voluptate...', image: 'https://flowbite.com/docs/images/blog/image-1.jpg' },
]

function Sidebar() {
    const [posts, setPosts] = useState([]);
    const [bestPosts, setBestPosts] = useState([]);
    const { sendRequest } = useHttpClient()

    useEffect(() => {
        const getLastData = async () => {
            let responseData;
            try {
                responseData = await sendRequest(`http://localhost:3500/api/post/getLastPost`);
                setPosts(responseData.posts);
            } catch (err) { }
        }

        const getBestPostData = async () => {
            let bestPosts;
            try {
                bestPosts = await sendRequest(`http://localhost:3500/api/post/getBestPost`)
                setBestPosts(bestPosts.posts);
            } catch (err) { }
        }

        getBestPostData()
        getLastData();
    }, [sendRequest]);

    console.log(posts)

    return (
        <React.Fragment>
            {posts &&
                <div className=' divide-y-2'>
                    <h2 className='text-xl font-semibold text-gray-900'>Latest Post</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 pt-6 gap-y-3'>
                        {posts.map((item, index) => (
                            <div key={index} className='flex gap-3 w-full rounded-md py-1 hover:translate-x-3 hover:bg-gray-50 duration-200 group'>
                                <img className='w-20 lg:w-16 h-20 lg:h-16 rounded-full' src={`http://localhost:3500/${item.picture}`} />
                                <div className='flex flex-col gap-2'>
                                    <a href={`/blog/post/${item._id}`}><h5 className='text-gray-800 font-semibold text-md hover:text-orange-500 transition-all duration-300'>{item.title}</h5></a>
                                    <p className='text-gray-700 font-semibold text-xs group-hover:hidden transition-all duration-150'>{item.content.substr(0, 30)+'...'}</p>
                                    <a href={`/blog/post/category/${item.categoryId._id}`} className='text-gray-500 font-semibold text-xs hidden group-hover:block transition-all duration-150 bg-orange-700 p-2'>{item.categoryId.title}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {bestPosts &&
                <div className=' divide-y-2 mt-6'>
                    <h2 className='text-xl font-semibold text-gray-900'>Best Post</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 pt-6 gap-y-3'>
                        {bestPosts.map((item, index) => (
                            <div key={index} className='flex gap-3 w-full rounded-md hover:translate-x-3 hover:bg-gray-50 transition-all duration-200'>
                                <img className='w-20 lg:w-16 h-20 lg:h-16 rounded-full' src={`http://localhost:3500/${item.picture}`} />
                                <div className='flex flex-col gap-2'>
                                    <a href={`/blog/post/${item._id}`}><h5 className='text-gray-800 font-semibold text-md hover:text-orange-500 transition-all duration-300'>{item.title}</h5></a>
                                    <p className='text-gray-700 font-semibold text-xs'>{item.content.substr(0, 30)+'...'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <div className=' divide-y-2 mt-6'>
                <h2 className='text-xl font-semibold text-gray-900'>Tags</h2>
                <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 pt-6 gap-3'>
                    <a href='#' className='bg-zinc-200 hover:bg-zinc-400 text-center text-white p-1 rounded-md'>good</a>
                    <a href='#' className='bg-zinc-200 hover:bg-zinc-400 text-center text-white p-1 rounded-md'>good</a>
                    <a href='#' className='bg-zinc-200 hover:bg-zinc-400 text-center text-white p-1 rounded-md'>good</a>
                    <a href='#' className='bg-zinc-200 hover:bg-zinc-400 text-center text-white p-1 rounded-md'>good</a>
                    <a href='#' className='bg-zinc-200 hover:bg-zinc-400 text-center text-white p-1 rounded-md'>good</a>
                    <a href='#' className='bg-zinc-200 hover:bg-zinc-400 text-center text-white p-1 rounded-md'>good</a>
                    <a href='#' className='bg-zinc-200 hover:bg-zinc-400 text-center text-white p-1 rounded-md'>good</a>
                    <a href='#' className='bg-zinc-200 hover:bg-zinc-400 text-center text-white p-1 rounded-md'>good</a>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Sidebar