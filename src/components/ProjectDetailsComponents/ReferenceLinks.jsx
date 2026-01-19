import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
  Copy,
  Edit3,
  Trash,
} from "lucide-react";
import {
  FaYoutubeSquare,
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaPinterestSquare,
  FaGithubSquare,
  FaDribbbleSquare,
  FaBehanceSquare,
  FaFilePdf,
} from "react-icons/fa";
import { buildPreviewUrl } from "../ui/link-preview";

// Function to detect platform from URL and return appropriate icon
const getPlatformIcon = (url) => {
  if (!url) return FaFilePdf; // Default icon

  const urlLower = url.toLowerCase();

  if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
    return FaYoutubeSquare;
  } else if (urlLower.includes("instagram.com")) {
    return FaInstagramSquare;
  } else if (urlLower.includes("facebook.com") || urlLower.includes("fb.com")) {
    return FaFacebookSquare;
  } else if (urlLower.includes("twitter.com") || urlLower.includes("x.com")) {
    return FaTwitterSquare;
  } else if (urlLower.includes("linkedin.com")) {
    return FaLinkedin;
  } else if (urlLower.includes("pinterest.com")) {
    return FaPinterestSquare;
  } else if (urlLower.includes("github.com")) {
    return FaGithubSquare;
  } else if (urlLower.includes("dribbble.com")) {
    return FaDribbbleSquare;
  } else if (urlLower.includes("behance.net")) {
    return FaBehanceSquare;
  } else if (urlLower.includes(".pdf") || urlLower.endsWith("pdf")) {
    return FaFilePdf;
  } else {
    return FaFilePdf; // Default icon
  }
};

// Function to get platform color
const getPlatformColor = (url) => {
  if (!url) return "bg-gray-500";

  const urlLower = url.toLowerCase();

  if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
    return "bg-red-600";
  } else if (urlLower.includes("instagram.com")) {
    return "bg-gradient-to-b from-purple-500 via-rose-500 to-yellow-500";
  } else if (urlLower.includes("facebook.com") || urlLower.includes("fb.com")) {
    return "bg-blue-600";
  } else if (urlLower.includes("twitter.com") || urlLower.includes("x.com")) {
    return "bg-black";
  } else if (urlLower.includes("linkedin.com")) {
    return "bg-blue-800";
  } else if (urlLower.includes("pinterest.com")) {
    return "bg-red-700";
  } else if (urlLower.includes("github.com")) {
    return "bg-gray-800";
  } else if (urlLower.includes("dribbble.com")) {
    return "bg-pink-500";
  } else if (urlLower.includes("behance.net")) {
    return "bg-blue-500";
  } else if (urlLower.includes(".pdf") || urlLower.endsWith("pdf")) {
    return "bg-red-700";
  } else {
    return "bg-gray-500";
  }
};

// Format date to "Mar 2, 2025, 8:41 PM" format
const formatDate = (dateString) => {
  if (!dateString) {
    // Default date
    return "Mar 2, 2025, 8:41 PM";
  }
  // If it's already formatted, return as is
  if (typeof dateString === "string" && dateString.includes("Added")) {
    return dateString.replace("Added ", "");
  }
  // Try to parse and format
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // If parsing fails, return the string as is
    return dateString;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const ReferenceLinks = ({ project, isDarkMode }) => {
  const [links, setLinks] = useState(project.externalLinks || []);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", url: "" });
  const [copyMessage, setCopyMessage] = useState("");
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setLinks(project.externalLinks || []);
    setHoveredIndex(null);
    setMenuOpenIndex(null);
    setEditingIndex(null);
  }, [project]);

  // Handle mouse move for preview positioning
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hoveredIndex !== null) {
        const padding = 20;
        const maxPreviewWidth = 400;
        const maxPreviewHeight = 300;

        const previewWidth = Math.min(
          maxPreviewWidth,
          window.innerWidth - padding * 2
        );
        const previewHeight = Math.min(
          maxPreviewHeight,
          window.innerHeight - padding * 2
        );

        let x = e.clientX + 15; // Offset from cursor
        let y = e.clientY + 15;

        // Ensure preview stays within viewport horizontally
        if (x + previewWidth + padding > window.innerWidth) {
          x = e.clientX - previewWidth - 15; // Show on left side of cursor
        }
        // Ensure preview stays within viewport vertically
        if (y + previewHeight + padding > window.innerHeight) {
          y = e.clientY - previewHeight - 15; // Show above cursor
        }
        if (x < padding) x = padding;
        if (y < padding) y = padding;

        setPreviewPosition({ x, y, width: previewWidth, height: previewHeight });
      }
    };

    if (hoveredIndex !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [hoveredIndex]);

  if (!links || links.length === 0) {
    return null;
  }

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + links.length) % links.length);
  };

  const showNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % links.length);
  };

  const startEdit = (index, link) => {
    setEditingIndex(index);
    setEditForm({ name: link.name || "", url: link.url || "" });
    setMenuOpenIndex(null);
  };

  const saveEdit = () => {
    if (!editForm.url.trim()) return;
    setLinks((prev) =>
      prev.map((item, idx) =>
        idx === editingIndex
          ? {
              ...item,
              name: editForm.name.trim(),
              url: editForm.url.trim(),
              addedDate: formatDate(new Date().toISOString()),
            }
          : item
      )
    );
    setEditingIndex(null);
  };

  const removeLink = (index) => {
    setLinks((prev) => prev.filter((_, idx) => idx !== index));
    setMenuOpenIndex(null);
    if (currentIndex >= links.length - 1) {
      setCurrentIndex(0);
    }
  };

  const copyToClipboard = (text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text || "");
      setCopyMessage("Copied!");
      setTimeout(() => setCopyMessage(""), 1500);
    }
  };

  const renderPreviewImage = (url, objectFit = "contain", className = "") => {
    const previewUrl = url ? buildPreviewUrl(url, isDarkMode) : null;
    return previewUrl ? (
      <img
        src={previewUrl}
        alt="Preview"
        className={`w-full h-full object-${objectFit} ${className}`}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
        Preview unavailable
      </div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h3 className="text-xl font-bold mb-4">Reference Links</h3>
        <div className="space-y-2">
          {links.map((link, index) => {
            const IconComponent = getPlatformIcon(link.url);
            const platformColor = getPlatformColor(link.url);
            const hasName = Boolean(link.name?.trim());
            const displayName = hasName ? link.name : link.url;
            const addedDate = link.addedDate || "Mar 2, 2025, 8:41 PM";
            const isEditing = editingIndex === index;
            const isMenuOpen = menuOpenIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative group p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/70"
                    : "bg-gray-200/50 hover:bg-gray-300/70"
                } transition-colors`}
                onMouseEnter={(e) => {
                  setHoveredIndex(index);
                  // Set initial position near cursor
                  const previewWidth = 400;
                  const previewHeight = 300;
                  const padding = 20;

                  let x = e.clientX + 15;
                  let y = e.clientY + 15;

                  // Ensure preview stays within viewport
                  if (x + previewWidth + padding > window.innerWidth) {
                    x = e.clientX - previewWidth - 15;
                  }
                  if (y + previewHeight + padding > window.innerHeight) {
                    y = e.clientY - previewHeight - 15;
                  }
                  if (x < padding) x = padding;
                  if (y < padding) y = padding;

                  setPreviewPosition({ x, y });
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center justify-between gap-2 min-w-0">
                  {/* Left + middle clickable area */}
                  <button
                    type="button"
                    onClick={() => openModal(index)}
                    className="flex items-center flex-1 min-w-0 text-left space-x-3 focus:outline-none overflow-hidden"
                  >
                    <div
                      className={`${platformColor} text-white rounded flex items-center justify-center shrink-0 h-8 w-8`}
                    >
                      <IconComponent size={24} />
                    </div>

                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p
                        className={`font-medium line-clamp-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        } ${
                          hasName ? "" : "group-hover:underline"
                        } group-hover:text-blue-500`}
                        title={displayName}
                      >
                        {displayName}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Added {formatDate(addedDate)}
                      </p>
                    </div>
                  </button>

                  {/* Right: Action Icons */}
                  <div className="flex items-center space-x-1 shrink-0">
                    <motion.a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 1.0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded ${
                        isDarkMode
                          ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                          : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                      } transition-colors`}
                      title="Open in new tab"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </motion.a>

                    <div className="relative">
                      <motion.button
                        initial={{ scale: 1.0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2 rounded ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                            : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                        } transition-colors`}
                        title="More options"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenIndex(isMenuOpen ? null : index);
                        }}
                      >
                        <MoreVertical size={16} />
                      </motion.button>

                      <AnimatePresence>
                        {isMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg border ${
                              isDarkMode
                                ? "bg-gray-800 border-gray-700"
                                : "bg-white border-gray-200"
                            } z-20`}
                          >
                            <button
                              type="button"
                              className="w-full px-3 py-2 text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(index, link);
                              }}
                            >
                              <Edit3 size={14} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="w-full px-3 py-2 text-sm flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeLink(index);
                              }}
                            >
                              <Trash size={14} />
                              <span>Remove</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Inline edit form */}
                {isEditing && (
                  <div className="mt-3 space-y-2">
                    <input
                      className={`w-full rounded-md px-3 py-2 text-sm border ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-gray-100"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="Name"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                    <input
                      className={`w-full rounded-md px-3 py-2 text-sm border ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-gray-100"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="Link"
                      value={editForm.url}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                    />
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-md bg-blue-500 text-white text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          saveEdit();
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-md text-sm border border-gray-300 dark:border-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingIndex(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Hover Preview - Fixed position to follow cursor (rendered once outside loop) */}
      <AnimatePresence>
        {hoveredIndex !== null && links[hoveredIndex] && (
          <motion.div
            key={`preview-${hoveredIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 drop-shadow-2xl pointer-events-none"
            style={{
              left: `${previewPosition.x}px`,
              top: `${previewPosition.y}px`,
              width: previewPosition.width || 400,
            }}
          >
            <div
              className={`w-full aspect-video overflow-hidden rounded-xl border ${
                isDarkMode
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >
              {renderPreviewImage(links[hoveredIndex].url, "contain")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Preview Carousel */}
      <AnimatePresence>
        {isModalOpen && links[currentIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full max-w-3xl rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              } overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/40">
                <div>
                  <p className="text-xs text-gray-400">
                    Added {formatDate(links[currentIndex].addedDate)}
                  </p>
                  <h4 className="text-lg font-semibold truncate max-w-xl">
                    {links[currentIndex].name || links[currentIndex].url}
                  </h4>
                </div>
                <button
                  type="button"
                  className="p-2 rounded hover:bg-gray-800/60"
                  onClick={closeModal}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative bg-black">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -80 }}
                    transition={{ duration: 0.25 }}
                    className="w-full aspect-video flex items-center justify-center bg-gray-900"
                  >
                    {renderPreviewImage(links[currentIndex].url, "contain")}
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  onClick={showPrev}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  onClick={showNext}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="px-4 py-3 border-t border-gray-700/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm truncate">
                  <div className="font-medium truncate">
                    {links[currentIndex].name || links[currentIndex].url}
                  </div>
                  <a
                    href={links[currentIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline break-all"
                  >
                    {links[currentIndex].url}
                  </a>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-500 text-white text-sm"
                    onClick={() => copyToClipboard(links[currentIndex].url)}
                  >
                    <Copy size={14} />
                    <span>Copy link</span>
                  </button>
                  <a
                    href={links[currentIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
                  >
                    <ExternalLink size={14} />
                    <span>Open</span>
                  </a>
                </div>
              </div>

              {copyMessage && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  {copyMessage}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReferenceLinks;
