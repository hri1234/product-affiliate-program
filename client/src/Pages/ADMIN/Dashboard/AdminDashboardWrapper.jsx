import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard';
import { useGetUserListQuery } from '../../../services/AdminService';
import { useGetProfileQuery } from '../../../services/ProfileService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AdminDashboardWrapper() {

  const [loading, setLoading] = useState(false);
  const [ListData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const [searchFilter, setSearchFilter] = useState('')
  const navigate = useNavigate()
  const userToken = Cookies.get("isLogged");

  const ReduxData = useSelector((state) => state.SearchSlice);

  useEffect(() => {
    setSearchFilter(ReduxData?.dashboardQuery || '');
  }, [ReduxData])

  useEffect(() => {
    if (!userToken || userToken == null || userToken == '') {
      navigate('/');

    }
  }, [userToken])

  const dataPerPage = 10;


  const { data, isLoading, isFetching,refetch } = useGetUserListQuery(
    {
      data:
        { limit: dataPerPage, page: currentPage, search: searchFilter }
    }
  );

  useEffect(() => {
    if (isLoading || isFetching) {
      setLoading(true);
    }
    else {
      setLoading(false);
      setListData(data?.result);
      setCount(Math.ceil(data?.result?.result?.count / dataPerPage))
    }
  }, [isLoading, isFetching, data, currentPage])

  const { data: profileData, isLoading: listLoading, isFetching: listFetching } = useGetProfileQuery({});

  useEffect(() => {
    const prevData = Cookies.get("profileData");

    if (prevData?.length > 10) {
    }
    else {
      Cookies.set("profileData", `${JSON.stringify(profileData?.result?.result)}`, { expires: 30 });
    }
  }, [profileData, listLoading, listFetching])



  useEffect(()=>
    { 
      refetch()
    },[currentPage])
  return (
    <div className="page-body px-4  h-full">
      <AdminDashboard refetch={refetch} count={count} loading={loading} ListData={ListData?.result} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  )
}

export default AdminDashboardWrapper;