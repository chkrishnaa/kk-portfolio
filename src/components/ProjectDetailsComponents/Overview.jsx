import React from 'react'
import {motion} from 'framer-motion';

const Overview = ({project, isDarkMode}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`rounded-2xl border p-8 ${
        isDarkMode
          ? "bg-gray-900/50 border-gray-800"
          : "bg-white/50 border-gray-200"
      } backdrop-blur-sm mb-8`}
    >
      <h1 className="text-2xl font-bold mb-4">Description</h1>
      <p className='text-base text-justify'>{project.overview}</p>
      </motion.div>
  )
}

export default Overview
