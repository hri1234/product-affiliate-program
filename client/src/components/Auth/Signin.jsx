import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// Import Urbanist font instead of Righteous
import '@fontsource/urbanist';
import leftSideImageUrl from "../../Assets/banner.png";
import '@fontsource/righteous';

// Import authentication service
import { useLoginMutation } from "../../services/AuthServices";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [Login] = useLoginMutation();
  
  const initialValues = { 
    email: '', 
    password: '' 
  };
  
  const validationSchema = yup.object().shape({
    email: yup.string()
      .trim("Enter the valid email address")
      .required("Email is required")
      .email("Enter the valid email address")
      .test('is-valid-email', 'Enter the valid email address', value => {
        if (!value) return false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    password: yup.string()
      .trim("Enter valid password")
      .min(6, "Minimum 6 characters required")
      .required("Password is required")
      .strict(),
  });
  
  useEffect(() => {
    const isLogged = Cookies.get("isLogged");
    if (isLogged) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const handleLogin = (data, { resetForm }) => {
    setLoading(true);
    setToastMessage('');
    
    Login({ data: data })
      .then((res) => {
        if (res.error) {
          setToastMessage(res?.error?.data?.message || res.error?.data?.error);
          setLoading(false);
        } else {
          Cookies.set("isLogged", `${res?.data?.result?.accessToken}`, { expires: 30 });
          const decodedToken = jwtDecode(res?.data?.result?.accessToken);
          
          // Set auth state and role if props are available
          if (props?.props) {
            props.props.auth(true);
            props.props.setRole(decodedToken?.role);
          }
          
          resetForm();
          navigate(`${process.env.PUBLIC_URL}/dashboard`);
          setLoading(false);
          setToastMessage('');
        }
      })
      .catch((err) => {
        setToastMessage(err?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };
  
  // Create a custom theme with Urbanist as the default font
  const theme = createTheme({
    typography: {
      fontFamily: '"Urbanist", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          * {
            font-family: 'Urbanist', sans-serif !important;
          }
        `,
      },
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        elevation={0}
        sx={{
          width: '1200px',
          height: '780px',
          margin: '80px auto',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          boxShadow: '0px 24px 34px 0px #7B54AC38',
        }}
      >
        {/* Left side - using the exact image */}
        <Box 
          sx={{ 
            width: '50%',
            backgroundImage: `url(${leftSideImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Right side - white section */}
        <Box 
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px 30px',
            backgroundColor: 'white',
          }}
        >
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 700, 
              marginBottom: '20px',
              fontSize: '38px',
              textAlign: 'center',
              width: '100%',
              fontFamily: '"Righteous", sans-serif !important',
            }}
          >
            Sign In
          </Typography>
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    variant="outlined"
                    value={values.email}
                    onChange={(e) => {
                      handleChange(e);
                      setToastMessage('');
                    }}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ 
                      marginBottom: '16px',
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        height: '56px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                        '& fieldset': {
                          borderColor: '#e5e7eb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d1d5db',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#9333ea',
                        }
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#9ca3af',
                        opacity: 1,
                      },
                      '& .MuiInputBase-input': {
                        fontFamily: '"Urbanist", sans-serif !important',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'red',
                        marginLeft: 0,
                      }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    variant="outlined"
                    value={values.password}
                    onChange={(e) => {
                      handleChange(e);
                      setToastMessage('');
                    }}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      marginBottom: '5px',
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        height: '56px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                        '& fieldset': {
                          borderColor: '#e5e7eb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#d1d5db',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#9333ea',
                        }
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#9ca3af',
                        opacity: 1,
                      },
                      '& .MuiInputBase-input': {
                        fontFamily: '"Urbanist", sans-serif !important',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'red',
                        marginLeft: 0,
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, width: '100%' }}>
                  <Link 
                    href="/forgot-password/user" 
                    sx={{ 
                      color: '#1C0A33',
                      textDecoration: 'underline',
                      fontSize: '16px',
                      fontWeight: 500,
                      fontFamily: '"Urbanist", sans-serif !important',
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                {toastMessage && (
                  <Typography 
                    align="center" 
                    sx={{ 
                      color: 'red',
                      fontSize: '14px',
                      mb: 1,
                      width: '100%',
                    }}
                  >
                    {toastMessage}
                  </Typography>
                )}
                
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ 
                    padding: '12px',
                    backgroundColor: '#9333ea',
                    textTransform: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 500,
                    mb: 2,
                    height: '56px',
                    width: '100%',
                    boxShadow: '0px 4px 6px rgba(147, 51, 234, 0.3)',
                    '&:hover': {
                      backgroundColor: '#7e22ce',
                    },
                    fontFamily: '"Urbanist", sans-serif !important',
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </Box>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
          
          <Typography 
            align="center" 
            sx={{ 
              mt: 0,
              fontSize: '16px',
              color: '#1C0A33',
              width: '100%',
              fontFamily: '"Urbanist", sans-serif !important',
            }}
          >
            Don't have account? {' '}
            <Link 
              href="/register" 
              sx={{ 
                color: '#1C0A33',
                textDecoration: 'underline',
                fontWeight: 600,
                fontFamily: '"Urbanist", sans-serif !important',
                fontSize: "16px"
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default LoginPage;