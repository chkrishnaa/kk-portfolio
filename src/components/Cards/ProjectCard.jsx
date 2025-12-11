import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { buildPreviewUrl } from "../ui/link-preview";

const ProjectCard = ({ project, index, isDarkMode }) => {
  const [hasError, setHasError] = useState(false);
  const [canShowPreview, setCanShowPreview] = useState(false);

  const navigate = useNavigate();
  const previewSrc = hasError
    ? project.image
    : buildPreviewUrl(project.liveUrl, isDarkMode);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanShowPreview(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
        <div className="relative overflow-hidden">
          <img
            src={previewSrc || project.image}
            alt={project.title}
            onError={() => setHasError(true)}
            className="w-full h-60 object-fit transition-transform duration-700 group-hover:scale-105"
          />
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                Featured
              </span>
            </div>
          )}

          <div className="absolute top-4 right-4">
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

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center space-x-3 opacity-0 transition-all duration-300"
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/project/${project.id}`);
              }}
              initial={{ y: 10, opacity: 0.5 }}
              whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-300"
            >
              <BookOpen size={16}></BookOpen>
              <span>Overview</span>
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, "_blank");
              }}
              initial={{ y: 10, opacity: 0.5 }}
              whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              label="Live Demo"
              icon={ExternalLink}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-300"
            >
              <ExternalLink size={16}></ExternalLink>
              <span>Live Demo</span>
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.githubUrl, "_blank");
              }}
              initial={{ y: 10, opacity: 0.5 }}
              whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              label="GitHub"
              icon={FiGithub}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 py-2 text-sm font-medium rounded-full flex items-center space-x-2 transition-all duration-300"
            >
              <FiGithub size={16}></FiGithub>
              <span>GitHub</span>
            </motion.button>
          </motion.div>
        </div>

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
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className={`text-xs px-3 py-1 rounded-full ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
