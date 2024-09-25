import { FaAngleRight } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import { ActiveNavLinkUrl } from '../../../Utils/helper/ActioveNavUrl';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie'
import CustomizerContext from '../../../Context/Customizer';

const SidebarSubMenu = ({ menu, className, setIsOpen, isOpen, level }) => {
  const { pathname } = useLocation();
  const testToken = Cookies.get("test");
  const { togglSidebar, setTogglSidebar } = useContext(CustomizerContext);

  function shouldSetActive({ item }) {
    var returnValue = false;
    if (item?.url === pathname) {
      returnValue = true;
    }
    if (!returnValue && item?.menu) {
      item?.menu.every((subItem) => {
        returnValue = shouldSetActive({ item: subItem });
        return !returnValue;
      });
    }
    return returnValue;
  }
  useEffect(() => {
    menu.forEach((item) => {
      let gotValue = shouldSetActive({ item });
      if (gotValue) {
        let temp = isOpen;
        temp[level] = item.title;
        setIsOpen(temp);
      }
    });
  }, [testToken]);

  return (
    <ul className={` ${className ? className : ''}`}>
      {menu.map((item, i) => (
        <li key={i} className={` ${className ? '' : 'sidebar-list'} ${(item.menu ? item.menu.map((innerItem) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || isOpen[level] === item.title ? 'active' : ''} `}>
          <Link
            style={{ textDecoration: 'none' }}
            className={`${className ? '' : 'sidebar-link sidebar-title'}  ${(item.menu ? item.menu.map((innerItem) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || isOpen[level] === item.title ? 'active' : ''}`}
            to={item.url ? item.url : '#javascript'}
            onClick={() => {
              const temp = isOpen;
              temp[level] = item.title !== temp[level] && item.title;
              setIsOpen(temp);
            }}>
            <div className='d-flex align-items-center whitespace-nowrap justify-center' >
              {item.icon && item.icon}
              {
                !togglSidebar &&
                  <span style={{ color: 'black' }} className='sidebar-title-alignment border-none text-black'>{item.title}</span>
              }
            </div>
            {item.menu && (
              <span className='sub-arrow'>
                <FaAngleRight />
              </span>
            )}
          </Link>

          {item.menu && <SidebarSubMenu menu={item.menu} isOpen={isOpen} setIsOpen={setIsOpen} level={level + 1} className='sidebar-submenu' />}
        </li>
      ))}
    </ul>
  );
};
export default SidebarSubMenu;
