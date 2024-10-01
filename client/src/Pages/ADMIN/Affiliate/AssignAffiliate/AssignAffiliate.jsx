import React, { useState } from 'react';
import './AssignAffiliate.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoArrowBack, IoEyeOutline } from "react-icons/io5";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import { useAssignAffiliateMutation, useDeAssignAffiliateMutation, useUpdateCommissionMutation } from '../../../../services/AdminService';
import toast from 'react-hot-toast';
import { Pagination } from '@mui/material';
import AlertComponent from '../../../../components/AlertComponent.jsx';
import { useDispatch } from 'react-redux';
import { ClearAdminAssignSearchQuery } from '../../../../Redux/SearchSlice/SearchSlice.jsx';


function AssignAffiliate({ AssignedcurrentPage, setAssignedCurrentPage, Assignedcount, AssignedListData, Assignedlistloading, notAssignedlistloading, NotAssignedlistData, setCurrentPage, currentPage, count }) {
    const invoices = [
        {
            id: 1,
            themeName: "Elegant Portfolio",
            domain: "elegantportfolio.com",
            date: "2024-09-01",
            commission: "$200",
            status: "Paid",
        },
        {
            id: 2,
            themeName: "Modern Blog",
            domain: "modernblog.net",
            date: "2024-08-15",
            commission: "$150",
            status: "Pending",
        },
        {
            id: 3,
            themeName: "Tech Startup",
            domain: "techstartup.io",
            date: "2024-07-30",
            commission: "$300",
            status: "Paid",
        },
        {
            id: 4,
            themeName: "ItGeeks",
            domain: "itgeeks.io",
            date: "2024-08-30",
            commission: "$100",
            status: "Paid",
        },
        {
            id: 5,
            themeName: "Krown",
            domain: "Krown.io",
            date: "2024-08-30",
            commission: "$120",
            status: "Pending",
        }
    ];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [SelectedUsers, setSelectedUsers] = useState([]);
    const [DeSelectedUsers, setDeSelectedUsers] = useState([])
    const [AssignAffiliate] = useAssignAffiliateMutation();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [DeAssign] = useDeAssignAffiliateMutation()
    const [UpdateCommitssion] = useUpdateCommissionMutation();

    // loading state
    const [commissionLoading, setCommissionLoading] = useState(false);
    const [selectedCommissonIdx, setSelectedCommissonIdx] = useState();
    const paramData = useParams();
    console.log(paramData, 'paramdta');



    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        const value = parseInt(e.target.value);

        if (isChecked) {
            setSelectedUsers([...SelectedUsers, value])
        }
        else {
            setSelectedUsers((prev) => {

                return prev?.filter((id) => {
                    return id !== value;
                }
                )
            })
        }
    }

    const handleDeSelectCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        const value = parseInt(e.target.value);

        if (isChecked) {
            setDeSelectedUsers([...DeSelectedUsers, value])
        }
        else {
            setDeSelectedUsers((prev) => {

                return prev?.filter((id) => {
                    return id !== value;
                }
                )
            })
        }
    }



    const handleSubmit = () => {
        if (SelectedUsers?.length <= 0) {
            toast.error("Select at least one user")
        }
        else {

            let dataForApi = {
                "userId": SelectedUsers
            }
            AssignAffiliate({ Id: paramData?.id, data: dataForApi })
                .then((res) => {
                    if (res.error) {
                        console.log(res.error, 'res.error');
                        toast.error("Internal server error");
                        setSubmitLoading(false)
                    }
                    else {
                        console.log(res, 'res');
                        toast.success("Affiliate assigned successfull")
                        setSubmitLoading(false);
                        setSelectedUsers([]);
                        setCurrentPage(1);
                    }
                })
                .catch((err) => {
                    console.log(err, 'err');
                    toast.error("Internal server error");
                    setSubmitLoading(false)
                })
        }




        console.log(SelectedUsers, 'selectedUsers');

    }
    console.log(

        AssignedListData
    )

    const handleDeAssignSubmit = () => {
        if (DeSelectedUsers?.length <= 0) {
            toast.error("Select at least one user")
        }
        else {

            let dataForApi = {
                "userId": DeSelectedUsers
            }
            DeAssign({ Id: paramData?.id, data: dataForApi })
                .then((res) => {
                    if (res.error) {
                        console.log(res.error, 'res.error');
                        toast.error("Internal server error");
                        setSubmitLoading(false)
                    }
                    else {
                        console.log(res, 'res');
                        toast.success("Affiliate assigned successfull")
                        setSubmitLoading(false);
                        setSelectedUsers([])
                    }
                })
                .catch((err) => {
                    console.log(err, 'err');
                    toast.error("Internal server error");
                    setSubmitLoading(false)
                })
        }




        console.log(DeSelectedUsers, 'DeselectedUsers');

    }

    const handlePageChange = (e, page) => {
        setCurrentPage(page)
    }

    const handleAssignedPageChange = (e, page) => {
        setAssignedCurrentPage(page)
    }

    const handleDeleteYes = (id) => {
        DeAssign({ Id: id })
            .then((res) => {
                if (res.error) {
                    console.log(res.error, 'res.error');
                    toast.error("Internal server error");
                    setSubmitLoading(false)
                }
                else {
                    console.log(res, 'res');
                    toast.success("Affiliate Unassigned successfull")
                    setSubmitLoading(false);
                    setSelectedUsers([])
                }
            })
            .catch((err) => {
                console.log(err, 'err');
                toast.error("Internal server error");
                setSubmitLoading(false)
            })

    }

    const handleDeAssignCLick = (id) => {
        AlertComponent({ heading: "Are you sure to Delete ? ", handleDeleteYes: () => handleDeleteYes(id) })

    }
    const [commisionToast, setCommissionToast] = useState({
        message: '',
        id: ''
    });
    let timeoutId;
    //     UpdateCommitssion({
    //         Id: id, data: {
    //             commission: Number(value)
    //         }
    //     }).then(res => {
    //         if (res.error) {
    //             console.log(res.error, 'res.error');
    //             toast.error("Internal server error");
    //             setAssignedlistloadingCommission(false);

    //         }
    //         else {
    //             console.log(res, 'res');
    //             toast.success("Commission updated successfully");
    //             setAssignedlistloadingCommission(false);

    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //         setAssignedlistloadingCommission(false);
    //     });
    // }
    // Function to handle keydown event
    const handleCommission = (value, id, idx) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        if (value === "" || value === null || value === undefined) {
            setCommissionToast(
                {
                    message: "Commission is required",
                    id: idx
                }
            );
            // toast.error("Commission is required");
            return;
        }
        const numericValue = Number(value);
        if (numericValue < 1 || numericValue > 50) {
            setCommissionToast(
                {
                    message: "Commission should be between 1-50",
                    id: idx
                }
            );
            // toast.error("Commission should be between 1-50");
            return;
        }
        setCommissionLoading(true);
        setSelectedCommissonIdx(idx);
        timeoutId = setTimeout(() => {
            UpdateCommitssion({
                Id: id,
                data: {
                    commission: numericValue
                }
            }).then(res => {
                if (res.error) {
                    console.log(res.error, 'res.error');
                    toast.error("Internal server error");
                    setCommissionLoading(false);
                } else {
                    console.log(res, 'res');
                    toast.success("Commission updated successfully");
                    setCommissionLoading(false);
                }
            }).catch((err) => {
                console.log(err);
                toast.error("An error occurred while updating the commission");
                setCommissionLoading(false);
            });
        }, 500);
    };
    const handleKeyDown = (e, value, id, idx) => {
        if (e.key === 'Enter') {
            handleCommission(value, id, idx);
        }
    };
    console.log(AssignedListData, NotAssignedlistData)
    return (
        <>
            {
                notAssignedlistloading || Assignedlistloading ?
                    <div className=' w-full flex items-center justify-center'>
                        <span className=' w-fit flex  items-center justify-center animate-spin'>
                            <AiOutlineLoading3Quarters />
                        </span>
                    </div>
                    :
                    <div className=' flex flex-col gap-3'>
                        <div className='mb-3'>
                            <div className='flex w-full justify-start gap-2 px-1 py-2 mb-2'>
                                <span onClick={() => { navigate('/dashboard/affiliate-links') }} className='font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
                                    <IoArrowBack size={20} />
                                </span>
                                <span className=' font-semibold text-[20px]'>
                                    Manage Assign
                                </span>
                            </div>
                            <hr className='my-4' />
                            <span className=' font-semibold text-[20px]'>
                                Assigned Users
                            </span>

                            {
                                AssignedListData?.rows?.length <= 0 || AssignedListData?.rows == undefined ?
                                    <div className='invoices-page   w-full mt-1 flex items-center flex-col justify-center'>
                                        <table className='bg-white border-t border-l border-r '>
                                            <thead>
                                                <tr>
                                                    <th>Action</th>
                                                    <th>User Email</th>
                                                    <th>Commission</th>
                                                    <th>Location</th>

                                                </tr>
                                            </thead>
                                        </table>
                                        <span className=' border-b border-r border-l  bg-white py-3 rounded w-full flex items-center justify-center'>
                                            No data found
                                        </span>
                                    </div>
                                    :

                                    <div className='invoices-page'>
                                        <div className='table-container'>
                                            <table className=''>
                                                <thead>
                                                    <tr>
                                                        <th>Action</th>
                                                        <th>User Email</th>
                                                        <th>Commission</th>
                                                        <th>Location</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        AssignedListData?.rows?.map((itm, indx) => (
                                                            <tr key={indx}>
                                                                <td className=' flex gap-2 items-center mt-1 pl-[30px]'>
                                                                    {/* <input value={itm?.id} checked={DeSelectedUsers?.includes(itm?.id)} onChange={handleDeSelectCheckboxChange} type="checkbox" /> */}
                                                                    <span className='cursor-pointer' onClick={() => { handleDeAssignCLick(itm?.id) }}><MdDelete size={20} /></span>
                                                                </td>
                                                                <td>{itm?.user?.email || "N/A"}</td>
                                                                <td className='relative'>
                                                                    {commissionLoading && selectedCommissonIdx == indx ?
                                                                        <span className=' w-fit flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                                                            <AiOutlineLoading3Quarters />
                                                                        </span> :
                                                                        <input
                                                                            type="number"
                                                                            min="1"
                                                                            max="50"
                                                                            defaultValue={itm?.user?.commisionByPercentage}
                                                                            onChange={() => setCommissionToast({ message: "", id: '' })}
                                                                            onKeyDown={(e) => handleKeyDown(e, e.target.value, itm?.user?.id, indx)} // Only handle keydown
                                                                            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                                                                        />}
                                                                    {commisionToast.id === indx && commisionToast.message && <p className='absolute text-red-400 text-[12px] bottom-[2px]'>{commisionToast.message}</p>}
                                                                </td>
                                                                <td>{itm?.user?.city},  {itm?.user?.country || "N/A"}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                    <tr className="spacer-row">
                                                        <td colSpan="5"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className=' w-full flex justify-end items-center mt-3'>

                                            {/* <button onClick={() => handleDeAssignSubmit()} className=' w-[120px] bg-black text-white rounded py-2 '>
                                                Submit
                                            </button> */}
                                            <Pagination
                                                shape="rounded"
                                                variant="outlined"
                                                color="standard"
                                                page={AssignedcurrentPage}
                                                count={Assignedcount}
                                                onChange={handleAssignedPageChange}
                                            />
                                        </div>
                                    </div>
                            }
                        </div>

                        {/* <br /> */}
                        <hr />

                        <div className=' mt-1'>
                            <span className='font-semibold text-[20px]'>
                                Not Assigned Users
                            </span>
                            {
                                NotAssignedlistData?.result?.rows?.length <= 0 || NotAssignedlistData?.result?.rows == undefined ?
                                    <div className='invoices-page   w-full mt-1 flex items-center flex-col justify-center'>
                                        <table className='bg-white border-t border-l border-r '>
                                            <thead>
                                                <tr>
                                                    <th>Action</th>
                                                    <th>User Email</th>
                                                    <th>Commission</th>
                                                    <th>Location</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        <span className=' border-b border-r border-l  bg-white py-3 rounded w-full flex items-center justify-center'>
                                            No data found
                                        </span>
                                    </div>
                                    :
                                    <>
                                        <div className='invoices-page'>
                                            <div className='table-container'>
                                                <table className=''>
                                                    <thead>
                                                        <tr>
                                                            <th>Action</th>
                                                            <th>User Email</th>
                                                            <th>Commission</th>
                                                            <th>Location</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {NotAssignedlistData?.result?.rows?.map((itm, indx) => (
                                                            <tr key={indx} className=''>
                                                                <td className='  pl-[30px]'>
                                                                    <input value={itm?.id} checked={SelectedUsers?.includes(itm?.id)} onChange={handleCheckboxChange} type="checkbox" />
                                                                </td>
                                                                <td className=''>{itm?.email || "N/A"}</td>
                                                                <td className='relative'>
                                                                    {commissionLoading && selectedCommissonIdx == indx ?
                                                                        <span className=' w-fit flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                                                            <AiOutlineLoading3Quarters />
                                                                        </span> :
                                                                        <input
                                                                            disabled={!SelectedUsers?.includes(itm?.id)}
                                                                            type="number"
                                                                            min="1"
                                                                            max="50"
                                                                            defaultValue={itm?.commisionByPercentage}
                                                                            onChange={() => setCommissionToast({ message: "", id: '' })}
                                                                            onKeyDown={(e) => handleKeyDown(e, e.target.value, itm?.id, indx)} // Only handle keydown
                                                                            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                                                                        />}
                                                                    {commisionToast.id === indx && commisionToast.message && <p className='absolute text-red-400 text-[12px] bottom-[2px]'>{commisionToast.message}</p>}
                                                                </td>
                                                                <td>{itm?.city},  {itm?.country || "N/A"}</td>
                                                            </tr>
                                                        ))
                                                        }
                                                        <tr className="spacer-row">
                                                            <td colSpan="5"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className='w-full flex justify-between px-2'>

                                            <button onClick={() => handleSubmit()} disabled={SelectedUsers?.length <= 0 ? true : false} className={` ${SelectedUsers?.length <= 0 ? "opacity-70" : ""} w-[120px] bg-black text-white rounded-full py-2 mt-3`}>
                                                Submit
                                            </button>
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
                                    </>
                            }
                        </div>
                    </div>

            }
        </>
    );
}

export default AssignAffiliate;
