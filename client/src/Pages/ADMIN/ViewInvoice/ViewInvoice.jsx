import React from 'react';
import './ViewInvoice.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Select from 'react-select';
import { useUpdateInvoiceStatusMutation } from '../../../services/AdminService';
import toast from 'react-hot-toast';
import { IoArrowBack } from "react-icons/io5";


function ViewInvoice({ loading, listData, OverViewData ,email }) {


  console.log(listData, 'ListDataaa')

  const totalPaidCommission = listData?.rows
    ?.filter(item => item.status === "Paid")
    ?.reduce((total, item) => total + item.commission, 0);

  console.log(totalPaidCommission, ';-----------------------totalPaidCommission');


  const navigate = useNavigate();
  const [UpdateStatus] = useUpdateInvoiceStatusMutation();

  // const paramData = useParams();


  const handleSelect = (e, id) => {
    console.log(e);
    console.log(id, 'id')
    const dataForApi = {
      "status": e?.label
    }
    UpdateStatus({ Id: id, data: dataForApi })
      .then((res) => {
        if (res?.error) {
          console.log(res?.error, 'resError');
          toast.error(res?.error?.data?.message || "Internal server error")
        }
        else {
          toast.success("Invoice updated");
        }
      })
      .catch((err) => {
        console.log(err, 'catchErr')
      })

  }

  return (
    <>
      {
        loading ?
          <div className=' w-full flex items-center justify-center'>
            <span className=' w-fit flex  items-center justify-center animate-spin'>
              <AiOutlineLoading3Quarters />
            </span>
          </div>
          :
          listData?.rows?.length <= 0 ?
            <div className=' w-full flex items-center justify-center'>
              <span className=' w-full border bg-white py-2 rounded flex items-center justify-center'>
                No data found
              </span>
            </div>
            :
            <div className='view-invoices-page'>
              <div className='flex w-full justify-between px-1 py-0 mb-0'>
                <span onClick={() => { navigate('/dashboard') }} className='font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
                  <IoArrowBack size={20} />
                </span>
                <span className='font-semibold pt-0'>
                  {email || ''}
                </span>
              </div>
              <div className='flex flex-col gap-3 mt-4'>
                <div className=' w-full grid md:grid-cols-3 gap-6 grid-cols-1'>

                  <div className='w-full flex-col flex gap-2 py-3 bg-white rounded border-2 items-center justify-center'>
                    <div className='font-semibold'>
                      Pending
                    </div>
                    {OverViewData?.pending} $
                  </div>
                  <div className='w-full flex-col flex gap-2 py-3 bg-white rounded border-2 items-center justify-center'>
                    <div className='font-semibold'>
                      Paid
                    </div>
                    {OverViewData?.total} $
                  </div>
                  <div className='w-full flex-col flex gap-2 py-3 bg-white rounded border-2 items-center justify-center'>
                    <div className='font-semibold'>
                      Total
                    </div>
                    {OverViewData?.pending + OverViewData?.total} $
                  </div>
                </div>
              </div>
              <hr />
              <br />
              <div className='table-container'>

                <table className=''>
                  <thead>
                    <tr>
                      <th>Transaction Id</th>
                      <th>Theme name</th>
                      <th>Commission</th>
                      <th>Status</th>
                      <th>Date</th>
                      {/* <th>Company name</th> */}
                      {/* <th>Invoices</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {

                      listData?.rows?.map((itm, indx) => (
                        <tr key={indx}>
                          <td>{itm?.transactionId || "N/A"}</td>
                          <td>{itm?.themeName}</td>
                          <td style={{ paddingLeft: '30px' }}>{itm?.commission || '0'} $ </td>
                          {/* <td>{itm.status}</td> */}

                          <Select onChange={(e) => { e?.label == itm?.status ? console.log("") : handleSelect(e, itm?.id) }} placeholder={itm?.status} value={itm?.status} className='w-[75%] max-w-[75%] m-0 h-[12px] pt-2  px-0' options={[{ label: "Pending", value: "pending" }, { label: "Paid", value: "paid" }]} />
                          {/* <td>{itm.companyName}</td> */}
                          <td>{itm?.createdAt?.split('T')[0]}</td>
                        </tr>
                      ))
                    }
                    <tr className="spacer-row">
                      <td colSpan="6"></td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
      }
    </>
  );
}

export default ViewInvoice;
