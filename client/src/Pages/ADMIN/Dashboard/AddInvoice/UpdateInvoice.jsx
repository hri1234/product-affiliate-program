import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Row } from 'reactstrap';
import { Btn, H5 } from '../../../../components/AbstractElements';
import { and, CustomStyles, CustomstyleText, CustomstyleText2, CustomstyleText3, CustomstyleText4, CustomstyleText5, form, invalid, novalidate, SubmitForm, TermsText, valid } from '../../../../Constant/index';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import InputComponent from '../../../../components/InputComponent';
import toast from 'react-hot-toast';
import { useUpdateInvoiceMutation } from '../../../../services/AdminService';

import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useGetAffiliateListQuery, useGetIndividualAffiliateListQuery } from '../../../../services/AffiliateService';
import { IoArrowBack } from 'react-icons/io5';

const UpdateInvoice = ({ tData }) => {
    const DefaultTheme = [
        {
            "value": 366,
            "label": "Igloo Shopify Theme"
        },
        {
            "value": 367,
            "label": "Energy Shopify Theme"
        },
        {
            "value": 368,
            "label": "Easy Subscription Shopify App"
        }
    ]

    const DefaultPayment = {

    }
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(tData);

    const navigate = useNavigate();
    const [UpdateInvoice] = useUpdateInvoiceMutation();

    const { data, isLoading: listLoading, isFetching: listFetching } = useGetIndividualAffiliateListQuery({ Id: tData?.userId })

    const paymentStatusDetails = [
        {
            label: "Pending",
            value: "pending"
        },
        {
            label: "Paid",
            value: "paid"
        },
    ]

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


    const DefaultThemesec = DefaultTheme?.find(itm => itm.label === tData?.themeName)
    const Defaultpayementsec = paymentStatusDetails.find(itm => itm.label === tData?.status)
    const initialValues = {
        themeName: DefaultThemesec,
        commission: String(tData?.commission || ''),
        transactionId: tData?.transactionId,
        invoiceId: tData?.invoiceId,
        paymentStatus: Defaultpayementsec,
        shopifyUrl: tData?.shopifyUrl
    };

    const validationSchema = yup.object().shape({
        themeName: yup.object().shape({
            label: yup.string().required("Product name is required"),
            value: yup.string().required("Product name is required")
        }).nullable().required("Product name is required"),
        paymentStatus: yup.object().shape({
            label: yup.string().required("Payment status is required"),
            value: yup.string().required("Payment status is required")
        }).nullable().required("Payment status is required"),
        commission: yup.string().matches(/^\d+$/, "Commission must be a number").trim("Enter valid commission").required("Commission is required").strict(),
        // transactionId: yup.string().required("TransactionId is required").trim("Enter valid transactionId"),
        invoiceId: yup.string().trim("Enter valid invoiceId"),
        shopifyUrl: yup.string()
            .url("Enter a valid shopify url").required("Url is required")
            .trim("Enter valid shopify url").strict(),
    });

    const handleSubmit = (data, { resetForm }) => {

        let dataForApi = {
            "id": tData?.id,
            "themeName": data?.themeName?.label,
            "commission": data?.commission,
            "paymentMethod": 'payPal',
            "transactionId": data?.transactionId,
            "invoiceId": data?.invoiceId,
            "status": data?.paymentStatus?.label,
            "shopifyUrl": data?.shopifyUrl
        }
        console.log(dataForApi);

        UpdateInvoice({ data: dataForApi })
            .then((res) => {
                if (res?.error?.status == 400) {
                    toast.error(res?.error?.data?.error)
                }
                else {
                    toast.success("Invoice Updated");
                    const data = { email: tData?.email, companyName: tData?.companyName }
                    navigate(`/dashboard/invoice/view/${tData?.userId}`, { state: data })
                }
            })
            .catch((err) => {
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
                                    Update Invoice
                                </span>
                                <div className='flex w-full justify-between mt-4 mb-4 px-1 py-0 '>
                                    <div className=' flex gap-2 items-center'>
                                        <span onClick={() => { navigate('/dashboard') }} className=' w-fit font-semibold underline text-[16px]  px-1 py-1 bg-white border rounded cursor-pointer'>
                                            <IoArrowBack size={20} />
                                        </span>
                                        <span className=''>
                                            {/* {companyName || '-'} */}
                                        </span>
                                    </div>

                                    <span className=' pt-0'>
                                        {/* {email || ''} */}
                                    </span>
                                </div>

                                <Fragment>
                                    <Card className=' w-full'>
                                        <CardBody>
                                            <Row className='g-3'>
                                                <Col md='6'>
                                                    <div className=' relative'>
                                                        <span className=' pl-[3px] font-semibold text-[14px]'>{"Product Name"}</span>
                                                        <Select
                                                            placeholder="Select product"
                                                            options={listData}
                                                            name="themeName"
                                                            defaultValue={DefaultTheme.find(itm => itm.label === tData?.themeName)}
                                                            onChange={value => { profileProps.setFieldValue('themeName', value); }}
                                                            styles={{
                                                                control: (baseStyles, state) => ({
                                                                    ...baseStyles,
                                                                    borderRadius: '8px',
                                                                    border: '1px solid rgb(222, 226, 230)',
                                                                    fontSize: '13px',
                                                                    letterSpacing: '.8px',
                                                                    boxShadow: 'none',
                                                                    borderColor: 'rgb(222, 226, 230)',
                                                                    '&:hover': {
                                                                        borderColor: 'rgb(222, 226, 230)',
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
                                                        <ErrorMessage className='text-red-400 absolute text-[12px] pl-[4px]  mt-0' name={"themeName"} component='div' />
                                                    </div>
                                                    {/* </Col> */}
                                                    {/* <InputComponent label={"Theme name"} type="text" name='themeName' value={profileProps.values.themeName} placeholder='Enter theme name' onChange={profileProps.handleChange} /> */}
                                                </Col>

                                                <Col md='6'>
                                                    <div className=' relative'>
                                                        <span className=' pl-[3px] font-semibold text-[14px]'>{"Payment Status"}</span>
                                                        <Select
                                                            placeholder="Payment status"
                                                            options={paymentStatusDetails}
                                                            name="paymentStatus"

                                                            defaultValue={paymentStatusDetails.find(itm => itm.label === tData?.status)}

                                                            onChange={value => { profileProps.setFieldValue('paymentStatus', value); console.log(value); }}
                                                            styles={{
                                                                control: (baseStyles, state) => ({
                                                                    ...baseStyles,
                                                                    borderRadius: '8px',
                                                                    border: '1px solid rgb(222, 226, 230)',
                                                                    fontSize: '13px',
                                                                    letterSpacing: '.8px',
                                                                    boxShadow: 'none',
                                                                    borderColor: 'rgb(222, 226, 230)',
                                                                    '&:hover': {
                                                                        borderColor: 'rgb(222, 226, 230)',
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
                                                        <ErrorMessage className='text-red-400 absolute text-[12px] pl-[4px]  mt-0' name={"paymentStatus"} component='div' />
                                                    </div>
                                                </Col>
                                            </Row >
                                            <br></br>
                                            <Row className='g-3'>
                                                <Col md='6'>
                                                    <InputComponent defaultValue={tData?.transactionId} label={"Transaction Id"} type={"text"} name='transactionId' onChange={profileProps.handleChange} placeholder={"Enter transaction id"} />
                                                </Col>
                                                <Col md='6'>
                                                    <InputComponent defaultValue={tData?.invoiceId} label={"Invoice Id"} type={"text"} name='invoiceId' onChange={profileProps.handleChange} placeholder={"Enter invoice id"} />
                                                    <ErrorMessage className='text-red-400 absolute text-[14px] pl-[4px]  mt-0' name={"invoiceId"} component='div' />
                                                </Col >
                                            </Row>
                                            <br></br>
                                            <Row className='g-3'>
                                                <Col md='6'>
                                                    <InputComponent
                                                        label={"Commission"}
                                                        defaultValue={tData?.commission}
                                                        type={"text"}
                                                        name='commission'
                                                        onChange={profileProps.handleChange}
                                                        placeholder={"Enter commission"} />
                                                </Col>
                                                <Col md='6'>
                                                    <InputComponent
                                                        label={"Shopify Url"}
                                                        type={"text"}
                                                        defaultValue={tData?.shopifyUrl}
                                                        name='shopifyUrl'
                                                        onChange={profileProps.handleChange}
                                                        placeholder={"Enter Shopify Url"} />
                                                </Col>
                                            </Row >

                                            < div className=' w-[120px] mt-3' >
                                                <button className=" bg-black text-white w-fit py-[6.5px] border w-100 mt-2 rounded-full" type="submit">
                                                    Update
                                                </button>
                                            </div >
                                        </CardBody >
                                    </Card >
                                </Fragment >


                            </Form >
                        )
                    }
                </Formik >
            }
        </>
    )
}

export default UpdateInvoice