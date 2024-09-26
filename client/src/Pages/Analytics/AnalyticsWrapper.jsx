import React, { useEffect, useState } from 'react'
import Analytics from './Analytics';
import { useGetAnalyticsDetailsQuery } from '../../services/AnalyticsService';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useGetIndividualAffiliateListQuery } from '../../services/AffiliateService';

function AnalyticsWrapper() {

    const [loading, setLoading] = useState(false);
    const [analyticsData, setAnalyticsData] = useState([]);
    const [affiliatesData, setAffiliatesData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [count, setCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10

    console.log(selectedYear, 'seleyear')

    const UserToken = Cookies.get("isLogged");
    const [UserId, setUserId] = useState(0);
    useEffect(() => {
        if (UserToken) {
            const decodedToken = jwtDecode(UserToken);
            setUserId(decodedToken?.id)
        }
    }, [UserToken])


    const { data, isLoading, isFetching } = useGetAnalyticsDetailsQuery({
        Id: UserId, data: {
            "type": "purchases",
            "month": String(selectedMonth),
            "year": String(selectedYear)
        }
    })

    const { data: affiliateData, isLoading: listLoading, isFetching: listFetching ,refetch} = useGetIndividualAffiliateListQuery({
        Id: UserId,
        data: {
            limit: dataPerPage,
            page: currentPage
        }
    })

    console.log(analyticsData, '-----------------------------analyticsDetail');

    useEffect(() => {
        if (isLoading || isFetching || listLoading || listFetching) {
            setLoading(true);
        }
        else {
            setLoading(false);
            setAnalyticsData(data?.result)
            setAffiliatesData(affiliateData?.result)
            setCount(Math.ceil(affiliateData?.result?.result?.count / dataPerPage))
        }
    }, [data, isLoading, isFetching, listLoading, listFetching, affiliateData])

    const MonthList = [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 }
    ];

    const currentYear = new Date().getFullYear();

    const YearList = [
        { label: (currentYear - 3).toString(), value: currentYear - 3 },
        { label: (currentYear - 2).toString(), value: currentYear - 2 },
        { label: (currentYear - 1).toString(), value: currentYear - 1 },
        { label: currentYear.toString(), value: currentYear },
        { label: (currentYear + 1).toString(), value: currentYear + 1 },
        { label: (currentYear + 2).toString(), value: currentYear + 2 },
        { label: (currentYear + 3).toString(), value: currentYear + 3 }
    ];


    useEffect(()=>
    {   
        setLoading(true)
        refetch()
    },[UserId])

    return (
        <>
            <div className='page-body px-4 pb-5'>
                <Analytics YearList={YearList} selectedYear={selectedYear} setSelectedYear={setSelectedYear} MonthList={MonthList} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} loading={loading} analyticsData={analyticsData} affiliatesData={affiliatesData} count={count} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </>
    )
}

export default AnalyticsWrapper;