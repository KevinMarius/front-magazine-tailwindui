import React from 'react';
import moment from 'moment';

import { FaUserAlt, FaClock } from 'react-icons/fa';

function Card({ item }) {

    return (
        <div className="sm:flex w-full border-gray-100 border-2 mx-auto my-4 hover:shadow-lg transition-all duration-300">
            <img className="h-48 w-full sm:w-40 md:w-32 flex-none bg-cover rounded-t-none rounded-l text-center" src={`http://localhost:3500/${item.picture}`} title="Woman holding a mug"/>
            <div className="w-full border-gray-400 lg:border-gray-400 bg-white rounded-b-none rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-6">
                    <a href={`/blog/post/category/${item.categoryId?._id}`} className="text-xs mb-2 p-1 bg-orange-600 text-white items-center">
                        {item.categoryId?.title}
                    </a>
                    <div className="text-gray-900 font-bold text-lg mb-2"><a href={`/blog/post/${item._id}`}  className='decoration-transparent hover:text-orange-600 transition-all duration-300'>{item.title}</a></div>
                    <p className="text-gray-700 text-sm">{item.content?.substr(0, 90)+'...'}</p>
                </div>
                <div className="flex items-center">
                    <div className='flex gap-3 mt-1 text-gray-800 text-xs font-light'>
                        <div className='flex gap-2 items-center'>
                            <FaUserAlt />
                            <p>Admin</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <FaClock />
                            <p>{moment(item.createdAt, "YYYYMMDD").fromNow()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card