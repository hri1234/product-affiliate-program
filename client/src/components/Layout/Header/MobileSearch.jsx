import React, { useEffect, useState } from 'react';
import { Input, InputGroup } from 'reactstrap';
import { MENU } from '../Sidebar/Menu';
import { AdminMenu } from '../Sidebar/AdminMenu';
import SearchSuggestionList from './SearchSuggestionList';
import { IoSearch } from "react-icons/io5";
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminAssignSearchQuery, SetCustomerAffiliateInput, SetCustomerInvoiceSearchInput, SetDashboardSearchInput, SetDefaultSearchInput, SetInvoiceSearchInput, SetSearchInput, setUserAnalyticsSearchQuery, setUserPageInvoiceQuery } from '../../../Redux/SearchSlice/SearchSlice';
import { useLocation } from 'react-router-dom';

const MobileSearch = () => {
  const [searchMobilOpen, setSearchMobilOpen] = useState(false);
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const tokenData = Cookies.get("isLogged");
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const ReduxData = useSelector((state) => state.SearchSlice);

  const Location = useLocation()

  // const handleSearch = (e) => {
  //   const searchKey = e.target.value.toLowerCase();

  //   if (searchKey !== '') {
  //     let icon;
  //     let suggestionArray = [];
  //     let updatedList = {};

  //     const deepSearchFun = (menuItem, searchKeyValue, mainTitle) => {
  //       if (menuItem.title.toLowerCase().includes(searchKeyValue) && menuItem.url) {
  //         updatedList = { ...menuItem, mainTitle, icon };
  //         suggestionArray.push(updatedList);
  //       }

  //       if (!menuItem.menu) return;

  //       menuItem.menu.map((mainSubItem) => {
  //         if (menuItem.icon) {
  //           icon = menuItem.icon;
  //         }
  //         deepSearchFun(mainSubItem, searchKeyValue, mainTitle);
  //       });
  //     };

  //     if (role === 'admin') {
  //       AdminMenu?.map((mainItem) => {
  //         const mainTitle = mainItem.title;
  //         deepSearchFun(mainItem, searchKey, mainTitle);
  //       });
  //     } else {
  //       MENU?.map((mainItem) => {
  //         const mainTitle = mainItem.title;
  //         deepSearchFun(mainItem, searchKey, mainTitle);
  //       });
  //     }

  //     setSuggestion(suggestionArray);
  //     setSuggestionOpen(true);
  //   }

  //   if (searchKey === '') {
  //     setSuggestionOpen(false);
  //     setSuggestion([]);
  //   }
  // };


  useEffect(() => {
    if (tokenData) {
      let decodedData = jwtDecode(tokenData);
      setRole(decodedData?.role)
    }
  }, [tokenData])


  useEffect(() => {
    // This code runs whenever the URL (location.pathname) changes
    console.log('URL changed:', Location.pathname);
    dispatch(SetDefaultSearchInput(''))
    dispatch(SetSearchInput(''));
    dispatch(SetDashboardSearchInput(''));
    dispatch(SetInvoiceSearchInput(''));


    // Do something with the last segment (e.g., trigger actions, etc.)
  }, [Location.pathname]);


  const handleSearch = (input) => {
    // const locationn= window.location.href?.split('/')[]
    const fullLocation = window.location.pathname
    console.log(fullLocation?.split('/')[0], 'fullLocation');
    const query = input?.target?.value;
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    dispatch(SetDefaultSearchInput(query))
    console.log(lastSegment, 'locationINput');

    if (lastSegment == 'affiliate-links') {

      if (role == 'customer') {
        dispatch(SetCustomerAffiliateInput(query))
      }
      else {
        dispatch(SetSearchInput(query));

      }

      // dispatch(SetDashboardSearchInput(''))
    }
    else if (lastSegment == 'dashboard') {
      console.log('Last segment : dashboard')
      console.log('Last segment : ' + role + 'role')

      if (role == 'customer') {
        dispatch(SetCustomerInvoiceSearchInput(query))
      }
      else {
        dispatch(SetDashboardSearchInput(query));
      }

      // dispatch(SetSearchInput(''));
    }
    else if (fullLocation?.includes('/dashboard/invoice/view')) {
      console.log('View Invoice');
      dispatch(SetInvoiceSearchInput(query));
    }
    else if (lastSegment == 'invoices') {
      dispatch(setUserPageInvoiceQuery(query))
    }
    else if (lastSegment == 'analytics') {
      dispatch(setUserAnalyticsSearchQuery(query))
    }
    else if (fullLocation?.includes('/dashboard/affiliate-links/assign')) {
      dispatch(setAdminAssignSearchQuery(query));
    }
  }


  return (
    <>
      <InputGroup className='input-group w-full'>
        <div className='input-group-prepend w-full flex items-center'>
          <span onClick={() => { setSearchMobilOpen(!searchMobilOpen); setSuggestionOpen(!suggestionOpen) }} className='input-group-text mobile-search'>
            {/* <i className='fa fa-search' /> */}
            <IoSearch />
          </span>
          <Input value={ReduxData?.defaultSearch} onChange={handleSearch} className={searchMobilOpen ? 'open w-full' : ' w-full'} type='text' placeholder='Search' />
        </div>
      </InputGroup>
      {/* {suggestionOpen && <SearchSuggestionList setSuggestionOpen={setSuggestionOpen} suggestion={suggestion} />} */}
    </>
  );
};
export default MobileSearch;
