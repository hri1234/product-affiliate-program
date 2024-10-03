import React, { useEffect, useState } from 'react'
import EditAffiliate from './EditAffiliate';
import { useParams } from 'react-router-dom';
import { useGetSingleAffiliateQuery } from '../../../../services/AdminService';

function EditAffiliateWrapper() {

    const paramData = useParams();

    const { data, isLoading: listLoading, isFetching: listFetching } = useGetSingleAffiliateQuery({Id:paramData?.id})

    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
  
  
    useEffect(() => {
        setLoading(true)
      if (listLoading || listFetching) {
        setLoading(true)
      }
      else {
        setLoading(false);
        setListData(data?.result)
      }
    }, [listLoading, data, listFetching])
  
    
  return (
    <div className='page-body px-4'>
        <EditAffiliate listData={listData} loading={loading}/>
    </div>
  )
}

export default EditAffiliateWrapper;