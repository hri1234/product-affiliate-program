import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../../AbstractElements';
// import logo from '../../../Assets/logo/itg_logo.webp';
import logo from '../../../Assets/logo/cropped-ITGeeks-Technologies-Pvt.-Ltd.-Logo.png';
import CustomizerContext from '../../../Context/Customizer';
import { IoSettingsSharp } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RiSettings5Fill } from "react-icons/ri";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useGetProfileQuery } from '../../../services/ProfileService';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';



const LogoWrapper = () => {
  const { togglSidebar, setTogglSidebar } = useContext(CustomizerContext);

  const [decodedData, setDecodedData] = useState('');

  const userToken = Cookies.get("isLogged");

  useEffect(() => {
    const decodedToken = jwtDecode(userToken);
    setDecodedData(decodedToken);

  }, [userToken])

  const { data, isLoading: listLoading, isFetching: listFetching } = useGetProfileQuery({});
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyName, setcompanyName] = useState('User')

  useEffect(() => {
    if (listLoading || listFetching) {
      setLoading(true)
    }
    else {
      setLoading(false);
      setListData(data?.result);
      setcompanyName(data?.result?.result?.companyName)
      // setCookieProfile(data?.result?.result?.companyName)
    }
  }, [listLoading, data, listFetching])

  console.log(decodedData?.role, 'decodedData')

  return (
    <div className='logo-wrapper overflow-hidden p-3'>
      <div className='ml-[0px] p-[4px]'>

        <Link style={{ border: 'none', textDecoration: 'none' }}>
        {/* to={`/dashboard`} */}
          {/* <Image className='img-fluid for-light w-[140px] h-[50px] ml-[10px] mt-[10px]' src={logo} alt='logo' /> */}

          {
            togglSidebar ?
              // <span className=' flex capitalize text-black hover:text-black items-center text-[20px] mt-1 font-semibold justify-center h-[47px] '>
              //   Hello !
              // </span>
              <span className=' m-auto h-[53px] duration-600 ease-in-out w-[66px] bg-orange hover:text-black my-3 mb-4 flex items-center justify-center text-[19.5px] font-semibold mt-3 pt-2 ml-[11px]'>Hello !</span>
              :
              <span className='overflow-hidden flex break-all w-[245px] capitalize duration-600 ease-in-out text-black hover:text-black items-center text-[22px] mt-2 font-semibold justify-center h-[50px] '>
                Hello {decodedData?.role == 'admin' ? "Admin !" : companyName?.slice(0,25) + "!"}
              </span>
          }
        </Link>
        {/* <hr className='w-full m-auto text-black' /> */}
      </div>


    </div>
  );
};

export default LogoWrapper;