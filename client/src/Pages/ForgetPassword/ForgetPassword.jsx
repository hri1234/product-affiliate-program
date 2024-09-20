import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Btn, H4, H6, P, Image } from "../../components/AbstractElements";
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import InputComponent from '../../components/InputComponent';
import countryList from 'react-select-country-list';
import { useResetPasswordMutation } from '../../services/AuthServices';
import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast'
// import LoginBanner from '../../Assets/loginBanner.png';
import Banner from '../../Assets/logo/new-banner02.jpg'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

function ForgetPassword() {

    let isLogged = Cookies.get("isLogged");
    const navigate = useNavigate();
    const ParamData = useParams();
    console.log(ParamData, 'paramData');

    const [showPassword, setShowPassword] = useState("password");
    const [showConfirmPassword, setShowConfirmPassword] = useState("password")

    const [loading, setLoading] = useState(false);
    const [Reset] = useResetPasswordMutation()


    useEffect(() => {
        if (isLogged) {
            navigate('/dashboard/');
        }
    }, [isLogged]);

    const initialValues = {
        password: '',
        confirmPassword: ''
    };

    const validationSchema = yup.object().shape({
        password: yup.string().trim("Enter valid password").required("password is required").strict(),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').trim("Enter valid confirm password").required("confirm password is required").strict(),
    });

    const handleSubmit = (data, { resetForm }) => {
        setLoading(true);
        console.log(data, 'reset data');
        let resetData = {
            password: data?.password,
        }
        Reset({ data: resetData, Id: ParamData?.id })
            .then((res) => {
                if (res.error) {
                    console.log(res.error, 'reset error')
                    toast.error(res.error.data.message || "Something went wrong");

                }
                else {
                    navigate('/login');
                    toast.success(res?.data?.message);
                    console.log(res?.data?.message, 'reset res')
                }
            })
            .catch((err) => {
                console.log(err, 'reset catch err');
                toast.error(err.data.message || "Something went wrong");

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

                                        <div className=" w-full flex items-center justify-center login-tab">
                                            <div className="  bg-white w-[78%] border shadow-md rounded-[10px] py-6 px-6 flex md:flex-row flex-col-reverse gap-8">
                                                <div className=" w-full md:w-[50%]">

                                                    <div className="theme-form flex flex-col gap-3 p-2 mt-2">
                                                        <div className=' flex flex-col gap-3'>
                                                            {/* <Image
                                                                className="img-fluid for-light mx-auto h-[65px] w-[65px]"
                                                                src={require("../../Assets/logo/itg_logo.webp")}
                                                            /> */}
                                                            <H4 className="text-center font-semibold text-2xl">Reset password</H4>
                                                        </div>
                                                        <P className="text-center">{"Enter details to reset your password"}</P>
                                                        {/* <Input type="text" placeholder='Enter your email' value={signupProps.values.email} name='email' onChange={signupProps.handleChange} /> */}
                                                        <div className=' w-full flex flex-col gap-6 pb-4'>
                                                            {/* <InputComponent label={"Password"} type={"password"} value={signupProps.values.email} name='email' onChange={signupProps.handleChange} placeholder={"Enter your email"} /> */}
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
                                                        </div>
                                                        <div className="position-relative form-group mb-0">
                                                            <button className=" bg-black text-white py-[6.5px] border d-block w-100 mt-2 rounded-full" type="submit">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" w-full p-2 md:w-[50%] object-contain md:object-cover h-[200px]  md:h-[460px]">
                                                    <img src={Banner} className=" shadow-xl object-cover w-full h-full rounded-[16px]" alt="" />
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

export default ForgetPassword;