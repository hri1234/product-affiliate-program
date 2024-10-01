import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdRemoveRedEye } from "react-icons/md";
import Select from 'react-select';
import { Pagination } from '@mui/material';


function Analytics({ setSelectedYear, selectedYear, YearList, MonthList, loading, analyticsData, affiliatesData, selectedMonth, setSelectedMonth, count, setCurrentPage, currentPage }) {
  const navigate = useNavigate();
  const [purchasesData, setPurchasesData] = useState([]);
  const [ClicksData, setClicksData] = useState([]);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const [selectedMonthLable, setSelectedMonthLable] = useState(new Date().getMonth() + 1)

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
    setSelectedMonthLable(selectedOption?.label)
  };

  const handleYearChange = (selectedOp) => {
    setSelectedYear(selectedOp.value)
  }

  const monthNames = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const datesInMonth = Array.from({ length: new Date(selectedYear, selectedMonth, 0).getDate() }, (_, i) => (i + 1).toString());

  const [chartState, setChartState] = useState({
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: '',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [...datesInMonth]

      },
    },
  });
  console.log(chartState)

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  console.log(currentMonth, currentYear, selectedYear);



  useEffect(() => {
    const Clicks = [
      {
        theme: "Theme one",
        data: [
          { createAt: "2024-08-2 08:06:32" },
          { createAt: "2024-08-14 08:06:32" },
          { createAt: "2024-08-6 08:06:32" },
          { createAt: "2024-08-6 08:06:32" },
          { createAt: "2024-08-18 08:06:32" },
          { createAt: "2024-08-09 08:06:32" },
          { createAt: "2024-08-09 08:06:32" },
          { createAt: "2024-08-29 08:06:32" },
          { createAt: "2024-08-29 08:06:32" },
        ]
      },
      {
        theme: "Theme Two",
        data: [
          { createAt: "2024-08-1 08:06:32" },
          { createAt: "2024-08-5 08:06:32" },
          { createAt: "2024-08-6 08:06:32" },
          { createAt: "2024-08-6 08:06:32" },
          { createAt: "2024-08-6 08:06:32" },
          { createAt: "2024-08-15 08:06:32" },
          { createAt: "2024-08-09 08:06:32" },
          { createAt: "2024-08-09 08:06:32" },
          { createAt: "2024-08-30 08:06:32" },
        ]
      }
    ];

    // Function to process the data
    const result = Clicks.map(theme => {
      // Initialize an array of 30 zeros for each day of the month
      console.log(selectedMonth,selectedYear);
      const dayCounts = Array(new Date(selectedYear, selectedMonth, 0).getDate()).fill(0);

      // Count the occurrences of each day in the theme's data
      theme.data.forEach(item => {
        const day = new Date(item.createAt).getDate(); // Get the day from the date
        dayCounts[day - 1]++; // Increment the count for that day
      });

      return {
        theme: theme.theme,
        data: dayCounts
      };
    });

    console.log(result);
    setClicksData(result)

  }, [])


  useEffect(() => {

    // Get day from the date string
    const getDay = (dateString) => new Date(dateString).getDate();

    // Initialize an array for days 1 to 30
   const daysOfMonth = Array.from({ length: new Date(selectedYear, selectedMonth, 0).getDate() }, (_, i) => i + 1);
    // Create a result array with only counts for each day
    const counts = daysOfMonth.map(day => {
      const count = analyticsData != undefined && analyticsData?.filter(purchase => getDay(purchase.createdAt) === day).length;
      return count;
    });

    // Output the result in the desired format
    console.log(counts, 'PURCHASE COUNT');
    setPurchasesData(counts)

    const totalPurchases = counts.reduce((total, count) => total + count, 0);
    setPurchaseCount(totalPurchases)



  }, [analyticsData, selectedMonth, selectedYear])

  console.log(purchaseCount, '---------------------purchaseCount');
  console.log(affiliatesData?.result, 'purdata')


  const viewGraphHandle = (id, name) => {
    navigate(`${id}/${name}`);
    return;
  }

  const handlePageChange = (e, page) => {
    setCurrentPage(page)
  }
  console.log(datesInMonth,purchasesData,purchaseCount)
  return (
    <>
      {loading ? <div className=' w-full flex h-[70vh] items-center justify-center'>
        <span className=' w-fit flex  items-center justify-center animate-spin'>
          <AiOutlineLoading3Quarters />
        </span>
      </div> : <>
        <div className=' flex justify-between w-full'>

          <p className='text-[20px] font-semibold'>Analytics</p>

          <div className='w-1/2 justify-end'>
            <div className='flex w-full gap-4'>

              <Select
                className='rounded w-full'
                options={YearList}
                onChange={handleYearChange}
                defaultValue={YearList.find(month => month.value === selectedYear)}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '8px', // Add border-radius
                    border: '1px solid rgb(222, 226, 230)', // Default border color
                    fontSize: '14px',
                    letterSpacing: '.8px',
                    boxShadow: 'none', // Remove box-shadow entirely
                    borderColor: 'rgb(222, 226, 230)', // Keep border consistent on focus/hover
                    '&:hover': {
                      borderColor: 'rgb(222, 226, 230)', // Gray border on hover
                    },
                  }),
                  indicatorSeparator: () => ({
                    display: 'none', // Hide the line near the arrow button
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    zIndex: 9999, // Set a higher z-index
                  }),
                }}
              />

              <Select
                className='rounded w-full'
                options={selectedYear === currentYear ? MonthList.slice(0, currentMonth) : MonthList}
                onChange={handleMonthChange}
                defaultValue={MonthList.find(month => month.value === selectedMonth)}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '8px', // Add border-radius
                    border: '1px solid rgb(222, 226, 230)', // Default border color
                    fontSize: '14px',
                    letterSpacing: '.8px',
                    boxShadow: 'none', // Remove box-shadow entirely
                    borderColor: 'rgb(222, 226, 230)', // Keep border consistent on focus/hover
                    '&:hover': {
                      borderColor: 'rgb(222, 226, 230)', // Gray border on hover
                    },
                  }),
                  indicatorSeparator: () => ({
                    display: 'none', // Hide the line near the arrow button
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    zIndex: 9999, // Set a higher z-index
                  }),
                }}
              />
            </div>
          </div>
        </div>
        <div className='w-full'>

          <div className=' w-full flex flex-col gap-6 pt-6'>

            <div className='w-full px-5 py-4 rounded border bg-white'>
              <div className='w-full flex justify-between'>
                <span className='font-semibold text-[17.5px] pl-5'>Total purchases in {monthNames[selectedMonth]}, {selectedYear} : {purchaseCount}</span>
                {/* <span>TOtal</span> */}
                {/* <h3 className='text-[16.5px] font-semibold py-1'>Total : {purchaseCount}</h3> */}
              </div>
              <div className='relative w-full flex items-center '>
                <ReactApexChart
                  options={chartState.options}
                  // series={chartState?.series}
                  series={[
                    {
                      name: 'Counts',
                      data: purchasesData,
                    },
                  ]}
                  type="line"
                  height={350}

                  className="px-3 w-full max-w-full"
                />
                <span className='absolute left-[-38px] text-[14px] top-[150px]'>Counts</span>
              </div>
              <div className='w-full flex justify-center'>
                <span className=' pl-[0px] m-auto text-[14px]'>Days</span>
              </div>
            </div>
            <hr />
            <div className='grid grid-cols-1 w-full gap-2'>
              {/* <div className=' w-1/2 py-4 px-4 border bg-white rounded' > */}
              <p className='text-[20px] font-semibold'> Total Clicks</p>
              {
                loading ?
                  <div className=' w-full flex items-center justify-center'>
                    <span className=' w-fit flex  items-center justify-center animate-spin'>
                      <AiOutlineLoading3Quarters />
                    </span>
                  </div>

                  :
                  affiliatesData?.result?.rows?.length <= 0 || affiliatesData?.result?.rows == undefined ?
                    // <div className=' w-full flex items-center justify-center'>
                    //   <span className=' border bg-white py-2 rounded w-full flex items-center justify-center'>
                    //     No data found
                    //   </span>
                    // </div>
                    <div className='invoices-page   w-full mt-1 flex items-center flex-col justify-center'>
                      <table className='bg-white border-t border-l border-r '>
                        <thead className=' py-0'>
                          <tr className='py-0'>
                            <th>Product</th>
                            <th>Total Clicks</th>
                            <th>Date</th>
                            <th>View Graph</th>
                          </tr>
                        </thead>
                      </table>
                      <span className=' border-b border-r border-l  bg-white py-3 rounded w-full flex items-center justify-center'>
                        No data found
                      </span>
                    </div>
                    :
                    <div className='w-full h-full invoices-page'>
                      <div className='table-container'>
                        <table className='shadow'>
                          <thead className=' py-2'>
                            <tr className='py-2'>
                              <th>Product</th>
                              <th>Total Clicks</th>
                              <th>Date</th>
                              <th>View Graph</th>
                            </tr>
                          </thead>
                          <tbody>
                            {affiliatesData?.result?.rows?.map(affiliate => (
                              <tr key={affiliate?.id}>
                                <td>{affiliate.affiliate?.name}</td>
                                <td className='pl-[30px]'>{affiliate?.clicks}</td>
                                <td>{affiliate?.createdAt
                                  ? (() => {
                                    const date = new Date(affiliate.createdAt);
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const month = date.toLocaleString('en-GB', { month: 'long' });
                                    const year = date.getFullYear();
                                    return `${day} ${month}, ${year}`;
                                  })()
                                  : 'N/A'}</td>
                                <td style={{ width: '40px' }} className='pl-[30px] w-fit '><MdRemoveRedEye onClick={() => viewGraphHandle(affiliate?.id, affiliate.affiliate?.name)} className='w-fit cursor-pointer hover:opacity-90' size={20} /></td>
                              </tr>
                            ))}
                            <tr className="spacer-row">
                              <td colSpan="5"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
              }
            </div>
            <div className='w-full flex justify-end pb-4'>
              {
                affiliatesData?.result?.length <= 0 || affiliatesData?.result == undefined ?
                  ""
                  :
                  <Pagination
                    shape="rounded"
                    variant="outlined"
                    color="standard"
                    page={currentPage}
                    count={count}
                    onChange={handlePageChange}
                  />
              }
            </div>
          </div>
        </div>
      </>}
    </>
  )
}

export default Analytics;