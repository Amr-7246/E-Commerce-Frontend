'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        style={{ width: 56, height: 56 }}
      >
        <span className="absolute inline-block w-14 h-14 rounded-full border-4 border-sky-400 border-t-transparent border-b-transparent animate-spin" />
        <span className="absolute inline-block w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 via-sky-400 to-blue-600 opacity-80" />
      </motion.div>
    </div>
  )
}

export default Loading
