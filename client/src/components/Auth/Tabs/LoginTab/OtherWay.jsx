import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';
import { Link } from 'react-router-dom';
import { FormGroup } from 'reactstrap';
import { H6, P, UL, LI } from '../../../AbstractElements';

const OtherWay = () => {
  return (
    <>
      <div className='login-social-title'>
        <H6 className='text-muted or mt-4'>Or Sign up with</H6>
      </div>
      <div className='social my-4 '>
        <FormGroup className='form-group'>
          <UL className='login-social d-flex flex-row simple-list'>
            <LI>
              <a href='https://www.google.com/'>
                <Linkedin className=' me-0' />
              </a>
            </LI>
            <LI>
              <a href='https://twitter.com/'>
                <Twitter className='me-0' />
              </a>
            </LI>
            <LI>
              <a href='https://www.facebook.com/'>
                <Facebook className='me-0' />
              </a>
            </LI>
            <LI>
              <a href='https://www.instagram.com/'>
                <Instagram className='me-0' />
              </a>
            </LI>
          </UL>
        </FormGroup>
      </div>
      <P className='text-center mb-0 '>
        Don't have account?
        <Link className='ms-2 text-[#3E5FCE]' to={`${process.env.PUBLIC_URL}/register`}>
          Create Account
        </Link>
      </P>
    </>
  );
};

export default OtherWay;
