import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Row } from 'reactstrap';
import { Btn, H5 } from '../../components/AbstractElements';
import { and, CustomStyles, CustomstyleText, CustomstyleText2, CustomstyleText3, CustomstyleText4, CustomstyleText5, form, invalid, novalidate, SubmitForm, TermsText, valid } from '../../Constant/index';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import InputComponent from '../../components/InputComponent';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PasswordUpdate from './PasswordUpdate';
import { useUpdateProfileMutation } from '../../services/ProfileService';
import toast from 'react-hot-toast';
// import { useGetProfileDataQuery } from '../../services/AuthServices';

function Profile({ listData, loading }) {

  const options = useMemo(() => countryList().getData(), []);
  const [UpdateProfile] = useUpdateProfileMutation();
  const [submitLoading, setSubmitLoading] = useState(false);


  console.log(submitLoading, 'SubmitLoading')

  console.log(listData, 'listDataProf');
  const previousCountryName = listData?.country;
  const previousCountryCode = useMemo(() => countryList().getValue(previousCountryName || ""));
  const PreviousCountryData = { value: previousCountryCode, label: previousCountryName }

  console.log(PreviousCountryData, 'prevData of Country')


  const initialValues = {
    email: listData?.email,
    payPalAddress: listData?.paypalAddress,
    country: PreviousCountryData?.label != undefined ? PreviousCountryData : null,
    city: listData?.city || '',
    address: listData?.address || '',
    companyName: listData?.companyName || '',
    // companyNumber: listData?.companyNumber || '',
    companyUrl: listData?.companyUrl || '',
  };

  const validationSchema = yup.object().shape({
    payPalAddress: yup.string().trim("Enter valid PayPal address").required("PayPal address is required").email("PayPal address must be valid")
      .test('is-valid-email', 'PayPal address must be valid', value => {
        if (!value) return false; // Ensure it's not empty
        // Use a regex to validate email format more strictly if needed
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    country: yup.object().shape({
      label: yup.string().required("Country is required"),
      value: yup.string().required("Country is required")
    }).nullable().required("Country is required"),
    city: yup.string().trim("Enter valid city").required("City is required").strict(),
    address: yup.string().trim("Enter valid address").required("Address is required").strict(),
    companyName: yup.string().trim("Enter valid companyName").required("Company name is required").strict(),
    companyUrl: yup.string().url("Enter a valid company url").trim("Enter valid company url").required("Company url is required").strict(),
    // companyNumber: yup.string().trim("Enter valid number").min(10, "Enter valid number").max(10, "Enter valid number").required("number is required"),
  });

  const handleSubmit = (data) => {

    setSubmitLoading(true);
    console.log('Handle profile submit')

    let DataForApi = {
      "paypalAddress": data?.payPalAddress,
      "country": data?.country?.label,
      "city": data?.city,
      "address": data?.address,
      "companyName": data?.companyName,
      // "companyNumber": data?.companyNumber,
      "companyUrl": data?.companyUrl,
    }

    console.log(DataForApi, 'submitData');

    UpdateProfile({ data: DataForApi })
      .then((res) => {
        if (res.error) {
          toast.error(res?.error?.data?.error || "Internal server error");
          setSubmitLoading(false)
        }
        else {
          console.log(res, 'res');
          toast.success("Profile updated ");
          setSubmitLoading(false)
        }
      })
      .catch((err) => {
        console.log(err, 'err');
        toast.error("Internal server error");
        setSubmitLoading(false)
      })
  };


  return (
    <div className=' pt-[2px]'>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {
          (profileProps) =>
          (
            <Form>
              {
                loading ?
                  <div className=' w-full flex items-center justify-center'>
                    <span className=' w-fit flex py-1 items-center justify-center m-auto self-center animate-spin'>
                      <AiOutlineLoading3Quarters />
                    </span>
                  </div>
                  :
                  <>
                    <p className='text-[20px] font-semibold mb-3 pb-2'>Profile</p>
                    <Fragment>
                      <Card className=' w-full'>
                        {/* <CardHeader className='pb-0'>
                        <H5>Profile Update</H5>
                      </CardHeader> */}
                        <div className='pb-0 pt-4 px-[26px]'>
                          <span className='text-[20px]'>
                            Profile Update
                          </span>
                        </div>
                        <CardBody>
                          <Row className='g-3 pb-3'>
                            <Col md='6'>
                              {/* <InputControl controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter First Name *' register={{ ...register('first_name', { required: 'is Required.' }) }} /> */}
                              {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, in! */}
                              <InputComponent label={"Email Address"} type="text" name='email' value={profileProps.values.email} placeholder='Enter email address' disabled="true" />
                            </Col>
                            <Col md='6'>
                              {/* <InputControl controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter First Name *' register={{ ...register('first_name', { required: 'is Required.' }) }} /> */}
                              {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, in! */}
                              <InputComponent label={"PayPal Address"} type="text" name='payPalAddress' value={profileProps.values.payPalAddress} placeholder='Enter paypal address' onChange={profileProps.handleChange} />
                            </Col>

                            {/* <Col md='4 mb-3'>
                            <InputComponent label={"Address"} type={"text"} value={profileProps.values.address} name='address' onChange={profileProps.handleChange} placeholder={"Enter your address"} />
                          </Col> */}
                          </Row>
                          <Row className='g-3 pb-3'>
                            <Col md='6'>
                              {/* <InputControl controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter Last Name *' register={{ ...register('last_name', { required: 'is Required.' }) }} /> */}
                              {/* Inp control Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolorum. */}
                              <InputComponent label={"City"} type={"text"} value={profileProps.values.city} name='city' onChange={profileProps.handleChange} placeholder={"Enter city name"} />

                            </Col>
                            <Col md='6'>
                              {/* <InputControl controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter City Name *' register={{ ...register('city', { required: 'is Required.' }) }} /> */}
                              {/* City */}
                              <InputComponent label={"Company Name"} type={"text"} value={profileProps.values.companyName} name='companyName' onChange={profileProps.handleChange} placeholder={"Enter company name"} />

                            </Col>



                          </Row>
                          <Row className='g-3'>
                            <Col md='6 mb-3'>
                              <InputComponent label={"Address"} type={"text"} value={profileProps.values.address} name='address' onChange={profileProps.handleChange} placeholder={"Enter address"} />
                            </Col>
                            <Col md='6'>
                              {/* <InputControl controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter First Name *' register={{ ...register('first_name', { required: 'is Required.' }) }} /> */}
                              {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, in! */}
                              {/* <InputComponent label={"PayPal address"} type="text" name='payPalAddress' value={profileProps.values.payPalAddress} placeholder='Enter your paypal address' onChange={profileProps.handleChange} /> */}
                              <div className=' relative'>
                                <span className=' pl-[3px] font-semibold text-[13px]'>{"Country"}</span>
                                <Select
                                  placeholder="Select Country"
                                  options={options}
                                  name="country"
                                  value={profileProps.values.country}
                                  // value={[{value:"IN",label:'India'}]}
                                  onChange={value => profileProps.setFieldValue('country', value)}
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderRadius: '8px', // Add border-radius
                                      border: '1px solid rgb(222, 226, 230)', // Default border color
                                      fontSize: '14px',
                                      letterSpacing: '.8px',
                                      boxShadow: 'none', // Remove box-shadow entirely
                                      borderColor: 'rgb(222, 226, 230)', // Keep border consistent on focus/hover
                                      '&:hover': {
                                        borderColor: 'rgb(222, 226, 230)', // Gray border on hover
                                      },
                                    }),
                                    indicatorSeparator: () => ({
                                      display: 'none', // Hide the line near the arrow button
                                    }),
                                  }}
                                />
                                <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px]  mt-0' name={"country"} component='div' />
                              </div>
                            </Col>
                          </Row>
                          <Row className='g-3'>
                            <Col md='6'>
                              <InputComponent label={"Company URL"} type={"text"} value={profileProps.values.companyUrl} name='companyUrl' onChange={profileProps.handleChange} placeholder={"Enter company URL"} />
                            </Col>
                          </Row>

                          <div className="position-relative form-group mb-0 w-[120px]">
                            <button className=" bg-black text-white w-[120px] py-[6.5px] border w-100 mt-4 rounded-full" type="submit">
                              {
                                submitLoading ?
                                  <span className=' w-full flex py-1  items-center justify-center m-auto self-center animate-spin'>
                                    <AiOutlineLoading3Quarters />
                                  </span>
                                  :
                                  "Update"
                              }
                            </button>
                          </div>
                        </CardBody>
                      </Card>
                    </Fragment>
                  </>

              }

            </Form>
          )
        }
        {/* Profile Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt veniam velit porro fugit nulla eligendi iusto veritatis nemo quod! Veniam quia aperiam omnis repellendus, pariatur molestias inventore perferendis ullam magni consequuntur amet repudiandae. Porro debitis perspiciatis modi excepturi ipsa soluta odio cumque provident sapiente sint fugit temporibus, culpa, harum dolor. */}
      </Formik>
      <PasswordUpdate loading={loading} />
    </div>
  )
}

export default Profile;