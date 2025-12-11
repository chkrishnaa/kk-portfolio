import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export const buildPreviewUrl = (url, isDarkMode = false) => {
  if (!url || url === "#" || !url.startsWith("http")) {
    return null;
  }
  // Microlink screenshot endpoint (same provider Aceternity UI relies on)
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    waitUntil: "networkidle2",
    colorScheme: isDarkMode ? "dark" : "light",
  });

  return `https://api.microlink.io/?${params.toString()}`;
};

export const LinkPreview = ({
  url,
  children,
  className = "",
  previewWidth = 420,
  previewHeight = 260,
}) => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canShowPreview, setCanShowPreview] = useState(false);
  const pageLoadTimeRef = useRef(Date.now());
  const previewUrl = hasError ? null : buildPreviewUrl(url, isDarkMode);

  useEffect(() => {
    // Wait 5 seconds after page load before allowing previews
    const timer = setTimeout(() => {
      setCanShowPreview(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    if (canShowPreview) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <span
      className={`relative inline-flex items-center font-semibold text-blue-500 hover:text-blue-400 transition-colors duration-200 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <a href={url} target="_blank" rel="noreferrer" className="underline">
        {children}
      </a>

      <AnimatePresence>
        {isHovered && previewUrl && canShowPreview && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 top-full mt-3 -translate-x-1/2 z-50 drop-shadow-2xl"
          >
            <div
              className="rounded-xl border border-white/10 bg-gray-900/90 backdrop-blur-xl overflow-hidden"
              style={{ width: previewWidth, height: previewHeight }}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={`Preview of ${url}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={() => setHasError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                  Preview unavailable
                </div>
              )}
            </div>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default LinkPreview;
