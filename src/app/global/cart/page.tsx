import GlobalNavBar from '@/app/components/GlobalNavBar'
import React from 'react'

const page = () => {
  return (
    <div className={`page flex-center !justify-start flex-col gap-5 `}>
      <div className='bg-black min-h-[200px] rounded-lg border-[1px] border-amber-200/50 w-[70%] p-5 flex-center '>
        <span  className="text-[20px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200/50 via-orange-900 to-amber-200/50" >Your cart is empty</span>
      </div>
    </div>
  )
}

export default page