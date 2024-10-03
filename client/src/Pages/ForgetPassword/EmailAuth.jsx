import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import { H4, P } from "../../components/AbstractElements";
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import InputComponent from '../../components/InputComponent';
import { useForgotPasswordMutation } from '../../services/AuthServices';
import Cookies from 'js-cookie';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function EmailAuth() {

    let isLogged = Cookies.get("isLogged");
    const navigate = useNavigate();
    const [ForgotPassword] = useForgotPasswordMutation();
    const [toastMessage, setToastMessage] = useState('')
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
        email: yup.string().trim("Enter the valid email address").required("Email is required").email("Enter the valid email address")
            .test('is-valid-email', 'Enter the valid email address', value => {
                if (!value) return false;
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
                return emailRegex.test(value);
            }),
    });

    const handleSubmit = (data, { resetForm }) => {
        setLoading(true);
        let registerData = {
            "email": data?.email,
        }
        ForgotPassword({ data: registerData })
            .then((res) => {
                if (res.error) {
                    setToastMessage(res?.error?.data?.message || res.error?.data?.error)
                    setShowMessage(false);
                    setLoading(false)
                }
                else {
                    resetForm();
                    setShowMessage(true);
                    setToastMessage(res.error)
                    setLoading(false)
                }
            })
            .catch((err) => {
                setToastMessage(err?.data || "Something went wrong")
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
                {(signupProps) => {
                    const handleInputChange = (e) => {
                        signupProps.handleChange(e);
                        setToastMessage('');
                    };
                    return (
                        <Form>
                            <Container fluid={true} className="p-0 w-full  bg-slate-50">
                                <Row>
                                    <Col xs="12">
                                        <div className="login-card flex-column">
                                            <div className=" w-full flex items-center justify-center login-tab">
                                                <div className="  bg-white w-[78%] border shadow-md rounded-[10px] py-6 px-6 flex justify-center items-center flex-col">
                                                    <div className=" w-full md:w-[48.6%]">
                                                        <div className="theme-form flex flex-col gap-3 p-3">
                                                            <div className=' flex flex-col gap-3'>
                                                                <H4 className="text-center font-semibold text-2xl">Reset password</H4>
                                                            </div>
                                                            <P className="text-center">{" Enter the email address linked to your account, and we will send you a code to reset your password"}</P>
                                                            <div className=' w-full flex flex-col gap-6 pb-4'>
                                                                <InputComponent label={"Email"} type={"text"} value={signupProps.values.email} name='email' onChange={handleInputChange} placeholder={"Enter email address"} />
                                                            </div>
                                                            <div className="position-relative form-group mb-0">
                                                                <div className='relative'>
                                                                    <div className="flex w-full items-center justify-center absolute top-[-25px]">
                                                                        <span className="text-red-400 text-[12px]">
                                                                            {toastMessage === '"email" must be a valid email' ? "Enter the valid email address" : toastMessage}
                                                                        </span>
                                                                    </div>
                                                                    {showMessage &&
                                                                        <div className='text-center text-[12px] absolute top-[-25px] w-full'>
                                                                            <span className='ms-2 text-green-500'>
                                                                                Reset link sent successfully to your email address
                                                                            </span>
                                                                        </div>}
                                                                    <button className=" bg-black text-white py-[6.5px] border d-block w-100 mt-1 rounded-full" type="submit">
                                                                        { loading ? <span className=' w-full flex py-1 items-center justify-center m-auto self-center animate-spin'> <AiOutlineLoading3Quarters /> </span> : "Submit" }
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className='text-[16px]'>
                                                        Remember your password?
                                                        <Link className='ms-2 text-black hover:text-black pr-[4px]' to={`${process.env.PUBLIC_URL}/login`}>
                                                            Sign in
                                                        </Link>
                                                        |  Want to create an account?
                                                        <Link className='ms-2 text-black hover:text-black' to={`${process.env.PUBLIC_URL}/register`}>
                                                            Sign up
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    )
                }
                }
            </Formik>
        </>
    )
}

export default EmailAuth;