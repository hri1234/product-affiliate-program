import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Btn, H5 } from '../../components/AbstractElements';
import { FaLink } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Cookies from 'js-cookie';

function AffiliateLinks({ uniqueId, listData, loading }) {

  console.log(listData, 'ListDataaaa 12');

  const navigate = useNavigate();
  // const profileJson = Cookies.get('profileData')

  // const [profileDetails, setProfileDetails] = useState([]);

  // useEffect(() => {
  //   console.log(JSON.parse(profileJson), '---------------------------profileDetails2');
  //   if (profileJson == 'undefined' || profileJson == null) {
  //     Cookies.remove("isLogged");
  //     Cookies.remove("profileData");
  //     navigate('/')
  //   }
  //   setProfileDetails(JSON.parse(profileJson))
  // }, [profileJson])


  return (
    <>
      <p className='text-[20px] font-semibold'>Affiliate Links</p>
      {
        loading ?
          <>
            <div className=' w-full flex items-center justify-center'>
              <span className=' w-fit flex  items-center justify-center animate-spin'>
                <AiOutlineLoading3Quarters />
              </span>
            </div>
          </>
          :
          listData?.result?.length <= 0 ?
            <div className=' w-full flex items-center justify-center'>
              <span className=' border bg-white py-2 rounded w-full flex items-center justify-center'>
                No data found
              </span>
            </div>
            :
            <div className=' w-full flex flex-col h-full items-center gap-6 '>
              <div className=' w-full flex items-center justify-between'>
                {/* <span onClick={() => navigate('add')} className=' cursor-pointer p-2 bg-black text-white rounded'>
            Create Links
          </span> */}
              </div>
              <div className='w-full flex flex-col h-full items-center gap-8 '>

                {
                  listData?.result?.rows?.map((itm) => {
                    return <>
                      <div className=' w-full flex gap-12 py-[28px] px-4 border bg-white shadow-md rounded-2xl'>
                        <div className=' object-contain w-1/2 shadow-sm rounded-xl h-[220px]  p-2 bg-slate-100'>
                          {/* <img src="https://partners.krownthemes.com/_next/image?url=%2Fimages%2Flocal.jpg&w=384&q=75" alt="" /> */}

                          <img className='object-fit h-full w-full' src={`${itm?.affiliate?.imageUrl}`} alt="IMG" />
                        </div>
                        <div className=' w-full  p-1  rounded-xl mr-1 flex flex-col justify-between'>
                          <div className=' flex flex-col gap-5'>
                            <span className='font-semibold text-lg'>{itm?.affiliate?.name}</span>
                            <div className='flex flex-col gap-3'>

                              <span className=' flex gap-2 items-center text-[14.5px] border p-2 text-ellipsis rounded w-full justify-center  cursor-pointer'>
                                <FaLink />

                                <a href={`${itm?.affiliate?.link}?utm_campaign=${listData?.result?.uniqueId}`} target='_blank'>
                                  {`${itm?.affiliate?.shortUrl}`}
                                </a>
                              </span>
                              <div className=' w-full flex justify-between gap-4'>
                                <span onClick={() => { navigator.clipboard.writeText(`${itm?.affiliate?.link}?utm_campaign=${listData?.result?.uniqueId}`) }} className=' border p-[6px] w-full rounded flex items-center justify-center bg-slate-200 cursor-pointer'>
                                  Copy link
                                </span>
                                <span className=' border p-[6px] w-full rounded flex items-center justify-center bg-slate-200 cursor-pointer'>
                                  <a href={`${itm?.affiliate?.link}?utm_campaign=${listData?.result?.uniqueId}`} target='_blank'>
                                    Visit link
                                  </a>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className=' flex gap-6'>
                            {/* <div className='border rounded px-2 py-1'>
                              {itm?.clicks || '0'} Click
                            </div>
                            <div className='border rounded px-2 py-1'>
                              {itm?.purchases || '0'} Purchases
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </>
                  })
                }
              </div>
            </div>
      }

    </>
  )
}

export default AffiliateLinks;