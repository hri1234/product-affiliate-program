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
import Banner from '../../Assets/logo/banner2.png';

function SignUp() {

  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), []);
  const [Register] = useRegisterMutation();
  let isLogged = Cookies.get("isLogged");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password")



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
    email: yup.string().trim("Enter valid email").required("email is required").email(),
    payPalAddress: yup.string().trim("Enter valid address").required("address is required").strict(),
    // country: yup.string().trim("Enter valid country").required("country is required").strict(),
    country: yup.object().shape({
      label: yup.string().required("Country is required"),
      value: yup.string().required("Country is required")
    }).nullable().required("Country is required"),
    city: yup.string().trim("Enter valid city").required("city is required").strict(),
    address: yup.string().trim("Enter valid address").required("address is required").strict(),
    companyName: yup.string().trim("Enter valid companyName").required("company name is required").strict(),
    companyUrl: yup.string().trim("Enter valid website url").required("website url is required").strict(),
    // companyNumber: yup.string().trim("Enter valid number").min(10, "Enter valid number").max(10, "Enter valid number").required("number is required"),
    password: yup.string().trim("Enter valid password").required("password is required").strict(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').trim("Enter valid confirm password").required("confirm password is required").strict(),
  });

  const handleSubmit = (data, { resetForm }) => {
    setLoading(true);
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
    Register({ data: registerData })
      .then((res) => {
        if (res.error) {
          console.log(res.error, 'register err')
          toast.error(res.error?.data?.message);
        }
        else {
          resetForm();
          toast.success("User Registered Successfully");
          navigate('/login');
          console.log(res.data?.result, 'register res')
        }
      })
      .catch((err) => {
        console.log(err, 'catch err')
      })


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
        {(signupProps) => (
          <Form>
            <Container fluid={true} className="p-0 w-full m-0 pt-4  bg-slate-50">
              <Row>
                <Col xs="12">
                  <div className="login-card flex-column">
                    <div className=" w-full flex items-center justify-center login-tab">
                      <div className="  bg-white w-[78%] border shadow-md rounded-[10px] py-6 px-6 flex md:flex-row flex-col-reverse gap-8">
                        <div className=" w-full md:w-[50%] mt-1">

                          <div className="theme-form flex flex-col gap-3 p-1">
                            <div className=' flex flex-col gap-3'>
                              {/* <Image
                                className="img-fluid for-light mx-auto h-[65px] w-[65px]"
                                src={require("../../Assets/logo/itg_logo.webp")}
                              /> */}
                              <H4 className="text-center font-semibold text-2xl"> Sign Up</H4>
                            </div>
                            <P className="text-center">Join our affiliate program now and <br /> turn your referrals into rewards</P>
                            {/* <span className='m-auto'>Join our affiliate program now and <br /> turn your referrals into rewards</span> */}
                            <div className=' w-full flex flex-col gap-6 pb-4'>

                              <InputComponent label={"Email"} type={"text"} value={signupProps.values.email} name='email' onChange={signupProps.handleChange} placeholder={"Enter your email"} />
                              <InputComponent label={"PayPal address"} type="text" name='payPalAddress' value={signupProps.values.payPalAddress} placeholder='Enter your paypal address' onChange={signupProps.handleChange} />
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
                                <Select
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
                                />
                                <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px] mt-0' name={"country"} component='div' />
                              </div>



                              {/* <InputComponent type={"text"} value={signupProps.values.country} name='country' onChange={signupProps.handleChange} placeholder={"Enter country name"} /> */}
                              <InputComponent label={"City"} type={"text"} value={signupProps.values.city} name='city' onChange={signupProps.handleChange} placeholder={"Enter city name"} />
                              <InputComponent label={"Address"} type={"text"} value={signupProps.values.address} name='address' onChange={signupProps.handleChange} placeholder={"Enter your address"} />
                              <InputComponent label={"Company name"} type={"text"} value={signupProps.values.companyName} name='companyName' onChange={signupProps.handleChange} placeholder={"Enter company name"} />
                              {/* <InputComponent label={"Company number"} type={"text"} value={signupProps.values.companyNumber} name='companyNumber' onChange={signupProps.handleChange} placeholder={"Enter company number"} /> */}
                              <InputComponent label={"Website Url"} type={"text"} value={signupProps.values.companyUrl} name='companyUrl' onChange={signupProps.handleChange} placeholder={"Enter website Url"} />
                              <div className='relative w-full flex gap-1'>
                                <InputComponent label={"Password"} type={showPassword == "password" ? "password" : "text"} value={signupProps.values.password} name='password' onChange={signupProps.handleChange} placeholder={"Enter your password"} />
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
                                <InputComponent label={"Confirm password"} type={showConfirmPassword == "password" ? "password" : "text"} value={signupProps.values.confirmPassword} name='confirmPassword' onChange={signupProps.handleChange} placeholder={"Enter confirm password"} />
                                <span onClick={() => showConfirmPassword == "password" ? setShowConfirmPassword("text") : setShowConfirmPassword("password")} className=' absolute cursor-pointer right-3 bottom-3'>
                                  {
                                    showConfirmPassword == "password" ?
                                      <FiEyeOff />
                                      :
                                      <FiEye />
                                  }
                                </span>
                              </div>
                              <div className=' flex gap-2 items-center'>
                                <input className=' cursor-pointer p-0 m-0' type="checkbox" id='checkboxx' name='checkboxx' />
                                <label className=' p-0 m-0 cursor-pointer hover:underline ' htmlFor="checkboxx"> <a target='_blank' className=' text-[14px] text-black hover:text-black' href="https://partners.krownthemes.com/terms-and-conditions">Accept terms and condition</a></label>
                              </div>
                            </div>
                            <div className="position-relative form-group mb-0">
                              <button className=" bg-black text-white py-[6.5px] border d-block w-100 mt-2 rounded-full" type="submit">
                                Sign up
                              </button>
                            </div>
                            <P className='text-center mb-0 text-[16px] pt-1 mt-1 '>
                              Already have an account ?
                              <Link className='ms-2 text-black hover:text-black' to={`${process.env.PUBLIC_URL}/login`}>
                                Sign in
                              </Link>
                            </P>
                          </div>
                        </div>
                        <div className=" w-full p-2 md:w-[520px] object-contain md:object-cover h-[200px]  md:h-[1050px]">
                          <img src={Banner} className=" shadow-xl border object-contain w-full h-full rounded-[16px]" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        )}


      </Formik>
    </>
  )
}

export default SignUp;