import React from 'react';
import { Outlet } from 'react-router-dom';

function Blog() {
  return (
    <React.Fragment>
        <Outlet />
    </React.Fragment>
  )
}

export default Blog