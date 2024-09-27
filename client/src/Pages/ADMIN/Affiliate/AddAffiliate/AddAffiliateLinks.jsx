import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Row } from 'reactstrap';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import InputComponent from '../../../../components/InputComponent';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useAddAffiliateLinkMutation } from '../../../../services/AffiliateService';
import { useNavigate } from 'react-router-dom';
import { useUploadImageMutation } from '../../../../services/AdminService';
import { IoArrowBack } from 'react-icons/io5';
// import { useGetProfileDataQuery } from '../../services/AuthServices';

function AdminAddAffiliateLinks({ listData, loading }) {

    const navigate = useNavigate();
    const options = useMemo(() => countryList().getData(), []);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [AddAffiliate] = useAddAffiliateLinkMutation();
    const [FileName, setFileName] = useState('No file choosen');
    const [ImageUrl, setImageUrl] = useState('');
    const [handleImageUploadloading, sethandleImageUploadLoading] = useState(false);

    const [UploadImage] = useUploadImageMutation();

    console.log(submitLoading, 'SubmitLoading')

    console.log(listData, 'listDataProf');
    const previousCountryName = listData?.country;
    const previousCountryCode = useMemo(() => countryList().getValue(previousCountryName || ""));
    const PreviousCountryData = { value: previousCountryCode, label: previousCountryName }

    console.log(PreviousCountryData, 'prevData of Country')


    const initialValues = {
        name: '',
        link: '',
        dropboxLink: '',
        imageUrl: null
        // clickCount: '0',
        // purchases: '0',
        // companyNumber: listData?.companyNumber || '',
    };

    const validationSchema = yup.object().shape({
        name: yup.string().trim("Enter valid name").required("Name is required").strict(),
        link: yup.string().url("Enter a valid link").trim("Enter a valid link").required("Link is required").strict(),
        dropboxLink: yup.string().url("Enter a valid dropbox link").trim("Enter a valid dropbox link").required("Dropbox link is required").strict(),
        imageUrl: yup.string()
            .required("Image is required")
            .strict()
            .matches(/\.(jpg|jpeg|png)$/, "Image must be a valid JPG, JPEG, or PNG file"),
        // clickCount: yup.string().matches(/^\d+$/, "Click count must be a number").required("Click count is required").strict(),
        // purchases: yup.string().matches(/^\d+$/, "Purchases must be a number").required("Purchases count is required").strict(),
        // companyNumber: yup.string().trim("Enter valid number").min(10, "Enter valid number").max(10, "Enter valid number").required("number is required"),
    });

    const handleSubmit = (data) => {
        setSubmitLoading(true);
        // const formData = new FormData();
        // formData.append('image', ImageUrl);
        // formData.append('name', data?.name);
        // formData.append('link', data?.link);
        // formData.append('dropboxLink', data?.dropboxLink);
        let DataForApi = {
            "name": data?.name,
            "link": data?.link,
            "dropboxLink": data?.dropboxLink,
            "imageUrl": ImageUrl
            // "purchases": data?.purchases,
            // "clickCount": data?.clickCount
        }
        // let DataForApi = {
        //     "name": data?.name,
        //     "link": data?.link,
        //     "dropboxLink": data?.dropboxLink,
        //     // "purchases": data?.purchases,
        //     // "clickCount": data?.clickCount
        // }

        AddAffiliate({ data: DataForApi })
            .then((res) => {
                if (res.error) {
                    console.log(res.error, 'res.error');
                    toast.error(res?.error?.data?.message === "Affiliate With Given Name Already Exist." && "Affiliate with this name already exists");
                    setSubmitLoading(false)
                }
                else {
                    console.log(res, 'res');
                    //   toast.success("Data updated successfully");
                    navigate('/dashboard/affiliate-links')
                    setSubmitLoading(false)
                }
            })
            .catch((err) => {
                console.log(err, 'err');
                toast.error("Internal server error");
                setSubmitLoading(false)
            })
    };

    const handleThumbnail = async (event, setFieldValue, setFieldError) => {
        const file = event.target.files[0];

        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (validTypes.includes(file.type)) {
                // Set file name and reset image URL if needed
                setFileName(file.name);
                setImageUrl(''); // Clear previous image URL if you want

                // Optionally: You can proceed with the upload here if needed
                const formData = new FormData();
                formData.append('file', file);
                sethandleImageUploadLoading(true);

                UploadImage({ data: formData })
                    .then((res) => {
                        if (res?.error) {
                            sethandleImageUploadLoading(false);
                            console.log(res?.error?.data?.message || "Internal server error", 'reserror');
                        } else {
                            const url = res?.data?.result?.url;
                            setImageUrl(url);
                            setFieldValue('imageUrl', url);
                            sethandleImageUploadLoading(false);
                        }
                    })
                    .catch((err) => {
                        console.log(err?.data?.error || "Internal server errors", 'err');
                        sethandleImageUploadLoading(false);
                    });
            } else {
                setFieldError("imageUrl", "Please select a valid image file (JPG, JPEG, PNG).")
                setFileName('No file chosen');
                setImageUrl(''); // Clear URL if invalid
            }
        } else {
            setFileName('No file chosen');
            setImageUrl('');
        }
    };

    return (
        <>
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {(profileProps, setFieldValue) => (
                    <Form>
                        {
                            loading ?
                                <div className=' w-full flex items-center justify-center'>
                                    <span className=' w-full flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                        <AiOutlineLoading3Quarters />
                                    </span>
                                </div>
                                :
                                <>
                                    <div className='flex w-full justify-start gap-2 px-1 py-2 mb-3 mt-0'>
                                        <span onClick={() => { navigate('/dashboard/affiliate-links') }} className='font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
                                            <IoArrowBack size={20} />
                                        </span>
                                        <p className='text-[20px] font-semibold'>Add Affiliate</p>
                                    </div>
                                    <Fragment>
                                        <Card className=' w-full'>
                                            {/* <CardHeader>
                                                <H5 className="text-black">Add Affiliate Links</H5>
                                            </CardHeader> */}
                                            <CardBody>
                                                <Row className='g-3 pb-1'>
                                                    <Col md='6'>

                                                        {/* {/ Inp/utControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, in! /} */}
                                                        <InputComponent label={"Name"} type="text" name='name' value={profileProps.values.name} placeholder='Enter affiliate name' onChange={profileProps.handleChange} />
                                                    </Col>
                                                    {/* <Col md='4'>
                                                        <InputComponent label={"Click count"} type={"text"} value={profileProps.values.clickCount} name='clickCount' onChange={profileProps.handleChange} placeholder={"Enter Click count"} />
                                                    </Col> */}
                                                    <Col md='6 mb-3'>
                                                        <InputComponent label={"Link"} type={"text"} value={profileProps.values.link} name='link' onChange={profileProps.handleChange} placeholder={"Enter your link"} />

                                                    </Col>
                                                    {/* {/ <InputComponent label={"Purchases"} type={"text"} value={profileProps.values.purchases} name='purchases' onChange={profileProps.handleChange} placeholder={"Enter purchase count"} /> /} */}
                                                    <br />
                                                    <br />
                                                </Row>
                                                <Row className='g-3'>
                                                    <Col md='6'>
                                                        {/* {/ <InputComponent label={"Link"} type={"text"} value={profileProps.values.link} name='link' onChange={profileProps.handleChange} placeholder={"Enter your link"} /> /} */}
                                                        <InputComponent label={"Dropbox Link"} type={"text"} value={profileProps.values.dropboxLink} name='dropboxLink' onChange={profileProps.handleChange} placeholder={"Enter dropbox link"} />
                                                    </Col>
                                                    <Col md='6'>
                                                        {/* {/ <InputControl control={control} placeholder='select...' controlInput='select' options={StateSelect} className='form-select' errors={errors} register={{ ...register('state', { required: 'is Required.' }) }} /> /} */}
                                                        {/* {/ State /} */}
                                                        {
                                                            handleImageUploadloading ?
                                                                <div  >
                                                                    <span className=' pl-[3px] font-semibold text-[13px]'>Thumnail Image</span>
                                                                    <div className='border rounded-[10px]'>
                                                                        <span className='w-fit  h-10  flex items-center justify-center m-auto self-center animate-spin'>
                                                                            <span className='w-fit'>

                                                                                <AiOutlineLoading3Quarters />
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <InputComponent onChange={(e) => handleThumbnail(e, profileProps.setFieldValue, profileProps.setFieldError)} name={'imageUrl'} fileName={FileName} type={"file"} label={"Thumnail Image"} />
                                                        }
                                                    </Col>
                                                </Row>

                                                {/* <Btn color="primary" type="submit" className="d-block mt-5  w-[120px]">
                                                    {
                                                        submitLoading ?
                                                            <span className=' w-full flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                                                <AiOutlineLoading3Quarters />
                                                            </span>
                                                            :
                                                            "Submit"
                                                    }
                                                </Btn> */}
                                                <button type='submit' className=' d-block mt-5 w-[120px] cursor-pointer p-2 bg-black text-white rounded'>
                                                    {
                                                        submitLoading ?
                                                            <span className=' w-full flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                                                <AiOutlineLoading3Quarters />
                                                            </span>
                                                            :
                                                            "Submit"
                                                    }
                                                </button>
                                            </CardBody>

                                        </Card>
                                    </Fragment>
                                </>

                        }

                    </Form>
                )
                }
                {/* Profile Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt veniam velit porro fugit nulla eligendi iusto veritatis nemo quod! Veniam quia aperiam omnis repellendus, pariatur molestias inventore perferendis ullam magni consequuntur amet repudiandae. Porro debitis perspiciatis modi excepturi ipsa soluta odio cumque provident sapiente sint fugit temporibus, culpa, harum dolor. */}
            </Formik>
            {/* <PasswordUpdate/> */}
        </>
    )
}

export default AdminAddAffiliateLinks;