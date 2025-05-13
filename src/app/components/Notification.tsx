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

  if (curentPath.includes("/admin") && PageLoaded ) {
    setPageLoaded(false)
    setNotificationDeets({
      title: "Develober Notefication",
      message: "I know that the admin page must be for the admin olnly but To I make it abule Just to make it easy for you to test the app and see how it works . . . So please use it as you like and if you have any question just ask me . . ",
      IsDroped: true ,
      type: "info",
    })
    setTimeout(() => {
      setNotificationDeets({
        title: "",
        message: " ",
        IsDroped: false ,
        type: "info",
      })
    }, 10000)
  }
  if (curentPath.includes("/global/user/portfolio") && PageLoaded ) {
    setPageLoaded(false)
    setNotificationDeets({
      title: "Develober Notefication",
      message: "At the user portfolio page we can add  alot of user controls and we can add a lot of things to make it more easy to use . . But for now I just added the Data to see how the app works . . ",
      IsDroped: true ,
      type: "info",
    })
    setTimeout(() => {
      setNotificationDeets({
        title: "",
        message: " ",
        IsDroped: false ,
        type: "info",
      })
    }, 10000)
  }
  if (curentPath.includes("/global/order") && PageLoaded ) {
    setPageLoaded(false)
    setNotificationDeets({
      title: "Develober Notefication",
      message: "Take care that the varintes are not availbe yet . . But at the real app it is easy to make it availble . . ",
      IsDroped: true ,
      type: "info",
    })
    setTimeout(() => {
      setNotificationDeets({
        title: "",
        message: " ",
        IsDroped: false ,
        type: "info",
      })
    }, 10000)
  }
  if (curentPath.includes("/global/store") && PageLoaded ) {
    setPageLoaded(false)
    setNotificationDeets({
      title: "Develober Notefication",
      message: "The products Data might be fake . . It just for testing the app . . But if you want to add a real data you can just go to the admin page and add it from there . . ",
      IsDroped: true ,
      type: "info",
    })
    setTimeout(() => {
      setNotificationDeets({
        title: "",
        message: " ",
        IsDroped: false ,
        type: "info",
      })
    }, 10000)
  }
  // useEffect(() => {
  //   if (NotificationDeets.IsDroped) {
  //     setTimeout(() => {
  //       setNotificationDeets({
  //         title: "",
  //         message: " ",
  //         IsDroped: false ,
  //         type: "info",
  //       })
  //     }, 10000)
  //   }
  // }, [NotificationDeets])
  return (
    <div className={` ${NotificationDeets.IsDroped ? 'flex' : 'hidden' } w-[80%] absolute top-[100px] left-[50%] translate-x-[-50%] `} >
      <div className="text-orange-900 py-3 gap-3 rounded-lg w-full flex-center flex-col bg-gradient-to-r from-black via-amber-950 to-black border border-orange-950  ">
        <h4 className="text-[20px] border-b pb-2 w-full border-orange-950 font-bold text-center  text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-stone-700 to-amber-300 "> {NotificationDeets.title}</h4>
        <p className='text-stone-400 text-[15px] px-3 '>{NotificationDeets.message}</p>
      </div>
    </div>
  )
}

export default CustomeNotification