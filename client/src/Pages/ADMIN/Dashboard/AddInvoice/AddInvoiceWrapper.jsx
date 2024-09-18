import React from 'react'
import AddInvoice from './AddInvoice';
import { useParams } from 'react-router-dom';

function AddInvoiceWrapper() {

  const URLData = useParams();
  console.log(URLData?.id, 'ParamData');

  return (
    <div className='page-body'>
      <AddInvoice id={URLData?.id} email={URLData?.email} />
    </div>
  )
}

export default AddInvoiceWrapper;