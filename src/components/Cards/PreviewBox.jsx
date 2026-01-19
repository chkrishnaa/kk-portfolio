import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { buildPreviewUrl } from "../ui/link-preview";

export const PreviewTag = ({ project, isDarkMode }) => {
  return (
    <>
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
    </>
  );
};

export const PreviewButton = ({ label, icon: Icon, onClick, styles }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ y: 10, opacity: 0.5 }}
      whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={
        styles ||
        "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-300"
      }
    >
      {Icon && <Icon size={16} />}
      <span>{label}</span>
    </motion.button>
  );
};

//
// ----------------------------
// ACTION COMPONENTS
// ----------------------------
//

// GitHub Button Component
export const Github = ({ project, onClick }) => {
  return (
    <PreviewButton
      label="GitHub"
      icon={FiGithub}
      styles="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-300"
      onClick={onClick}
    />
  );
};

// Open/Live Demo Button Component
export const Open = ({ project, onClick }) => {
  return (
    <PreviewButton
      label="Live Demo"
      icon={ExternalLink}
      onClick={onClick}
    />
  );
};

// Overview Button Component
export const Overview = ({ project, onClick, navigate }) => {
  const handleClick = onClick || (() => {
    if (navigate) {
      navigate(`/project/${project.id}`);
    }
  });

  return (
    <PreviewButton
      label="Overview"
      icon={BookOpen}
      styles="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all duration-300"
      onClick={handleClick}
    />
  );
};

const PreviewBox = ({
  project,
  isDarkMode,
  liveUrl,
  githubUrl,
  children,
  Tags: PreviewTag,
  Github: GithubComponent,
  Open: OpenComponent,
  Overview: OverviewComponent,
  navigate,
}) => {
  const [hasError, setHasError] = useState(false);

  let imageSrc = project.image;
  if (liveUrl) {
    imageSrc = buildPreviewUrl(liveUrl, isDarkMode) || project.image;
  } else if (githubUrl) {
    imageSrc = buildPreviewUrl(githubUrl, isDarkMode) || project.image;
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border w-full max-w-full ${
        isDarkMode ? "border-gray-800" : "border-gray-300"
      }`}
    >
      <img
        src={hasError ? project.image : imageSrc}
        alt={project.title}
        onError={() => setHasError(true)}
        className="w-full aspect-video object-fill transition-transform duration-700 group-hover:scale-105"
      />

      {PreviewTag && <PreviewTag project={project} isDarkMode={isDarkMode} />}

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center space-x-3 opacity-0 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        {GithubComponent && (
          <GithubComponent 
            project={project} 
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.githubUrl, "_blank");
            }}
          />
        )}
        {OpenComponent && (
          <OpenComponent 
            project={project} 
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.liveUrl, "_blank");
            }}
          />
        )}
        {OverviewComponent && (
          <OverviewComponent 
            project={project} 
            navigate={navigate}
            onClick={(e) => {
              e.stopPropagation();
              if (navigate) {
                navigate(`/project/${project.id}`);
              }
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default PreviewBox;
