import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Sidebar = ({ project, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`rounded-2xl border p-6 top-24 ${
        isDarkMode
          ? "bg-gray-900/50 border-gray-800"
          : "bg-white/50 border-gray-200"
      } backdrop-blur-sm`}
    >
      {/* ROLE */}
      {project.role && (
        <div className="mb-6">
          <div
            className={`text-xs uppercase tracking-wider mb-2 ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            }`}
          >
            ROLE
          </div>
          <div className="font-medium">{project.role}</div>
        </div>
      )}

      {/* DURATION */}
      {project.duration && (
        <div className="mb-6">
          <div
            className={`text-xs uppercase tracking-wider mb-2 ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            }`}
          >
            DURATION
          </div>
          <div className="font-medium">{project.duration}</div>
        </div>
      )}

      {/* STATUS */}
      {project.status && (
        <div className="mb-6">
          <div
            className={`text-xs uppercase tracking-wider mb-2 ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            }`}
          >
            STATUS
          </div>
          <div className="font-medium">{project.status}</div>
        </div>
      )}

      {/* Technologies Used */}
      {(project.technologies || project.tags) && (
        <div>
          <div
            className={`text-xs uppercase tracking-wider mb-4 ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            }`}
          >
            Technologies Used
          </div>
          <div className="space-y-3">
            {(project.technologies || project.tags).map((tech, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check
                  size={16}
                  className={`${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  } flex-shrink-0`}
                />
                <span className="text-sm">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;

