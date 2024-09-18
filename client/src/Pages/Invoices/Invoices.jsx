import React from 'react';
import './Invoices.css';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function Invoices({ listData, loading }) {


  return (
    <>
      <p className='text-[20px] font-semibold'>Invoice Details</p>
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
                      <th>Theme name</th>
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
      }
    </>
  );
}

export default Invoices;