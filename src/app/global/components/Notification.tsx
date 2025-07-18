"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CustomeNotification = () => {
  const [NotificationDeets, setNotificationDeets] = useState({
    title: "",
    message: "",
    IsDroped: false ,
    type: "info",
  })
  const curentPath = usePathname()

  useEffect(() => {
    if (curentPath.includes("/admin")) {
      setNotificationDeets({
        title: "Develober Notefication",
        message: "I know that the admin page must be for the admin olnly but To I make it abule Just to make it easy for you to test the app and see how it works . . . So please use it as you like and if you have any question just ask me . . ",
        IsDroped: true ,
        type: "info",
      })
    } else if (curentPath.includes("/global/user/portfolio")) {
      setNotificationDeets({
        title: "Develober Notefication",
        message: "At the user portfolio page we can add  alot of user controls and we can add a lot of things to make it more easy to use . . But for now I just added the Data to see how the app works . . ",
        IsDroped: true ,
        type: "info",
      })
    } else if (curentPath.includes("/global/order")) {
      setNotificationDeets({
        title: "Develober Notefication",
        message: "Take care that the varintes are not availbe yet . . But at the real app it is easy to make it availble . . ",
        IsDroped: true ,
        type: "info",
      })
    } else if (curentPath.includes("/global/store")) {
      setNotificationDeets({
        title: "Develober Notefication",
        message: "The products Data might be fake . . It just for testing the app . . But if you want to add a real data you can just go to the admin page and add it from there . . ",
        IsDroped: true ,
        type: "info",
      })
    } else {
      setNotificationDeets({
        title: "",
        message: "",
        IsDroped: false ,
        type: "info",
      })
    }
  }, [curentPath])

  const handleClose = () => {
    setNotificationDeets(prev => ({ ...prev, IsDroped: false }))
  }

  return (
    <AnimatePresence>
      {NotificationDeets.IsDroped && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0, filter: 'brightness(1.2) saturate(1.2)' }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`w-[80%] absolute top-[100px] left-[50%] translate-x-[-50%] flex`}
        >
          <div className="text-[var(--btn-II)] py-3 gap-3 rounded-lg w-full flex-center flex-col bg-gradient-to-r from-[var(--main)] via-[var(--btn-I)] to-[var(--main)] border border-[var(--border)] ">
            <h4 className="text-[20px] border-b pb-2 w-full border-[var(--border)] font-bold text-center  text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradient-from)] via-[var(--text-primary)] to-[var(--gradient-to)] animate-pulse"> {NotificationDeets.title}</h4>
            <p className='text-[var(--text-primary)] text-[15px] px-3 '>{NotificationDeets.message}</p>
            <button onClick={handleClose} className="mt-2 px-4 py-1 rounded cursor-pointer bg-[var(--main)] text-[var(--text-secondary)] hover:bg-[var(--text-secondary)] hover:text-[var(--main)] border border-[var(--main)] transition">Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CustomeNotification