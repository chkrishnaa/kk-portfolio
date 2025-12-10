import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const BackButton = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <motion.button
      onClick={() => navigate("/")}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
        isDarkMode
          ? "bg-gray-900/50 hover:bg-gray-800/50 text-gray-300 hover:text-white border-gray-700"
          : "bg-white/50 hover:bg-gray-100/50 text-gray-700 hover:text-gray-900 border-gray-300"
      } backdrop-blur-sm`}
      whileHover={{ x: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft size={18} />
      <span>Back to Projects</span>
    </motion.button>
  );
};

export default BackButton;

