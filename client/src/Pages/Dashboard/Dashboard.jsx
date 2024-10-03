import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Pagination } from '@mui/material';
import { BsExclamationCircle } from "react-icons/bs";

function Dashboard({ loading, listData, overviewLoading, overviewData, setCurrentPage, currentPage, count, commision }) {

  const navigate = useNavigate();

  const handlePageChange = (e, page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <p className='text-[20px] font-semibold'>Dashboard</p>
      <p className='font-semibold flex items-center gap-[5px]'><BsExclamationCircle /> As a registered partner, you'll earn {commision} % commission on every purchase made through your referral.</p>

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
                  <div className='w-full flex-col hover:shadow-md  duration-200 flex gap-2 py-3 bg-white rounded border-2 items-center justify-center'>
                    <div className='font-semibold'>
                      Paid for Current Month
                    </div>
                    ${overviewData?.paid || 0}
                  </div>
                  <div className='w-full flex-col hover:shadow-md  duration-200 flex gap-2 py-3 bg-white rounded border-2 items-center justify-center'>
                    <div className='font-semibold'>
                      Total Pending
                    </div>
                    ${overviewData?.pending || 0}
                  </div>
                  <div className='w-full flex-col hover:shadow-md duration-200 flex gap-2 py-3 bg-white rounded border-2 items-center justify-center'>
                    <div className='font-semibold'>
                      Total Paid
                    </div>
                    ${overviewData?.total || 0}
                  </div>
                </div>
              </div>
              <hr />
              <br />
              <p className='text-[20px] font-semibold'>Invoice History</p>
              {
                listData?.rows?.length <= 0 || listData?.rows == undefined ?
                  <div className='invoices-page   w-full mt-1 flex items-center flex-col justify-center'>
                    <table className='bg-white border-t border-l border-r '>
                      <thead className=' py-0'>
                        <tr className='py-0'>
                          <th>Transaction Id</th>
                          <th>Product</th>
                          <th>Commission</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                    </table>
                    <span className=' border-b border-r border-l  bg-white py-3 rounded w-full flex items-center justify-center'>
                      No data found
                    </span>
                  </div>
                  :
                  <div className='w-full h-full invoices-page'>
                    <div className='table-container '>
                      <table className='shadow'>
                        <thead className=' py-2'>
                          <tr className='py-2'>
                            <th>Transaction Id</th>
                            <th>Product</th>

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

                              <td style={{ paddingLeft: '40px' }}>${invoice?.commission}</td>
                              <td>{invoice?.status}</td>
                              <td>{invoice?.createdAt
                                ? (() => {
                                  const date = new Date(invoice.createdAt);
                                  const day = String(date.getDate()).padStart(2, '0');
                                  const month = date.toLocaleString('en-GB', { month: 'long' });
                                  const year = date.getFullYear();
                                  return `${day} ${month}, ${year}`;
                                })()
                                : 'N/A'}
                              </td>
                            </tr>
                          ))}
                          <tr className="spacer-row">
                            <td colSpan="5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

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

export default Dashboard;