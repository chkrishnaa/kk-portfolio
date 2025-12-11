import { motion } from "framer-motion";
import { ExternalLink, MoreVertical } from "lucide-react";
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
  } else if (
    urlLower.includes("twitter.com") ||
    urlLower.includes("x.com")
  ) {
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
    return "bg-rose-500";
  } else if (urlLower.includes("facebook.com") || urlLower.includes("fb.com")) {
    return "bg-blue-600";
  } else if (
    urlLower.includes("twitter.com") ||
    urlLower.includes("x.com")
  ) {
    return "bg-black";
  } else if (urlLower.includes("linkedin.com")) {
    return "bg-blue-700";
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
  if (!project.externalLinks || project.externalLinks.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <h3 className="text-xl font-bold mb-4">Reference Links</h3>
      <div className="space-y-2">
        {project.externalLinks.map((link, index) => {
          const IconComponent = getPlatformIcon(link.url);
          const platformColor = getPlatformColor(link.url);
          const displayName = link.name || link.url;
          const addedDate = link.addedDate || "Mar 2, 2025, 8:41 PM";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800/50 hover:bg-gray-800/70"
                  : "bg-gray-100/50 hover:bg-gray-100/70"
              } transition-colors`}
            >
              {/* Left: Icon */}
              <div
                className={`${platformColor} text-white rounded flex items-center justify-center shrink-0 h-8 aspect-square`}
              >
                <IconComponent size={24} />
              </div>

              {/* Middle: File Name and Date */}
              <div className="flex-1 ml-4 min-w-0">
                <p
                  className={`font-medium truncate ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
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

              {/* Right: Action Icons */}
              <div className="flex items-center space-x-2 ml-4 shrink-0">
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded ${
                    isDarkMode
                      ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                      : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                  title="Open in new tab"
                >
                  <ExternalLink size={16} />
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded ${
                    isDarkMode
                      ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                      : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                  title="More options"
                  onClick={() => {
                    // Menu functionality will be added later
                    console.log("Menu clicked for:", link.url);
                  }}
                >
                  <MoreVertical size={16} />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ReferenceLinks;
