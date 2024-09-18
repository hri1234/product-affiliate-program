import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Dashboard({ loading, listData, overviewLoading, overviewData }) {

  const navigate = useNavigate();

  console.log(overviewData, 'overViewData')


  return (
    <>
      <p className='text-[20px] font-semibold'>Overview Details</p>

      {
        loading || overviewLoading ?
          <div className=' w-full flex items-center justify-center'>
            <span className=' w-fit flex  items-center justify-center animate-spin'>
              <AiOutlineLoading3Quarters />
            </span>
          </div>

          :
          listData?.length <= 0 ?
            <div className=' w-full flex items-center justify-center'>
              <span className=' border bg-white py-2 rounded w-full flex items-center justify-center'>
                No data found
              </span>
            </div>
            :
            <div>
              <div className='flex flex-col gap-3 mt-4'>
                <div className=' w-full grid md:grid-cols-3 gap-6 grid-cols-1'>
                  <div className='w-full flex-col flex gap-2 py-3 bg-white rounded border-2 items-center justify-center'>
                    <div className='font-semibold'>
                      Current Month Paid
                    </div>
                    {overviewData?.paid} $
                  </div>
                  <div className='w-full flex-col flex gap-2 py-3 bg-white rounded border-2 items-center justify-center'>
                    <div className='font-semibold'>
                      Total Pending
                    </div>
                    {overviewData?.pending} $
                  </div>
                  <div className='w-full flex-col flex gap-2 py-3 bg-white rounded border-2 items-center justify-center'>
                    <div className='font-semibold'>
                      Total Paid
                    </div>
                    {overviewData?.total} $
                  </div>
                </div>
              </div>
              <hr />
              <br />
              <p className='text-[20px] font-semibold'>Invoice Details</p>

              <div className='w-full h-full invoices-page'>
                <div className='table-container'>
                  <table className='shadow'>
                    <thead className=' py-2'>
                      <tr className='py-2'>
                        <th>Transaction Id</th>
                        <th>Theme name</th>
                        <th>Domain</th>
                        <th>Commission</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listData?.rows?.map(invoice => (
                        <tr key={invoice?.id}>
                          <td>{invoice?.transactionId || 'N/A'}</td>
                          <td>{invoice?.themeName}</td>
                          <td>{invoice?.domain}</td>
                          <td style={{ paddingLeft: '40px' }}>{invoice?.commission} $ </td>
                          <td>{invoice?.status}</td>
                          <td>{invoice?.createdAt?.split('T')[0]}</td>
                        </tr>
                      ))}
                      <tr className="spacer-row">
                        <td colSpan="5"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
      }
    </>
  )
}

export default Dashboard;