import React, { Fragment, useEffect, useContext, useState } from 'react';
import { H6, LI, UL } from '../../../../AbstractElements';
import { MixLayout } from '../../../../../Constant';
import CustomizerContext from '../../../../../Context/Customizer';
import CommenUL from '../Sidebar/CommenUL';

const MixLayoutComponent = () => {
  const { addMixBackgroundLayout, mix_background_layout, setMixLayout } = useContext(CustomizerContext);
  const mixLayout = localStorage.getItem('mix_background_layout') || mix_background_layout;
  const [tabvalue, setTabvalue] = useState(1);
  useEffect(() => {
    if (mixLayout !== 'light-only') {
      setMixLayout(false);
    } else {
      setMixLayout(true);
    }
    document.body.classList.add(mixLayout);
  }, [mixLayout]);

  const handleCustomizerMix_Background = (value) => {
    addMixBackgroundLayout(value);
    if (value === 'light-only') {
      document.body.classList.add('light-only');
      document.body.classList.remove('dark-sidebar');
      document.body.classList.remove('dark-only');
    } else if (value === 'dark-sidebar') {
      document.body.classList.remove('light-only');
      document.body.classList.add('dark-sidebar');
      document.body.classList.remove('dark-only');
    } else if (value === 'dark-only') {
      document.body.classList.remove('light-only');
      document.body.classList.remove('dark-sidebar');
      document.body.classList.add('dark-only');
    }
  };
  return (
    <Fragment>
      <H6 className=''>{MixLayout}</H6>
      <UL className='simple-list  layout-grid flex-col flex gap-5 customizer-mix'>
        <LI
          className={`color-layout border ${tabvalue === 1 ? 'active' : ''}`}
          data-attr='light-only'
          onClick={() => {
            handleCustomizerMix_Background('light-only');
            setTabvalue(1);
          }}>
          <div className='header bg-light'>
            <CommenUL />
          </div>
          <div className='body'>
            <UL className='simple-list flex-row'>
              <LI className='bg-light sidebar'></LI>
              <LI className='bg-light body'> </LI>
            </UL>
          </div>
        </LI>
        <LI
          className={`color-layout border ${tabvalue === 2 ? 'active' : ''}`}
          dataattr='dark-sidebar'
          onClick={() => {
            handleCustomizerMix_Background('dark-sidebar');
            setTabvalue(2);
          }}>
          <div className='header bg-light'>
            <CommenUL />
          </div>
          <div className='body'>
            <UL className='simple-list flex-row'>
              <LI className='bg-dark sidebar'></LI>
              <LI className='bg-light body'> </LI>
            </UL>
          </div>
        </LI>
        {/* <LI
          className={`color-layout border ${tabvalue === 3 ? 'active' : ''}`}
          dataattr='dark-only'
          onClick={() => {
            handleCustomizerMix_Background('dark-only');
            setTabvalue(3);
          }}>
          <div className='header bg-dark'>
            <CommenUL />
          </div>
          <div className='body'>
            <UL className='simple-list flex-row'>
              <LI className='bg-dark sidebar'></LI>
              <LI className='bg-dark body'> </LI>
            </UL>
          </div>
        </LI> */}
      </UL>
    </Fragment>
  );
};

export default MixLayoutComponent;
