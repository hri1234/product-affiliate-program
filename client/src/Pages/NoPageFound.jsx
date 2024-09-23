import React from 'react';
import Banner from '../Assets/logo/No_Page_Found09_23T11_11_59_496Z.png'
import { useNavigate } from 'react-router-dom';

function NoPageFound() {

  const navigate= useNavigate()

  return (
    <div className=' w-[100vw] h-[80vh] flex items-center justify-center'>
      <span className=' m-auto text-lg font-sans font-semibold' >
        <img className=' w-full shadow-md border rounded h-full object-fit' src={Banner} alt="" />
        <div className='flex pt-4 items-center justify-center '>
          <span onClick={()=>navigate("/register")} className='w-fit py-2 px-4 shadow-sm rounded bg-white border cursor-pointer'>
            Become a Partner
          </span>
        </div>
      </span>
    </div>
  )
}

export default NoPageFound;