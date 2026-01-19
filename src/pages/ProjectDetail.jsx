import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { PROJECTS } from "../utils/Data/projectsData";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import BackButton from "../components/ProjectDetailsComponents/BackButton";
import ProjectHeader from "../components/ProjectDetailsComponents/ProjectHeader";
import VideoIframe from "../components/ProjectDetailsComponents/VideoIframe";
import Description from "../components/ProjectDetailsComponents/Description";
import Overview from "../components/ProjectDetailsComponents/Overview";
import ImageGallery from "../components/ProjectDetailsComponents/ImageGallery";
import Sidebar from "../components/ProjectDetailsComponents/Sidebar";
import ImagePreview from "../components/ProjectDetailsComponents/ImagePreview";
import ReferenceLinks from "../components/ProjectDetailsComponents/ReferenceLinks";
import PreviewBox, {Open, Overview as OverviewButton} from "../components/Cards/PreviewBox";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const project = PROJECTS.find((p) => p.id === parseInt(projectId));

  // Ensure we always start at the top when navigating between projects
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [projectId]);

  if (!project) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative ${
        isDarkMode ? "bg-gray-950 text-gray-50" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`fixed top-10 right-[12.5%] w-80 h-80 rounded-full blur-3xl opacity-50 pointer-events-none ${
          isDarkMode ? "bg-blue-500" : "bg-blue-400"
        }`}
      ></div>
      <div
        className={`fixed bottom-10 left-[12.5%] w-96 h-96 rounded-full blur-3xl opacity-50 pointer-events-none ${
          isDarkMode ? "bg-blue-500" : "bg-blue-400"
        }`}
      ></div>

      <div
        className={`fixed top-5 -left-32 w-64 h-64 rounded-full blur-3xl opacity-50 pointer-events-none ${
          isDarkMode ? "bg-purple-500" : "bg-purple-400"
        }`}
      ></div>
      <div
        className={`fixed bottom-5 -right-32 w-72 h-72 rounded-full blur-3xl opacity-50 pointer-events-none ${
          isDarkMode ? "bg-purple-500" : "bg-purple-400"
        }`}
      ></div>

      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={projectId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="max-w-7xl mx-auto px-6 pt-24 pb-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex justify-between"
          >
            <ProjectHeader project={project} isDarkMode={isDarkMode} />
            <BackButton />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Overview project={project} isDarkMode={isDarkMode} />
          </motion.div>

          {/* Main Layout: Content Left, Sidebar Right */}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid lg:grid-cols-3 gap-4 lg:gap-8 mb-4"
          >
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8 w-full min-w-0">
              {/* Video Iframe Section - Full Width */}
              {project.videoUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <VideoIframe
                    videoUrl={project.videoUrl}
                    thumbnailUrl={project.thumbnailUrl}
                    title={project.title}
                    isDarkMode={isDarkMode}
                  />
                </motion.div>
              )}

              {/* Overview Section - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Description
                  description={project.description}
                  isDarkMode={isDarkMode}
                />
              </motion.div>

              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <ImageGallery
                  galleryImages={project.galleryImages}
                  title={project.title}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 w-full min-w-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="lg:sticky lg:top-24 space-y-8 w-full min-w-0"
              >
                <ImagePreview project={project} isDarkMode={isDarkMode} />
                <Sidebar project={project} isDarkMode={isDarkMode} />
                <ReferenceLinks project={project} isDarkMode={isDarkMode} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-10"
          >
            <h1 className="text-2xl font-bold mb-4">View More Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {PROJECTS.filter((p) => p.id !== parseInt(projectId)).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <PreviewBox
                    project={project}
                    isDarkMode={isDarkMode}
                    liveUrl={project.liveUrl}
                    Open={Open}
                    Overview={OverviewButton}
                    navigate={navigate}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
