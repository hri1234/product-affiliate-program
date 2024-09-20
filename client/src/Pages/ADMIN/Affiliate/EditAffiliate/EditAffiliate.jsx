// import React from 'react'
// import { IoArrowBack } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';

// function EditAffiliate() {

//     const navigate= useNavigate();

//     return (
//         <div>
//             <div className='flex w-full justify-between px-1 py-2 mb-2'>
//                 <span onClick={() => { navigate('/dashboard/affiliate-links') }} className='font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
//                     <IoArrowBack size={20} />
//                 </span>
//             </div>
//         </div>
//     )
// }

// export default EditAffiliate;
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
import { useNavigate, useParams } from 'react-router-dom';
import { useUploadImageMutation } from '../../../../services/AdminService';
import { IoArrowBack } from 'react-icons/io5';
// import { useGetProfileDataQuery } from '../../services/AuthServices';

function EditAffiliate({ listData, loading }) {

    const navigate = useNavigate();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imageUploadLoading,setImageUploadLoading] = useState(false)
    const [AddAffiliate] = useAddAffiliateLinkMutation();
    const [FileName, setFileName] = useState('No file choosen');
    const [ImageUrl, setImageUrl] = useState('');
    const [ImageData, setImageData] = useState(null);


    const [UploadImage] = useUploadImageMutation();

    console.log(listData, 'listDataa');

    useEffect(() => {
        setImageUrl(listData?.imageUrl || '')
    }, [listData])

    const initialValues = {
        name: listData?.name || '',
        // link: '',
        // dropboxLink: '',
        // clickCount: '0',
        // purchases: '0',
        // companyNumber: listData?.companyNumber || '',
    };

    const validationSchema = yup.object().shape({
        name: yup.string().trim("Enter valid name").required("name is required").strict(),
        // link: yup.string().trim("Enter valid link").required("link is required").strict(),
        // dropboxLink: yup.string().trim("Enter valid dropbox link").required("dropbox link is required").strict(),
        // clickCount: yup.string().matches(/^\d+$/, "Click count must be a number").required("Click count is required").strict(),
        // purchases: yup.string().matches(/^\d+$/, "Purchases must be a number").required("Purchases count is required").strict(),
        // companyNumber: yup.string().trim("Enter valid number").min(10, "Enter valid number").max(10, "Enter valid number").required("number is required"),
    });

    const handleSubmit = (data) => {

        setSubmitLoading(true);

        let DataForApi = {
            "name": data?.name,
            // "link": data?.link,
            // "dropboxLink": data?.dropboxLink,
            // "purchases": data?.purchases,
            // "clickCount": data?.clickCount
        }

        const formData = new FormData();
        formData.append('image', ImageData);
        formData.append('name', data?.name);
        // formData.append('link', data?.link);
        // formData.append('dropboxLink', data?.dropboxLink);

        // AddAffiliate({ data: formData })
        //     .then((res) => {
        //         if (res.error) {
        //             console.log(res.error, 'res.error');
        //             toast.error(res?.error?.data?.message);
        //             setSubmitLoading(false)
        //         }
        //         else {
        //             console.log(res, 'res');
        //             //   toast.success("Data updated successfully");
        //             navigate('/dashboard/affiliate-links')
        //             setSubmitLoading(false)
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err, 'err');
        //         toast.error("Internal server error");
        //         setSubmitLoading(false)
        //     })

        

    };

    const handleThumbnail = async (event) => {
        setImageUploadLoading(true)
        const File = event.target.files[0]; 
        if (File) {

            const formData = new FormData()
            formData.append('file', File);

            UploadImage({ data: formData })
                .then((res) => {
                    if (res?.error) {
                        toast.error(res?.error?.data?.message || "Internal server error")
                        setImageUploadLoading(false)
                    }
                    else {

                        setImageUrl(res?.data?.result?.url)
                        setFileName(File.name);
                        setImageUploadLoading(false)

                    }
                })
                .catch((err) => {
                    console.log(err?.data?.error || "Internal server errors", 'err')
                    setImageUploadLoading(false)

                })
        }
        else {
            setFileName('No file choosen');
            // setImageUrl('');
            setImageUploadLoading(false)

            setImageData(null);
        }

    }


    return (
        <>
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {
                    (profileProps) =>
                    (
                        <Form>
                            {
                                loading ?
                                    <div className=' w-full flex items-center justify-center'>
                                        <span className=' w-full flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                            <AiOutlineLoading3Quarters />
                                        </span>
                                    </div>
                                    :
                                    <div>
                                        <div className='flex w-full justify-between px-1 py-2 mb-2'>
                                            <span onClick={() => { navigate('/dashboard/affiliate-links') }} className='font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
                                                <IoArrowBack size={20} />
                                            </span>
                                        </div>
                                        <Fragment>
                                            <Card className=' w-full'>

                                                <div className='pb-0 pt-4 px-4 flex w-full justify-between'>
                                                    <span className='text-[20px]'>
                                                        Edit Affiliate Link
                                                    </span>
                                                    <span>{ }</span>
                                                </div>
                                                <CardBody>
                                                    <Row className='g-3 pb-1'>
                                                        <Col md='6'>
                                                            {/* <InputControl controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter First Name *' register={{ ...register('first_name', { required: 'is Required.' }) }} /> */}
                                                            {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, in! */}
                                                            <InputComponent label={"Name"} type="text" name='name' value={profileProps.values.name} placeholder='Enter affiliate name' onChange={profileProps.handleChange} />
                                                        </Col>
                                                        {/* <Col md='4'>
                                                        <InputComponent label={"Click count"} type={"text"} value={profileProps.values.clickCount} name='clickCount' onChange={profileProps.handleChange} placeholder={"Enter Click count"} />
                                                    </Col> */}

                                                        {/* <InputComponent label={"Purchases"} type={"text"} value={profileProps.values.purchases} name='purchases' onChange={profileProps.handleChange} placeholder={"Enter purchase count"} /> */}
                                                        <br />
                                                        <br />
                                                    </Row>
                                                    <br />

                                                    <Row className='g-3'>

                                                        <Col md='6 mb-3'>
                                                            <div className='flex flex-col gap-2 '>

                                                                <span className=' font-semibold text-[13px]'>Thumbnail Image</span>
                                                                <span className=' w-full flex gap-0 flex-col '>
                                                                    <img className='w-fit max-w-[450px] max-h-[350px]' src={ImageUrl} alt="" />
                                                                    <span className=' pt-2'>
                                                                        <span className='hidden w-0 h-0'>
                                                                            <input type="file" id='thumbnail' onChange={(e) => handleThumbnail(e)} />
                                                                        </span>
                                                                        <label htmlFor="thumbnail" className='border py-[8px] rounded px-4 bg-slate-200 mt-2'>Change</label>
                                                                    </span>
                                                                </span>

                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <button type='submit' className=' d-block mt-4 w-[120px] cursor-pointer p-2 bg-black text-white rounded'>
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
                                    </div>
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

export default EditAffiliate;