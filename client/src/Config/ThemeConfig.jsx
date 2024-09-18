const ConfigDB = {
  settings: {
    layout_type: 'ltr',
    layout: 'Dubai',
    sidebar: {
      type: localStorage.getItem('sidebar_types') ?? 'compact-wrapper',
    },
    sidebar_setting: 'default-sidebar',
  },
  color: {
    primary_color: localStorage.getItem('default_color') ?? '#3e5fce',
    secondary_color: localStorage.getItem('secondary_color') ?? 'white',
    mix_background_layout: 'light-only',
  },
  router_animation: 'fadeIn',
};

export default ConfigDB;
