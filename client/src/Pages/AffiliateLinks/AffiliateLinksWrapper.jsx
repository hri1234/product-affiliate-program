import React, { useEffect, useState } from 'react'
import AffiliateLinks from './AffiliateLinks';
import { useGetIndividualAffiliateListQuery } from '../../services/AffiliateService';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';

function AffiliateLinksWrapper() {

  const UserToken = Cookies.get("isLogged");
  const [UserId, setUserId] = useState(0);
  const [uniqueId, setUniqueId] = useState('')
  const [count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 4;
  const ReduxData = useSelector((state) => state.SearchSlice);
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    setSearchFilter(ReduxData?.customerAffiliateQuery)
  }, [ReduxData])

  useEffect(() => {
    if (UserToken) {
      const decodedToken = jwtDecode(UserToken);
      console.log(decodedToken?.id, 'decodedTOKEN')
      setUserId(decodedToken?.id)
      console.log(decodedToken?.uniqueId, 'UID')
      setUniqueId(decodedToken?.uniqueId)
    }
  }, [UserToken])


  const { data, isLoading: listLoading, isFetching: listFetching, refetch } = useGetIndividualAffiliateListQuery({
    Id: UserId,
    data: {
      limit: dataPerPage,
      page: currentPage,
      search: searchFilter
    }
  })



  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listLoading || listFetching) {
      setLoading(true)
    }
    else {
      setLoading(false);
      setListData(data?.result || [])
      setCount(Math.ceil((data?.result?.result?.count) / dataPerPage))
    }
  }, [listLoading, data, listFetching])

  useEffect(() => {
    setLoading(true)
    refetch();
  }, [UserId])

  return (
    <>
      <div className='page-body px-4 h-full py-4 '>
        <AffiliateLinks uniqueId={uniqueId} listData={listData} loading={loading} count={count} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </>
  )
}

export default AffiliateLinksWrapper;