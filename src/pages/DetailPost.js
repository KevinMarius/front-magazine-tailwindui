import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserAlt, FaClock } from 'react-icons/fa';
import { useHttpClient } from '../hooks/http-hook';
import moment from 'moment';

function DetailPost() {
  const id = useParams().id;
  const [post, setPost] = useState();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const responseData = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:3500/api/post/get/${id}`);
        setPost(responseData.post);
      }catch(err){}
    }
    responseData();
  }, [])

  return (
    <React.Fragment>
      {post && <div className='w-full'>
      <div className='mx-10'>
        <img className='w-full mt-3' src={`http://localhost:3500/${post.picture}`}/>
        <div className='flex justify-between mt-4'>
          <h1 className='text-2xl md:text-4xl text-slate-700 font-semibold'>{post.title}</h1>
          <span className='font-semibold italic text-lg text-orange-600'>{post.categoryId.title}</span>
        </div>
        <div className="flex items-center">
          <div className='flex gap-14 mt-6 text-gray-800 text-md font-semibold'>
            <div className='flex gap-2 items-center'>
              <FaUserAlt />
              <p>{post.authorId.name}</p>
            </div>
            <div className='flex gap-2 items-center'>
              <FaClock />
              <p>{moment(post.createdAt, "YYYYMMDD").fromNow()}</p>
            </div>
          </div>
        </div>
        <div className='mt-6 text-sm'>
          <p>
            {post.content}
          </p>
        </div>
        <div className='bg-slate-50 p-4 md:p-10 my-10 divide-y-2'>
          <div className='pb-10'>
            <h1 className='text-slate-900 font-semibold text-2xl'>03 Comments</h1>
            <form className='flex flex-col gap-4 mt-4'>
              <input type='text' placeholder='Name' className='px-6 py-2 rounded-md border-none focus:ring-orange-600 transition-all duration-200' />
              <input type='email' placeholder='Email' className='px-6 py-2 rounded-md border-none focus:ring-orange-600 transition-all duration-200' />
              <textarea rows={5} className='rounded-md border-none focus:ring-orange-600 transition-all duration-200' />
            </form>
          </div>
          <div>
            <div className='flex flex-col sm:flex-row gap-6 pt-10'>
              <img className='w-12 h-12 rounded-full mx-auto' src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' />
              <div className='bg-white rounded-lg p-4 border-gray-800'>
                <div className='flex gap-4 sm:gap-14 flex-col sm:flex-row items-center'>
                  <h6 className='text-gray-700 text-sm sm:text-lg font-semibold'>BTemplates</h6>
                  <p className='text-xs text-gray-700 text-center'>July 25, 2016 at 7:43 AM</p>
                </div>
                <p className='text-xs mt-4'>Tempor adipisicing cupidatat consequat non excepteur. Nisi anim culpa cupidatat ad ipsum occaecat et. Labore enim aliquip incididunt velit consectetur elit reprehenderit nisi cupidatat qui adipisicing tempor id dolore. Consectetur adipisicing nulla sunt dolor tempor culpa est qui pariatur laborum.</p>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-6 pt-10'>
              <img className='w-12 h-12 rounded-full mx-auto' src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' />
              <div className='bg-white rounded-lg p-4 border-gray-800'>
                <div className='flex gap-4 sm:gap-14 flex-col sm:flex-row items-center'>
                  <h6 className='text-gray-700 text-sm sm:text-lg font-semibold'>BTemplates</h6>
                  <p className='text-xs text-gray-700 text-center'>July 25, 2016 at 7:43 AM</p>
                </div>
                <p className='text-xs mt-4'>Tempor adipisicing cupidatat consequat non excepteur. Nisi anim culpa cupidatat ad ipsum occaecat et. Labore enim aliquip incididunt velit consectetur elit reprehenderit nisi cupidatat qui adipisicing tempor id dolore. Consectetur adipisicing nulla sunt dolor tempor culpa est qui pariatur laborum.</p>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-6 pt-10'>
              <img className='w-12 h-12 rounded-full mx-auto' src='https://flowbite.com/docs/images/people/profile-picture-5.jpg' />
              <div className='bg-white rounded-lg p-4 border-gray-800'>
                <div className='flex gap-4 sm:gap-14 flex-col sm:flex-row items-center'>
                  <h6 className='text-gray-700 text-sm sm:text-lg font-semibold'>BTemplates</h6>
                  <p className='text-xs text-gray-700 text-center'>July 25, 2016 at 7:43 AM</p>
                </div>
                <p className='text-xs mt-4'>Tempor adipisicing cupidatat consequat non excepteur. Nisi anim culpa cupidatat ad ipsum occaecat et. Labore enim aliquip incididunt velit consectetur elit reprehenderit nisi cupidatat qui adipisicing tempor id dolore. Consectetur adipisicing nulla sunt dolor tempor culpa est qui pariatur laborum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> }
    </React.Fragment>
  )
}

export default DetailPost