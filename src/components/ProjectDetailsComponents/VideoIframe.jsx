import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (videoId, thumbnailUrl) => {
  if (thumbnailUrl) return thumbnailUrl;
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return null;
};

// Convert YouTube URL to embed format
const getYouTubeEmbedUrl = (url, autoplay = false, startTime = 0) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return url;
  
  return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&start=${startTime}&rel=0&modestbranding=1&mute=0`;
};

const VideoIframe = ({ videoUrl, thumbnailUrl, title, isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const playTimeoutRef = useRef(null);

  const videoId = getYouTubeVideoId(videoUrl);
  const thumbnail = getYouTubeThumbnail(videoId, thumbnailUrl);

  useEffect(() => {
    // Cleanup timeouts on unmount
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (isPlaying) return; // Don't trigger hover if video is clicked/playing
    
    setIsHovered(true);
    
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Stop hover preview after 10 seconds
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 10000);
  };

  const handleMouseLeave = () => {
    if (isPlaying) return; // Don't change if video is clicked/playing
    
    setIsHovered(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsPlaying(true);
    setIsHovered(false);
    
    // Clear hover timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  if (!videoUrl) return null;

  const showThumbnail = !isPlaying && !isHovered;
  const showIframe = isPlaying || isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`rounded-xl border overflow-hidden relative group cursor-pointer ${
        isDarkMode
          ? "bg-gray-900/50 border-gray-800"
          : "bg-white/50 border-gray-200"
      } backdrop-blur-sm`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="aspect-video w-full relative">
        {showThumbnail && thumbnail && (
          <div className="absolute inset-0">
            <img
              src={thumbnail}
              alt={title || "Video thumbnail"}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to default YouTube thumbnail
                if (videoId) {
                  e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white/90 rounded-full p-4"
              >
                <Play size={32} className="text-gray-900 ml-1" fill="currentColor" />
              </motion.div>
            </div>
          </div>
        )}

        {showIframe && (
          <iframe
            src={getYouTubeEmbedUrl(videoUrl, true, 0)}
            className="w-full h-full"
            style={{ pointerEvents: isPlaying ? "auto" : "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title || "Video"}
          />
        )}
      </div>
    </motion.div>
  );
};

export default VideoIframe;

