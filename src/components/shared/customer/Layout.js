import React from 'react';
import Header from '../../Header';
import ScrollButton from '../../ScrollButton';
import { Outlet } from 'react-router-dom';
import Footer from '../../Footer';

function Layout() {
  return (
    <React.Fragment>
      <div className='relative'>
        <Header />
        <ScrollButton />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default Layout