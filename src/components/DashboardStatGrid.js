import React from 'react';
import { IoBagHandle } from 'react-icons/io5'

function DashboardStatGrid() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
        <BoxWrapper>
            <div className='flex rounded-full items-center w-10 h-10 justify-center bg-sky-500'>
                <IoBagHandle className='text-white text-2xl'/>
            </div>
            <div className=' pl-3'>
                <span className='text-sm text-gray-500 font-light'>Total sales</span>
                <div className='flex items-center'>
                    <strong className='text-lg text-gray-700 font-semibold'>$45677</strong>
                    <span className='text-xs text-green-500 pl-2'>+237</span>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className='flex rounded-full items-center w-10 h-10 justify-center bg-yellow-300'>
                <IoBagHandle className='text-white text-2xl'/>
            </div>
            <div className=' pl-3'>
                <span className='text-sm text-gray-500 font-light'>Total sales</span>
                <div className='flex items-center'>
                    <strong className='text-lg text-gray-700 font-semibold'>$45677</strong>
                    <span className='text-xs text-green-500 pl-2'>+237</span>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className='flex rounded-full items-center w-10 h-10 justify-center bg-green-400'>
                <IoBagHandle className='text-white text-2xl'/>
            </div>
            <div className=' pl-3'>
                <span className='text-sm text-gray-500 font-light'>Total sales</span>
                <div className='flex items-center'>
                    <strong className='text-lg text-gray-700 font-semibold'>$45677</strong>
                    <span className='text-xs text-green-500 pl-2'>+237</span>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className='flex rounded-full items-center w-10 h-10 justify-center bg-red-400'>
                <IoBagHandle className='text-white text-2xl'/>
            </div>
            <div className=' pl-3'>
                <span className='text-sm text-gray-500 font-light'>Total sales</span>
                <div className='flex items-center'>
                    <strong className='text-lg text-gray-700 font-semibold'>$45677</strong>
                    <span className='text-xs text-green-500 pl-2'>+237</span>
                </div>
            </div>
        </BoxWrapper>
    </div>
  )
}

export default DashboardStatGrid

function BoxWrapper({ children }) {
    return <div className='bg-white rounded-sm p-3 flex items-center border shadow-sm border-gray-100 flex-1'>{children}</div>
}