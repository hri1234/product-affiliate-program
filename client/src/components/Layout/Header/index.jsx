
import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import { Image } from '../../AbstractElements';
import { Link } from 'react-router-dom';
import { FiAlignCenter } from 'react-icons/fi';
import NavMenu from './NavMenu';
import SearchWrapper from './SearchWrapper';
import CustomizerContext from '../../../Context/Customizer';
import login from "../../../Assets/logo/login.png";

const Header = () => {
  const { togglSidebar, setTogglSidebar } = useContext(CustomizerContext);

  return (
    <>
      <div className={`page-header w-full jub ${togglSidebar ? "close_icon" : ""}`}>
        <Row className=' row m-0 py-4 px-5 w-full justify-between'>
          <div className='header-logo-wrapper p-0 w-[70%]'>
            <SearchWrapper />
          </div>
          <div className='nav-right pull-right right-header p-0'>
            <NavMenu />
          </div>
        </Row>
      </div>
    </>
  );
};

export default Header;
