import {useRef, useState} from 'react';
import {motion, useInView, AnimatePresence} from 'framer-motion';
import {ArrowUpRight, Code2, Globe, Zap, Users, Plus, X} from 'lucide-react';

import {useTheme} from '../../context/ThemeContext';
import { PROJECTS } from '../../utils/Data/projectsData';
import ProjectCard from "../Cards/ProjectCard";
import {containerVariants, itemVariants} from '../../utils/helper';
import ProjectDetailsInputForm from '../InputForms/ProjectDetailsInputForm';


const ProjectsSection = () => {

    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`py-24 px-6 ${
        isDarkMode ? "bg-gray-950 text-gray-50" : "bg-gray-50 text-gray-900"
      } relative overflow-hidden`}
    >
      <div className="">
        <div
          className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-50 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-50 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className={`text-sm uppercase tracking-widest ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            } mb-4`}
          >
            Featured Work
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
          >
            Recent
            <span className="text-blue-500 font-medium ml-2">Projects</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto font-light`}
          >
            A collection of projects that showcase my expertise in building modern web applications and solving complex problems.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isDarkMode={isDarkMode} />
          ))}
          
          {/* Add Project Button Card */}
          {/* <motion.div
            variants={itemVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            className="group"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className={`w-full rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ${
                isDarkMode
                  ? "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                  : "bg-gray-50/50 border-gray-200 hover:border-gray-300"
              } backdrop-blur-sm h-full min-h-[500px] flex flex-col items-center justify-center p-6 cursor-pointer`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors ${
                isDarkMode
                  ? "bg-gray-800 group-hover:bg-blue-600"
                  : "bg-gray-200 group-hover:bg-blue-500"
              }`}>
                <Plus 
                  size={40} 
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-gray-400 group-hover:text-white"
                      : "text-gray-600 group-hover:text-white"
                  }`}
                />
              </div>
              <h3 className={`text-xl font-medium mb-2 transition-colors ${
                isDarkMode
                  ? "text-gray-300 group-hover:text-blue-400"
                  : "text-gray-700 group-hover:text-blue-600"
              }`}>
                Add New Project
              </h3>
              <p className={`text-sm text-center ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
              }`}>
                Click to create a new project
              </p>
            </button>
          </motion.div> */}
        </motion.div>
      </div>

      {/* Modal for Project Details Form */}
      {/* <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="min-h-screen p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative"
              >
                <ProjectDetailsInputForm
                  project={null}
                  onSubmit={(formData) => {
                    console.log("Form submitted:", formData);
                    // TODO: Handle form submission (save to data.js or API)
                    setIsModalOpen(false);
                  }}
                  onCancel={() => setIsModalOpen(false)}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </section>
  );
}

export default ProjectsSection
