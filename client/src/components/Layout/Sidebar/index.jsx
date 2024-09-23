import React, { useContext, useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LogoWrapper from './LogoWrapper';
import SideBarNav from './SideBarNav';
import logoSmall from '../../../Assets/logo/logo-icon1.png';
import { Image } from '../../AbstractElements';
import CustomizerContext from '../../../Context/Customizer';
import itgLogo from '../../../Assets/logo/itg_logo.webp'

const Sidebar = () => {
  const { customizer, togglSidebar } = useContext(CustomizerContext);
  const horizontalSidebar = customizer.settings.sidebar.type.split(' ').includes('horizontal-wrapper');
  const [width, setWidth] = useState(0);
  const [margin, setMargin] = useState(0);
  const scrollToRight = () => {
    if (horizontalSidebar) {
      if (margin <= -2598 || margin <= -2034) {
        if (width === 492) {
          setMargin(-3570);
        } else {
          setMargin(-3464);
        }
        document.querySelector('.right-arrow').classList.add('d-none');
        document.querySelector('.left-arrow').classList.remove('d-none');
      } else {
        setMargin((margin) => (margin += -width));
        document.querySelector('.left-arrow').classList.remove('d-none');
      }
    }
  };

  const scrollToLeft = () => {
    if (horizontalSidebar) {
      if (margin >= -width) {
        setMargin(0);
        document.querySelector('.left-arrow').classList.add('d-none');
        document.querySelector('.right-arrow').classList.remove('d-none');
      } else {
        setMargin((margin) => (margin += width));
        document.querySelector('.right-arrow').classList.remove('d-none');
      }
    }
  };

  useEffect(() => {
    document.querySelector('.left-arrow').classList.add('d-none');
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  };

  return (
    <div className={`sidebar-wrapper ${togglSidebar ? "close_icon" : ""} `} id="sidebar-wrapper">
      <div>
        <LogoWrapper />
        <div className='logo-icon-wrapper flex items-center gap-1 justify-center'>
          {/* <Link to={`${process.env.PUBLIC_URL}/dashboard/`}> */}
          {/* <Image className='img-fluid h-[50px] w-[50px] ml-[12px] ' src={itgLogo} alt='logo' /> */}
          {/* <Image className='img-fluid' src={logoSmall} alt='logo' /> */}

          <span className=' m-auto h-[50px] w-[50px] bg-orange my-3 mb-4 flex items-center justify-center text-[20px] font-semibold mt-3 pt-3 ml-[12px]'>Hi !</span>
          {/* </Link> */}

          <hr className='w-4/5 m-auto mt-2 ' />
        </div>

        <nav className='sidebar-main'>
          <div className='left-arrow' id='left-arrow' onClick={scrollToLeft}>
            <FiArrowLeft />
          </div>
          <div id='sidebar-menu' style={horizontalSidebar ? { marginLeft: margin + 'px' } : { margin: '0px' }}>
            <SideBarNav />
          </div>
          <div className='right-arrow' id='right-arrow' onClick={scrollToRight}>
            <FiArrowRight />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
