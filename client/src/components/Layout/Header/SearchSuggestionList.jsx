import React from 'react';
import { Link } from 'react-router-dom';
import { UL, LI, P } from '../../AbstractElements';
import Cookies from 'js-cookie'

const SearchSuggestionList = ({ setSuggestionOpen, suggestion }) => {
  const handleLinkClick = () => {
    setSuggestionOpen(false);
  };
  return (
    <div className='suggestion-box '>
      {suggestion.length !== 0 && (
        <UL className='custom-scrollbar '>
          {suggestion.map((item, i) => (
            <LI key={i}>
              <Link style={{textDecoration:'none'}} onClick={()=>{handleLinkClick(); Cookies.set("test",'')}} to={item.url} className='d-flex align-items-center gap-1'>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </LI>
          ))}
        </UL>
      )}
      {!suggestion.length && <P>No page found</P>}
    </div>
  );
};

export default SearchSuggestionList;