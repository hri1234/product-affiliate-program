import React, { useEffect, useState } from 'react';
import Avatar from '../../../Assets/images/dashboard/profile.jpg';
import { Admin, EmayWalter } from '../../Constant';
import { Image, P } from '../../AbstractElements';
import { FaAngleDown } from "react-icons/fa6";

import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

const ProfileBox = () => {

  const userToken = Cookies.get("isLogged");
  const [role, setRole] = useState('');
  const [userEmail, setEmail] = useState('');
  const [cookieProfile, setCookieProfile] = useState(null)

  const ProfileData = Cookies.get("profileData");


  useEffect(() => {
    if (userToken) {
      const decodedData = jwtDecode(userToken);
      console.log(decodedData, 'decodedDATA PROFILE');
      setEmail(decodedData?.email[0])
      setRole(decodedData?.role)
    }
  }, [userToken])

  useEffect(() => {
    if (ProfileData != 'undefined') {

      const dataa = ProfileData && JSON.parse(ProfileData);

      // const decodedProfileData = '';
      console.log(dataa, 'DECODED PROFILE DATA')
      setCookieProfile(dataa?.companyName)

      // const decodedData = jwtDecode(ProfileData);
      // console.log(ProfileData, 'ProfileData PROFILE');


      // setEmail(decodedData?.email[0])
      // setRole(decodedData?.role)
    }

  }, [ProfileData])

  return (
    <div className='d-flex flex gap-3'>
      <span className=' bg-slate-200 w-[50px] h-[50px] rounded-full flex items-center font-semibold justify-center'>{userEmail?.toUpperCase()}</span>
      <div className=' flex flex-col gap-0'>
        <span className=' m-0 p-0 capitalize'>{cookieProfile?.split(' ')[0] || "Profile"}</span>
        <p className='m-0 p-0 text-slate-500 flex gap-1 items-center font-roboto'>
          {/* {
            role == 'admin' ?

              "Admin"
              :
              "Customer"
          } */}
          {/* <FaAngleDown /> */}
        </p>
      </div>
    </div>
  );
};

export default ProfileBox;