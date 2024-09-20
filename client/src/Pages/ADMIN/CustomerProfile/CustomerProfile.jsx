import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function CustomerProfile({ loading, profileData }) {
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
          <div className="w-full mx-auto my-10 p-6 bg-white shadow-sm rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 flex flex-col">
                <span className='flex gap-2'><span className="font-semibold">Id:</span> {profileData?.id}</span>
                <span className='flex gap-2'><span className="font-semibold">Company Name:</span> {profileData?.companyName}</span>
              </div>
              <div className="space-y-2 flex flex-col">
                <span className='flex gap-2'><span className="font-semibold">Email:</span> {profileData?.email}</span>
                <span className='flex gap-2'><span className="font-semibold">Company Url:</span> {profileData?.companyUrl}</span>
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
      }
    </>
  )
}

export default CustomerProfile;
