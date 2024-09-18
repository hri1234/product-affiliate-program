import React, { useEffect, useState } from 'react'
import Profile from './Profile';
import { useGetProfileQuery } from '../../services/ProfileService';

function ProfileWrapper() {

  const { data, isLoading: listLoading, isFetching: listFetching } = useGetProfileQuery({});
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


  return (
      <div className="page-body h-full pb-4 px-4 ">
        <Profile loading={loading} listData={listData?.result} />
      </div>
  )
}

export default ProfileWrapper;