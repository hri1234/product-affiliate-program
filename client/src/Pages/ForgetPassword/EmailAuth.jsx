
// import React, { useEffect, useState } from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import * as yup from 'yup';
// import { useNavigate, useParams } from 'react-router-dom';
// import InputComponent from '../../components/InputComponent';
// import { useResetPasswordMutation } from '../../services/AuthServices';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { toast } from 'react-toastify';
// import { Container, Row, Col } from "reactstrap";
// import { Btn, H4, P, Image } from "../../components/AbstractElements";
// import { FormGroup } from "reactstrap";
// import loginBanner from '../../Assets/loginBanner.png'


// function EmailAuth() {

//     let navigate = useNavigate();
//     const [UserData, setUserData] = useState('');
//     const [linksend, setLinkSend] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resetPassword] = useResetPasswordMutation();
//     const { role } = useParams();
//     console.log(role)


//     /* form initialValues */
//     const [initialValues, setInitialValues] = useState({
//         email: ''
//     });


//     /* form Validation using Yup */
//     const validationSchema = yup.object().shape({
//         email: yup.string()
//             .strict()
//             .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email")
//             .max(70, "Length should not exceed 70")
//             .email("Enter a valid email")
//             .required("Email is required")
//             .trim("Invalid email"),
//     });


//     /* handling form submit */
//     const handleSubmit = (data, { resetForm }) => {
//         setLoading(true)
//         setUserData(data)
//         console.log(data);
//         const roleData = { email: data?.email, role: role }
//         // resetPassword({ data: roleData })
//         //     .then((dta) => {
//         //         if (dta?.data) {
//         //             setTimeout(() => {
//         //                 toast.success(dta?.data?.message)
//         //                 setLinkSend(true);
//         //                 resetForm();
//         //             }, 100);
//         //             setTimeout(() => {
//         //                 if (role == 'admin') {
//         //                     navigate('/login/admin')
//         //                 }
//         //                 else {
//         //                     navigate('/login/npo')
//         //                 }
//         //             }, 600);
//         //         }
//         //         else if (dta?.error) {
//         //             console.log(dta?.error)
//         //             toast.error(dta?.error?.data?.message || "Internal server error")
//         //             setLinkSend(false)
//         //         }
//         //         setLoading(false)
//         //     })
//         //     .catch((err) => { toast.error(err.response.data.message); setLoading(false); setLinkSend(false) })

//     };


//     /*if user already logged in will be redirect to dashboard */
//     // let localData= JSON.parse(localStorage.getItem('IsUserLogged'))
//     // useEffect(() => {
//     //     if (localData || localData != null) {
//     //         navigate('/dashboard')
//     //     }
//     // }, [localData])

//     // <div className=' flex flex-col gap-2'>

//     //     <FormGroup className=" flex flex-col gap-5">
//     //         <InputComponent placeholder={"Enter your Email"} value={loginProps.values.email} name={"email"} type="text" onChange={loginProps.handleChange} />
//     //     </FormGroup>
//     //     <div onClick={() => navigate('/login')} className=' flex w-full justify-end text-[#3E5FCE] hover:underline cursor-pointer'>
//     //         <span>Sign in ?</span>
//     //     </div>
//     //     <Btn color="primary" type="submit" className="d-block w-100 mt-1 rounded-full">
//     //         Reset
//     //     </Btn>
//     // </div>

//     return (
//         <div className='h-full bg-slate-50 relative flex-col gap-2 flex w-full items-center justify-center'>
//             <span className=' text-[18px]  text-green-500'> {linksend && "Check Your Email to Reset Password !"} </span>

//             <Formik
//                 validationSchema={validationSchema}
//                 initialValues={initialValues}
//                 onSubmit={handleSubmit}
//             >
//                 {(loginProps) => (
//                     <Form className='w-full flex items-center justify-center'>
//                         <Container fluid={true} className="p-0 w-full  bg-slate-50">
//                             <Row>
//                                 <Col xs="12">
//                                     <div className="login-card flex-column">
//                                         <div className="logo">
//                                             <Image
//                                                 className="img-fluid for-light mx-auto h-[65px] w-[65px]"
//                                                 src={require("../../Assets/logo/itg_logo.webp")}
//                                             />
//                                         </div>
//                                         <div className=" w-3/4 flex items-center justify-center login-tab">
//                                             <div className="  bg-white w-[48%] border shadow-md rounded-[10px] py-6 px-6 flex md:flex-row flex-col-reverse gap-8">

//                                                     <div className="theme-form flex flex-col gap-3 p-2">

//                                                         <div className=' flex gap-2 items-center'>
//                                                             <div className=' flex flex-col gap-2'>

//                                                                 <FormGroup className=" flex flex-col gap-5">
//                                                                     <InputComponent placeholder={"Enter your Email"} value={loginProps.values.email} name={"email"} type="text" onChange={loginProps.handleChange} />
//                                                                 </FormGroup>
//                                                                 <div onClick={() => navigate('/login')} className=' flex w-full justify-end text-[#3E5FCE] hover:underline cursor-pointer'>
//                                                                     <span>Sign in ?</span>
//                                                                 </div>
//                                                                 <Btn color="primary" type="submit" className="d-block w-100 mt-1 rounded-full">
//                                                                     Reset
//                                                                 </Btn>
//                                                             </div>
//                                                             <input className=' cursor-pointer p-0 m-0' type="checkbox" id='checkboxx' name='checkboxx' />
//                                                             <label className=' p-0 m-0 cursor-pointer underline ' htmlFor="checkboxx"> <a target='_blank' className=' text-[14px]' href="https://partners.krownthemes.com/terms-and-conditions">Accept terms and condition</a></label>
//                                                     </div>
//                                                     <div className="position-relative form-group mb-0">
//                                                         <Btn color="primary" type="submit" className="d-block w-100 mt-2 rounded-full">
//                                                             Sign up
//                                                         </Btn>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className=" w-full p-2 md:w-[60%] object-contain md:object-cover h-[200px]  md:h-[600px]">
//                                                 <img src={loginBanner} className=" shadow-xl object-cover w-full h-full rounded-[16px]" alt="" />
//                                             </div>
//                                         </div>


//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Container>
//                         {/* <Container fluid={true} className="p-0 login-page bg-slate-50 shoaw">
//                             <Row>
//                                 <Col xs="12">
//                                     <div className="login-card flex-column">
//                                         <div className="logo">
//                                             <Image
//                                                 className="img-fluid for-light mx-auto h-[65px] w-[65px]"
//                                                 src={require("../../Assets/logo/itg_logo.webp")}
//                                             />
//                                         </div>
//                                         <div className="login-main login-tab shadow">
//                                             <div className="theme-form">
//                                                 <H4 className="text-center font-semibold text-2xl">Forgot password ?</H4>
//                                                 <P className="text-center">{"Enter your email to get reset link"}</P>

//                                             </div >
//                                         </div>
//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Container> */}
//                     </Form>
//                 )}
//             </Formik>

//         </div>
//     );
// }

// export default EmailAuth;

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
                                            <div className="  bg-white w-[78%] border shadow-md rounded-[10px] py-6 px-6 flex md:flex-row flex-col-reverse gap-8">
                                                <div className=" w-full md:w-[45%] mt-5">

                                                    <div className="theme-form flex flex-col gap-3 p-2">
                                                        <div className=' flex flex-col gap-3'>
                                                            {/* <Image
                                                                className="img-fluid for-light mx-auto h-[65px] w-[65px]"
                                                                src={require("../../Assets/logo/itg_logo.webp")}
                                                            /> */}
                                                            <H4 className="text-center font-semibold text-2xl">Forgot password</H4>
                                                        </div>
                                                        <P className="text-center">{"Enter your email to get reset link"}</P>
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
                                                            <button className=" bg-black text-white py-[6.5px] border d-block w-100 mt-2 rounded-full" type="submit">
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
                                                        <P className='text-center mb-0 text-[16px] pt-1 mt-1 '>
                                                            Remember your password ?
                                                            <Link className='ms-2 text-black hover:text-black' to={`${process.env.PUBLIC_URL}/login`}>
                                                                Sign in
                                                            </Link>
                                                        </P>
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
                                                <div className=" w-full p-2 md:w-[60%] object-contain md:object-cover h-[200px]  md:h-[460px]">
                                                    <img src={LoginBanner} className=" shadow-xl object-cover w-full h-full rounded-[16px]" alt="" />
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