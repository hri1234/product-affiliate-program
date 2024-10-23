
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Image } from '../../AbstractElements';
import { Link, useNavigate } from 'react-router-dom';
import { FiAlignCenter } from 'react-icons/fi';
import NavMenu from './NavMenu';
import SearchWrapper from './SearchWrapper';
import CustomizerContext from '../../../Context/Customizer';
import login from "../../../Assets/logo/login.png";
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
const Header = () => {
  const { togglSidebar, setTogglSidebar } = useContext(CustomizerContext);
  const navigate = useNavigate()
  const [role, setRole] = useState('');

  const userToken = Cookies.get("isLogged");
  useEffect(() => {
    if (userToken?.length > 1) {
      const decodingToken = jwtDecode(userToken);
      setRole(decodingToken?.role)
    }
  }, [userToken])
  return (
    <>
      <div className={`page-header w-full jub ${togglSidebar ? "close_icon" : ""}`}>
        <Row className=' row m-0 py-4 px-5 w-full justify-between'>
          <div className='header-logo-wrapper p-0 w-[70%]'>
            <SearchWrapper />
          </div>

          <div className='nav-right pull-right right-header p-0 flex ' >
            <div className="flex items-center mb-[8px] cursor-pointer"
            >
              {role === "admin" ? "" : <a
                href='/terms-condition'
                target='_blank'
                rel="noopener noreferrer"
                className=" text-[14px] flex hover:no-underline hover:text-black cursor-pointer gap-1 items-center"
              >Privacy policy</a>}
            </div>
            <NavMenu />
          </div>
        </Row>
      </div>
    </>
  );
};

export default Header;
