import React from 'react';
import { Outlet } from 'react-router-dom';

function Category() {
  return (
    <React.Fragment>
        <Outlet />
    </React.Fragment>
  )
}

export default Category