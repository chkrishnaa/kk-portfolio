import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ImageGallery = ({ galleryImages, title, isDarkMode }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [direction, setDirection] = useState(1); // 1 for next (right to left), -1 for previous (left to right)

  if (!galleryImages || galleryImages.length === 0) return null;

  const imageCount = galleryImages.length;
  let displayImages = galleryImages;
  let remainingCount = 0;

  // Determine layout based on image count
  const getLayout = () => {
    if (imageCount === 1) {
      return { grid: "grid-cols-1", itemClass: "w-full h-full" };
    } else if (imageCount === 2) {
      return { grid: "grid-cols-2", itemClass: "w-full h-full" };
    } else if (imageCount === 3) {
      return { grid: "grid-cols-3", itemClass: "w-full h-full" };
    } else if (imageCount === 4) {
      return { grid: "grid-cols-2", itemClass: "w-full h-1/2" };
    } else if (imageCount === 5) {
      // First row: 3 images (33.33%), Second row: 2 images (50%)
      return { grid: "grid-cols-3", itemClass: "special-5" };
    } else if (imageCount === 6) {
      return { grid: "grid-cols-3", itemClass: "w-full h-1/2" };
    } else if (imageCount === 7) {
      // Show first 5, then 6th slot with image 6 blurred and +2
      displayImages = galleryImages.slice(0, 5); // Only first 5, 6th will be added separately
      remainingCount = 2;
      return { grid: "grid-cols-3", itemClass: "w-full h-1/2" };
    } else if (imageCount === 8) {
      // Show first 5, then 6th slot with image 6 blurred and +3
      displayImages = galleryImages.slice(0, 5); // Only first 5, 6th will be added separately
      remainingCount = 3;
      return { grid: "grid-cols-3", itemClass: "w-full h-1/2" };
    } else if (imageCount === 9) {
      return { grid: "grid-cols-3", itemClass: "w-full h-1/3" };
    } else {
      // 10+ images: Show first 8, then 9th slot with image 9 blurred and +X
      displayImages = galleryImages.slice(0, 8); // Only first 8, 9th will be added separately
      remainingCount = imageCount - 8;
      return { grid: "grid-cols-3", itemClass: "w-full h-1/3" };
    }
  };

  const { grid, itemClass } = getLayout();

  const renderImage = (img, actualIndex, isOverlay = false, customClass = "", overlayCount = 0) => {
    if (!img) return null;
    
    return (
      <motion.div
        key={`img-${actualIndex}-${isOverlay}`}
        className={`relative overflow-hidden cursor-pointer ${customClass}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          setCurrentImageIndex(actualIndex);
        }}
      >
        <img
          src={img}
          alt={`${title} - Image ${actualIndex + 1}`}
          className={`w-full h-full object-cover`}
          onError={(e) => {
            console.error(`Failed to load image at index ${actualIndex}:`, img);
            e.target.style.display = "none";
          }}
        />
        {isOverlay && overlayCount > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <span className="text-white text-4xl font-bold drop-shadow-lg">+{overlayCount}</span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4 w-full overflow-hidden"
      >
        <h3 className="text-2xl font-bold mb-4">Project Gallery</h3>
        
        {/* Special layout for 5 images */}
        {imageCount === 5 ? (
          <div
            className={`grid grid-cols-6 gap-1 rounded-xl overflow-hidden aspect-square ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
            style={{ gridTemplateRows: "repeat(2, 1fr)" }}
          >
            {/* First row: 3 images, each spanning 2 columns (33.33% width) */}
            {displayImages.slice(0, 3).map((img, index) =>
              renderImage(img, index, false, "w-full h-full col-span-2")
            )}
            {/* Second row: 2 images, each spanning 3 columns (50% width) */}
            {displayImages.slice(3, 5).map((img, index) =>
              renderImage(
                img,
                index + 3,
                false,
                "w-full h-full col-span-3"
              )
            )}
          </div>
        ) : (
          <div
            className={`grid ${grid} gap-1 rounded-xl overflow-hidden aspect-square ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
            style={{
              gridTemplateRows:
                imageCount === 4
                  ? "repeat(2, 1fr)"
                  : imageCount === 6
                  ? "repeat(2, 1fr)"
                  : imageCount === 9
                  ? "repeat(3, 1fr)"
                  : imageCount > 9
                  ? "repeat(3, 1fr)"
                  : "auto",
            }}
          >
            {(() => {
              const images = [];
              
              // For 7 or 8 images: show first 5 normally, then 6th with overlay
              if (imageCount === 7 || imageCount === 8) {
                // First 5 images
                galleryImages.slice(0, 5).forEach((img, index) => {
                  images.push(renderImage(img, index, false, "w-full h-full", 0));
                });
                // 6th slot with image 6 (index 5) blurred and overlay
                const overlayCount = imageCount === 7 ? 2 : 3;
                if (galleryImages[5]) {
                  images.push(renderImage(galleryImages[5], 5, true, "w-full h-full", overlayCount));
                }
              }
              // For 10+ images: show first 8 normally, then 9th with overlay
              else if (imageCount > 9) {
                // First 8 images
                galleryImages.slice(0, 8).forEach((img, index) => {
                  images.push(renderImage(img, index, false, "w-full h-full", 0));
                });
                // 9th slot with image 9 (index 8) blurred and overlay
                if (galleryImages[8]) {
                  images.push(renderImage(galleryImages[8], 8, true, "w-full h-full", remainingCount));
                }
              }
              // For other counts, render all normally
              else {
                displayImages.forEach((img, index) => {
                  images.push(renderImage(img, index, false, "w-full h-full", 0));
                });
              }
              
              return images;
            })()}
          </div>
        )}
      </motion.div>

      {/* Carousel Modal */}
      <AnimatePresence>
        {currentImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setCurrentImageIndex(null)}
          >
            <div
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setCurrentImageIndex(null)}
                className="absolute top-4 right-4 z-40 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Carousel Container */}
              <div className="relative w-full">
                {/* Carousel Wrapper */}
                <div className="relative h-96 md:h-[600px] overflow-hidden rounded-lg">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentImageIndex}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img
                        src={galleryImages[currentImageIndex]}
                        alt={`${title} - Image ${currentImageIndex + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Previous Button */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(-1); // Going backward (left to right)
                      setCurrentImageIndex(
                        currentImageIndex === 0
                          ? galleryImages.length - 1
                          : currentImageIndex - 1
                      );
                    }}
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  >
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                        isDarkMode
                          ? "bg-gray-800/30 group-hover:bg-gray-800/60"
                          : "bg-white/30 group-hover:bg-white/50"
                      } transition-colors`}
                    >
                      <ChevronLeft
                        size={20}
                        className="text-white"
                        strokeWidth={2}
                      />
                      <span className="sr-only">Previous</span>
                    </span>
                  </button>
                )}

                {/* Next Button */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(1); // Going forward (right to left)
                      setCurrentImageIndex(
                        currentImageIndex === galleryImages.length - 1
                          ? 0
                          : currentImageIndex + 1
                      );
                    }}
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                  >
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                        isDarkMode
                          ? "bg-gray-800/30 group-hover:bg-gray-800/60"
                          : "bg-white/30 group-hover:bg-white/50"
                      } transition-colors`}
                    >
                      <ChevronRight
                        size={20}
                        className="text-white"
                        strokeWidth={2}
                      />
                      <span className="sr-only">Next</span>
                    </span>
                  </button>
                )}

                {/* Image Counter */}
                <div className="mt-4 text-center">
                  <span
                    className={`text-lg font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Image {currentImageIndex + 1} of {galleryImages.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Navigation */}
      {currentImageIndex !== null && (
        <KeyboardNavigation
          currentIndex={currentImageIndex}
          totalImages={galleryImages.length}
          onPrevious={() => {
            setDirection(-1);
            setCurrentImageIndex(
              currentImageIndex === 0
                ? galleryImages.length - 1
                : currentImageIndex - 1
            );
          }}
          onNext={() => {
            setDirection(1);
            setCurrentImageIndex(
              currentImageIndex === galleryImages.length - 1
                ? 0
                : currentImageIndex + 1
            );
          }}
          onClose={() => setCurrentImageIndex(null)}
          setDirection={setDirection}
        />
      )}
    </>
  );
};

// Keyboard Navigation Component
const KeyboardNavigation = ({
  currentIndex,
  totalImages,
  onPrevious,
  onNext,
  onClose,
  setDirection,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setDirection(-1); // Going backward
        onPrevious();
      } else if (e.key === "ArrowRight") {
        setDirection(1); // Going forward
        onNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onPrevious, onNext, onClose, setDirection]);

  return null;
};

export default ImageGallery;
