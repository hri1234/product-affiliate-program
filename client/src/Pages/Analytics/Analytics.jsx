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
  const [selectedMonthLable,setSelectedMonthLable] = useState(new Date().getMonth() + 1)

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
    setSelectedMonthLable(selectedOption?.label)
  };

  const handleYearChange = (selectedOp) => {
    setSelectedYear(selectedOp.value)
  }

  const monthNames = [
    "","January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

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
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']

      },
    },
  });



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
      const dayCounts = Array(30).fill(0);

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
    const daysOfMonth = Array.from({ length: 30 }, (_, i) => i + 1);
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
                options={MonthList}
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
                <span className='font-semibold text-[17.5px]'>{purchaseCount} Purchases on {monthNames[selectedMonth]}</span>
                {/* <span>TOtal</span> */}
                {/* <h3 className='text-[16.5px] font-semibold py-1'>Total : {purchaseCount}</h3> */}

              </div>


              <ReactApexChart
                options={chartState?.options}
                // series={chartState?.series}
                series={[
                  {
                    name: 'Counts',
                    data: purchasesData,
                  },
                ]}
                type="line"
                height={350}

                className="px-2 w-full max-w-full"
              />


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
                  affiliatesData?.result?.length <= 0 || affiliatesData?.result == undefined ?
                    <div className=' w-full flex items-center justify-center'>
                      <span className=' border bg-white py-2 rounded w-full flex items-center justify-center'>
                        No data found
                      </span>
                    </div>
                    :
                    <div className='w-full h-full invoices-page'>
                      <div className='table-container'>
                        <table className='shadow'>
                          <thead className=' py-2'>
                            <tr className='py-2'>
                              <th>Product name</th>
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
                                  ? new Date(affiliate?.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
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

              <Pagination
                shape="rounded"
                variant="outlined"
                color="standard"
                page={currentPage}
                count={count}
                onChange={handlePageChange}
              />
            </div>


          </div>
        </div>
      </>}


    </>

  )
}

export default Analytics;