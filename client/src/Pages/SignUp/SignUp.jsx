import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import { FormGroup, Input, Label } from "reactstrap";
import { Btn, H4, H6, P, Image } from "../../components/AbstractElements";
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import { H, UL, LI } from '../../components/AbstractElements';
import * as yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import InputComponent from '../../components/InputComponent';
import countryList from 'react-select-country-list';
// import { Select } from '../../components/Constant';
import Select from 'react-select'
import { useRegisterMutation } from '../../services/AuthServices';
import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast';
import LoginBanner from '../../Assets/loginBanner.png';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import demoBanner from '../../Assets/logo/Invasion of Privacy (69_365).png';
// import Banner from '../../Assets/logo/banner2.png';
import Banner from '../../Assets/logo/new-banner01.jpg'

function SignUp() {

  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), []);
  const [Register] = useRegisterMutation();
  let isLogged = Cookies.get("isLogged");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");
  const [toasterMessage, setToasterMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);



  const changeHandler = value => {
    console.log(value, 'country')
    setValue(value)
  }

  const [loading, setLoading] = useState(false)



  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard/');
    }
  }, [isLogged]);

  const initialValues = {
    email: '',
    payPalAddress: '',
    country: null,
    city: '',
    address: '',
    companyName: '',
    // companyNumber: '',
    companyUrl: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = yup.object().shape({
    email: yup.string().trim("Enter valid email").required("Email is required").email("Email must be a valid email")
      .test('is-valid-email', 'Email must be a valid email', value => {
        if (!value) return false; // Ensure it's not empty
        // Use a regex to validate email format more strictly if needed
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    payPalAddress: yup.string().trim("Enter valid PayPal address").required("PayPal address is required").email("PayPal address must be valid")
      .test('is-valid-email', 'PayPal address must be valid', value => {
        if (!value) return false; // Ensure it's not empty
        // Use a regex to validate email format more strictly if needed
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    // country: yup.string().trim("Enter valid country").required("country is required").strict(),
    country: yup.object().shape({
      label: yup.string().required("Country is required"),
      value: yup.string().required("Country is required")
    }).nullable().required("Country is required"),
    city: yup.string().trim("Enter valid city").required("City is required").strict(),
    address: yup.string().trim("Enter valid address").required("Address is required").strict(),
    companyName: yup.string().trim("Enter valid company name").required("Company name is required").strict(),
    companyUrl: yup.string().url("Enter a valid website url").trim("Enter valid website url").required("Website url is required").strict(),
    // companyNumber: yup.string().trim("Enter valid number").min(10, "Enter valid number").max(10, "Enter valid number").required("number is required"),
    password: yup.string().trim("Enter valid password").min(6, "Minimum 6 characters required").required("Password is required").strict(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').trim("Enter valid confirm password").required("Confirm password is required").strict(),
  });

  const handleSubmit = (data, { resetForm }) => {
    if (!isChecked) {
      setToasterMessage('Please accept terms & conditon')
    }
    else {
      console.log('checked')
      setToasterMessage('')
      console.log(data, 'register data');
      let registerData = {
        "email": data?.email,
        "paypalAddress": data?.payPalAddress,
        "country": data?.country.label,
        "city": data?.city,
        "address": data?.address,
        "companyName": data?.companyName,
        // "companyNumber": data?.companyNumber,
        "companyUrl": data?.companyUrl,
        "password": data?.password,
        // "role":"admin"
      }
      setToasterMessage('')
      Register({ data: registerData })
        .then((res) => {
          if (res.error) {
            setToasterMessage(res?.error?.data?.error || res?.error?.data?.message === "Email Already Exist." && "Email is already registered")
            // toast.error(res.error?.data?.message);
          }
          else {
            resetForm();
            toast.success("You have successfully signed up! Please log in to continue.");
            navigate('/login');
            console.log(res.data?.result, 'register res');
            setToasterMessage('')
          }
        })
        .catch((err) => {
          console.log(err, 'catch err');
          setToasterMessage("Something went Wrong")
        })
    }
    setLoading(true);



    // LoginUser({ data: loginData })
    //   .then((res) => {
    //     setLoading(false)
    //     if (res?.data) {
    //       if (data?.rememberMe) {
    //         Cookies.set("AuthLogin", `${res?.data?.result?.accessToken}`, { expires: 30 });
    //         Cookies.set("AuthData", JSON.stringify(data), { expires: 30 });
    //       }
    //       else {
    //         var in30Minutes = 1 / 48;
    //         Cookies.set("AuthLogin", `${res?.data?.result?.accessToken}`, { expires: in30Minutes });
    //         Cookies.set("AuthData", JSON.stringify(data), { expires: in30Minutes });

    //       }
    //       dispatch(setLoginData(data))
    //       Cookies.set("isLogged", `${res?.data?.result?.accessToken}`, { expires: 30 });
    //       Cookies.set("isChecked", JSON.stringify(data), { expires: 30 });
    //       // localStorage.setItem('IsUserLogged', JSON.stringify(data))
    //       // toast.success("Login Successfull")
    //       navigate('/dashboard')
    //     } else if (res?.error) {
    //       toast.error(res?.error?.data?.message || "Internal server error");
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     toast.error(err.response.data.message || "Internal server error");
    //   });
  };
  return (
    <>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(signupProps) => {
          const handleInputChange = (e) => {
            signupProps.handleChange(e);
            setToasterMessage('');
          };
          return (
            <Form>
              <Container fluid={true} className="p-0 w-full m-0 pt-4  bg-slate-50">
                <Row>
                  <Col xs="12">
                    <div className="login-card flex-column">
                      <div className=" w-full flex items-center justify-center login-tab">
                        <div className="  bg-white w-[78%] border shadow-md rounded-[10px] py-6 px-6 flex md:flex-row flex-col-reverse gap-8">
                          <div className=" w-full md:w-[50%] mt-1 px-3">
                            <div className="theme-form flex flex-col gap-3 p-1">
                              <div className=' flex flex-col gap-3'>
                                {/* <Image
                                className="img-fluid for-light mx-auto h-[65px] w-[65px]"
                                src={require("../../Assets/logo/itg_logo.webp")}
                              /> */}
                                <H4 className="text-center font-semibold text-2xl"> Sign Up</H4>
                              </div>
                              <P className="text-center">Join our affiliate program now and turn your referrals into rewards</P>
                              {/* <span className='m-auto'>Join our affiliate program now and <br /> turn your referrals into rewards</span> */}
                              <div className=' w-full flex flex-col gap-6 pb-4'>
                                <div className='relative'>
                                  <InputComponent label={"Email"} type={"text"} value={signupProps.values.email} name='email' onChange={handleInputChange} placeholder={"Enter email address"} />
                                  {toasterMessage &&
                                    <div className={"flex w-full items-center justify-start absolute"}>
                                      <span className='text-red-500 text-[12px]'>
                                        {toasterMessage === '"email" must be a valid email' && 'Email must be a valid email'}
                                      </span>
                                    </div>}
                                </div>
                                <InputComponent label={"PayPal Address"} type="text" name='payPalAddress' value={signupProps.values.payPalAddress} placeholder='Enter paypal address' onChange={handleInputChange} />
                                {/* <Select options={options} name='country' value={value} onChange={changeHandler} /> */}
                                {/* <div className=' relative'>
                                <span className=' pl-[3px] font-semibold text-[13px]'>{"Country"}</span>
                                <Select
                                  placeholder="Select Country"
                                  options={options}
                                  name="country"
                                  value={signupProps.values.country}
                                  onChange={value => signupProps.setFieldValue('country', value)}
                                  className=' rounded-[20px] border-none'
                                />
                                <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px]  mt-0' name={"country"} component='div' />
                              </div> */}
                                <div className='relative'>
                                  <span className='pl-[3px] font-semibold text-[13px]'>{"Country"}</span>
                                  {/* <Select
                                  placeholder="Select Country"
                                  options={options}
                                  name="country"
                                  value={signupProps.values.country}
                                  onChange={value => signupProps.setFieldValue('country', value)}
                                  styles={{
                                    control: (baseStyles) => ({
                                      ...baseStyles,
                                      borderRadius: '8px', // Add border-radius here
                                      border: '1px solid rgb(222, 226, 230)', // You can add custom borders here if needed
                                    }),
                                  }}
                                /> */}
                                  <Select
                                    placeholder="Select country"
                                    options={options}
                                    name="country"
                                    value={signupProps.values.country}
                                    onChange={value => signupProps.setFieldValue('country', value)}
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
                                  <ErrorMessage className='text-red-400 absolute text-[12px] pl-[4px] mt-0' name={"country"} component='div' />
                                </div>
                                {/* <InputComponent type={"text"} value={signupProps.values.country} name='country' onChange={signupProps.handleChange} placeholder={"Enter country name"} /> */}
                                <InputComponent label={"City"} type={"text"} value={signupProps.values.city} name='city' onChange={handleInputChange} placeholder={"Enter city name"} />
                                <InputComponent label={"Address"} type={"text"} value={signupProps.values.address} name='address' onChange={handleInputChange} placeholder={"Enter address"} />
                                <InputComponent label={"Company Name"} type={"text"} value={signupProps.values.companyName} name='companyName' onChange={handleInputChange} placeholder={"Enter company name"} />
                                {/* <InputComponent label={"Company number"} type={"text"} value={signupProps.values.companyNumber} name='companyNumber' onChange={signupProps.handleChange} placeholder={"Enter company number"} /> */}
                                <InputComponent label={"Website URL"} type={"text"} value={signupProps.values.companyUrl} name='companyUrl' onChange={handleInputChange} placeholder={"Enter website URL"} />
                                <div className='mt-4 flex flex-col gap-5'>
                                  <div className='relative w-full flex gap-1'>
                                    <InputComponent label={"Password"} type={showPassword == "password" ? "password" : "text"} value={signupProps.values.password} name='password' onChange={handleInputChange} placeholder={"Enter password"} />
                                    <span onClick={() => showPassword == "password" ? setShowPassword("text") : setShowPassword("password")} className=' absolute cursor-pointer right-3 bottom-3'>
                                      {
                                        showPassword == "password" ?
                                          <FiEyeOff />
                                          :
                                          <FiEye />
                                      }
                                    </span>
                                  </div>
                                  <div className=' relative w-full flex gap-1'>
                                    <InputComponent label={"Confirm password"} type={showConfirmPassword == "password" ? "password" : "text"} value={signupProps.values.confirmPassword} name='confirmPassword' onChange={handleInputChange} placeholder={"Enter confirm password"} />
                                    <span onClick={() => showConfirmPassword == "password" ? setShowConfirmPassword("text") : setShowConfirmPassword("password")} className=' absolute cursor-pointer right-3 bottom-3'>
                                      {
                                        showConfirmPassword == "password" ?
                                          <FiEyeOff />
                                          :
                                          <FiEye />
                                      }
                                    </span>
                                  </div>
                                </div>
                                <div className=' flex gap-1  mt-[-2.0px] items-center'>
                                  <input onChange={(e) => { e.target.checked ? setIsChecked(true) : setIsChecked(false) }} className=' cursor-pointer p-0 m-0' type="checkbox" id='checkboxx' name='checkboxx' />
                                  <a href='/terms-condition' target='_blank' className=' p-0 m-0 cursor-pointer hover:underline ' htmlFor="checkboxx"> <a target='_blank' className=' text-[14px] text-black hover:text-black'>Accept terms and condition</a></a>
                                </div>
                              </div>
                              <div className="position-relative form-group mb-0 mt-[-5px]">
                                {toasterMessage &&
                                  <div className={"flex w-full items-center justify-center absolute top-[-30px]"}>
                                    <span className='text-red-500 text-[12px]'>
                                      {toasterMessage === '"email" must be a valid email' ? '' : toasterMessage}
                                    </span>
                                  </div>}
                                <button className=" bg-black text-white py-[6.5px] border d-block w-100 mt-0 rounded-full" type="submit">
                                  Sign up
                                </button>
                              </div>
                              <P className='text-center mb-0 text-[16px] pt-0 mt-0 '>
                                Already have an account ?
                                <Link className='ms-2 text-black hover:text-black' to={`${process.env.PUBLIC_URL}/login`}>
                                  Sign in
                                </Link>
                              </P>
                            </div>
                          </div>
                          <div className=" w-full p-3 md:w-[520px] object-contain md:object-cover h-[200px]  md:h-[1035px]">
                            <img src={Banner} className=" shadow-xl border md:object-fit object-cover w-full h-full rounded-[16px]" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default SignUp;