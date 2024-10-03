import React, { useEffect, useState } from 'react'
import AdminAffiliateLinks from './AdminAffiliateLinks';
import { useGetAffiliateListQuery } from '../../../services/AffiliateService';
import { useSelector } from 'react-redux';

function AdminAffiliateLinksWrapper() {

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(1);
  const [searchFilter, setSearchFilter] = useState('')
  const ReduxData = useSelector((state) => state.SearchSlice);
  
  useEffect(() => {
    setSearchFilter(ReduxData?.searchQuery || '')
  }, [ReduxData])

  const dataPerPage = 10;

  const { data, isLoading: listLoading, isFetching: listFetching } = useGetAffiliateListQuery({
    data:
      { limit: dataPerPage, page: currentPage, search: searchFilter }
  })

  useEffect(() => {
    if (listLoading || listFetching) {
      setLoading(true)
    }
    else {
      setLoading(false);
      setListData(data?.result)
      setCount(Math.ceil(data?.result?.count / dataPerPage))
    }
  }, [listLoading, data, listFetching])


  return (
    <>
      <div className='page-body px-4 h-full py-4'>
        {/* <AffiliateLinks listData={listData} loading={loading} /> */}
        <AdminAffiliateLinks
          listData={listData}
          loading={loading}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          count={count}
        />
      </div>
    </>
  )
}

export default AdminAffiliateLinksWrapper;