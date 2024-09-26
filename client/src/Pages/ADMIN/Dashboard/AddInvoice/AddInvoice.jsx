import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Row } from 'reactstrap';
import { Btn, H5 } from '../../../../components/AbstractElements';
import { and, CustomStyles, CustomstyleText, CustomstyleText2, CustomstyleText3, CustomstyleText4, CustomstyleText5, form, invalid, novalidate, SubmitForm, TermsText, valid } from '../../../../Constant/index';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import InputComponent from '../../../../components/InputComponent';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { useUpdatePasswordMutation } from '../../services/AuthServices';
import toast from 'react-hot-toast';
import { useAddInvoiceMutation } from '../../../../services/AdminService';

import { useNavigate } from 'react-router-dom';
// import { useGetPasswordUpdateDataQuery } from '../../services/AuthServices';
import Select from 'react-select';
import { useGetAffiliateListQuery, useGetIndividualAffiliateListQuery } from '../../../../services/AffiliateService';
import { IoArrowBack } from 'react-icons/io5';

function AddInvoice({ id, email, companyName }) {
    console.log(companyName)
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);

    // const [UpdatePassword] = useUpdatePasswordMutation();
    const navigate = useNavigate();
    const [AddInvoice] = useAddInvoiceMutation();

    const { data, isLoading: listLoading, isFetching: listFetching } = useGetIndividualAffiliateListQuery({ Id: id })

    const paymentMethodsDetails = [{
        label: "PayPal",
        value: "payPal"
    }]

    useEffect(() => {
        if (listLoading || listFetching) {
            setLoading(true)
        }
        else {
            setLoading(false);
            const transformedData = data?.result?.result?.rows?.map(item => ({
                value: item.id,
                label: item.affiliate.name,
            }));
            setListData(transformedData);
        }
    }, [listLoading, data, listFetching])
    console.log(listData, '----------------------------------------------listData');



    const initialValues = {
        themeName: null,
        domain: '',
        commission: '',
        paymentMethod: null,
        transactionId: '',
        invoiceId: ''
    };

    const validationSchema = yup.object().shape({
        // themeName: yup.string().trim("Enter valid theme name").required("theme name is required").strict(),
        themeName: yup.object().shape({
            label: yup.string().required("Product name is required"),
            value: yup.string().required("Product name is required")
        }).nullable().required("Product name is required"),
        domain: yup.string().trim("Enter valid domain").required("Domain is required").strict(),
        commission: yup.string().matches(/^\d+$/, "Click count must be a number").trim("Enter valid commission").required("Commission is required").strict(),
        paymentMethod: yup.object().shape({
            label: yup.string().required("PaymentMethod is required"),
            value: yup.string().required("PaymentMethod is required")
        }).nullable().required("ThemeName is required"),
        transactionId: yup.string().required("TransactionId is required").trim("Enter valid transactionId"),
        invoiceId: yup.string().trim("Enter valid invoiceId"),
    });

    const handleSubmit = (data, { resetForm }) => {

        console.log('---------------------------------submit');


        let dataForApi = {
            "userId": id,
            "themeName": data?.themeName?.label,
            "domain": data?.domain,
            "commission": data?.commission,
            "paymentMethod": data?.paymentMethod?.value,
            "transactionId": data?.transactionId,
            "invoiceId": data?.invoiceId,
        }
        console.log(dataForApi, 'dataforAPI')
        AddInvoice({ data: dataForApi })
            .then((res) => {
                if (res?.error?.status == 400) {
                    console.log(res?.error, 'resError');
                    toast.error(res?.error?.data?.error)
                }
                else {
                    toast.success("Invoice added");
                    navigate('/dashboard')
                }
            })
            .catch((err) => {
                console.log(err, 'catchErr')
            })
    };


    return (
        <>
            {
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
                                <span className='text-[20px] font-semibold'>
                                    Add Invoice
                                </span>
                                <div className='flex w-full justify-between mt-4 mb-4 px-1 py-0 '>

                                    {/* <span onClick={() => { navigate('/dashboard') }} className='font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
                      <IoArrowBack size={20} />
                    </span> */}
                                    <div className=' flex gap-2 items-center'>
                                        <span onClick={() => { navigate('/dashboard') }} className=' w-fit font-semibold underline text-[16px]  px-1 py-1 bg-white border rounded cursor-pointer'>
                                            <IoArrowBack size={20} />
                                        </span>
                                        <span className=''>
                                            {companyName || ''}
                                        </span>
                                    </div>

                                    <span className=' pt-0'>
                                        {email || ''}
                                    </span>
                                </div>

                                <Fragment>
                                    <Card className=' w-full'>

                                        <CardBody>
                                            <Row className='g-3'>
                                                <Col md='6'>
                                                    {/* <InputControl controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter First Name *' register={{ ...register('first_name', { required: 'is Required.' }) }} /> */}
                                                    {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, in! */}

                                                    {/* <Col md="12"> */}
                                                    <div className=' relative'>
                                                        <span className=' pl-[3px] font-semibold text-[13px]'>{"Product Name"}</span>
                                                        <Select
                                                            placeholder="Select product"
                                                            options={listData}
                                                            name="themeName"
                                                            value={profileProps.values.themeName}
                                                            // value={[{value:"IN",label:'India'}]}
                                                            onChange={value => profileProps.setFieldValue('themeName', value)}
                                                            styles={{
                                                                control: (baseStyles, state) => ({
                                                                    ...baseStyles,
                                                                    borderRadius: '8px', // Add border-radius
                                                                    border: '1px solid rgb(222, 226, 230)', // Default border color
                                                                    fontSize: '15px',
                                                                    letterSpacing: '.8px',
                                                                    boxShadow: 'none', // Remove box-shadow entirely
                                                                    borderColor: 'rgb(222, 226, 230)', // Keep border consistent on focus/hover
                                                                    '&:hover': {
                                                                        borderColor: 'rgb(222, 226, 230)', // Gray border on hover
                                                                    },
                                                                }),

                                                                option: (baseStyles, state) => ({
                                                                    ...baseStyles,
                                                                    fontSize: '15px' // Smaller font size for each option

                                                                }),
                                                                indicatorSeparator: () => ({
                                                                    display: 'none', // Hide the line near the arrow button
                                                                }),
                                                            }}
                                                        />
                                                        <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px]  mt-0' name={"themeName"} component='div' />
                                                    </div>
                                                    {/* </Col> */}


                                                    {/* <InputComponent label={"Theme name"} type="text" name='themeName' value={profileProps.values.themeName} placeholder='Enter theme name' onChange={profileProps.handleChange} /> */}





                                                </Col>
                                                <Col md='6'>
                                                    {/* <InputControl controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter Last Name *' register={{ ...register('last_name', { required: 'is Required.' }) }} /> */}
                                                    {/* Inp control Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, dolorum. */}
                                                    <InputComponent label={"Domain"} type={"text"} value={profileProps.values.domain} name='domain' onChange={profileProps.handleChange} placeholder={"Enter domain"} />
                                                    <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px]  mt-0' name={"domain"} component='div' />
                                                </Col>
                                            </Row >
                                            <br></br>
                                            <Row className='g-3'>
                                                <Col md='6'>
                                                    {/* <InputControl pereFix='@' controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter Last Name *' register={{ ...register('user_name', { required: 'is Required.' }) }} /> */}
                                                    {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quo accusantium incidunt eum distinctio atque! */}
                                                    {/* <InputComponent label={"Payment Method"} type={"text"} value={profileProps.values.paymentMethod} name='paymentMethod' onChange={profileProps.handleChange} placeholder={"Enter Source Id"} /> */}


                                                    <div className=' relative'>
                                                        <span className=' pl-[3px] font-semibold text-[13px]'>{"Payment Method"}</span>
                                                        <Select
                                                            placeholder="Select payment method"
                                                            options={paymentMethodsDetails}
                                                            name="paymentMethod"
                                                            value={profileProps.values.paymentMethod}
                                                            // value={[{value:"IN",label:'India'}]}
                                                            onChange={value => profileProps.setFieldValue('paymentMethod', value)}
                                                            styles={{
                                                                control: (baseStyles, state) => ({
                                                                    ...baseStyles,
                                                                    borderRadius: '8px', // Add border-radius
                                                                    border: '1px solid rgb(222, 226, 230)', // Default border color
                                                                    fontSize: '15px',
                                                                    letterSpacing: '.8px',
                                                                    boxShadow: 'none', // Remove box-shadow entirely
                                                                    borderColor: 'rgb(222, 226, 230)', // Keep border consistent on focus/hover
                                                                    '&:hover': {
                                                                        borderColor: 'rgb(222, 226, 230)', // Gray border on hover
                                                                    },
                                                                }),

                                                                option: (baseStyles, state) => ({
                                                                    ...baseStyles,
                                                                    fontSize: '15px' // Smaller font size for each option

                                                                }),
                                                                indicatorSeparator: () => ({
                                                                    display: 'none', // Hide the line near the arrow button
                                                                }),
                                                            }}
                                                        />
                                                        <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px]  mt-0' name={"paymentMethod"} component='div' />
                                                    </div>


                                                </Col>
                                                <Col md='6'>
                                                    {/* <InputControl pereFix='@' controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter Last Name *' register={{ ...register('user_name', { required: 'is Required.' }) }} /> */}
                                                    {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quo accusantium incidunt eum distinctio atque! */}
                                                    <InputComponent label={"Transaction Id"} type={"text"} value={profileProps.values.transactionId} name='transactionId' onChange={profileProps.handleChange} placeholder={"Enter transaction id"} />
                                                    <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px]  mt-0' name={"transactionId"} component='div' />
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row className='g-3'>
                                                <Col md='6'>
                                                    {/* <InputControl pereFix='@' controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter Last Name *' register={{ ...register('user_name', { required: 'is Required.' }) }} /> */}
                                                    {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quo accusantium incidunt eum distinctio atque! */}
                                                    <InputComponent label={"Invoice Id"} type={"text"} value={profileProps.values.invoiceId} name='invoiceId' onChange={profileProps.handleChange} placeholder={"Enter invoice id"} />
                                                    <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px]  mt-0' name={"invoiceId"} component='div' />
                                                </Col >
                                                <Col md='6'>
                                                    {/* <InputControl pereFix='@' controlInput='input' className='form-control' type='text' errors={errors} placeholder='Enter Last Name *' register={{ ...register('user_name', { required: 'is Required.' }) }} /> */}
                                                    {/* InputControl Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quo accusantium incidunt eum distinctio atque! */}
                                                    <InputComponent label={"Commission"} type={"text"} value={profileProps.values.commission} name='commission' onChange={profileProps.handleChange} placeholder={"Enter commission"} />
                                                    <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px]  mt-0' name={"commission"} component='div' />
                                                </Col>
                                            </Row >
                                            {/* <Btn color="primary" type="submit" className="d-block mt-4  w-[120px] rounded-full">
                                                Submit
                                            </Btn> */}
                                            < div className=' w-[120px] mt-3' >
                                                <button className=" bg-black text-white w-fit py-[6.5px] border w-100 mt-2 rounded" type="submit">
                                                    Submit
                                                </button>
                                            </div >
                                        </CardBody >
                                    </Card >
                                </Fragment >


                            </Form >
                        )
                    }
                    {/* Profile Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt veniam velit porro fugit nulla eligendi iusto veritatis nemo quod! Veniam quia aperiam omnis repellendus, pariatur molestias inventore perferendis ullam magni consequuntur amet repudiandae. Porro debitis perspiciatis modi excepturi ipsa soluta odio cumque provident sapiente sint fugit temporibus, culpa, harum dolor. */}
                </Formik >
            }
        </>
    )
}

export default AddInvoice;