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
import { useEditAffiliateMutation, useUploadImageMutation } from '../../../../services/AdminService';
import { IoArrowBack } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
// import { useGetProfileDataQuery } from '../../services/AuthServices';

function EditAffiliate({ listData, loading }) {

    const navigate = useNavigate();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imageUploadLoading, setImageUploadLoading] = useState(false)
    const [AddAffiliate] = useAddAffiliateLinkMutation();
    const [FileName, setFileName] = useState('No file choosen');
    const [ImageUrl, setImageUrl] = useState('');
    const [ImageData, setImageData] = useState(null);
    const paramData = useParams();
    const AffiliateId = paramData?.id


    const [UploadImage] = useUploadImageMutation();
    const [EditAffilaite] = useEditAffiliateMutation();

    console.log(listData, 'listDataa');

    useEffect(() => {
        setImageUrl(listData?.imageUrl || '')
    }, [listData])

    const initialValues = {
        name: listData?.name || '',
        // link: '',
        dropboxLink: listData?.dropboxLink || '',
        // clickCount: '0',
        // purchases: '0',
        // companyNumber: listData?.companyNumber || '',
    };

    const validationSchema = yup.object().shape({
        name: yup.string().trim("Enter valid name").required("Name is required").strict(),
        dropboxLink: yup.string().url("Enter a valid dropbox link").trim("Enter a valid dropbox link").required("Dropbox link is required").strict(),
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
            "imageUrl": ImageUrl,
            "dropboxLink":data?.dropboxLink
            // "link": data?.link,
            // "dropboxLink": data?.dropboxLink,
            // "purchases": data?.purchases,
            // "clickCount": data?.clickCount
        }
        EditAffilaite({ Id: AffiliateId, data: DataForApi })
            .then((res) => {
                if (res.error) {
                    console.log(res.error, 'res.error');
                    toast.error(res?.error?.data?.message || "Internal server erro");
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

    const handleThumbnail = async (event) => {
        const File = event.target.files[0];
        if (File) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(File.type)) {
                toast.error("Please upload a valid image file (JPG, JPEG, or PNG).");
                return; // Stop the function if the file type is invalid
            }

            const formData = new FormData();
            formData.append('file', File);
            setImageUploadLoading(true);

            UploadImage({ data: formData })
                .then((res) => {
                    if (res?.error) {
                        toast.error(res?.error?.data?.message || "Internal server error");
                        setImageUploadLoading(false);
                    } else {
                        setImageUrl(res?.data?.result?.url);
                        setFileName(File.name);
                        setImageUploadLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err?.data?.error || "Internal server errors", 'err');
                    setImageUploadLoading(false);
                });
        } else {
            setFileName('No file chosen');
            setImageData(null);
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
                {
                    (profileProps) =>
                    (
                        <Form>
                            {
                                loading ?
                                    <div className=' w-full flex items-center justify-center'>
                                        <span className=' w-fit flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                            <AiOutlineLoading3Quarters />
                                        </span>
                                    </div>
                                    :
                                    <div>

                                        <div className='flex w-full justify-start gap-2 px-1 py-2 mb-3 mt-0'>
                                            <span onClick={() => { navigate('/dashboard/affiliate-links') }} className='font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
                                                <IoArrowBack size={20} />
                                            </span>
                                            <p className='text-[20px] font-semibold'>Edit Affiliate Product</p>
                                        </div>
                                        <Fragment>
                                            <Card className=' w-full'>

                                                <CardBody>
                                                    <Row className='g-3 pb-3'>
                                                        <Col md='6'>
                                                            {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, in! */}
                                                            <InputComponent label={"Product Name"} type="text" name='name' value={profileProps.values.name} placeholder='Enter affiliate name' onChange={profileProps.handleChange} />
                                                        </Col>
                                                        <br />
                                                        <br />
                                                    </Row>
                                                    <Row className='g-3 pb-1'>
                                                        <Col md='6'>
                                                            {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, in! */}
                                                            <InputComponent label={"Dropbox Link"} type={"text"} value={profileProps.values.dropboxLink} name='dropboxLink' onChange={profileProps.handleChange} placeholder={"Enter dropbox link"} />
                                                        </Col>
                                                        <br />
                                                        <br />
                                                    </Row>
                                                    <br />

                                                    <Row className='g-3'>

                                                        <Col md='6 mb-3'>
                                                            <div className='flex flex-col gap-2 '>

                                                                <span className=' font-semibold text-[13px]'>Product thumbnail Image</span>
                                                                <span className=' w-full flex gap-2 items-center '>
                                                                    <div className='relative flex justify-between'>
                                                                        {
                                                                            ImageUrl?.includes("image") ?
                                                                                <img className='w-fit max-w-[450px] min-h-[300px] min-w-[400px] max-h-[350px]' src={ImageUrl} alt="" />
                                                                                :
                                                                                <span>
                                                                                    No image found
                                                                                </span>
                                                                        }
                                                                        <span className='absolute right-[-18px] top-[-16px]'>
                                                                            <span className=' w-0 h-0'>
                                                                                <input className='hidden' type="file" id='thumbnail' onChange={(e) => handleThumbnail(e)} />
                                                                                <label htmlFor="thumbnail">
                                                                                    <FaEdit />
                                                                                </label>
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    <span className=' pt-2'>

                                                                        <span className=' py-[8px] rounded px-4  mt-2'>
                                                                            {
                                                                                imageUploadLoading ?
                                                                                    <span className=' w-fit flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                                                                        <AiOutlineLoading3Quarters />
                                                                                    </span>
                                                                                    :
                                                                                    ""
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                </span>

                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <button type='submit' className=' d-block mt-4 w-[120px] cursor-pointer p-2 bg-black text-white rounded-full'>
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