import React, { useState } from 'react';
import './AssignAffiliate.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoArrowBack, IoEyeOutline } from "react-icons/io5";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import { useAssignAffiliateMutation, useDeAssignAffiliateMutation, useDeleteMultiAssignedUserMutation, useUpdateAssignOfAffiliatMutation, useUpdateCommissionMutation } from '../../../../services/AdminService';
import toast from 'react-hot-toast';
import { Pagination } from '@mui/material';
import AlertComponent from '../../../../components/AlertComponent.jsx';
import { useDispatch } from 'react-redux';

function AssignAffiliate({ AssignedcurrentPage, setAssignedCurrentPage, Assignedcount, AssignedListData, Assignedlistloading, notAssignedlistloading, NotAssignedlistData, setCurrentPage, currentPage, count }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [SelectedUsers, setSelectedUsers] = useState([]);
    const [DeSelectedUsers, setDeSelectedUsers] = useState([])
    const [AssignAffiliate] = useAssignAffiliateMutation();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [DeAssign] = useDeAssignAffiliateMutation()
    const [DeleteMulti] = useDeleteMultiAssignedUserMutation();
    const [UpdateCommitssion] = useUpdateCommissionMutation();
    const [UpdateAssign] = useUpdateAssignOfAffiliatMutation();
    const [checkedOptions, setCheckedOptions] = useState([]);

    const [selectedAssign, setSelectedAssign] = useState();
    const [assignLoading, setAssignLoading] = useState();

    // loading state
    const [commissionLoading, setCommissionLoading] = useState(false);
    const [selectedCommissonIdx, setSelectedCommissonIdx] = useState();

    const paramData = useParams();
    console.log(paramData, 'paramdta');



    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        const value = parseInt(e.target.value);
        console.log(value);

        if (isChecked) {
            setSelectedUsers([...SelectedUsers, { userId: value }])
        }
        else {
            setSelectedUsers((prev) => {

                return prev?.filter((obj, idx) => {
                    return obj?.userId !== value;
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
            console.log(SelectedUsers, "this is the selected user in 121")
            let dataForApi = {
                "details": SelectedUsers
            }
            console.log(SelectedUsers, "selected users in api")
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

    const handleDeleteYes = () => {
        let userIds = checkedOptions.map((itm) => itm?.id);
        console.log(userIds);
        DeleteMulti({ details: userIds })
            .then((res) => {
                if (res.error) {
                    console.log(res.error, 'res.error');
                    toast.error("Internal server error");
                    setSubmitLoading(false)
                }
                else {
                    console.log(res, 'res');
                    toast.success("Deleted user successfully")
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

    const handleDeAssignCLick = () => {
        AlertComponent({ heading: "Are you sure you want to delete selected user?", handleDeleteYes: () => handleDeleteYes(), handleSelected: () => { setCheckedOptions([]) } })
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
    const handleCommissionArray = (value, id, idx) => {
        console.log(value, id, idx, "inside handle commission array");
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

        timeoutId = setTimeout(() => {
            setSelectedUsers(prev => {
                let selectedUsr = [...prev]
                const indexToMatch = selectedUsr.findIndex(obj => obj?.userId === id);
                if (indexToMatch >= 0) {
                    let dobj = {
                        userId: selectedUsr[indexToMatch].userId,
                        commision: Number(value)
                    }
                    selectedUsr[indexToMatch] = dobj
                }
                console.log(selectedUsr)
                return selectedUsr;
            })
        }, 500);
    }
    const handleKeyDown = (e, value, id, idx, type) => {
        if (type === 'assign') {
            const newValue = e.target.value;
            if (newValue === '' || /^\d{1,2}$/.test(newValue)) {
                setCommissionToast({ message: "", id: '' });
                e.target.value = newValue;
                console.log("new value before going in handle commission array", newValue);
                handleCommissionArray(newValue, id, idx);
            } else {
                e.target.value = e.target.value.slice(0, 2);
            }
        } else if (type === 'notAssign') {
            if (e.key === 'Enter') {
                handleCommission(value, id, idx);
            }
        }
    };
    const handleChange = (e) => {
        const newValue = e.target.value;
        if (newValue === '' || /^\d{1,2}$/.test(newValue)) {
            setCommissionToast({ message: "", id: '' });
            e.target.value = newValue;
        } else {
            e.target.value = e.target.value.slice(0, 2);
        }
    };
    const handleBlur = (e, oldValue) => {
        if (e.target.value === '' || e.target.value > 50 || e.target.value < 0) {
            setCommissionToast({ message: "", id: '' });
            e.target.value = oldValue;
        }
    }
    console.log(AssignedListData, NotAssignedlistData);

    const selectHandleAssign = (type, userID, indx, affiliateID) => {
        setAssignLoading(true);
        setSelectedAssign(indx);
        console.log(type, userID, indx);
        UpdateAssign({
            details: [
                { "userId": userID, "type": type },
            ], affiliatId: affiliateID
        })
            .then((res) => {
                console.log(res);
                if (res.error) {
                    toast.error("Internal server error");
                    setAssignLoading(false)

                } else {
                    if (type = "assigned") {
                        toast.success("User Assigned");

                    }
                    else {
                        toast.success("User Deassigned");
                    }
                    setAssignLoading(false)

                }
            })
            .catch((err) => {
                console.error(err);
                setAssignLoading(true)

                toast.error("Failed to update status");
            });
    }

    console.log(AssignedcurrentPage,Assignedcount,handleAssignedPageChange,"424 pagination console")
    return (
        <>
            {
                Assignedlistloading ?
                    <div className=' w-full flex items-center justify-center'>
                        <span className=' w-fit flex  items-center justify-center animate-spin'>
                            <AiOutlineLoading3Quarters />
                        </span>
                    </div> : <div className=' flex flex-col gap-3'>
                        <div className='mb-3'>
                            <div className='flex w-full justify-start gap-2 px-1 py-2 mb-2'>
                                <span onClick={() => { navigate('/dashboard/affiliate-links') }} className='font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
                                    <IoArrowBack size={20} />
                                </span>
                                <span className=' font-semibold text-[20px]'>
                                    Assigned Users
                                </span>
                            </div>
                            <hr className='my-2' />
                            {
                                AssignedListData?.length <= 0 ?
                                    <div className='invoices-page   w-full flex items-center flex-col justify-center'>
                                        <table className='bg-white border-t border-l border-r '>
                                            <thead>
                                                <tr>
                                                    <th>Action</th>
                                                    <th>User Email</th>
                                                    <th>Assigned Affiliate</th>
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
                                                        <th>Assigned Affiliate</th>
                                                        <th>Commission</th>
                                                        <th>Location</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="relative">
                                                    <div className='flex w-full justify-start gap-2 px-1 py-2 mb-2'>
                                                        {checkedOptions.length > 0 && (
                                                            <div className='absolute top-0 mb-1 w-full flex border justify-between right-0 items-center px-3'>
                                                                <span className=''>{checkedOptions.length}, selected user</span>
                                                                <button
                                                                    className='ml-2 p-1 rounded-full'
                                                                    onClick={() => { handleDeAssignCLick() }}
                                                                >
                                                                    <MdDelete size={20} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {
                                                        AssignedListData?.map((itm, indx) => (
                                                            <tr key={indx}>
                                                                <td className='pl-[25px]'>
                                                                    {/* <input value={itm?.id} checked={DeSelectedUsers?.includes(itm?.id)} onChange={handleDeSelectCheckboxChange} type="checkbox" /> */}
                                                                    <input value={itm} checked={checkedOptions.includes(itm)} onChange={(e) => {
                                                                        if (checkedOptions.includes(itm)) {
                                                                            setCheckedOptions(prev => prev.filter(obj => obj !== itm))
                                                                        } else {
                                                                            setCheckedOptions(prev => [...prev, itm])
                                                                        }
                                                                    }} type="checkbox" style={{ accentColor: "black" }} />
                                                                    {/* <span className='cursor-pointer' onClick={() => { handleDeAssignCLick(itm?.id) }}><MdDelete size={20} /></span> */}
                                                                </td>
                                                                <td>{itm?.user?.email || "N/A"}</td>
                                                                <td>
                                                                    {
                                                                        assignLoading && selectedAssign == indx ?
                                                                            <span className=' w-fit flex py-1 items-center justify-center m-auto self-center animate-spin'>
                                                                                <AiOutlineLoading3Quarters />
                                                                            </span>
                                                                            :
                                                                            <select name="status" value={itm?.type} onChange={(e) => selectHandleAssign(e.target.value, itm?.user?.id, indx, itm?.affiliateId)}>
                                                                                <option value="assigned">Assign</option>
                                                                                <option value="deAssigned">Deassign</option>
                                                                            </select>
                                                                    }
                                                                </td>
                                                                <td className='relative '>
                                                                    {commissionLoading && selectedCommissonIdx == indx ?
                                                                        <span className=' w-full flex py-[13px] items-center justify-center m-auto self-center animate-spin'>
                                                                            <AiOutlineLoading3Quarters />
                                                                        </span> :
                                                                        <div className='flex relative forRemovingArrows'><input
                                                                            type="number"
                                                                            min="1"
                                                                            max="50"
                                                                            defaultValue={itm?.user?.commisionByPercentage}
                                                                            onChange={handleChange}
                                                                            onKeyDown={(e) => handleKeyDown(e, e.target.value, itm?.user?.id, indx, 'notAssign')}
                                                                            onBlur={(e) => handleBlur(e, itm?.user?.commisionByPercentage)}
                                                                            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-[60%] p-2.5"
                                                                        />
                                                                            <span className='absolute text-[14px] top-[25%] left-[45%]'>%</span>
                                                                        </div>
                                                                    }
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

                        {/* <div className=' mt-1'>
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
                                                                    <input value={itm?.id} checked={SelectedUsers?.findIndex(obj => obj.userId === itm?.id) >= 0 ? true : false} onChange={handleCheckboxChange} type="checkbox" />
                                                                </td>
                                                                <td className=''>{itm?.email || "N/A"}</td>
                                                                <td className='relative'>
                                                                    {
                                                                        <div className='flex relative'><input
                                                                            disabled={SelectedUsers?.findIndex(obj => obj.userId == itm.id) >= 0 ? false : true}
                                                                            type="number"
                                                                            min="1"
                                                                            max="50"
                                                                            defaultValue={itm?.commisionByPercentage}
                                                                            onChange={(e) => handleKeyDown(e, e.target.value, itm?.id, indx, 'assign')}
                                                                            // Only handle keydown
                                                                            className="bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-fit p-2.5"
                                                                        />
                                                                            <span className='absolute text-[14px] top-[24%] left-[15%]'>%</span>
                                                                        </div>
                                                                    }
                                                                    {commisionToast.id === indx && commisionToast.message && <p className='absolute text-red-400 text-[12px] bottom-[-3px]'>{commisionToast.message}</p>}
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
                        </div> */}
                    </div>

            }
        </>
    );
}

export default AssignAffiliate;
