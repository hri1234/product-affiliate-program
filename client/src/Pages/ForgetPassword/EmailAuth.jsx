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
import { useForgotPasswordMutation, useResetPasswordMutation } from '../../services/AuthServices';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import LoginBanner from '../../Assets/loginBanner.png';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import banner from "../../Assets/logo/new-banner02.jpg"

function EmailAuth() {

    let isLogged = Cookies.get("isLogged");
    const navigate = useNavigate();
    const [ForgotPassword] = useForgotPasswordMutation();

    const [showMessage, setShowMessage] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (isLogged) {
            navigate('/dashboard/');
        }
    }, [isLogged]);

    const initialValues = {
        email: '',
    };

    const validationSchema = yup.object().shape({
        email: yup.string().trim("Enter valid email").required("email is required").email(),
    });

    const handleSubmit = (data, { resetForm }) => {
        setLoading(true);
        console.log(data, 'register data');
        let registerData = {
            "email": data?.email,
        }
        ForgotPassword({ data: registerData })
            .then((res) => {
                if (res.error) {
                    console.log(res?.error?.data?.message, 'forgot err')
                    toast.error(res?.error?.data?.message || "Something went wrong");
                    setShowMessage(false);
                    setLoading(false)
                }
                else {
                    console.log(res);
                    resetForm();
                    setShowMessage(true);
                    setLoading(false)
                    // toast.success("Reset link sent to your email");

                }
            })
            .catch((err) => {
                console.log(err, 'forgot error');
                toast.error(err?.data?.message || "Something went wrong");
                setLoading(false);
            })

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
                        <Container fluid={true} className="p-0 w-full  bg-slate-50">
                            <Row>
                                <Col xs="12">
                                    <div className="login-card flex-column">
                                        {/* <Image
                                                className="img-fluid for-light mx-auto h-[65px] w-[65px]"
                                                src={require("../../Assets/logo/itg_logo.webp")}
                                            /> */}
                                        <div className=" w-full flex items-center justify-center login-tab">
                                            <div className="  bg-white w-[78%] border shadow-md rounded-[10px] py-6 px-6 flex md:flex-row flex-col-reverse gap-14">
                                                <div className=" w-full md:w-[48.6%] mt-5">

                                                    <div className="theme-form flex flex-col gap-3 p-3">
                                                        <div className=' flex flex-col gap-3'>
                                                            {/* <Image
                                                                className="img-fluid for-light mx-auto h-[65px] w-[65px]"
                                                                src={require("../../Assets/logo/itg_logo.webp")}
                                                            /> */}
                                                            <H4 className="text-center font-semibold text-2xl">Reset password</H4>
                                                        </div>
                                                        <P className="text-center">{" Enter the email address linked to your account, and we will send you a code to reset your password"}</P>
                                                        {/* <Input type="text" placeholder='Enter your email' value={signupProps.values.email} name='email' onChange={signupProps.handleChange} /> */}
                                                        <div className=' w-full flex flex-col gap-6 pb-4'>
                                                            <InputComponent label={"Email"} type={"text"} value={signupProps.values.email} name='email' onChange={signupProps.handleChange} placeholder={"Enter your email"} />
                                                        </div>
                                                        <div className="position-relative form-group mb-0">
                                                            {/* <Btn color="primary" type="submit" className="d-block w-100 mt-2 rounded-full">
                                                                {
                                                                    loading ?
                                                                        <span className=' w-full flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                                                            <AiOutlineLoading3Quarters />
                                                                        </span>
                                                                        :
                                                                        "Submit"
                                                                }
                                                            </Btn> */}
                                                            <button className=" bg-black text-white py-[6.5px] border d-block w-100 mt-1 rounded-full" type="submit">
                                                                {
                                                                    loading ?
                                                                        <span className=' w-full flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                                                            <AiOutlineLoading3Quarters />
                                                                        </span>
                                                                        :
                                                                        "Submit"
                                                                }
                                                            </button>
                                                        </div>
                                                        <div className='flex flex-col gap-[3px] pt-1'>

                                                            <P className='text-center mb-0 text-[16px] pt-0 mt-0 '>
                                                                Remember your password ?
                                                                <Link className='ms-2 text-black hover:text-black' to={`${process.env.PUBLIC_URL}/login`}>
                                                                    Sign in
                                                                </Link>
                                                            </P>
                                                            <P className='text-center mb-0 text-[16px] pt-0 mt-0 '>
                                                                Want to Sign up ?
                                                                <Link className='ms-2 text-black hover:text-black' to={`${process.env.PUBLIC_URL}/register`}>
                                                                    Sign up
                                                                </Link>
                                                            </P>
                                                        </div>
                                                        {
                                                            showMessage &&
                                                            <P className='text-center mb-0 text-[16px] pt-1 mt-1 '>
                                                                <span className='ms-2 text-[#3E5FCE]'>
                                                                    Reset link sent successfully to your gmail !
                                                                </span>
                                                            </P>
                                                        }
                                                    </div>
                                                </div>
                                                <div className=" w-full  md:w-[520px] object-contain md:object-cover h-[200px]  md:h-[460px]">
                                                    <img src={banner} className="border shadow-xl object-fit w-full h-full rounded-[16px]" alt="" />
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

export default EmailAuth;