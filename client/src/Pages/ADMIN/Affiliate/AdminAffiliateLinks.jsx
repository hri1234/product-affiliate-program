import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLink } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Pagination } from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AlertComponent from '../../../components/AlertComponent.jsx';
import { useDeleteAffiliateMutation } from '../../../services/AdminService';
import toast from 'react-hot-toast';

function AdminAffiliateLinks({ listData, loading, setCurrentPage, currentPage, count }) {

    console.log(listData, 'ListDataa');
    const navigate = useNavigate();

    const [DeleteAffiliate] = useDeleteAffiliateMutation()

    const ManageAssignClick = (id) => {
        // console.log(id,'affiliate id')
        navigate(`assign/${id}`)
    }

    const handlePageChange = (e, page) => {
        setCurrentPage(page)
    }

    const handleEdit = (id, name) => {
        console.log(id, 'idd');
        navigate(`edit/${id}`)
    }

    const handleDeleteYes = (id) => {
        // console.log(selectedAffiliate,'DELETED'),
        DeleteAffiliate({ Id: id })
            .then((res) => {
                if (res?.error) {
                    toast.error(res?.error?.data?.message || "Internal server error");
                }
                else {
                    toast.success("Affiliate deleted");
                }
            })
            .catch((err) => {
                toast.error(err?.data || "")
            })

    }

    const handleDeleteClick = (id) => {
        AlertComponent({ heading: "Are you sure to Delete ? ", handleDeleteYes: () => handleDeleteYes(id) })
    }

    return (
        <>
            {
                loading ?
                    <>
                        <div className=' w-full flex items-center justify-center'>
                            <span className=' w-fit flex  items-center justify-center animate-spin'>
                                <AiOutlineLoading3Quarters />
                            </span>
                        </div>
                    </>
                    :

                    <div className=' w-full flex flex-col h-full items-center gap-3 '>
                        <div className=' w-full flex items-center justify-between'>
                            <span>
                                <span className='font-semibold text-[20px]'>
                                    Affiliate Links
                                </span>
                            </span>
                            <span onClick={() => navigate('add')} className=' w-[120px] justify-center flex items-center hover:opacity-90 cursor-pointer p-2 bg-black text-white rounded-full'>
                                <span>

                                    Add Affiliate
                                </span>
                            </span>
                        </div>
                        {
                            listData?.rows?.length <= 0 || listData?.rows == undefined ?
                                <div className=' w-full flex items-center mt-3 justify-center'>
                                    <span className=' border bg-white py-2 rounded w-full flex items-center justify-center'>
                                        No data found
                                    </span>
                                </div>
                                :
                                <div className='w-full flex flex-col h-full items-center gap-8 mt-3 '>

                                    {
                                        listData?.rows?.map((itm) => {
                                            return <>

                                                <div className=' hover:shadow-lg duration-200 w-full flex gap-12 py-[28px] px-4 border bg-white shadow-md rounded-2xl'>
                                                    <div className='w-1/2 shadow-sm rounded-xl h-[220px] p-2 bg-slate-100 flex items-center justify-center'>
                                                        {itm?.imageUrl?.includes("images") ? (
                                                            <img
                                                                className='w-full h-full object-fit rounded-xl'
                                                                src={`${itm?.imageUrl}`}
                                                                alt="Affiliate Link"
                                                            />
                                                        ) : (
                                                            <span className="text-gray-500">No Image Available</span>
                                                        )}
                                                    </div>

                                                    <div className=' w-full  p-1  rounded-xl mr-1 flex flex-col justify-between'>
                                                        <div className=' flex flex-col gap-5'>
                                                            <div className='flex items-center justify-between relative'>
                                                                <span className='font-semibold text-lg'>{itm?.name}</span>
                                                                <div className='flex gap-2 absolute right-[-15px] top-[-16px]'>
                                                                    <span onClick={() => { handleEdit(itm?.id, itm?.name) }} className=' pl-[20px] cursor-pointer hover:opacity-90 '>
                                                                        <FaEdit size={18} />
                                                                    </span>
                                                                    <span onClick={() => handleDeleteClick(itm?.id)} className=' cursor-pointer'>
                                                                        <MdDelete size={19} />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className='flex flex-col gap-3'>

                                                                <span className=' flex gap-2 items-center text-[14.5px] border p-2 text-ellipsis rounded w-full justify-center  cursor-pointer'>
                                                                    <FaLink />
                                                                    {console.log(itm?.shortUrl)}
                                                                    <a className='text-black hover:text-black' href={itm?.link} target='_blank'>
                                                                        {/* Visit link */}
                                                                        {itm?.shortUrl}
                                                                    </a>
                                                                </span>
                                                                <div className=' w-full flex justify-between gap-4'>
                                                                    <span onClick={() => { navigator.clipboard.writeText(itm?.link); toast.success("Link copied") }} className=' border p-[6px] w-full rounded flex items-center justify-center bg-slate-200 cursor-pointer'>
                                                                        Copy link
                                                                    </span>
                                                                    <a href={itm?.link} target='_blank' className=' border hover:text-black p-[6px] w-full rounded flex items-center justify-center bg-slate-200 cursor-pointer'>
                                                                        <span className='hover:text-black' >
                                                                            Visit link
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className=' flex gap-6'>
                                                            <div onClick={() => ManageAssignClick(itm?.id)} className='border rounded px-2 py-1 cursor-pointer'>
                                                                Manage Assign
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        })
                                    }
                                    <div className='w-full flex justify-end mt-3'>
                                        <Pagination
                                            shape="rounded"
                                            variant="outlined"
                                            color="standard"
                                            page={currentPage}
                                            count={count}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                        }
                    </div>
            }

        </>
    )
}

export default AdminAffiliateLinks;