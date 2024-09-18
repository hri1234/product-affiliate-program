import React from 'react';
import { FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { UL, LI, H6, P } from '../../AbstractElements';
import { NOTIFICATION } from '../../../Data/Header/Notification';
// import msToTime from '../../Utils/helper/msToTime';

const NotificationDropdown = () => {
  return (
    <UL className='notification-dropdown onhover-show-div'>
      <LI>
        <FiBell />
        <H6 className='h6 f-18 mb-0'>Notifications</H6>
      </LI>
      {NOTIFICATION.map((item, i) => (
        <LI key={i}>
          <Link to={`${process.env.PUBLIC_URL}/email/email-read`}>
            <P>
              <i className={`fa fa-circle-o me-3 font-${item.fontColor}`}></i>
              {item.title}
              {/* <span className='pull-right'>{msToTime(item.time)}</span> */}
            </P>
          </Link>
        </LI>
      ))}

      <LI>
        <Link className='btn btn-primary' to={`${process.env.PUBLIC_URL}/email/email-read`}>
          Check all notification
        </Link>
      </LI>
    </UL>
  );
};

export default NotificationDropdown;
