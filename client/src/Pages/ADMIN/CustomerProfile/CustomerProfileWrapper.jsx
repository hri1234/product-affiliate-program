import React, { useEffect, useState } from 'react'
import CustomerProfile from './CustomerProfile';
import { useParams } from 'react-router-dom';
import { useGetProfileByIdQuery } from '../../../services/ProfileService';

function CustomerProfileWrapper() {
  const URLData = useParams();
  console.log(URLData?.id, 'ParamData');

  const { data, isLoading: listLoading, isFetching: listFetching } = useGetProfileByIdQuery({ Id: URLData?.id });
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listLoading || listFetching) {
      setLoading(true)
    }
    else {
      setLoading(false);
      setProfileData(data?.result)
    }
  }, [listLoading, data, listFetching])

  console.log(profileData, '--------------------profileData');


  return (
    <div className="page-body h-full pb-4 px-4 ">
      <CustomerProfile loading={loading} profileData={profileData} />
    </div>
  )
}

export default CustomerProfileWrapper;