import { FiAirplay, FiBarChart, FiBox, FiCalendar, FiCheckSquare, FiClock, FiCloud, FiCommand, FiEdit, FiFileText, FiFilm, FiFolderPlus, FiGitPullRequest, FiHeart, FiHelpCircle, FiHome, FiImage, FiLayers, FiList, FiMail, FiMap, FiMessageCircle, FiMonitor, FiPackage, FiRadio, FiSearch, FiServer, FiShoppingBag, FiSunrise, FiUsers, FiZap } from 'react-icons/fi';
export const AdminMenu = [

  {
    title: '',
    menu: [
      {
        title: 'Partners',
        icon: <FiUsers />,
        url: `/dashboard`,
        bookmark: true
      },
      {
        title: 'Affiliate Links',
        icon: <FiGitPullRequest />,
        url: `/dashboard/affiliate-links`,
        bookmark: true
      },
    //   {
    //     title: 'Affiliate Links',
    //     icon: <FiGitPullRequest />,
    //     url: `affiliate-links`,
    //     bookmark: true
    //   },
    //   {
    //     title: 'Invoices',
    //     icon: <FiFileText />,
    //     url: `${process.env.PUBLIC_URL}invoices`,
    //   },
    //   {
    //     title: 'Analytics',
    //     icon: <FiList />,
    //     url: `analytics`,
    //     bookmark: true
    //   }
    ],
  },
];