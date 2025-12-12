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
      <div className="relative flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Overview</h1>
        <div className="absolute right-0 space-x-2">
          {project.featured && (
              <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                Featured
              </span>
          )}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                isDarkMode
                  ? "bg-gray-800/80 text-gray-300"
                  : "bg-gray-50/80 text-gray-700"
              } backdrop-blur-sm`}
            >
              {project.category}
            </span>
        </div>
      </div>
      <p className="text-base text-justify mb-4">{project.overview}</p>
      <div className="flex justify-start flex-wrap">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className={`mr-2 mb-2 px-3 py-1 text-sm font-medium rounded-full ${
              isDarkMode
                ? "bg-blue-950 text-blue-400"
                : "bg-blue-100 text-blue-600"
            } hover:bg-blue-500 hover:text-white`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default Overview
