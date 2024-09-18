import React from 'react';
import { FiFileText, FiLogIn, FiMail, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { UL, LI } from '../../AbstractElements';
import { Account, Inbox, LogIn, Taskboard } from '../../Constant';
import Cookies from 'js-cookie';

const ProfileboxDropdown = () => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear();
    Cookies.remove("isLogged"); navigate('/')
  };

  const handleProfile=()=>
  {
    navigate('profile')
  }



  return (
    <UL className="profile-dropdown px-3 py-[10px] onhover-show-div border flex flex-col gap-1 shadow-sm">
      <LI onClick={handleProfile} className="border-0 border-b-2">
        <Link style={{textDecoration:'none'}}  className=' flex w-full items-center gap-3 p-1'>
          <FiUser />
          <span>{Account}</span>
        </Link>
      </LI>
      <hr />
      <LI className="border-0" onClick={logout}>
        <Link style={{textDecoration:'none'}} className=' flex w-full items-center gap-3 p-1' >
          <FiLogIn />
          <span>Log Out</span>
        </Link>
      </LI>
    </UL>
  );
};

export default ProfileboxDropdown;
