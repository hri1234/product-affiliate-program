import React, { useEffect, useState } from 'react';
import { Input, InputGroup } from 'reactstrap';
import { MENU } from '../Sidebar/Menu';
import { AdminMenu } from '../Sidebar/AdminMenu';
import SearchSuggestionList from './SearchSuggestionList';
import { IoSearch } from "react-icons/io5";
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

const MobileSearch = () => {
  const [searchMobilOpen, setSearchMobilOpen] = useState(false);
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const tokenData = Cookies.get("isLogged");
  const [role, setRole] = useState('')


  // const handleSearch = (e) => {
  //   const searchKey = e.target.value;
  //   searchKey.toLowerCase();

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
  //       // eslint-disable-next-line array-callback-return
  //       menuItem.menu.map((mainSubItem) => {
  //         if (menuItem.icon) {
  //           icon = menuItem.icon;
  //         }

  //         deepSearchFun(mainSubItem, searchKeyValue, mainTitle);
  //       });
  //     };

  //     // eslint-disable-next-line array-callback-return
  //     role == 'admin'
  //       ?
  //       <>
  //         {

  //           AdminMenu?.map((mainItem) => {
  //             const mainTitle = mainItem.title;
  //             deepSearchFun(mainItem, searchKey, mainTitle);
  //           });
  //         setSuggestion(suggestionArray);
  //         setSuggestionOpen(true);
  //       }
  //       </>

  //       : <>
  //         {
  //                MENU?.map((mainItem) => {
  //                 const mainTitle = mainItem.title;
  //                 deepSearchFun(mainItem, searchKey, mainTitle);
  //               });
  //             setSuggestion(suggestionArray);
  //             setSuggestionOpen(true);
  //         }
  //       </>

  //   }

  //   if (searchKey === '') {
  //     setSuggestionOpen(false);
  //     setSuggestion([]);
  //   }
  // };
  const handleSearch = (e) => {
    const searchKey = e.target.value.toLowerCase();
  
    if (searchKey !== '') {
      let icon;
      let suggestionArray = [];
      let updatedList = {};
  
      const deepSearchFun = (menuItem, searchKeyValue, mainTitle) => {
        if (menuItem.title.toLowerCase().includes(searchKeyValue) && menuItem.url) {
          updatedList = { ...menuItem, mainTitle, icon };
          suggestionArray.push(updatedList);
        }
  
        if (!menuItem.menu) return;
  
        menuItem.menu.map((mainSubItem) => {
          if (menuItem.icon) {
            icon = menuItem.icon;
          }
          deepSearchFun(mainSubItem, searchKeyValue, mainTitle);
        });
      };
  
      if (role === 'admin') {
        AdminMenu?.map((mainItem) => {
          const mainTitle = mainItem.title;
          deepSearchFun(mainItem, searchKey, mainTitle);
        });
      } else {
        MENU?.map((mainItem) => {
          const mainTitle = mainItem.title;
          deepSearchFun(mainItem, searchKey, mainTitle);
        });
      }
  
      setSuggestion(suggestionArray);
      setSuggestionOpen(true);
    }
  
    if (searchKey === '') {
      setSuggestionOpen(false);
      setSuggestion([]);
    }
  };
  

  useEffect(() => {
    if (tokenData) {
      let decodedData = jwtDecode(tokenData);
      setRole(decodedData?.role)
    }
  }, [tokenData])
  return (
    <>
      <InputGroup className='input-group w-full'>
        <div className='input-group-prepend w-full flex items-center'>
          <span onClick={() => { setSearchMobilOpen(!searchMobilOpen); setSuggestionOpen(!suggestionOpen) }} className='input-group-text mobile-search'>
            {/* <i className='fa fa-search' /> */}
            <IoSearch />
          </span>
          <Input onChange={handleSearch} className={searchMobilOpen ? 'open w-full' : ' w-full'} type='text' placeholder='Search' />
        </div>
      </InputGroup>
      {suggestionOpen && <SearchSuggestionList setSuggestionOpen={setSuggestionOpen} suggestion={suggestion} />}
    </>
  );
};
export default MobileSearch;
