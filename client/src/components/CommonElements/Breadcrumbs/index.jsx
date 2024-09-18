import React from 'react';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { BreadcrumbItem, Breadcrumb, Col, Row } from 'reactstrap';
import { H3 } from '../../AbstractElements';

const Breadcrumbs = (props) => {
  const { parent = '', title = '', pageTitle = '' } = props;
  return (
    <div className='page-title'>
      <Row>
        <Col sm='6'>
          <H3>{pageTitle}</H3>
        </Col>
        <Col sm='6'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to={`${process.env.PUBLIC_URL}/dashboard/`}>
                <FiHome />
              </Link>
            </BreadcrumbItem>
            {parent !== '' && <BreadcrumbItem>{parent}</BreadcrumbItem>}
            <BreadcrumbItem active>{title}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    </div>
  );
};

export default Breadcrumbs;
