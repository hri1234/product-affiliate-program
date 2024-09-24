import React, { useEffect, useState } from 'react'
import ViewInvoice from './ViewInvoice';
import { useLocation, useParams } from 'react-router-dom';
import { useGetIndividualInvoiceListQuery } from '../../../services/AdminService';
import { useGetMonthlyAnalysisQuery } from '../../../services/DashboardService';

function ViewInvoiceWrapper() {

    const paramData = useParams();
    const id=paramData?.id;
    console.log('param id viewInvoice',id);

    const location = useLocation();
    const { email } = location.state ;

    const [loading,setLoading] = useState(false);
    const [ListData,setListData] = useState([]);

    const [OverViewData, setOverViewData] = useState([]);
    const [overviewLoading, setOverViewLoading] = useState(false);

  
    const {data, isLoading ,isFetching}=useGetIndividualInvoiceListQuery({Id:id});
    
    useEffect(()=>
    {
      if(isLoading || isFetching)
      {
        setLoading(true);
      }
      else
      {
        setLoading(false);
        setListData(data?.result)
      }
    },[isLoading,isFetching])

    console.log(ListData,'Invoice view listData');


    const { data: analysisData, isFetching: isAnalysisFetching, isLoading: isAnalysisLoading } = useGetMonthlyAnalysisQuery({
      data: {
        "month": "09",
        "year": "2024"
      },
      Id: id
    }
    )

    useEffect(() => {
      if (isAnalysisFetching || isAnalysisLoading) {
        setOverViewLoading(true);
      }
      else {
        setOverViewLoading(false);
        setOverViewData(analysisData?.result)
      }
  
    }, [analysisData, isAnalysisFetching, isAnalysisLoading])
  


  return (
    <div className='page-body px-4 pb-4'>
        <ViewInvoice listData={ListData?.result} loading={loading} OverViewData={OverViewData} email={email} />
    </div>
  )
}

export default ViewInvoiceWrapper;