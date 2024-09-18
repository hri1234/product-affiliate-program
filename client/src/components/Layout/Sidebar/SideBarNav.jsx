// import React, { Fragment, useEffect, useState } from 'react';
// import { H6 } from '../../AbstractElements';
// import { MENU } from './Menu';
// import { AdminMenu } from './AdminMenu';
// import SidebarSubMenu from './SidebarSubMenu';
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';

// const SideBarNav = () => {
//   const [isOpen, setIsOpen] = useState([]);
//   const [role, setRole] = useState('');

//   const TokenData = Cookies.get('isLogged');

//   useEffect(() => {
//     if (TokenData?.length > 1) {
//       const decodingToken = jwtDecode(TokenData);
//       console.log(decodingToken?.role, 'decodedToken');
//       setRole(decodingToken?.role)
//     }
//     console.log('')
//   }, [TokenData])


//   return (
//     <div className='relative'>

//       <ul className='sidebar-links relative' id='simple-bar'>

//         {
//           role == 'admin' ?
//             AdminMenu?.map((item, i) => (
//               <Fragment className=" " key={i}>
//                 {item.title && (
//                   <li className='sidebar-main-title'>
//                     <H6>{item.title}</H6>
//                   </li>
//                 )}
//                 <li className='menu-box'>
//                   <SidebarSubMenu menu={item.menu} isOpen={isOpen} setIsOpen={setIsOpen} level={0} />
//                 </li>
//               </Fragment>
//             ))
//             :

//             MENU.map((item, i) => (
//               <Fragment className=" " key={i}>
//                 {item.title && (
//                   <li className='sidebar-main-title'>
//                     <H6>{item.title}</H6>
//                   </li>
//                 )}
//                 <li className='menu-box'>
//                   <SidebarSubMenu menu={item.menu} isOpen={isOpen} setIsOpen={setIsOpen} level={0} />
//                 </li>
//               </Fragment>
//             ))}

//       </ul>
//       <div style={{ color: 'black', backgroundColor: 'red' }} className='absolute right-0 z-[20000]'>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, at.
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, corrupti!
//       </div>
//     </div>
//   );
// };

// export default SideBarNav;

import React, { Fragment, useContext, useEffect, useState } from 'react';
import { H6 } from '../../AbstractElements';
import { MENU } from './Menu';
import { AdminMenu } from './AdminMenu';
import SidebarSubMenu from './SidebarSubMenu';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import CustomizerContext from '../../../Context/Customizer';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const SideBarNav = () => {

  const { togglSidebar, setTogglSidebar } = useContext(CustomizerContext);
  const testToken = Cookies.get("test")

  const [isOpen, setIsOpen] = useState([]);
  const [role, setRole] = useState('');

  const TokenData = Cookies.get('isLogged');

  useEffect(() => {
    if (TokenData?.length > 1) {
      const decodingToken = jwtDecode(TokenData);
      console.log(decodingToken?.role, 'decodedToken');
      setRole(decodingToken?.role)
    }
  }, [TokenData,testToken]);

  return (
    <div className='relative h-screen'>
      <ul className='sidebar-links relative' id='simple-bar'>
        {
          role === 'admin' ?
            AdminMenu?.map((item, i) => (
              <Fragment key={i}>
                {item.title && (
                  <li className='sidebar-main-title'>
                    <H6>{item.title}</H6>
                  </li>
                )}
                <li className='menu-box'>
                  <SidebarSubMenu menu={item.menu} isOpen={isOpen} setIsOpen={setIsOpen} level={0} />
                </li>
              </Fragment>
            ))
            :
            MENU.map((item, i) => (
              <Fragment key={i}>
                {item.title && (
                  <li className='sidebar-main-title'>
                    <H6>{item.title}</H6>
                  </li>
                )}
                <li className='menu-box'>
                  <SidebarSubMenu menu={item.menu} isOpen={isOpen} setIsOpen={setIsOpen} level={0} />
                </li>
              </Fragment>
            ))
        }
      </ul>
      {/* Centered Lorem Ipsum */}
      <div
        className='absolute w-full text-center logo-wrapper h-[12px]'
        style={{
          top: '30%',
          right: '-7.7%',
          transform: 'translateY(-50%)',
          color: 'black',
          backgroundColor: 'transparent',
          height: '23px',
          zIndex: '100000',
          width: '23px'
        }}
      >
        <div onClick={() => setTogglSidebar(!togglSidebar)} className=' text-[36px] bg-white toggle-sidebar  border hover:shadow duration-100 transition-all ease-linear text-black'>
          {
            togglSidebar ?

              // <FaArrowRightArrowLeft className=' text-sm' size={22} />
              <IoIosArrowForward  size={32} />
              :
              <IoIosArrowBack size={32} />

          }
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;
