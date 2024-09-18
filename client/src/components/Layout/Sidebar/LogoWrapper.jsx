import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../../AbstractElements';
// import logo from '../../../Assets/logo/itg_logo.webp';
import logo from '../../../Assets/logo/cropped-ITGeeks-Technologies-Pvt.-Ltd.-Logo.png';
import CustomizerContext from '../../../Context/Customizer';
import { IoSettingsSharp } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RiSettings5Fill } from "react-icons/ri";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const LogoWrapper = () => {
  const { togglSidebar, setTogglSidebar } = useContext(CustomizerContext);

  return (
    <div className='logo-wrapper'>
      <div className='ml-[50px]'>

      <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
        <Image className='img-fluid for-light w-[140px] h-[50px] ml-[10px] mt-[10px]' src={logo} alt='logo' />
      </Link>
      </div>
      {/* <div onClick={() => setTogglSidebar(!togglSidebar)} className='back-btn'>
        S
      </div> */}
      {/* <div onClick={() => setTogglSidebar(!togglSidebar)} className=' text-[24px] border toggle-sidebar hover:none text-black'> */}
      {/* <IoSettingsSharp color='white' stroke='white' size={24} /> */}
      {/* <RiSettings5Fill color='white' stroke='white' size={24} /> */}
      {/* <FaArrowRightArrowLeft className=' text-sm' size={22} /> */}
      {/* </div> */}
    </div>
  );
};

export default LogoWrapper;