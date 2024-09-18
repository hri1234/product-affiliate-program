import React, { useEffect, useState } from 'react'
import AdminAffiliateLinks from './AdminAffiliateLinks';
import { useGetAffiliateListQuery } from '../../../services/AffiliateService';

function AdminAffiliateLinksWrapper() {

  const { data, isLoading: listLoading, isFetching: listFetching } = useGetAffiliateListQuery({})

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)


  useEffect(() => {
    if (listLoading || listFetching) {
      setLoading(true)
    }
    else {
      setLoading(false);
      setListData(data?.result)
    }
  }, [listLoading, data, listFetching])


  return (
    <>
      <div className='page-body px-4 h-full pb-5 '>
        {/* <AffiliateLinks listData={listData} loading={loading} /> */}
        <AdminAffiliateLinks
          listData={listData}
          loading={loading}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

export default AdminAffiliateLinksWrapper;