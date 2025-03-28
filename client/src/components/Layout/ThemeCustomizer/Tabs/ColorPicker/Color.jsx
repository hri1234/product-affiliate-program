import React, { useContext, Fragment, useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import { Btn, H6, UL } from '../../../../AbstractElements';
import ConfigDB from '../../../../../Config/ThemeConfig';
import { Apply, UnlimitedColor } from '../../../../../Constant';
import CustomizerContext from '../../../../../Context/Customizer';

const ColorsComponent = () => {
  const { addColor } = useContext(CustomizerContext);
  const default_color = localStorage.getItem('default_color') || ConfigDB.color.primary_color;
  const secondary_color = localStorage.getItem('secondary_color') || ConfigDB.color.secondary_color;

  const [colorBackground1, setColorBackground1] = useState(default_color);
  const [colorBackground2, setColorBackground2] = useState(secondary_color);

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-default', colorBackground1);
    document.documentElement.style.setProperty('--theme-secondary', colorBackground2);
  }, [colorBackground1, colorBackground2]);

  const handleUnlimatedColor1Change = (e) => {
    const { value } = e.target;
    setColorBackground1(value);
  };
  const handleUnlimatedColor2Change = (e) => {
    const { value } = e.target;
    setColorBackground2(value);
  };
  const OnUnlimatedColorClick = () => {
    addColor(colorBackground1, colorBackground2);
    document.documentElement.style.setProperty('--theme-default', colorBackground1);
    document.documentElement.style.setProperty('--theme-secondary', colorBackground2);
  };

  return (
    // <Fragment>
    //   <H6>{UnlimitedColor}</H6>
    //   <UL className='simple-list flex-row layout-grid unlimited-color-layout'>
    //     <Input type='color' name='Color-Background1' value={colorBackground1} onChange={(e) => handleUnlimatedColor1Change(e)} />
    //     <Input type='color' name='Color-Background2' value={colorBackground2} onChange={(e) => handleUnlimatedColor2Change(e)} />
    //     <Btn color='primary' className='color-apply-btn color-apply-btn' onClick={OnUnlimatedColorClick}>
    //       {Apply}
    //     </Btn>
    //   </UL>
    // </Fragment>
    <>
    </>
  );
};

export default ColorsComponent;
