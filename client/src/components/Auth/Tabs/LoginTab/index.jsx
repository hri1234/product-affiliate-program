import { Link, useNavigate } from "react-router-dom";
import { FormGroup } from "reactstrap";
import { H4 } from "../../../AbstractElements";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import InputComponent from "../../../InputComponent";
import { useLoginMutation } from "../../../../services/AuthServices";
import * as yup from 'yup';
import { Form, Formik } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { jwtDecode } from 'jwt-decode';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoginTab = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('')
  let isLogged = Cookies.get("isLogged");
  const [Login] = useLoginMutation();
  const initialValues = { email: '', password: '', };
  const validationSchema = yup.object().shape({
    email: yup.string().trim("Enter the valid email address").required("Email is required").email("Enter the valid email address")
      .test('is-valid-email', 'Enter the valid email address', value => {
        if (!value) return false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    password: yup.string().trim("Enter valid password").min(6, "Minimum 6 characters required").required("Password is required").strict(),
  });
  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard');
    }
  }, [isLogged]);
  const SimpleLoginHandle = (data, { resetForm }) => {
    setLoading(true);
    setToastMessage('')
    Login({ data: data })
      .then((res) => {
        if (res.error) {
          setToastMessage(res?.error?.data?.message || res.error?.data?.error)
          console.log(res?.error, 'errrrrrrrrrrrrrrrrrrrrrr')
          setLoading(false);
        }
        else {
          Cookies.set("isLogged", `${res?.data?.result?.accessToken}`, { expires: 30 });
          const decodedToken = jwtDecode(res?.data?.result?.accessToken);
          console.log("DECODEDTOKEN", decodedToken);
          props.props.auth(true);
          props.props.setRole(decodedToken?.role)
          resetForm();
          navigate(`${process.env.PUBLIC_URL}/dashboard`);
          setLoading(false);
          setToastMessage('')
        }
      })
      .catch((err) => {
        console.log(err, 'errrrrrrr')
        setToastMessage(err?.data?.message || "Something went wrong")
        setLoading(false)
      })
  };
  return (
    <div className=" w-full p-0 m-0">
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={SimpleLoginHandle}
      >
        {(loginProps) => {
          const handleInputChange = (e) => {
            loginProps.handleChange(e);
            setToastMessage('');
          };
          return (
            <Form>
              <div className="theme-form flex flex-col gap-2 px-3 pt-4 w-full">
                <div className=" flex flex-col gap-3">
                  <H4 className="text-center font-semibold text-2xl"> Sign In</H4>
                </div>
                <FormGroup className=" flex flex-col gap-4 mt-3">
                  <div className="relative">
                    <InputComponent label={"Email"} placeholder={"Enter email address"} value={loginProps.values.email} name={"email"} type="text" onChange={handleInputChange} />
                    <div className="flex w-full items-center absolute bottom-[-20px]">
                      <span className="text-red-400 text-[12px]">
                        {toastMessage == '"email" must be a valid email' && "Enter the valid email address"}
                      </span>
                    </div>
                  </div>
                  <div className=" relative flex gap-1 justify-between">
                    <InputComponent label={"Password"} placeholder={"Enter password"} value={loginProps.values.password} name={"password"} type={showPassword == "password" ? "password" : "text"} onChange={handleInputChange} />
                    <div className="flex w-full items-center absolute bottom-[-20px]">
                      <span className="text-red-400 text-[12px]">
                        {toastMessage == 'Invalid Credential' && "Enter the correct password"}
                      </span>
                    </div>
                    <span onClick={() => showPassword == 'password' ? setShowPassword('text') : setShowPassword('password')} className=" cursor-pointer absolute right-3 bottom-3">
                      {
                        showPassword == "password"
                          ? <FiEyeOff className=" cursor-pointer" />
                          : <FiEye className=" cursor-pointer" />
                      }
                    </span>
                  </div>
                  <div className=" w-full float-end flex justify-end">
                    <span onClick={() => navigate('/forgot-password/user')} className=" hover:underline cursor-pointer text-black text-[15px]" >
                      Forgot password ?
                    </span>
                  </div>
                </FormGroup>
                <div className="relative">
                  <div className="flex w-full items-center justify-center absolute top-[-25px]">
                    <span className="text-red-400 text-[12px]">
                      {toastMessage == 'User Not Found' ? "User Not Found" : toastMessage === "Your account is deactivated" && "Your account is deactivated"}
                    </span>
                  </div>
                  <button className=" bg-black text-white py-[6.5px] border d-block w-100 mt-2 relative rounded-full" type="submit">
                    {
                      loading ?
                        <span className=' w-fit flex py-1 items-center justify-center m-auto self-center animate-spin'>
                          <AiOutlineLoading3Quarters />
                        </span>
                        :
                        "Sign In"
                    }
                  </button>
                </div>
                <div className=" pt-1 w-full flex items-center justify-center">
                  <hr />
                  Don't have account?
                  <Link className='ms-2 text-black hover:text-black' to={`${process.env.PUBLIC_URL}/register`}>
                    Sign up
                  </Link>
                </div>
              </div >
            </Form>
          )
        }
        }
      </Formik>
    </div>
  );
};

export default LoginTab;