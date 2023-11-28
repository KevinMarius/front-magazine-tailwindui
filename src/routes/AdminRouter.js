import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from '../components/shared/admin/Layout';
import Dashboard from '../pages/admin/Dashboard';
import Post from '../pages/admin/Post';
import Category from '../pages/admin/Category';
import User from '../pages/admin/User';
import Test from '../pages/admin/Test';
import AddPost from '../pages/admin/AddPost';
import AddCategory from '../pages/admin/AddCategory';
import Role from '../pages/admin/Role';
import UpdatePost from '../pages/admin/UpdatePost';
import UpdateCategory from '../pages/admin/UpdateCategory';
import UpdateUser from '../pages/admin/UpdateUser';
import AddUser from '../pages/admin/AddUser';
import AddRole from '../pages/admin/AddRole';
import UpdateRole from '../pages/admin/UpdateRole';

function AdminRouter() {
    //const { categoryId } = useParams();
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path='/post' element={<Post />} />
                <Route path='/post/:id' element={<UpdatePost />} />
                <Route path='/addPost' element={<AddPost />} />
                <Route path='/addcategory' element={<AddCategory />} />
                <Route path='/category' element={<Category />} />
                <Route path='/category/:id' element={<UpdateCategory />} />
                <Route path='/user' element={<User />}/>
                <Route path='/adduser' element={<AddUser />}/>
                <Route path='/user/:id' element={<UpdateUser />}/>
                <Route path='/role' element={<Role />}/>
                <Route path='/role/:id' element={<UpdateRole />}/>
                <Route path='/addrole' element={<AddRole />}/>
                <Route path='/test' element={<Test />}/>
            </Route>
        </Routes>
    )
}

export default AdminRouter