import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ProjectDetailsInputForm = ({ project, onSubmit, onCancel }) => {
  const { isDarkMode } = useTheme();
  
  // Initialize form state with project data or defaults
  const [formData, setFormData] = useState({
    id: project?.id || "",
    title: project?.title || "",
    overview: project?.overview || "",
    description: project?.description || "",
    image: project?.image || "",
    technologies: project?.technologies || [],
    tags: project?.tags || [],
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    featured: project?.featured || false,
    category: project?.category || "",
    role: project?.role || "",
    duration: project?.duration || "",
    status: project?.status || "",
    videoUrl: project?.videoUrl || "",
    galleryImages: project?.galleryImages || [],
    externalLinks: project?.externalLinks || [],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayAdd = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], field === "externalLinks" ? { name: "", url: "", addedDate: "" } : ""],
    }));
  };

  const handleArrayRemove = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleArrayItemChange = (field, index, value) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      if (field === "externalLinks") {
        newArray[index] = { ...newArray[index], ...value };
      } else {
        newArray[index] = value;
      }
      return {
        ...prev,
        [field]: newArray,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const inputClasses = `w-full px-4 py-2 rounded-lg border transition-colors ${
    isDarkMode
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    isDarkMode ? "text-gray-300" : "text-gray-700"
  }`;

  return (
    <div className="max-w-4xl mx-auto my-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-6 max-h-[90vh] overflow-y-auto ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Edit Project Details
            </h2>
            {onCancel && (
              <button
                onClick={onCancel}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <X size={20} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Basic Information
              </h3>

              <div>
                <label className={labelClasses}>Project ID</label>
                <input
                  type="number"
                  value={formData.id}
                  onChange={(e) => handleInputChange("id", parseInt(e.target.value) || "")}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Overview</label>
                <textarea
                  value={formData.overview}
                  onChange={(e) => handleInputChange("overview", e.target.value)}
                  className={inputClasses}
                  rows="3"
                  placeholder="Short overview of the project..."
                />
              </div>

              <div>
                <label className={labelClasses}>Description (Markdown Supported)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`${inputClasses} font-mono text-sm`}
                  rows="10"
                  placeholder="Enter markdown formatted description. You can copy-paste markdown content here..."
                />
                <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Supports markdown formatting. You can copy-paste markdown content directly.
                </p>
              </div>

              <div>
                <label className={labelClasses}>Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  className={inputClasses}
                  placeholder="https://example.com/image.png"
                />
              </div>

              <div>
                <label className={labelClasses}>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className={inputClasses}
                >
                  <option value="">Select Category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange("featured", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={labelClasses.replace("mb-2", "")}>Featured Project</span>
                </label>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Project Details
              </h3>

              <div>
                <label className={labelClasses}>Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className={inputClasses}
                  placeholder="e.g., Frontend Developer"
                />
              </div>

              <div>
                <label className={labelClasses}>Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  className={inputClasses}
                  placeholder="e.g., Feb 2024 - Mar 2024"
                />
              </div>

              <div>
                <label className={labelClasses}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className={inputClasses}
                >
                  <option value="">Select Status</option>
                  <option value="Live Project">Live Project</option>
                  <option value="In Development">In Development</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>Live URL</label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => handleInputChange("liveUrl", e.target.value)}
                  className={inputClasses}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className={labelClasses}>GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                  className={inputClasses}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <label className={labelClasses}>Video URL</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                  className={inputClasses}
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>
            </div>

            {/* Technologies Array */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Technologies
                </h3>
                <button
                  type="button"
                  onClick={() => handleArrayAdd("technologies")}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>

              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleArrayItemChange("technologies", index, e.target.value)}
                    className={inputClasses}
                    placeholder="e.g., React, JavaScript"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayRemove("technologies", index)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-red-400"
                        : "hover:bg-gray-100 text-red-500"
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Tags Array */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Tags
                </h3>
                <button
                  type="button"
                  onClick={() => handleArrayAdd("tags")}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>

              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayItemChange("tags", index, e.target.value)}
                    className={inputClasses}
                    placeholder="e.g., currency, conversion"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayRemove("tags", index)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-red-400"
                        : "hover:bg-gray-100 text-red-500"
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Gallery Images Array */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Gallery Images
                </h3>
                <button
                  type="button"
                  onClick={() => handleArrayAdd("galleryImages")}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>

              {formData.galleryImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => handleArrayItemChange("galleryImages", index, e.target.value)}
                    className={inputClasses}
                    placeholder="Image URL or import path (e.g., PROJECT_IMG_1)"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayRemove("galleryImages", index)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-red-400"
                        : "hover:bg-gray-100 text-red-500"
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* External Links Array */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Reference Links
                </h3>
                <button
                  type="button"
                  onClick={() => handleArrayAdd("externalLinks")}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <Plus size={16} />
                  <span>Add</span>
                </button>
              </div>

              {formData.externalLinks.map((link, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border space-y-3 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Link {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleArrayRemove("externalLinks", index)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isDarkMode
                          ? "hover:bg-gray-600 text-red-400"
                          : "hover:bg-gray-200 text-red-500"
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div>
                    <label className={labelClasses}>Name</label>
                    <input
                      type="text"
                      value={link.name || ""}
                      onChange={(e) =>
                        handleArrayItemChange("externalLinks", index, { name: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="Link name (optional)"
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>URL</label>
                    <input
                      type="url"
                      value={link.url || ""}
                      onChange={(e) =>
                        handleArrayItemChange("externalLinks", index, { url: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Added Date</label>
                    <input
                      type="text"
                      value={link.addedDate || ""}
                      onChange={(e) =>
                        handleArrayItemChange("externalLinks", index, { addedDate: e.target.value })
                      }
                      className={inputClasses}
                      placeholder="Mar 2, 2025, 8:41 PM"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700/50">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  }`}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
    </div>
  );
};

export default ProjectDetailsInputForm;

