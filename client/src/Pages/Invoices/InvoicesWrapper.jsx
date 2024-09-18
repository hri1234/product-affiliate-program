import React, { useEffect, useState } from 'react';
import Invoices from './Invoices';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useGetIndividualInvoiceListQuery } from '../../services/AdminService';


function InvoicesWrapper() {

  const userToken = Cookies.get("isLogged");
  const [userId,setUserId]= useState('')

  useEffect(()=>
  {
    if(userToken)
    {
      const token= jwtDecode(userToken);
      console.log(token?.id,'tokenn');
      setUserId(token?.id)
    }
  },[userToken])

  const { data, isLoading: listLoading, isFetching: listFetching } = useGetIndividualInvoiceListQuery({Id:userId || 0});
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listLoading || listFetching) {
      setLoading(true)
    }
    else {
      setLoading(false);
      setListData(data?.result)
    }
  }, [listLoading, data, listFetching])
  
  console.log(listData,'listdata invoice page')

  return (
    <div className='page-body px-4 pb-5'>
        <Invoices listData={listData?.result} loading={loading}/>
    </div>
  )
}

export default InvoicesWrapper;