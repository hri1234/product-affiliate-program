import React, { useState } from 'react';
import { FiMaximize } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Maximize = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenToggleHandler = (e) => {
    e.preventDefault();
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreen(!fullScreen);
    } else {
      document.documentElement.requestFullscreen();
      setFullScreen(!fullScreen);
    }
  };
  
  return (
    <Link className='text-dark' to='#javascript' onClick={fullScreenToggleHandler}>
      <FiMaximize />
    </Link>
  );
};

export default Maximize;
