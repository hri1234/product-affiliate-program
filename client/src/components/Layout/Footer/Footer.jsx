import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Col, Container, Row } from 'reactstrap';
import { P, UL, LI } from '../../AbstractElements';
import { Copyright, HandCraftedMadeWith } from '../../Constant';
 
export default function Footer() {
  return (
    <footer className='footer'>
      <Container fluid={true}>
        <Row>
          <Col md='6' className='p-0 footer-left'>
            <P className='mb-0'>{Copyright}</P>
          </Col>
          <Col md='6' className='p-0 footer-right'>
            <UL className='color-varient'>
              <LI />
              <LI />
              <LI />
              <LI />
            </UL>
            <P className='mb-0 ms-3 d-flex align-items-center gap-1'>
              {HandCraftedMadeWith}
              <FaHeart className='font-danger' />
            </P>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
