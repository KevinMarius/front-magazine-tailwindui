import React from 'react'
import Carousel from '../components/Carousel'
import CarouselMini from '../components/CarouselMini'
import Main from '../components/Main'

function Home() {
  return (
    <React.Fragment>
      <Carousel />
      <div className='bg-slate-300 pt-14 pb-7'>
        <CarouselMini />
      </div>
      <div className='mx-10 my-10'>
      <Main/>
      </div>
      
    </React.Fragment>
  )
}

export default Home