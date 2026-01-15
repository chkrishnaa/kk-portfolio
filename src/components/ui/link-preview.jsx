import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export const buildPreviewUrl = (url, isDarkMode = false) => {
  if (!url || url === "#" || !url.startsWith("http")) return null;

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

const OFFSET = 16;

export const LinkPreview = ({
  url,
  children,
  className = "",
  previewWidth = 420,
  previewHeight = 260,
}) => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [canShowPreview, setCanShowPreview] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const previewUrl = hasError ? null : buildPreviewUrl(url, isDarkMode);

  useEffect(() => {
    const timer = setTimeout(() => setCanShowPreview(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = e.clientX + OFFSET;
    let y = e.clientY + OFFSET;

    if (x + previewWidth > vw) {
      x = e.clientX - previewWidth - OFFSET;
    }

    if (x < OFFSET) {
      x = OFFSET;
    }

    // 👉 Prefer bottom side
    if (y + previewHeight > vh) {
      y = e.clientY - previewHeight - OFFSET;
    }

    // 👉 Clamp vertically (TOP overflow fix)
    if (y < OFFSET) {
      y = OFFSET;
    }

    setPos({ x, y });
  };

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center font-semibold text-blue-500 hover:text-blue-400 underline ${className}`}
        onMouseEnter={() => canShowPreview && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onFocus={() => canShowPreview && setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {children}
      </a>

      {isHovered &&
        previewUrl &&
        canShowPreview &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                top: pos.y,
                left: pos.x,
                width: previewWidth,
                height: previewHeight,
              }}
              className="fixed z-[9999] pointer-events-none rounded-xl
                         border border-white/10 bg-gray-900/90 backdrop-blur-xl
                         shadow-2xl overflow-hidden"
            >
              <img
                src={previewUrl}
                alt={`Preview of ${url}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={() => setHasError(true)}
              />
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default LinkPreview;
