import React, { useEffect, useState } from 'react';
import { ChevronsUp } from 'react-feather';
import { FaAnglesUp } from "react-icons/fa6";

const Taptop = () => {

    const [tapTopStyle, setTapTopStyle] = useState('none');

    const executeScroll = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setTapTopStyle('block');
        } else {
            setTapTopStyle('none');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div onClick={() => executeScroll()} className="tap-top flex items-center justify-center" style={{ display: tapTopStyle }}>
            {/* <ChevronsUp onClick={() => executeScroll()} /> */}
            <FaAnglesUp size={20} className=' m-auto px-auto pt-1' />
        </div>
    );
};

export default Taptop;