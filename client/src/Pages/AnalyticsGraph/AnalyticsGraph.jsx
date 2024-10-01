
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import Select from 'react-select';

function AnalyticsGraph({ selectedYear, setSelectedYear, YearList, loading, MonthList, analyticsData, themeName, setSelectedMonth, selectedMonth }) {
  const [clicksData, setClicksData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();
  console.log(analyticsData, '----------------------------analyticsData');

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
        categories: Array.from({ length: new Date(selectedYear, selectedMonth, 0).getDate() }, (_, i) => (i + 1).toString()), // Days of the month
      },
    },
  });

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  console.log(currentMonth, currentYear, selectedYear);
  useEffect(() => {
    // Get day from the date string
    const getDay = (dateString) => new Date(dateString).getDate();

    // Initialize an array for days 1 to 30
   const daysOfMonth = Array.from({ length: new Date(selectedYear, selectedMonth, 0).getDate() }, (_, i) => i + 1);

    // Filter analytics data for the selected month
    const filteredData = analyticsData?.filter(click => new Date(click.createdAt).getMonth() + 1 === selectedMonth);

    // Create a result array with counts for each day
    const counts = daysOfMonth.map(day => {
      const count = filteredData != undefined && filteredData?.filter(click => getDay(click.createdAt) === day).length;
      return count;
    });

    console.log(counts, 'Clicks COUNT');
    setClicksData(counts);

    const totalPurchases = counts.reduce((total, count) => total + count, 0);
    setTotalCount(totalPurchases);
  }, [analyticsData, selectedMonth, selectedYear]);



  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
  };

  const handleYearChange = (selectedOp) => {
    setSelectedYear(selectedOp.value)
  }

  const monthNames = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  return (
    <>
      {loading ? (
        <div className='w-full flex items-center justify-center'>
          <span className='w-fit flex items-center justify-center animate-spin'>
            <AiOutlineLoading3Quarters />
          </span>
        </div>
      ) : (
        <div className='w-full'>
          <div className='flex w-full justify-between items-center px-4 py-2 mb-2'>
            <div className='flex gap-4 items-center'>
              <span onClick={() => { navigate('/dashboard/analytics') }} className='w-[30px] font-semibold underline text-[16px] w-fit px-1 py-1 bg-white border rounded cursor-pointer'>
                <IoArrowBack size={20} />
              </span>
              <span className=' font-semibold'>
                {themeName}
              </span>
            </div>
            <span className='w-1/2 flex gap-4'>
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
            </span>
          </div>
          <hr />
          <div className='w-full flex flex-col gap-12 pt-6'>
            <div className='w-full px-5 py-4 rounded border bg-white'>
              <div className='w-full flex justify-between py-2'>
                <span className='font-semibold text-[17.5px] pl-5'> Total purchases in  {monthNames[selectedMonth]} : {totalCount}</span>
                {/* <span className='font-semibold text-[17px]'>
                  Total: {totalCount}
                </span> */}
              </div>
              <div className=' flex w-full relative items-center'>

                <ReactApexChart
                  options={chartState?.options}
                  series={[
                    {
                      name: 'Counts',
                      data: clicksData,
                    },
                  ]}
                  type="line"
                  height={350}
                  className="px-3 w-full max-w-full"
                />
                <span className='absolute left-[-25px] text-[14px] top-[150px]'>Counts</span>

              </div>
              <div className='w-full flex justify-center'>
                <span className=' pl-[0px] m-auto text-[14px]'>Days</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnalyticsGraph;
