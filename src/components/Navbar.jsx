import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import KK_LOGO_IMAGE from "../assets/KkImages/KK_Logo_Image.png";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const scrollOnHome = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    };

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    scrollOnHome();
  };

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const sectionId = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsMenuOpen(false);
        }
      });
    }
  }, [location]);
  return (
    <motion.nav
      style={{ opacity: 1 }}
      className={`fixed top-0 w-full z-50 px-6 py-4 border-b ${
        isDarkMode
          ? "bg-gray-950/50 border-gray-800"
          : "bg-gray-50/80 border-gray-200"
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <img src={KK_LOGO_IMAGE} alt="KK Logo" className="w-8 h-8 text-blue-500" />
          <span className={`text-lg ml-1 ${isDarkMode ? "text-gray-50" : "text-gray-900"}`}>Krishnakumar</span>
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Skills", "Work", "About", "Contact"].map((item) => (
            <motion.button
              key={item}
              whileHover={{ y: -2 }}
              onClick={() => {
                scrollToSection(item.toLowerCase());
              }}
              className={`text-sm uppercase tracking-wider transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transitions-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-gray-50 hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? (
              <Sun size={18} className="" />
            ) : (
              <Moon size={18} className="" />
            )}
          </motion.button>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>toggleDarkMode(isDarkMode?"light":"dark")}
            className={`p-2 rounded-full transitions-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-gray-50 hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? (
              <Sun size={18} className="" />
            ) : (
              <Moon size={18} className="" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transitions-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-gray-50 hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isMenuOpen ? (
              <X size={20} className="" />
            ) : (
              <Menu size={20} className="" />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden mt-4 p-4 rounded-lg border ${
              isDarkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            {["Home", "Skills", "Work", "About", "Contact"].map((item) => (
              <motion.button
                key={item}
                whileHover={{ x: 5 }}
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                }}
                className={`block w-full text-left py-2 text-sm uppercase tracking-wider transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
