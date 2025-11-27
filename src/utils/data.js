import {
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  Rocket,
  Heart,
  Coffee,
  BookOpen,
  Zap,
  Database,
  Server,
  Cloud,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

import PROJECT_IMG_1 from "../assets/ProjectImages/JobFinderThumbnail.png";
import PROJECT_IMG_2 from "../assets/ProjectImages/JobFinderThumbnail.png";
import PROJECT_IMG_3 from "../assets/ProjectImages/JobFinderThumbnail.png";
import PROJECT_IMG_4 from "../assets/ProjectImages/JobFinderThumbnail.png";
import PROJECT_IMG_5 from "../assets/ProjectImages/JobFinderThumbnail.png";
import PROJECT_IMG_6 from "../assets/ProjectImages/JobFinderThumbnail.png";
import PROJECT_IMG_7 from "../assets/ProjectImages/JobFinderThumbnail.png";
import PROJECT_IMG_8 from "../assets/ProjectImages/JobFinderThumbnail.png";

export const SKILLS_CATEGORY = [
  {
    title: "Frontend",
    icon: Code2,
    description: "Crafting beautiful, responsive user interfaces",
    skills: [
      { name: "React", level: 95, color: "bg-blue-500" },
      { name: "TypeScript", level: 90, color: "bg-blue-400" },
      { name: "Next.js", level: 88, color: "bg-gray-800" },
      { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
      { name: "Framer Motion", level: 85, color: "bg-pink-500" },
    ],
  },

  {
    title: "Backend",
    icon: Server,
    description: "Building robust server-side solutions",
    skills: [
      { name: "Node.js", level: 90, color: "bg-green-500" },
      { name: "Express.js", level: 88, color: "bg-gray-700" },
      { name: "Python", level: 85, color: "bg-yellow-500" },
      { name: "GraphQL", level: 80, color: "bg-pink-600" },
      { name: "REST APIs", level: 92, color: "bg-orange-500" },
    ],
  },

  {
    title: "Database",
    icon: Database,
    description: "Managing and optimizing data storage",
    skills: [
      { name: "MongoDB", level: 88, color: "bg-green-600" },
      { name: "MongoDb", level: 85, color: "bg-blue-700" },
      { name: "Redis", level: 80, color: "bg-red-500" },
      { name: "Prisma", level: 82, color: "bg-indigo-600" },
      { name: "Firebase", level: 78, color: "bg-yellow-600" },
    ],
  },

  {
    title: "DevOps",
    icon: Cloud,
    description: "Deploying and scaling applications",
    skills: [
      { name: "Docker", level: 82, color: "bg-blue-600" },
      { name: "AWS", level: 78, color: "bg-orange-600" },
      { name: "Vercel", level: 90, color: "bg-gray-900" },
      { name: "Git", level: 95, color: "bg-orange-700" },
      { name: "CI/CD", level: 75, color: "bg-purple-600" },
    ],
  },
];

export const TECH_STACK = [
  "JavaScript",
  "HTML5",
  "CSS3",
  "Sass",
  "Webpack",
  "Vite",
  "Jest",
  "Cypress",
  "Figma",
  "Adobe XD",
  "Notion",
  "Slack",
];

export const STATS = [
  { number: "50+", label: "Projects Completed" },
  { number: "3+", label: "Years Experience" },
  { number: "20+", label: "Technologies" },
  { number: "100%", label: "Client Satisfaction" },
];

export const PROJECTS = [
  // --- Existing Project 1 (from image) ---
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with advanced filtering, payment integration, and real-time inventory management. Focus on performance and secure transactions.",
    image: PROJECT_IMG_1,
    tags: ["React", "Tailwind", "Framer motion"],
    liveUrl: "#", // Placeholder URL
    githubUrl: "#", // Placeholder URL
    featured: false,
    category: "Full Stack",
  },

  // --- Existing Project 2 (from image) ---
  {
    id: 2,
    title: "Blog App with AI Post Generator",
    description:
      "A full-stack blog app using the MERN stack – with full Markdown support, tag filtering, and integrated AI capabilities to generate article drafts based on user prompts.",
    image: PROJECT_IMG_2,
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveUrl: "https://jobify-one.vercel.app",
    githubUrl: "#", // Placeholder URL
    featured: true,
    category: "Full Stack",
  },

  // --- New Project 3 ---
  {
    id: 3,
    title: "Real-Time Collaborative Code Editor",
    description:
      "A web-based editor leveraging WebSockets for simultaneous, real-time code collaboration between multiple users, complete with syntax highlighting and file sharing.",
    image: PROJECT_IMG_3,
    tags: ["Next.js", "WebSockets", "Prisma", "TypeScript"],
    liveUrl: "https://time-to-wish.vercel.app", // Placeholder URL
    githubUrl: "#", // Placeholder URL
    featured: true,
    category: "Frontend",
  },

  // --- New Project 4 ---
  {
    id: 4,
    title: "Financial Dashboard (Data Visualization)",
    description:
      "A responsive dashboard displaying complex financial metrics using D3.js and custom charts. Features include time-series data visualization and interactive filtering.",
    image: PROJECT_IMG_4,
    tags: ["React", "D3.js", "Recoil", "Sass"],
    liveUrl: "", // Placeholder URL
    githubUrl: "#", // Placeholder URL
    featured: false,
    category: "Data Viz",
  },

  // --- New Project 5 ---
  {
    id: 5,
    title: "Serverless Image Resizing API",
    description:
      "A robust microservice built using AWS Lambda and API Gateway to automatically resize and optimize images uploaded to an S3 bucket, focusing on low latency and cost efficiency.",
    image: PROJECT_IMG_5,
    tags: ["AWS Lambda", "Node.js", "Serverless", "S3"],
    liveUrl: "#", // Placeholder URL
    githubUrl: "#", // Placeholder URL
    featured: true,
    category: "Backend",
  },

  // --- New Project 6 ---
  {
    id: 6,
    title: "Task Management App (Trello Clone)",
    description:
      "A Kanban-style task management application with drag-and-drop functionality, persistent storage via Firebase, and user authentication. Optimized for mobile use.",
    image: PROJECT_IMG_6,
    tags: ["React", "Firebase", "Zustand", "Tailwind"],
    liveUrl: "#", // Placeholder URL
    githubUrl: "#", // Placeholder URL
    featured: false,
    category: "Full Stack",
  },

  // --- New Project 7 ---
  {
    id: 7,
    title: "Custom CLI Weather Tool",
    description:
      "A command-line interface utility that fetches and displays real-time weather data from a public API, offering forecasts and local alerts directly in the terminal.",
    image: PROJECT_IMG_7,
    tags: ["Node.js", "CLI", "Axios", "JavaScript"],
    liveUrl: "#", // Placeholder URL
    githubUrl: "#", // Placeholder URL
    featured: false,
    category: "Backend",
  },

  // --- New Project 8 ---
  {
    id: 8,
    title: "Portfolio Generator (SaaS)",
    description:
      "A Software as a Service (SaaS) application that allows users to quickly generate and customize professional developer portfolios using pre-built React templates and headless CMS data.",
    image: PROJECT_IMG_8,
    tags: ["Next.js", "Strapi CMS", "PostgreSQL", "Stripe"],
    liveUrl: "#", // Placeholder URL
    githubUrl: "#", // Placeholder URL
    featured: true,
    category: "Full Stack",
  },
];

export const JOURNEY_STEPS = [
  // Step 1: 2022 - Foundational Programming
  {
    year: "2022",
    title: "Foundations in Structured Programming",
    company: "Academic/Self-Study",
    description:
      "Initiated coding journey by mastering foundational programming concepts, data structures, and algorithms in C and Java.",
    icon: Code2, // Used for general coding
    color: "bg-blue-500",
  },

  // Step 2: 2023 - Web Development Core
  {
    year: "2023",
    title: "Entry into Web Development",
    company: "Self-Directed Learning",
    description:
      "Simultaneously delved into the core web technologies: HTML, CSS, and vanilla JavaScript. Began translating static designs into responsive web pages.",
    icon: GraduationCap, // Used for skill acquisition
    color: "bg-green-500",
  },

  // Step 3: 2023 - Advanced Programming & Python
  {
    year: "2023",
    title: "Advanced Concepts & Scripting",
    company: "Deep Dive",
    description:
      "Expanded knowledge in Advanced Java concepts (e.g., OOP principles, collections) and picked up Python for scripting and automation tasks.",
    icon: Award, // Used for achievement/milestone
    color: "bg-yellow-500",
  },

  // Step 4: 2023 - Frontend Framework Focus
  {
    year: "2023",
    title: "Mastering Modern Frontend",
    company: "Framework Adoption",
    description:
      "Transitioned from vanilla JS to modern component-based architecture by learning React. Adopted Vite for faster development builds and improved tooling.",
    icon: Zap, // Used for speed/modernity
    color: "bg-purple-500",
  },

  // Step 5: 2024 - Full Stack Transition (MERN Focus)
  {
    year: "2024",
    title: "MERN Stack Back-End Initiation",
    company: "Full Stack Transition",
    description:
      "Completed the jump to full-stack development by integrating MongoDB (Database) and Express.js (Back-end) into projects, completing the MERN foundation.",
    icon: Server, // Used for back-end/server
    color: "bg-red-500",
  },

  // Step 6: 2024 - UI/UX Exploration
  {
    year: "2024",
    title: "Extensive UI Framework Exploration",
    company: "Design & Aesthetics",
    description:
      "Explored various UI libraries and frameworks (e.g., Mantine UI, Aceternity UI, shadcn/ui) to enhance application aesthetics, speed development, and improve user experience.",
    icon: Heart, // Used for passion/focus on UI
    color: "bg-pink-500",
  },

  // Step 7: 2024 - Professionalization
  {
    year: "2025",
    title: "Full Stack Web Developer (MERN)",
    company: "Professional Developer",
    description:
      "Consolidated skills to operate as a capable MERN Stack developer, building and deploying comprehensive, high-quality full-stack web applications.",
    icon: Rocket, // Used for final stage/launch
    color: "bg-indigo-500",
  },
];

export const PASSIONS = [
  {
    icon: Heart,
    title: "User Experience",
    description: "Crafting intuitive interfaces that users love",
  },
  {
    icon: Coffee,
    title: "Problem Solving",
    description: "Turning complex challenges into elegant solutions",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "Always exploring new technologies and best practices",
  },
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    icon: FiGithub,
    url: "https://github.com/YourUsername", // Changed to a placeholder
    color: "hover:text-gray-400",
    bgColor: "hover:bg-gray-800",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://linkedin.com/in/YourUsername", // Changed to a placeholder
    color: "hover:text-blue-400",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    name: "Twitter",
    icon: FiTwitter,
    url: "https://twitter.com/YourUsername", // Changed to a placeholder
    color: "hover:text-sky-400",
    bgColor: "hover:bg-sky-500/10",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:your.email@example.com", // Changed to a placeholder
    color: "hover:text-green-400",
    bgColor: "hover:bg-green-500/10",
  },
];

export const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
  },
  {
    icon: Mail,
    label: "Email",
    value: "alex@timetoprogram.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
];