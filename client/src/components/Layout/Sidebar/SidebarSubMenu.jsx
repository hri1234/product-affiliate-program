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

  const shouldSetActive = ({ item }) => {
    if (item?.url === pathname) return true;
    if (item?.menu) {
      return item.menu.some((subItem) => shouldSetActive({ item: subItem }));
    }
    return false;
  }

  useEffect(() => {
    menu.forEach((item) => {
      if (shouldSetActive({ item })) {
        setIsOpen({ ...isOpen, [level]: item.title });
      }
    });
  }, [testToken, menu, isOpen, level]);

  return (
    <ul className={className}>
      {menu.map((item, i) => (
        <li key={i} className={`sidebar-list ${shouldSetActive({ item }) || isOpen[level] === item.title ? 'active' : ''}`}>
          <Link
            style={{ textDecoration: 'none' }}
            className={`sidebar-link sidebar-title ${shouldSetActive({ item }) || isOpen[level] === item.title ? 'active' : ''}`}
            to={item.url || '#javascript'}
            onClick={() => setIsOpen({ ...isOpen, [level]: item.title !== isOpen[level] ? item.title : '' })}
          >
            <div className='d-flex align-items-center whitespace-nowrap justify-center'>
              {item.icon}
              {!togglSidebar && <span className='sidebar-title-alignment'>{item.title}</span>}
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