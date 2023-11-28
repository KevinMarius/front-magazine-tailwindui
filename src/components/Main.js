import React, { useState, useEffect } from 'react'
import Card from './Card';
import Sidebar from './Sidebar';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useTransition, animated, useSpring } from 'react-spring';
import { useHttpClient } from '../hooks/http-hook';

const items = [
    { id: 0, title: 'Ipsum est irure', category: 'Sport', description: 'Ipsum est irure aliqua voluptate...', url: 'https://flowbite.com/docs/images/blog/image-1.jpg' },
    { id: 1, title: 'Ipsum est irure', category: 'Animal', description: 'Sit tempor minim dolore sit ut a...', url: 'https://flowbite.com/docs/images/blog/image-2.jpg' },
    { id: 2, title: 'Ipsum est irure', category: 'Animal', description: 'Sit tempor minim dolore sit ut a...', url: 'https://flowbite.com/docs/images/blog/image-2.jpg' },
    { id: 3, title: 'Ipsum est irure', category: 'Animal', description: 'Sit tempor minim dolore sit ut a...', url: 'https://flowbite.com/docs/images/blog/image-2.jpg' },
    { id: 4, title: 'Ipsum est irure', category: 'Features', description: 'Irure veniam fugiat ullamco... ', url: 'https://flowbite.com/docs/images/blog/image-3.jpg' },
    { id: 5, title: 'Ipsum est irure', category: 'Features', description: 'Irure veniam fugiat ullamco... ', url: 'https://flowbite.com/docs/images/blog/image-3.jpg' },
    { id: 6, title: 'Ipsum est irure', category: 'Company', description: 'Nisi ullamco anim qui irure...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 7, title: 'Ipsum est irure', category: 'Company', description: 'Nisi ullamco anim qui irure...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 8, title: 'Ipsum est irure', category: 'Company', description: 'Nisi ullamco anim qui irure...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 9, title: 'Ipsum est irure', category: 'Company', description: 'Nisi ullamco anim qui irure...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 10, title: 'Ipsum est irure', category: 'Sport', description: 'Consequat cupidatat id culpa...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 11, title: 'Ipsum est irure', category: 'Sport', description: 'Consequat cupidatat id culpa...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 12, title: 'Ipsum est irure', category: 'Sport', description: 'Consequat cupidatat id culpa...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 13, title: 'Ipsum est irure', category: 'Animal', description: 'Consequat cupidatat id culpa...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 14, title: 'Ipsum est irure', category: 'Features', description: 'Consequat cupidatat id culpa...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
    { id: 15, title: 'Ipsum est irure', category: 'Features', description: 'Consequat cupidatat id culpa...', url: 'https://flowbite.com/docs/images/blog/image-4.jpg' },
]

function Main() {

    const [choiceCategory, setChoiceCategory] = useState('all');
    const [ posts, setPosts ] = useState('');
    const [ categories, setCategories ] = useState('');
    const { sendRequest } = useHttpClient();

    const handleChangeCategory = (e, item) => {
        e.preventDefault();
        setChoiceCategory(item);
    }

    useEffect(() => {
        const getCategoriesData = async () => {
          let responseData;
          try{
            responseData = await sendRequest(`http://localhost:3500/api/category/get`);
            setCategories(responseData.categories);
          }catch(err) {}
        }

        const getPostPublishedData = async () => {
          let responseData;
          try{
            responseData = await sendRequest(`http://localhost:3500/api/post/getPublishedPosts`);
            setPosts(responseData.posts);
          }catch(err) {}
        }
        getPostPublishedData();
        getCategoriesData();
      }, [sendRequest]);

      console.log(posts)

    const filteredItems = choiceCategory === 'all' ? posts : posts.filter(item => item.categoryId.title.toLowerCase() == choiceCategory.toLowerCase());

    const transition = useTransition(filteredItems, {
        from: { opacity: 0},
        enter: {opacity: 1},
        leave: { opacity: 0},
    });

    const animatedItems = transition((style, item) => {
        return (
            <animated.div style={style}>
              <Card item={item} />
            </animated.div>
          );
    })

    return (
        <React.Fragment>
            <div className='container mx-auto'>
                <div className='grid grid-cols-4 gap-y-6 gap-3'>
                    <div className='col-span-4 lg:col-span-3 divide-y'>
                        <div className='flex justify-between my-5 mx-auto'>
                            <h4 className='text-sm font-semibold text-slate-600 hidden sm:block'>Filter by Categry</h4>
                            <div className='flex justify-center'>
                                <button onClick={e => handleChangeCategory(e, 'all')} className={`border p-1 sm:p-2 uppercase text-xs font-semibold ${choiceCategory === 'all' ? 'bg-orange-600' : ''} text-slate-400`}>All</button>
                                { categories && categories.map((item, i) => (
                                    <button onClick={e => handleChangeCategory(e, item.title)} className={`border p-1 sm:p-2 uppercase text-xs font-semibold ${choiceCategory === item.title ? 'bg-orange-600' : ''} text-slate-400 `} key={i}>{item.title}</button>
                                ))}
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 pt-10 gap-4'>
                            {posts && animatedItems}
                        </div>
                        <a href='#' className='text-orange-600 text-lg font-semibold transition-all duration-200 flex items-center gap-2 justify-center my-10 '>See all <FaArrowAltCircleRight /></a>
                    </div>
                    <div className='col-span-4 lg:col-span-1 mt-4 lg:mt-0'>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Main