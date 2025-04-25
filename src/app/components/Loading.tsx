'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full text-stone-500">
      <motion.div
        className="md:w-16 w-12 md:h-16 h-12  rounded-full bg-gradient-to-br from-sky-600 via-teal-400 to-indigo-600"
        animate={{
          scale: [1, 1.01, 1],
          opacity: [1, 0.6, 1],
          rotate: [0, 360, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.span
        className="text-lg md:text-xl  font-black bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Pleas Wait
      </motion.span>
    </div>
  )
}

export default Loading
