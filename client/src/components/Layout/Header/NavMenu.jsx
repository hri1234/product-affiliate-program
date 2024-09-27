import React from 'react';

import Maximize from './Maximize';
import ProfileBox from './ProfileBox';
import ChatDropdown from './ChatDropdown';
import ProfileBoxDropdown from './ProfileboxDropdown';
import NotificationDropdown from './NotificationDropdown';
import { UL, LI, Badges } from '../../AbstractElements';
import DarkButton from './DarkButton';
import Bookmarks from './Bookmark';

const NavMenu = () => {
  return (
    <UL className='nav-menus'>
      <div className=' flex gap-6 items-center'>
        {/* <LI className='maximize border-0 rounded cursor-pointer h-fit p-2 w-fit bg-[#F6F8FC]'>
          <Maximize />
        </LI> */}
        <LI className='border-0 flex flex-col items-center justify-center gap-0 mr-[6.5px]  profile-nav onhover-dropdown p-0 me-0'>
          <ProfileBox />
          <ProfileBoxDropdown />
        </LI>
      </div>
    </UL>
  );
};

export default NavMenu;