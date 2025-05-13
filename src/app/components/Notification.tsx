"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CustomeNotification = () => {
  const [PageLoaded, setPageLoaded] = useState(true)
  const [NotificationDeets, setNotificationDeets] = useState({
    title: "",
    message: "",
    IsDroped: false ,
    type: "info",
  })
  const curentPath = usePathname()

  if (curentPath == "/global/home" && PageLoaded ) {
    setNotificationDeets({
      title: "Develober Notefication",
      message: "There is no notification yet . . ",
      IsDroped: true ,
      type: "info",
    })
    setPageLoaded(false)
  }
  useEffect(() => {
    if (NotificationDeets.IsDroped) {
      setTimeout(() => {
        setNotificationDeets({
          title: "",
          message: " ",
          IsDroped: false ,
          type: "info",
        })
      }, 5000)
    }
  }, [NotificationDeets])
  return (
    <div className={` ${NotificationDeets.IsDroped ? 'flex' : 'hidden' } w-[80%] absolute top-[20px] left-[50%] translate-x-[-50%] `} >
      <div className="text-orange-900 py-3 gap-3 rounded-lg w-full max-w-[700px] flex-center flex-col bg-gradient-to-r from-black via-amber-950 to-black border border-orange-950  ">
        <h4 className="text-[20px] border-b pb-2 w-full border-orange-950 font-bold text-center  text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-stone-700 to-amber-300 "> {NotificationDeets.title}</h4>
        <p className='text-stone-400 text-[15px] px-3 '>{NotificationDeets.message}</p>
      </div>
    </div>
  )
}

export default CustomeNotification