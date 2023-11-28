import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollButton() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const toggled = document.documentElement.scrollTop;
        if(toggled > 300) {
            setVisible(true);
        }else {
            setVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', toggleVisible);

    return (
        <div>
            {visible && (<button onClick={scrollToTop} className='bg-orange-600 rounded-full fixed bottom-10 right-10 p-2 hover:bg-orange-700'><FaArrowUp className='w-6 h-6 text-white'/></button>)}
        </div>
    )
}

export default ScrollButton