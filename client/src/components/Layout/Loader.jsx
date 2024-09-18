import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import LoadingImage from '../../Assets/logo/loading-7528_512.gif'

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    <Fragment>
      {show && (
        // <div className='loader-wrapper'>
        //   <div className='loader' />
        // </div>
        <span className='loader-wrapper'>
          <img src={LoadingImage} height={50} width={50} alt="" />
        </span>
      )}
    </Fragment>
  );
};

export default Loader;
