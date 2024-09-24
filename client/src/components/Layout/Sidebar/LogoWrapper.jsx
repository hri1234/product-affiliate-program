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

  const [decodedData,setDecodedData] = useState('');

  const userToken = Cookies.get("isLogged");

  useEffect(()=>
  {
    const decodedToken = jwtDecode(userToken);
    setDecodedData(decodedToken);

  },[userToken])

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

  console.log(decodedData?.role,'decodedData')

  return (
    <div className='logo-wrapper p-3'>
      <div className='ml-[0px] p-[4px]'>

        <Link style={{ border: 'none', textDecoration: 'none' }} to={`/dashboard`}>
          {/* <Image className='img-fluid for-light w-[140px] h-[50px] ml-[10px] mt-[10px]' src={logo} alt='logo' /> */}
          <span className=' flex capitalize text-black hover:text-black items-center text-[22px] mt-2 font-semibold justify-center h-[50px] '>
            Hello, { decodedData?.role=='admin'?"Admin": companyName?.split(' ')[0]}
          </span>
        </Link>
      </div>

      <hr className='w-4/5 m-auto text-black' />

    </div>
  );
};

export default LogoWrapper;