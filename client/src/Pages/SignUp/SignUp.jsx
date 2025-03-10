import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Link,
  Checkbox,
  FormControlLabel,
  createTheme,
  ThemeProvider,
  CssBaseline,
  FormHelperText,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

// Import fonts
import '@fontsource/urbanist';
import '@fontsource/righteous';
import leftSideImageUrl from "../../Assets/signuplogo.png";

const SignUpPage = () => {
  const [userCreateLoader, setUserCreateLoader] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState("password");
  const [toasterMessage, setToasterMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const navigate = useNavigate();
  
  // Validation schema
  const validationSchema = yup.object().shape({
    email: yup.string()
      .trim("Enter valid email")
      .required("Email is required")
      .email("Enter the valid email address")
      .test('is-valid-email', 'Enter the valid email address', value => {
        if (!value) return false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    payPalAddress: yup.string()
      .trim("Enter the valid PayPal address")
      .required("PayPal address is required")
      .email("Enter the valid PayPal address")
      .test('is-valid-email', 'Enter the valid PayPal address', value => {
        if (!value) return false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    country: yup.object().shape({
      label: yup.string().required("Country is required"),
      value: yup.string().required("Country is required")
    }).nullable().required("Country is required"),
    city: yup.string()
      .trim("Enter valid city")
      .required("City is required").strict(),
    address: yup.string()
      .trim("Enter the valid address")
      .required("Address is required").strict(),
    companyName: yup.string()
      .trim("Enter the valid company name").strict(),
    websiteUrl: yup.string()
      .url("Enter a valid website url")
      .trim("Enter valid website url").strict(),
    password: yup.string()
      .trim("Enter valid password")
      .min(6, "Minimum 6 characters required")
      .required("Password is required").strict(),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .trim("Enter valid confirm password")
      .required("Confirm password is required").strict(),
  });

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
  
  // Form submission handler
  const handleSubmit = (data, { resetForm }) => {
    setUserCreateLoader(true);
    if (!isChecked) {
      setToasterMessage('Please accept terms & condition');
      setUserCreateLoader(false);
    } else {
      setToasterMessage('');
      let registerData = { 
        "email": data?.email, 
        "paypalAddress": data?.payPalAddress, 
        "country": data?.country.label, 
        "city": data?.city, 
        "address": data?.address, 
        "companyName": data?.companyName, 
        "companyUrl": data?.websiteUrl, 
        "password": data?.password 
      };
      
      // Mock API call - replace with actual API call
      setTimeout(() => {
        try {
          resetForm();
          toast.success("You have successfully signed up! Please log in to continue.");
          setUserCreateLoader(false);
          navigate('/login');
          setToasterMessage('');
        } catch (err) {
          setUserCreateLoader(false);
          setToasterMessage("Something went wrong");
        }
      }, 1500);
      
      // Actual API call would be something like this:
      /*
      Register({ data: registerData })
        .then((res) => {
          if (res.error) {
            setToasterMessage(res?.error?.data?.error || res?.error?.data?.message === "Email Already Exist." && "Email is already registered")
            setUserCreateLoader(false);
          }
          else {
            resetForm();
            toast.success("You have successfully signed up! Please log in to continue.");
            setUserCreateLoader(false);
            navigate('/login');
            setToasterMessage('')
          }
        })
        .catch((err) => {
          setUserCreateLoader(false);
          setToasterMessage("Something went Wrong")
        })
      */
    }
  };

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

        {/* Right side - sign up form with functionality */}
        <Box 
          sx={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 40px',
            backgroundColor: 'white',
            overflowY: 'auto',
          }}
        >
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 700, 
              marginBottom: '10px',
              fontSize: '38px',
              textAlign: 'center',
              fontFamily: '"Righteous", sans-serif !important',
            }}
          >
            Sign Up
          </Typography>
          
          <Formik
            initialValues={{ 
              email: '', 
              payPalAddress: '', 
              country: null, 
              city: '', 
              address: '', 
              companyName: '', 
              websiteUrl: '', 
              password: '', 
              confirmPassword: '' 
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
              <Form>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Email field */}
                  <Box sx={{ position: 'relative' }}>
                    <TextField
                      fullWidth
                      id="email"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={(e) => {
                        handleChange(e);
                        setToasterMessage('');
                      }}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      variant="outlined"
                      sx={textFieldStyle}
                    />
                    {toasterMessage && toasterMessage.includes('email') && (
                      <FormHelperText error>{toasterMessage}</FormHelperText>
                    )}
                  </Box>
                  
                  {/* PayPal Address field */}
                  <TextField
                    fullWidth
                    id="payPalAddress"
                    placeholder="PayPal Address"
                    name="payPalAddress"
                    value={values.payPalAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.payPalAddress && Boolean(errors.payPalAddress)}
                    helperText={touched.payPalAddress && errors.payPalAddress}
                    variant="outlined"
                    sx={textFieldStyle}
                  />

                  {/* Country dropdown */}
                  <Box sx={{ position: 'relative' }}>
                    <Select
                      placeholder="Select country"
                      options={options}
                      name="country"
                      value={values.country}
                      onChange={value => setFieldValue('country', value)}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles, 
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          fontSize: '14px',
                          height: '56px',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                          borderColor: touched.country && errors.country ? '#d32f2f' : '#e5e7eb',
                          '&:hover': {
                            borderColor: '#d1d5db',
                          },
                        }),
                        indicatorSeparator: () => ({
                          display: 'none',
                        }),
                      }}
                    />
                    {touched.country && errors.country && (
                      <FormHelperText error>{typeof errors.country === 'string' ? errors.country : 'Country is required'}</FormHelperText>
                    )}
                  </Box>
                  
                  {/* City field */}
                  <TextField
                    fullWidth
                    id="city"
                    placeholder="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    variant="outlined"
                    sx={textFieldStyle}
                  />
                  
                  {/* Address field */}
                  <TextField
                    fullWidth
                    id="address"
                    placeholder="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                    variant="outlined"
                    sx={textFieldStyle}
                  />
                  
                  {/* Company Name field */}
                  <TextField
                    fullWidth
                    id="companyName"
                    placeholder="Company Name"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.companyName && Boolean(errors.companyName)}
                    helperText={touched.companyName && errors.companyName}
                    variant="outlined"
                    sx={textFieldStyle}
                  />
                  
                  {/* Website URL field */}
                  <TextField
                    fullWidth
                    id="websiteUrl"
                    placeholder="Website URL"
                    name="websiteUrl"
                    value={values.websiteUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.websiteUrl && Boolean(errors.websiteUrl)}
                    helperText={touched.websiteUrl && errors.websiteUrl}
                    variant="outlined"
                    sx={textFieldStyle}
                  />
                  
                  {/* Password field with show/hide */}
                  <TextField
                    fullWidth
                    id="password"
                    placeholder="Create Password"
                    name="password"
                    type={showPassword === "password" ? "password" : "text"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(showPassword === "password" ? "text" : "password")}
                            edge="end"
                          >
                            {showPassword === "password" ? <FiEyeOff /> : <FiEye />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={textFieldStyle}
                  />
                  
                  {/* Confirm Password field with show/hide */}
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword === "password" ? "password" : "text"}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowConfirmPassword(showConfirmPassword === "password" ? "text" : "password")}
                            edge="end"
                          >
                            {showConfirmPassword === "password" ? <FiEyeOff /> : <FiEye />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={textFieldStyle}
                  />
                </Box>
                
                {/* Terms and conditions */}
                {/* <Box sx={{ mt: 0 }}>
                  <FormControlLabel
                    control={<Checkbox 
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      sx={{ 
                        color: '#9333ea',
                        '&.Mui-checked': {
                          color: '#9333ea',
                        },
                      }} 
                    />}
                    label={
                      <Typography sx={{ 
                        fontSize: '14px',
                        color: '#1C0A33',
                        fontFamily: '"Urbanist", sans-serif !important',
                      }}>
                        Accept terms and condition
                      </Typography>
                    }
                  />
                  {!isChecked && toasterMessage === 'Please accept terms & condition' && (
                    <FormHelperText error>{toasterMessage}</FormHelperText>
                  )}
                </Box> */}
                
                {/* Submit button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={userCreateLoader}
                  sx={{ 
                    padding: '12px',
                    backgroundColor: '#9333ea',
                    textTransform: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 500,
                    mb: 2,
                    mt: 0,
                    height: '56px',
                    width: '100%',
                    boxShadow: '0px 4px 6px rgba(147, 51, 234, 0.3)',
                    '&:hover': {
                      backgroundColor: '#7e22ce',
                    },
                    fontFamily: '"Urbanist", sans-serif !important',
                  }}
                >
                  {userCreateLoader ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </Box>
                  ) : "Sign Up"}
                </Button>
                
                {/* Login link */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: '100%',
                  mt: 0,
                }}>
                  <Typography 
                    sx={{ 
                      fontSize: '14px',
                      color: '#1C0A33',
                      fontFamily: '"Urbanist", sans-serif !important',
                    }}
                  >
                    Already have account? {' '}
                    <Link 
                      href="/login" 
                      sx={{ 
                        color: '#1C0A33',
                        textDecoration: 'underline',
                        fontWeight: 600,
                        fontFamily: '"Urbanist", sans-serif !important',
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
                
                {/* General error message */}
                {toasterMessage && !toasterMessage.includes('email') && toasterMessage !== 'Please accept terms & condition' && (
                  <Box sx={{ mt: 1, textAlign: 'center' }}>
                    <FormHelperText error>{toasterMessage}</FormHelperText>
                  </Box>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

// Common text field style
const textFieldStyle = { 
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
};

export default SignUpPage;