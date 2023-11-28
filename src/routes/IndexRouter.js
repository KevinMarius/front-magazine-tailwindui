import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DetailPost from '../pages/DetailPost';
import News from '../pages/News';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import Category from '../pages/Category';
import Layout from '../components/shared/customer/Layout';

function IndexRouter() {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='blog' element={<Blog />}>
              <Route path='post' element={<News />} />
              <Route path='post/:id' element={<DetailPost />}/>
              <Route path='post/category/:id' element={<Category />}/>
            </Route>
            <Route path='contact' element={<Contact />}/>
        </Route>
    </Routes>
  )
}

export default IndexRouter