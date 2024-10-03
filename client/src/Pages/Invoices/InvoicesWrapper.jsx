import React, { useEffect, useState } from 'react';
import Invoices from './Invoices';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useGetIndividualInvoiceListQuery } from '../../services/AdminService';
import { useSelector } from 'react-redux';


function InvoicesWrapper() {

  const userToken = Cookies.get("isLogged");
  const [userId, setUserId] = useState('')
  const [count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [invoiceFiltered, setInvoiceFiltered] = useState();
  const ReduxData = useSelector((state) => state.SearchSlice.userPageInvoiceQuery);
  useEffect(() => {
    if (userToken) {
      const token = jwtDecode(userToken);
      setUserId(token?.id)
    }
  }, [userToken])

  const { data, isLoading: listLoading, isFetching: listFetching } = useGetIndividualInvoiceListQuery({
    Id: userId || 0,
    data: {
      limit: dataPerPage,
      page: currentPage,
      search: ReduxData
    }
  });
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listLoading || listFetching) {
      setLoading(true)
    }
    else {
      setLoading(false);
      setListData(data?.result)
      setCount(Math.ceil(data?.result?.result?.count / dataPerPage))
    }
  }, [listLoading, data, listFetching])
  return (
    <div className='page-body px-4 pb-5'>
      <Invoices listData={listData?.result} loading={loading} count={count} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  )
}

export default InvoicesWrapper;