import React from 'react';
import { Col } from 'reactstrap';
import MobileSearch from './MobileSearch';

const SearchWrapper = () => {
  return (
    <Col className='left-header w-full horizontal-wrapper ps-0'>
      <MobileSearch />
    </Col>
  );
};

export default SearchWrapper;
