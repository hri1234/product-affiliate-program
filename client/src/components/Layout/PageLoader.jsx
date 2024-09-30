import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import LoadingImage from '../../Assets/logo/loading-7528_512.gif'

const PageLoader = ({ set, value }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            set(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [value]);
    return (
        <Fragment>
            {value && (
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

export default PageLoader;
