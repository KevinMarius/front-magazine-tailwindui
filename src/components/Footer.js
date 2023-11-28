import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../hooks/http-hook';

const items = [
  { id: 1, title: 'Politics' },
  { id: 2, title: 'Animal' },
  { id: 3, title: 'Sport' },
  { id: 4, title: 'Features' },
  { id: 5, title: 'Others' },
]

const tags = [
  { id: 1, title: 'tags1' },
  { id: 2, title: 'tags2' },
  { id: 3, title: 'tags3' },
  { id: 4, title: 'tags4' },
  { id: 5, title: 'tags5' },
]

function Footer() {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      let responseData;
      try{
        responseData = await sendRequest(`http://localhost:3500/api/category/get`);
        setCategories(responseData.categories);
      }catch(err) {}
    }

    getCategoriesData();
  }, [sendRequest])

  return (
    <React.Fragment>
      <div className=' bg-zinc-900 bottom-0 left-0 right-0 p-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='text-center px-3'>
            <h2 className='text-white text-2xl font-semibold'>About Us</h2>
            <div className='my-4 text-white text-sm'>
              <p>Some Street 002. City Country</p>
              <p>Tel: 555 555 555</p>
              <p>Email: yourmail@sitename.com</p>
            </div>
            <p className='text-white justify-normal text-sm'>Anim do elit ea dolor cupidatat velit aliqua magna in. Dolore sint ea nisi deserunt est deserunt excepteur sit nisi eu ipsum. Quis velit cillum tempor deserunt.</p>
          </div>
          <div className='text-center px-3'>
            <h2 className='text-white text-2xl font-semibold'>Category</h2>
            <ul className='my-4 text-sm text-white'>
              {categories.map((item, i) => (
                <li key={i} className='ml-6 py-1'><a href='#'>{item.title}</a></li>
              ))}
            </ul>
          </div>
          <div className='text-center px-3'>
            <h2 className='text-white text-2xl font-semibold'>Tags</h2>
            <ul className='my-4 text-sm text-white'>
              <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
              {tags.map((item, i) => (
                <li key={i} className='bg-orange-600 opacity-90 text-center w-auto p-2'><a href='#'>{item.title}</a></li>
              ))}
              </div>
            </ul>
          </div>
          <div className='text-center px-3'>
            <h2 className='text-white text-2xl font-semibold'>Newsletter</h2>
            <p className='text-white justify-normal text-sm my-4'>Anim do elit ea dolor cupidatat velit aliqua magna in. Dolore sint ea nisi deserunt.</p>
            <div className='flex w-[90%] mx-auto'>
            <input type='text' placeholder='Email Address' className=' bg-slate-600 border-none border-0 focus:border-0 active:border-0 w-3/4 rounded-l-md'/>
            <button type='submit' className='w-1/4 bg-slate-300 font-semibold text-xs rounded-r-md'>Join</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Footer