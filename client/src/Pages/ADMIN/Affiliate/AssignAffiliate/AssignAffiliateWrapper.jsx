import React, { useEffect, useState } from 'react'
import AssignAffiliate from './AssignAffiliate';
import { useGetAffiliateAvailableUsersQuery, useGetAssignedCustomerListQuery } from '../../../../services/AdminService';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';


function AssignAffiliateWrapper() {

    const AffiliateId = useParams();
    console.log(AffiliateId, 'affid')

    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const dataPerPage = 6;

    const { data, isLoading: listLoading, isFetching: listFetching } = useGetAffiliateAvailableUsersQuery({
        Id: AffiliateId?.id,
        data:
            { limit: dataPerPage, page: currentPage }

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

    const { data: AssignedData, isLoading: AssignedlistLoading, isFetching: AssignedlistFetching } = useGetAssignedCustomerListQuery({ Id: AffiliateId?.id })

    const [AssignedListData, setAssignedListData] = useState([]);
    const [Assignedlistloading, setAssignedListLoading] = useState(false);

    useEffect(() => {
        if (AssignedlistLoading || AssignedlistFetching) {
            setAssignedListLoading(true)
        }
        else {
            setAssignedListLoading(false);
            setAssignedListData(AssignedData?.result)
        }
    }, [AssignedlistFetching, AssignedData, AssignedlistLoading])

    return (
        <div className='page-body pb-5 px-4'>
            <AssignAffiliate AssignedListData={AssignedListData} Assignedlistloading={Assignedlistloading} NotAssignedlistData={NotAssignedlistData} notAssignedlistloading={notAssignedlistloading} setCurrentPage={setCurrentPage} currentPage={currentPage} count={count} />
        </div>
    )
}

export default AssignAffiliateWrapper;