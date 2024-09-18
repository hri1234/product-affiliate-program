import React, { Fragment, useContext } from 'react';
import { H6, LI, UL } from '../../../../AbstractElements';
import CustomizerContext from '../../../../../Context/Customizer';
import CommenUL from './CommenUL';

const SidebarType = () => {
  const { addSidebarTypes } = useContext(CustomizerContext);
  const handleSidebarType = (e, type) => {
    e.preventDefault();
    addSidebarTypes(type);
  };

  return (
    <Fragment>
      <H6>Sidebar Type</H6>
      <UL className='simple-list sidebar-type layout-grid'>
        <LI data-attr='normal-sidebar' onClick={(e) => handleSidebarType(e, 'horizontal-wrapper')}>
          <div className='header bg-light'>
            <CommenUL />
          </div>
          <div className='body'>
            <UL className='simple-list'>
              <LI className='bg-dark sidebar'></LI>
              <LI className='bg-light body'></LI>
            </UL>
          </div>
        </LI>
        <LI data-attr='compact-sidebar' onClick={(e) => handleSidebarType(e, 'compact-wrapper')}>
          <div className='header bg-light'>
            <CommenUL />
          </div>
          <div className='body'>
            <UL className='simple-list'>
              <LI className='bg-dark sidebar compact'></LI>
              <LI className='bg-light body'></LI>
            </UL>
          </div>
        </LI>
      </UL>
    </Fragment>
  );
};

export default SidebarType;
