import React, { useEffect, useState } from 'react';
import './PopUpForClicks.css';
import { useGetAffiliateTotalClicksQuery } from '../../../services/AdminService';
import LoadingImage from '../../../Assets/logo/loading-7528_512.gif';
import Pagination from '@mui/material/Pagination';

const PopUpForClicks = ({ isPopUp, setIsPopUp, affiliateAssign }) => {
    const [listData, setListData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const affiliateIds = affiliateAssign.affiliateAssigns.map(item => item.id);
    const { data, isLoading } = useGetAffiliateTotalClicksQuery({
        data: {
            id: affiliateIds,
            userId: affiliateAssign.id,
        }
    });
    useEffect(() => {
        if (data?.result) {
            setListData(data.result);
        }
    }, [data]);
    useEffect(() => {
        document.body.style.overflow = isPopUp ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isPopUp]);
    // Calculate the index of the last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate the index of the first item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Slice the data for the current page
    const currentItems = listData?.individualCount?.slice(indexOfFirstItem, indexOfLastItem);
    // Total number of items
    const totalCount = listData?.individualCount?.length;
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <div className='clicks-popups-overlay'>
            <div className='clicks-popups-content'>
                <div className='flex justify-between'>
                    <div className='font-semibold text-[20px]'>Affiliate Products</div>
                    <div className='cursor-pointer' onClick={() => setIsPopUp()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
                {isLoading ? (
                    <div className='flex items-center justify-center pb-[40px] h-full'>
                        <img src={LoadingImage} height={40} width={40} alt="Loading" />
                    </div>
                ) : (
                    <>
                        <table className='min-w-full border-collapse border border-gray-200'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='border border-gray-200 px-4 py-2'>Products Name</th>
                                    <th className='border border-gray-200 px-4 py-2'>Clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems?.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <tr key={index} className='hover:bg-gray-50'>
                                            <td className='border border-gray-200 px-4 py-2'>{item?.affiliateName}</td>
                                            <td className='border border-gray-200 px-4 py-2'>{item.count}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className='border border-gray-200 px-4 py-2 text-center text-gray-500'>
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className='absolute bottom-[20px] right-[20px]'>
                            <Pagination
                                shape="rounded"
                                variant="outlined"
                                color="standard"
                                page={currentPage}
                                count={Math.ceil(totalCount / itemsPerPage)}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PopUpForClicks;