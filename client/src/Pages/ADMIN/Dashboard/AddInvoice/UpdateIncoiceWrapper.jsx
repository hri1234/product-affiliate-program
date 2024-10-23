import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import UpdateInvoice from './UpdateInvoice';


const UpdateIncoiceWrapper = () => {
    const URLData = useParams();

    const location = useLocation();
    const data = location.state;
    console.log(data);

    return (
        <div className='page-body px-4'>
            <UpdateInvoice tData={data}/>
        </div>
    )
}

export default UpdateIncoiceWrapper