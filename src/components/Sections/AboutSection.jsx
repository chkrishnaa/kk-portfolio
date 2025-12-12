import {useRef} from 'react';
import {motion, useInView, useScroll, useTransform} from 'framer-motion';
import {useTheme} from '../../context/ThemeContext';
import { JOURNEY_STEPS, PASSIONS } from '../../utils/Data/aboutData';
import SIGNATURE from '../../assets/KkImages/Signature.png';
import { containerVariants, itemVariants } from "../../utils/helper";

const AboutSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const timelineView = useInView(timelineRef, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const stepVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-24 px-6 ${
        isDarkMode ? "bg-gray-950 text-gray-50" : "bg-gray-50 text-gray-900"
      } relative overflow-hidden`}
    >
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-40 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-50 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-50 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
        ></div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            Get to Know Me
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
          >
            About
            <span className="text-blue-500 font-medium"> Me</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto font-light`}
          >
            A collection of projects that showcase my expertise in building
            modern web applications and solving complex problems.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className={`p-8 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-gray-50/80 border-gray-200"
              } backdrop-blur-sm`}
            >
              <h3 className="text-2xl font-medium mb-6">My Mission</h3>
              <p
                className={`text-lg leading-relaxed mb-6 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                I am passionate about coding and enjoy working on innovative
                projects that foster creativity and enhance my technical skills.
                I am particularly interested in pursuing a career in web
                development, where I can continue to refine both my technical
                expertise and creative problem-solving abilities. Experienced in
                building responsive, user-friendly web applications.
                Continuously engaged in real-world projects to enhance
                proficiency in full-stack development and modern web
                technologies technologies.
              </p>
              <p
                className={`text-base leading-relaxed ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                My mission is to create innovative and user-friendly web
                applications that offer seamless and engaging digital
                experiences. I aim to combine modern technologies with
                thoughtful design to solve real-world problems effectively. By
                focusing on performance, accessibility, and intuitive
                interfaces, I strive to make every product enjoyable to use.
                Ultimately, I want to build solutions that not only meet user
                needs but also inspire and empower them.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-medium mb-6">
                What I Love Building ?
              </h3>
              <div className="grid gap-4">
                {PASSIONS.map((passion, index) => (
                  <motion.div
                    key={passion.title}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className={`flex items-center space-x-4 p-4 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-800/30 hover:bg-gray-800/50"
                        : "bg-gray-200/50 hover:bg-gray-100/50"
                    } transition-all duration-300`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <passion.icon
                        size={20}
                        className="text-blue-500"
                      ></passion.icon>
                    </div>
                    <div className="">
                      <h4 className="font-medium mb-1">{passion.title}</h4>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {passion.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center py-8 border border-blue-500 rounded-3xl"
            >
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                } mb-4`}
              >
                Created with Passion by
              </div>
              <div className="flex justify-center">
                <img
                  src={SIGNATURE}
                  alt="Krishnakumar"
                  className="w-40 sm:w-48"
                />
              </div>
              <div className="text-lg font-medium text-blue-500 mt-2">
                Krishnakumar Chaurashiya
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            ref={timelineRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={timelineVariants}
            className="relative"
          >
            <h3 className="text-2xl font-medium mb-8 text-center lg:text-left">
              My developer Journey
            </h3>
            <div
              className={`absolute left-8 top-16 bottom-0 w-px ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>
            <div className="space-y-8">
              {JOURNEY_STEPS.map((step, index) => (
                <motion.div
                  key={`${step.year}-${index}`}
                  variants={stepVariants}
                  whileHover={{ x: 4 }}
                  className="relative flex items-start space-x-6 group"
                >
                  <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={itemVariants}
                    className={`absolute top-8 left-8 h-px w-14 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></motion.div>
                  <div
                    className={`relative z-10 shrink-0 w-16 h-16 rounded-full 
                   ${step.color}
                     flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon size={24} className="text-white" />
                  </div>

                  <div
                    className={`grow p-6 rounded-xl border transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800/50 border-gray-700 group-hover:border-gray-600 group-hover:bg-gray-800/70"
                        : "bg-gray-50/50 border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-50"
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-medium">{step.title}</h4>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {step.year}
                      </span>
                    </div>

                    <div
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {step.company}
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mt-20"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center space-y-6"
          >
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Ready to bring your ideas to your life ?
            </p>
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
            >
              Let's Work Together 😀
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection
