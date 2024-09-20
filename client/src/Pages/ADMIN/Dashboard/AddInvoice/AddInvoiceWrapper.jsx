import React from 'react'
import AddInvoice from './AddInvoice';
import { useLocation, useParams } from 'react-router-dom';

function AddInvoiceWrapper() {

  const URLData = useParams();

  const location = useLocation();
  const { email } = location.state;

  return (
    <div className='page-body'>
      <AddInvoice id={URLData?.id} email={email} />
    </div>
  )
}

export default AddInvoiceWrapper;