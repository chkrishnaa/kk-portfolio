import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { buildPreviewUrl } from "../ui/link-preview";

const ImagePreview = ({ project, isDarkMode }) => {
  const [hasError, setHasError] = useState(false);
  const previewLiveSrc = hasError
    ? project.image
    : buildPreviewUrl(project.liveUrl, isDarkMode);
  const previewGithubSrc = hasError
    ? project.image
    : buildPreviewUrl(project.githubUrl, isDarkMode);

  return (
    <div className="flex w-full flex-col justify-between gap-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Live Demo:</h1>
        <div
          className={`relative rounded-xl overflow-hidden border ${
            isDarkMode ? "border-gray-800" : "border-gray-300"
          }`}
        >
          <img
            src={previewLiveSrc || project.image}
            alt={project.title}
            onError={() => setHasError(true)}
            className="w-full aspect-video object-fit transition-transform duration-700 group-hover:scale-105"
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
            className="absolute  inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center space-x-3 opacity-0 transition-all duration-300"
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, "_blank");
              }}
              initial={{ y: 10, opacity: 0.5 }}
              whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-300"
            >
              <ExternalLink size={16}></ExternalLink>
              <span>Live Demo</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold mb-2">Github:</h1>
        <div
          className={`relative rounded-xl overflow-hidden border ${
            isDarkMode ? "border-gray-800" : "border-gray-300"
          }`}
        >
          <img
            src={previewGithubSrc || project.image}
            alt={project.title}
            onError={() => setHasError(true)}
            className="w-full aspect-video object-fit transition-transform duration-700 group-hover:scale-105"
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
                window.open(project.githubUrl, "_blank");
              }}
              initial={{ y: 10, opacity: 0.5 }}
              whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 py-2 text-sm font-medium rounded-full flex items-center space-x-2 transition-all duration-300"
            >
              <FiGithub size={16}></FiGithub>
              <span>GitHub</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
