import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PreviewBox, { PreviewTag, Github, Open } from "./PreviewBox";

const ProjectCard = ({ project, index, isDarkMode }) => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      className="group"
    >
      <div
        className={`rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ${
          isDarkMode
            ? "bg-gray-900/50 border-gray-800 hover:border-gray-700"
            : "bg-gray-50/50 border-gray-200 hover:border-gray-300"
        } backdrop-blur-sm`}
      >
        <PreviewBox
          project={project}
          isDarkMode={isDarkMode}
          liveUrl={project.liveUrl}
          Tags={PreviewTag}
          Github={Github}
          Open={Open}
        />

        <div className="p-6">
          <h3 className="text-xl font-medium mb-3 group-hover:text-blue-500 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p
            className={`text-sm leading-relaxed mb-4 text-justify ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } line-clamp-6`}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className={`text-xs px-3 py-1 rounded-full ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/project/${project.id}`);
              }}
              initial={{ y: 10, opacity: 0.8 }}
              whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center self-end space-x-2 text-sm font-medium transition-all duration-300"
            >
              <span>Overview</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
