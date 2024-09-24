import React, { useEffect, useState } from 'react'
import AnalyticsGraph from './AnalyticsGraph'
import { useGetAnalyticsDetailsQuery } from '../../services/AnalyticsService';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useGetIndividualAffiliateListQuery } from '../../services/AffiliateService';
import { useParams } from 'react-router-dom';

function AnalyticsGraphWrapper() {

    const paramData = useParams()

    const [loading, setLoading] = useState(false);
    const [analyticsData, setAnalyticsData] = useState([]);

    const UserToken = Cookies.get("isLogged");
    const affiliateId = useParams();
    const [UserId, setUserId] = useState(0);

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Store the month number
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())



    useEffect(() => {
        if (UserToken) {
            const decodedToken = jwtDecode(UserToken);
            setUserId(decodedToken?.id)
        }
    }, [UserToken])


    const { data, isLoading, isFetching } = useGetAnalyticsDetailsQuery({
        Id: UserId, data: {
            "type": "clicks",
            assignAffiliateId: affiliateId?.id,
            "month": String(selectedMonth),
            "year": String(selectedYear)
        }
    })

    useEffect(() => {
        if (isLoading || isFetching) {
            setLoading(true);
        }
        else {
            setLoading(false);
            setAnalyticsData(data?.result)
        }
    }, [data, isLoading, isFetching]);


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



    return (
        <>
            <div className='page-body px-4 pb-5'>
                <AnalyticsGraph selectedYear={selectedYear} setSelectedYear={setSelectedYear} YearList={YearList} MonthList={MonthList} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} themeName={paramData?.name} loading={loading} analyticsData={analyticsData} />
            </div>
        </>
    )
}

export default AnalyticsGraphWrapper;