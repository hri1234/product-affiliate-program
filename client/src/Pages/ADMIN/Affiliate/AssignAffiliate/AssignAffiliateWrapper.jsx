import React, { useEffect, useState } from 'react'
import AssignAffiliate from './AssignAffiliate';
import { useGetAffiliateAvailableUsersQuery, useGetAssignedCustomerListQuery } from '../../../../services/AdminService';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AssignAffiliateWrapper() {

    const AffiliateId = useParams();
    console.log(AffiliateId, 'affid')
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);
    const ReduxData = useSelector((state) => state.SearchSlice.adminAssignSearchQuery);

    const dataPerPage = 10;



    const [AssignedcurrentPage, setAssignedCurrentPage] = useState(1);
    const [Assignedcount, setAssignedCount] = useState(1);


    const { data, isLoading: listLoading, isFetching: listFetching } = useGetAffiliateAvailableUsersQuery({
        Id: AffiliateId?.id,
        data:
            { limit: dataPerPage, page: currentPage, search: ReduxData }

    })

    const [NotAssignedlistData, setNotAssignedListData] = useState([]);
    const [notAssignedlistloading, setnotAssignedListLoading] = useState(false);

    useEffect(() => {
        if (listLoading || listFetching) {
            setnotAssignedListLoading(true)
        }
        else {
            setnotAssignedListLoading(false);
            setNotAssignedListData(data?.result)
            setCount(Math.ceil(data?.result?.result?.count / dataPerPage))
        }
    }, [listLoading, data, listFetching])


    ////////////////////  assigned customer list   ////////////////////

    const { data: AssignedData, isLoading: AssignedlistLoading, isFetching: AssignedlistFetching } = useGetAssignedCustomerListQuery({
        Id: AffiliateId?.id,
        data:
            { limit: dataPerPage, page: AssignedcurrentPage, search: ReduxData }
    })

    const [AssignedListData, setAssignedListData] = useState([]);
    const [Assignedlistloading, setAssignedListLoading] = useState(false);

    useEffect(() => {
        if (AssignedlistLoading || AssignedlistFetching) {
            setAssignedListLoading(true)
        }
        else {
            setAssignedListLoading(false);
            setAssignedListData(AssignedData?.result);
            setAssignedCount(Math.ceil(AssignedData?.result?.count / dataPerPage ))
        }
    }, [AssignedlistFetching, AssignedData, AssignedlistLoading])

    return (
        <div className='page-body pb-5 px-4'>
            <AssignAffiliate AssignedListData={AssignedListData} Assignedlistloading={Assignedlistloading} NotAssignedlistData={NotAssignedlistData} notAssignedlistloading={notAssignedlistloading} setCurrentPage={setCurrentPage} setAssignedCurrentPage={setAssignedCurrentPage} currentPage={currentPage} AssignedcurrentPage={AssignedcurrentPage} count={count} Assignedcount={Assignedcount} />
        </div>
    )
}

export default AssignAffiliateWrapper;