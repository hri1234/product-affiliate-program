import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import { H4, P } from "../../components/AbstractElements";
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import InputComponent from '../../components/InputComponent';
import { useResetPasswordMutation } from '../../services/AuthServices';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

function ForgetPassword() {

    let isLogged = Cookies.get("isLogged");
    const navigate = useNavigate();
    const ParamData = useParams();

    const [showPassword, setShowPassword] = useState("password");
    const [showConfirmPassword, setShowConfirmPassword] = useState("password")

    const [loading, setLoading] = useState(false);
    const [Reset] = useResetPasswordMutation()


    useEffect(() => {
        if (isLogged) {
            navigate('/dashboard/');
        }
    }, [isLogged]);

    const initialValues = { password: '', confirmPassword: '' };

    const validationSchema = yup.object().shape({
        password: yup.string().trim("Enter valid password").min(6, "Minimum 6 characters required").required("Password is required").strict(),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').trim("Enter valid confirm password").required("confirm password is required").strict(),
    });

    const handleSubmit = (data, { resetForm }) => {
        setLoading(true);
        let resetData = { password: data?.password, }
        Reset({ data: resetData, Id: ParamData?.id })
            .then((res) => {
                if (res.error) {
                    toast.error(res.error.data.message || "Something went wrong");
                }
                else {
                    navigate('/login');
                    toast.success(res?.data?.message);
                }
            })
            .catch((err) => {
                toast.error(err.data.message || "Something went wrong");
            })
    };
    return (
        <>
            <Formik enableReinitialize validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit} >
                {(signupProps) => (
                    <Form>
                        <Container fluid={true} className="p-0 w-full  bg-slate-50">
                            <Row>
                                <Col xs="12">
                                    <div className="login-card flex-column">
                                        <div className=" w-full flex items-center justify-center login-tab">
                                            <div className="  bg-white w-[78%] border shadow-md rounded-[10px] py-6 px-6 flex justify-center items-center">
                                                <div className=" w-full md:w-[50%]">
                                                    <div className="theme-form flex flex-col gap-3 p-2">
                                                        <div className=' flex flex-col gap-3'>
                                                            <H4 className="text-center font-semibold text-2xl">Reset password</H4>
                                                        </div>
                                                        <P className="text-center">{"Enter details to reset your password"}</P>
                                                        <div className=' w-full flex flex-col gap-6 pb-4'>
                                                            <div className='relative w-full flex gap-1'>
                                                                <InputComponent label={"Password"} type={showPassword == "password" ? "password" : "text"} value={signupProps.values.password} name='password' onChange={signupProps.handleChange} placeholder={"Enter your password"} />
                                                                <span onClick={() => showPassword == "password" ? setShowPassword("text") : setShowPassword("password")} className=' absolute cursor-pointer right-3 bottom-3'>
                                                                    {showPassword == "password" ? <FiEyeOff /> : <FiEye />}
                                                                </span>
                                                            </div>
                                                            <div className=' relative w-full flex gap-1'>
                                                                <InputComponent label={"Confirm password"} type={showConfirmPassword == "password" ? "password" : "text"} value={signupProps.values.confirmPassword} name='confirmPassword' onChange={signupProps.handleChange} placeholder={"Enter confirm password"} />
                                                                <span onClick={() => showConfirmPassword == "password" ? setShowConfirmPassword("text") : setShowConfirmPassword("password")} className=' absolute cursor-pointer right-3 bottom-3'>
                                                                    {showConfirmPassword == "password" ? <FiEyeOff /> : <FiEye />}
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