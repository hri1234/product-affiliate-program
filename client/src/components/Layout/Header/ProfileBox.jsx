import React, { useEffect, useState } from 'react';
import Avatar from '../../../Assets/images/dashboard/profile.jpg';
import { Admin, EmayWalter } from '../../Constant';
import { Image, P } from '../../AbstractElements';
import { FaAngleDown } from "react-icons/fa6";

import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useGetProfileQuery } from '../../../services/ProfileService';
import ProfileImage from './image_2024_10_01T10_35_05_438Z.png';
const ProfileBox = () => {

  const userToken = Cookies.get("isLogged");
  const [role, setRole] = useState('');
  const [userEmail, setEmail] = useState('');
  const [cookieProfile, setCookieProfile] = useState(null)

  // const ProfileData = Cookies.get("profileData");

  const { data, isLoading: listLoading, isFetching: listFetching } = useGetProfileQuery({});
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listLoading || listFetching) {
      setLoading(true)
    }
    else {
      setLoading(false);
      setListData(data?.result);
      setCookieProfile(data?.result?.result?.companyName || "")

    }
  }, [listLoading, data, listFetching])



  useEffect(() => {
    if (userToken) {
      const decodedData = jwtDecode(userToken);
      console.log(decodedData, 'decodedDATA PROFILE');
      setEmail(decodedData?.email[0])
      setRole(decodedData?.role)
    }
  }, [userToken])

  return (
    <div className=' flex gap-2 pl-4 items-center justify-center'>
      <span className='  rounded-full flex items-center font-semibold justify-center'><img src={ProfileImage} className='object-cover w-[50px]  rounded-full  h-[50px]' alt="" /></span>
      {(role == 'admin' || cookieProfile) &&
        <div className=' flex flex-col gap-0 w-fit'>
          <span className=' m-0 p-0 w-fit capitalize'>{role == 'admin' ? "Admin" : cookieProfile?.slice(0, 25) || "Profile"}</span>
        </div>
      }
    </div>
  );
};

export default ProfileBox;