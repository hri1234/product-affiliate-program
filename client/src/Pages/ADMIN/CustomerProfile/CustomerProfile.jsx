import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function CustomerProfile({ loading, profileData }) {
  const navigate = useNavigate();
  return (
    <>
      {
        loading ?
          <>
            <div className="flex justify-center items-center h-[80vh]">
              <span className="animate-spin text-2xl">
                <AiOutlineLoading3Quarters />
              </span>
            </div>
          </>
          :
          <div>
            <div className='flex w-full justify-start gap-2 px-1 py-2 mb-3 mt-3'>
              <span onClick={() => { navigate('/dashboard') }} className='font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
                <IoArrowBack size={20} />
              </span>
              <p className='text-[20px] font-semibold'>Customer Details</p>
            </div>
            <div className="w-full mx-auto p-6 bg-white shadow-sm rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2 mt-4">
                <div className="space-y-2 flex flex-col">
                  <span className='flex gap-2'><span className="font-semibold">Id:</span> {profileData?.id}</span>
                  <span className='flex gap-2'><span className="font-semibold">Company Name:</span> {profileData?.companyName}</span>
                </div>
                <div className="space-y-2 flex flex-col">
                  <span className='flex gap-2'><span className="font-semibold">Email:</span> {profileData?.email}</span>
                  <span className='flex gap-2'  ><span className="font-semibold">Company Url:</span> {profileData?.companyUrl?.slice(0,40)}</span>
                </div>
                <div className="space-y-2 flex flex-col">
                  <span className='flex gap-2'><span className="font-semibold">Country:</span> {profileData?.country}</span>
                  <span className='flex gap-2'><span className="font-semibold">Address:</span> {profileData?.address}</span>
                </div>
                <div className="space-y-2 flex flex-col">
                  <span className='flex gap-2'><span className="font-semibold">City:</span> {profileData?.city}</span>
                  <span className='flex gap-2'><span className="font-semibold">Created Date:</span> {profileData?.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default CustomerProfile;
