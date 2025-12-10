import { motion } from "framer-motion";

const ProjectHeader = ({ project, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
      <p
        className={`text-lg ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        } max-w-3xl`}
      >
        {typeof project.description === "string" &&
        !project.description.includes("\n") &&
        !project.description.includes("#") &&
        !project.description.includes("**")
          ? project.description
          : null}
      </p>
    </motion.div>
  );
};

export default ProjectHeader;

