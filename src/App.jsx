import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/Sections/HeroSection';
import SkillsSection from './components/Sections/SkillsSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import AboutSection from './components/Sections/AboutSection';
import ContactSection from "./components/Sections/ContactSection";
import Footer from './components/Sections/Footer';
import ProjectDetail from './pages/ProjectDetail';

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer/>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App
