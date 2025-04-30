'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full text-stone-500">
      <motion.div
        className="md:w-16 w-12 md:h-16 h-12  rounded-full bg-gradient-to-br from-amber-600 via-orange-950 to-stone-800 "
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
        className="text-lg md:text-xl  font-black bg-gradient-to-r from-amber-300/50 via-orange-900 to-amber-300/50 bg-clip-text text-transparent"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Pleas Wait . . 
      </motion.span>
    </div>
  )
}

export default Loading
