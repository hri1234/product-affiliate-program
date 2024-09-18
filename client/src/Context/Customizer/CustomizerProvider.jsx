import React, { useEffect, useState } from 'react';
import ConfigDB from '../../Config/ThemeConfig';
import Context from './index';

const CustomizerProvider = (props) => {
  const customizer = ConfigDB;
  const [sidebar_types, setSidebarTypes] = useState('');
  const [settings, setSettings] = useState('');
  const [layout, setLayout] = useState('');
  const [defaultClass, setDefaultClass] = useState(false);
  const [mix_background_layout, setMixBackgroundLayout] = useState('light-only');
  const [mixLayout, setMixLayout] = useState(false);
  const [sidebarResponsive, setSidebarResponsive] = useState(false);
  const [IsOpen, setIsClose] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [width, setwidth] = useState('');
  const [togglSidebar, setTogglSidebar] = useState(false);


  useEffect(() => {
    setSettings(ConfigDB.settings.sidebar_setting);
    setSidebarTypes(ConfigDB.settings.sidebar.type);
    setLayout(ConfigDB.settings.layout_type);
    setMixBackgroundLayout(ConfigDB.color.mix_background_layout);
  }, [sidebar_types, settings, layout, mix_background_layout]);

  const sideBarToogle = ()=> {
    setTogglSidebar(!togglSidebar)
  }
  const addSidebarTypes = (type) => {
    ConfigDB.settings.sidebar.type = type;
    localStorage.setItem('sidebar_types', type);
    setSidebarTypes(type);
  };

   const addLayout = (layout) => {
     ConfigDB.settings.layout_type = layout;
     localStorage.setItem('layout_type', layout);
     setLayout(layout);
   };


  const addMixBackgroundLayout = (mix_background_layout) => {
    ConfigDB.color.mix_background_layout = mix_background_layout;
    localStorage.setItem('mix_background_layout', mix_background_layout);
    if (mix_background_layout !== 'light-only') {
      setMixLayout(false);
    } else {
      setMixLayout(true);
    }
    setMixBackgroundLayout(mix_background_layout);
  };

  const addColor = (default_color, secondary_color) => {
    localStorage.setItem('default_color', default_color);
    localStorage.setItem('secondary_color', secondary_color);
  };

  const toggleSidebarResponsive = (toggle) => {
    setSidebarResponsive(toggle);
  };

  return (
    <Context.Provider
      value={{
        ...props,
        setwidth,
        width,
        sidebar_types,
        settings,
        layout,
        mix_background_layout,
        mixLayout,
        sidebarResponsive,
        defaultClass,
        IsOpen,
        customizer,
        toggleSearch,
        setToggleSearch,
        setSidebarTypes,
        setDefaultClass,
        setIsClose,
        toggleSidebarResponsive,
        setMixLayout,
        addSidebarTypes: addSidebarTypes,
        addLayout: addLayout,
        addMixBackgroundLayout: addMixBackgroundLayout,
        addColor: addColor,
        togglSidebar, setTogglSidebar,sideBarToogle
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default CustomizerProvider;
