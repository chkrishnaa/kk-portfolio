import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { PROJECTS } from "../utils/data";
import Navbar from "./Navbar";
import BackButton from "./ProjectDetailsComponents/BackButton";
import ProjectHeader from "./ProjectDetailsComponents/ProjectHeader";
import VideoIframe from "./ProjectDetailsComponents/VideoIframe";
import Description from "./ProjectDetailsComponents/Description";
import ImageGallery from "./ProjectDetailsComponents/ImageGallery";
import Sidebar from "./ProjectDetailsComponents/Sidebar";
import ImagePreview from "./ProjectDetailsComponents/ImagePreview";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const project = PROJECTS.find((p) => p.id === parseInt(projectId));

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
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-950 text-gray-50" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <BackButton />
        <ProjectHeader project={project} isDarkMode={isDarkMode} />

        {/* Main Layout: Content Left, Sidebar Right */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Iframe Section - Full Width */}
            {project.videoUrl && (
              <VideoIframe
                videoUrl={project.videoUrl}
                thumbnailUrl={project.thumbnailUrl}
                title={project.title}
                isDarkMode={isDarkMode}
              />
            )}

            {/* Overview Section - Full Width */}
            <Description
              description={project.description}
              isDarkMode={isDarkMode}
            />

            {/* Image Gallery */}
            <ImageGallery
              galleryImages={project.galleryImages}
              title={project.title}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <ImagePreview project={project} isDarkMode={isDarkMode} />
            <Sidebar project={project} isDarkMode={isDarkMode} />
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default ProjectDetail;
