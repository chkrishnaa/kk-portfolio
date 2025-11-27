import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../utils/data";
import { containerVariants, itemVariants } from "../../utils/helper";

const ContactSection = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setShowSuccess(true);
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-24 px-6 ${
        isDarkMode ? "bg-gray-950 text-gray-50" : "bg-gray-50 text-gray-900"
      }`}
    >
      <motion.div style={{ y }} className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className={`text-sm uppercase tracking-widest ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            } mb-4`}
          >
            Let's Collaborate
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
          >
            Get in <span className="text-blue-500 font-medium">Touch</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-3xl mx-auto`}
          >
            I'd love to hear about your project, idea or collaboration. Drop a
            message and let's craft something memorable.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12"
        >
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border ${
              isDarkMode
                ? "bg-gray-900/60 border-gray-800"
                : "bg-white border-gray-200"
            } backdrop-blur-sm space-y-8`}
          >
            <div>
              <h3 className="text-xl font-medium mb-4">Reach me directly</h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((info) => (
                  <div key={info.label} className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <info.icon className="text-blue-500" size={20} />
                    </div>
                    <div>
                      <p
                        className={`text-sm uppercase tracking-widest ${
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {info.label}
                      </p>
                      <p
                        className={`text-base font-medium ${
                          isDarkMode ? "text-gray-100" : "text-gray-800"
                        }`}
                      >
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Elsewhere on the web</h3>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                      isDarkMode
                        ? "border-gray-700 text-gray-100 hover:border-blue-500"
                        : "border-gray-200 text-gray-800 hover:border-blue-500"
                    }`}
                  >
                    <link.icon size={18} />
                    <span>{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className={`p-8 rounded-2xl border ${
              isDarkMode
                ? "bg-gray-900/60 border-gray-800"
                : "bg-white border-gray-200"
            } backdrop-blur-sm space-y-6`}
          >
            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-gray-500">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-gray-50 border-gray-200 text-gray-900"
                }`}
                placeholder="How should I address you?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-gray-500">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-gray-50 border-gray-200 text-gray-900"
                }`}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-gray-500">
                Message
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-gray-50 border-gray-200 text-gray-900"
                }`}
                placeholder="Tell me about your idea or project..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all disabled:opacity-50"
            >
              <Send size={18} />
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            </motion.button>

            <AnimatePresence>
              {showSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-sm text-green-400 text-center"
                >
                  Message sent! I'll get back to you shortly.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
