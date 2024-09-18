import React, { Fragment, useState, useCallback } from 'react';
import { TabContent, TabPane } from 'reactstrap';
import { Btn, H5, P } from '../../AbstractElements';
import { Configuration, PreviewSettings, TryItRealTime } from '../../Constant';
import ConfigurationClass from './ConfigurationClass';
import ColorPicker from './Tabs/ColorPicker/index';
import SidebarCusmizer from './Tabs/Sidebar';
import { RxCross2 } from "react-icons/rx";

const TabCustomizer = ({ selected, callbackNav }) => {
  const [modal, setModal] = useState(false);
  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  return (
    <Fragment>
      <TabContent activeTab={selected} id='c-pills-tabContent'>
        <div className='customizer-header'>
          {/* <i className='icofont-close icon-close' onClick={() => callbackNav(false)}>X</i> */}
          <div onClick={() => callbackNav(false)} className=' cursor-pointer w-full flex justify-between flex-row-reverse'>
            <RxCross2 size={22} />
            <H5>{PreviewSettings}</H5>
          </div>
          {/* <P className='mb-0'>
            {TryItRealTime} <i className='fa fa-thumbs-o-up txt-primary'></i>
          </P>
          <Btn color='primary' className='plus-popup mt-2' onClick={() => toggle(!modal)}>
            {Configuration}
          </Btn>
          <ConfigurationClass modal={modal} toggle={toggle} /> */}
        </div>
        <div className='customizer-body custom-scrollbar tab-content'>
          <TabPane tabId='sidebar-type'>
            <SidebarCusmizer />
          </TabPane>
          <TabPane tabId='color-picker'>
            <ColorPicker />
          </TabPane>
        </div>
      </TabContent>
    </Fragment>
  );
};

export default TabCustomizer;
