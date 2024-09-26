import React from 'react'
import AddInvoice from './AddInvoice';
import { useLocation, useParams } from 'react-router-dom';

function AddInvoiceWrapper() {

  const URLData = useParams();

  const location = useLocation();
  console.log(location.state)
  const { email,companyName } = location.state;

  return (
    <div className='page-body px-4'>
      <AddInvoice id={URLData?.id} email={email} companyName={companyName} />
    </div>
  )
}

export default AddInvoiceWrapper;