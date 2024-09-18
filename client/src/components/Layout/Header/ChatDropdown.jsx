import React from 'react';
import { Link } from 'react-router-dom';
import { H6, UL, LI, P, Image } from '../../AbstractElements';
import { CHAT_DROPDOWN } from '../../../Data/Header/ChatDropdown';
// import msToTime from '../../Utils/helper/msToTime';
import { FiMessageSquare } from 'react-icons/fi';

const ChatDropdown = () => {
  return (
    <UL className='chat-dropdown onhover-show-div'>
      <LI>
        <FiMessageSquare />
        <H6 className='f-18 mb-0'>Message Box </H6>
      </LI>

      {CHAT_DROPDOWN.map((item, i) => (
        <LI key={i}>
          <div className='d-flex'>
            <Image className='img-fluid rounded-circle me-3' src={item.image} alt={item.title} />
            <div className={`status-circle ${item.online ? 'online' : 'offline'}`} />
            <div className='flex-grow-1'>
              <Link to={`${process.env.PUBLIC_URL}/chat/chat`}>
                <span>{item.title}</span>
                <P>{item.subTitle}</P>
              </Link>
            </div>
            {/* <P className={`f-12 ${item.online ? 'font-success' : 'font-danger'} `}>{msToTime(item.time, 'ago')}</P> */}
          </div>
        </LI>
      ))}

      <LI className='text-center'>
        <Link className='btn btn-primary' to={`${process.env.PUBLIC_URL}/chat/chat`}>
          View All
        </Link>
      </LI>
    </UL>
  );
};

export default ChatDropdown;
