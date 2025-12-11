import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { PROJECTS } from "../utils/data";
import { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import BackButton from "./ProjectDetailsComponents/BackButton";
import ProjectHeader from "./ProjectDetailsComponents/ProjectHeader";
import VideoIframe from "./ProjectDetailsComponents/VideoIframe";
import Description from "./ProjectDetailsComponents/Description";
import Overview from "./ProjectDetailsComponents/Overview";
import ImageGallery from "./ProjectDetailsComponents/ImageGallery";
import Sidebar from "./ProjectDetailsComponents/Sidebar";
import ImagePreview from "./ProjectDetailsComponents/ImagePreview";
import ReferenceLinks from "./ProjectDetailsComponents/ReferenceLinks";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const leftContentRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const isScrollingRef = useRef(false);

  const project = PROJECTS.find((p) => p.id === parseInt(projectId));

  // Synchronized scrolling effect
  useEffect(() => {
    const leftContent = leftContentRef.current;
    const rightSidebar = rightSidebarRef.current;

    if (!leftContent || !rightSidebar) return;

    const handleLeftScroll = () => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      requestAnimationFrame(() => {
        const leftScrollTop = leftContent.scrollTop;
        const leftScrollHeight = leftContent.scrollHeight;
        const leftClientHeight = leftContent.clientHeight;
        const leftMaxScroll = leftScrollHeight - leftClientHeight;

        const rightScrollHeight = rightSidebar.scrollHeight;
        const rightClientHeight = rightSidebar.clientHeight;
        const rightMaxScroll = rightScrollHeight - rightClientHeight;

        // Only sync if both can scroll
        if (leftMaxScroll > 0 && rightMaxScroll > 0) {
          const leftScrollRatio = leftScrollTop / leftMaxScroll;
          const rightScrollTop = leftScrollRatio * rightMaxScroll;
          
          // Only update if it's different to avoid infinite loop
          if (Math.abs(rightSidebar.scrollTop - rightScrollTop) > 1) {
            rightSidebar.scrollTop = rightScrollTop;
          }
        }

        isScrollingRef.current = false;
      });
    };

    const handleRightScroll = () => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      requestAnimationFrame(() => {
        const rightScrollTop = rightSidebar.scrollTop;
        const rightScrollHeight = rightSidebar.scrollHeight;
        const rightClientHeight = rightSidebar.clientHeight;
        const rightMaxScroll = rightScrollHeight - rightClientHeight;

        const leftScrollHeight = leftContent.scrollHeight;
        const leftClientHeight = leftContent.clientHeight;
        const leftMaxScroll = leftScrollHeight - leftClientHeight;

        // Only sync if both can scroll
        if (leftMaxScroll > 0 && rightMaxScroll > 0) {
          const rightScrollRatio = rightScrollTop / rightMaxScroll;
          const leftScrollTop = rightScrollRatio * leftMaxScroll;
          
          // Only update if it's different to avoid infinite loop
          if (Math.abs(leftContent.scrollTop - leftScrollTop) > 1) {
            leftContent.scrollTop = leftScrollTop;
          }
        }

        isScrollingRef.current = false;
      });
    };

    leftContent.addEventListener("scroll", handleLeftScroll, { passive: true });
    rightSidebar.addEventListener("scroll", handleRightScroll, { passive: true });

    return () => {
      leftContent.removeEventListener("scroll", handleLeftScroll);
      rightSidebar.removeEventListener("scroll", handleRightScroll);
    };
  }, [project]);

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
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <div className="flex justify-between">
          <ProjectHeader project={project} isDarkMode={isDarkMode} />
          <BackButton />
        </div>

        <Overview project={project} isDarkMode={isDarkMode} />

        {/* Main Layout: Content Left, Sidebar Right */}
        <div className="grid lg:grid-cols-3 gap-8 mb-4">
          {/* Left Column - Main Content */}
          <div
            ref={leftContentRef}
            className="lg:col-span-2 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar"
          >
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
          <div className="lg:col-span-1">
            <div
              ref={rightSidebarRef}
              className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto space-y-8 pr-2 custom-scrollbar"
            >
              <ImagePreview project={project} isDarkMode={isDarkMode} />
              <Sidebar project={project} isDarkMode={isDarkMode} />
              <ReferenceLinks project={project} isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
