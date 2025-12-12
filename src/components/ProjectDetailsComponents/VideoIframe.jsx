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
const getYouTubeEmbedUrl = (url, autoplay = false, startTime = 0, mute = false) => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return url;
  
  return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&start=${startTime}&mute=${mute ? 1 : 0}&rel=0&modestbranding=1&controls=1&playsinline=1`;
};

const VideoIframe = ({ videoUrl, thumbnailUrl, title, isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const hoverTimeoutRef = useRef(null);
  const playTimeoutRef = useRef(null);
  const iframeRef = useRef(null);

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
    
    // Force iframe reload for hover preview
    setIframeKey(prev => prev + 1);
    
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
    
    // Force iframe reload for full play
    setIframeKey(prev => prev + 1);
  };

  if (!videoUrl) return null;

  const showThumbnail = !isPlaying && !isHovered;
  const showIframe = isPlaying || isHovered;
  
  // Different embed URLs for hover (muted, 10 sec preview) vs click (full play)
  const embedUrl = isPlaying 
    ? getYouTubeEmbedUrl(videoUrl, true, 0, false) // Full play, unmuted
    : getYouTubeEmbedUrl(videoUrl, true, 0, true); // Hover preview, muted

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
      <div className="aspect-video w-full relative bg-black">
        {showThumbnail && thumbnail && (
          <div className="absolute inset-0 z-10">
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
          <div className="absolute inset-0 w-full h-full z-20">
            <iframe
              key={`${iframeKey}-${isPlaying ? 'play' : 'hover'}`}
              ref={iframeRef}
              src={embedUrl}
              className="w-full h-full"
              style={{ 
                pointerEvents: isPlaying ? "auto" : "none",
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={title || "Video"}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoIframe;

