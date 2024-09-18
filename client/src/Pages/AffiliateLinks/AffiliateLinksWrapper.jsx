import React, { useEffect, useState } from 'react'
import AffiliateLinks from './AffiliateLinks';
import { useGetIndividualAffiliateListQuery } from '../../services/AffiliateService';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

function AffiliateLinksWrapper() {

  const UserToken = Cookies.get("isLogged");
  const [UserId, setUserId] = useState(0);
  const [uniqueId,setUniqueId] = useState('')
  useEffect(() => {
    if (UserToken) {
      const decodedToken = jwtDecode(UserToken);
      console.log(decodedToken?.id, 'decodedTOKEN')
      setUserId(decodedToken?.id)
      console.log(decodedToken?.uniqueId,'UID')
      setUniqueId(decodedToken?.uniqueId)
    }
  }, [UserToken])


  const { data, isLoading: listLoading, isFetching: listFetching } = useGetIndividualAffiliateListQuery({ Id: UserId })

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listLoading || listFetching) {
      setLoading(true)
    }
    else {
      setLoading(false);
      setListData(data?.result || [])
    }
  }, [listLoading, data, listFetching])


  return (
    <>
      <div className='page-body px-4 h-full pb-5 '>
        <AffiliateLinks uniqueId={uniqueId} listData={listData} loading={loading} />
      </div>
    </>
  )
}

export default AffiliateLinksWrapper;