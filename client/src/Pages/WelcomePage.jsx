import React from 'react'
import { useNavigate } from 'react-router-dom'

function WelcomePage() {

  const navigate = useNavigate()


  const navigateAdmin = () => {
    navigate('/login/admin')
  }

  const navigateNpo = () => {
    navigate('/login/npo')
  }

  return (
    <div className=' w-full bg-orange-500 pb-2 h-[95vh] flex-col gap-1 flex items-center justify-center'>
      <div className=' hover:animate-pulse cursor-pointer w-fit'>
        Hello
      </div>
      
    </div>
  )
}

export default WelcomePage;