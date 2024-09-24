import React from 'react';
import './Invoices.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Pagination } from '@mui/material';

function Invoices({ listData, loading, count, setCurrentPage, currentPage }) {

  const handlePageChange = async (e, page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <p className='text-[20px] font-semibold'>Invoices</p>
      {
        loading ?
          <div className=' w-full flex items-center justify-center'>
            <span className=' w-fit flex  items-center justify-center animate-spin'>
              <AiOutlineLoading3Quarters />
            </span>
          </div>

          :
          listData?.result?.length <= 0 ?
            <div className=' w-full flex items-center justify-center'>
              <span className=' border bg-white py-2 rounded w-full flex items-center justify-center'>
                No data found
              </span>
            </div>
            :
            <div className='w-full h-full invoices-page'>
              <div className='table-container'>
                <table className='shadow'>
                  <thead className=' py-2'>
                    <tr className='py-2'>
                      <th>Transaction Id</th>
                      <th>Product name</th>
                      <th>Commission</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listData?.rows?.map(invoice => (
                      <tr key={invoice?.id}>
                        <td>{invoice?.transactionId}</td>
                        <td>{invoice?.themeName}</td>
                        <td style={{ paddingLeft: '40px' }}>{invoice?.commission} $ </td>
                        <td>{invoice?.status}</td>
                        <td>{invoice?.createdAt
                            ? new Date(invoice?.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                            : 'N/A'}</td>
                      </tr>
                    ))}
                    <tr className="spacer-row">
                      <td colSpan="5"></td>
                    </tr>
                  </tbody>
                </table>

                  </div>
                <div className='w-full flex justify-end py-4'>

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
    </>
  );
}

export default Invoices;