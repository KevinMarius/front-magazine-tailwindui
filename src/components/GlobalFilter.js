import React from 'react'

function GlobalFilter({ filter, setFilter }) {
  return (
    <span className='flex justify-between pt-6 pb-3 '>
        <input
          value={filter || ""}
          onChange={e => {
            setFilter(e.target.value);
          }}
          className='w-1/3 rounded-md focus:outline-none focus:border-none active:border-none focus:ring-orange-600 active:outline-none border px-4 py-2 text-gray-500 cursor-text' 
          type="search"  
          placeholder="Search..."
        />
      </span>
  )
}

export default GlobalFilter