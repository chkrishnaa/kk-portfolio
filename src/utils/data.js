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

import { FiGithub, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";

import PROJECT_IMG_1 from "../assets/ProjectImages/CurrencyConverterThumbnail.png";

export const SKILLS_CATEGORY = [
  {
    title: "Frontend",
    icon: Code2,
    description: "Crafting beautiful, responsive user interfaces",
    skills: [
      { name: "React", level: 95, color: "bg-blue-500" },
      { name: "TypeScript", level: 90, color: "bg-blue-400" },
      // { name: "Next.js", level: 88, color: "bg-gray-800" },
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
      // { name: "Python", level: 85, color: "bg-yellow-500" },
      // { name: "GraphQL", level: 80, color: "bg-pink-600" },
      // { name: "REST APIs", level: 92, color: "bg-orange-500" },
    ],
  },

  {
    title: "Database",
    icon: Database,
    description: "Managing and optimizing data storage",
    skills: [
      { name: "MongoDB", level: 88, color: "bg-green-600" },
      // { name: "MongoDb", level: 85, color: "bg-blue-700" },
      // { name: "Redis", level: 80, color: "bg-red-500" },
      // { name: "Prisma", level: 82, color: "bg-indigo-600" },
      // { name: "Firebase", level: 78, color: "bg-yellow-600" },
    ],
  },

  {
    title: "DevOps",
    icon: Cloud,
    description: "Deploying and scaling applications",
    skills: [
      { name: "Docker", level: 82, color: "bg-blue-600" },
      // { name: "AWS", level: 78, color: "bg-orange-600" },
      { name: "Vercel", level: 90, color: "bg-gray-900" },
      { name: "Git", level: 95, color: "bg-orange-700" },
      // { name: "CI/CD", level: 75, color: "bg-purple-600" },
    ],
  },
];

export const TECH_STACK = ["JavaScript", "HTML5", "CSS3", "Next.js", "Canva"];

export const STATS = [
  { number: "2", label: "Projects Completed" },
  { number: "2", label: "Years Experience" },
  { number: "5+", label: "Technologies" },
  { number: "80%", label: "Client Satisfaction" },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Blog App with AI Post Generator",
    description:
      "A full-stack blog app using the MERN stack - with full Markdown support, tag filtering, and integrated AI capabilities to generate article drafts based on user prompts.",
    image: "",
    tags: ["React", "Mongo DB", "Express JS", "Node JS", "Tailwind CSS"],
    liveUrl: "https://jobify-one.vercel.app",
    githubUrl: "https://github.com/chkrishnaa/jobify",
    featured: true,
    category: "Full Stack",
    // Optional fields for project detail page
    role: "Lead Full-stack Developer",
    duration: "Jan 2024 - Apr 2024",
    status: "Live Project",
    technologies: ["React", "Node", "Express", "MongoDB", "Tailwind CSS"],
    videoUrl: "", // Optional video URL
    galleryImages: [], // Optional array of image URLs
  },

  {
    id: 2,
    title: "Real-Time Collaborative Code Editor",
    description:
      "A web-based editor leveraging WebSockets for simultaneous, real-time code collaboration between multiple users, complete with syntax highlighting and file sharing.",
    image: "",
    tags: ["React", "Mongo DB", "Express JS", "Node JS", "Tailwind CSS"],
    liveUrl: "https://time-to-wish.vercel.app",
    githubUrl: "https://github.com/chkrishnaa/time-to-wish",
    featured: true,
    category: "Frontend",
    role: "Full-stack Developer",
    duration: "Mar 2024 - May 2024",
    status: "Live Project",
    technologies: ["React", "Node", "Express", "MongoDB", "WebSockets"],
    videoUrl: "",
    galleryImages: [],
  },

  {
    id: 3,
    title: "Currency Converter",
    description: `This currency converter app provides a clean and modern interface that makes converting money between different countries simple and intuitive. At the top, users can enter the amount they want to convert, followed by two dropdown menus—one for the source currency and one for the target currency. Each dropdown is enhanced with a country flag icon 🇺🇸🇮🇳, making it easier to quickly recognize currencies at a glance. The center also includes a swap/flip button 🔁, allowing users to instantly reverse the currency direction without manually changing both fields.

Once the currencies and amount are selected, users can tap the "Get Exchange Rate" button to fetch the latest conversion value. The result appears neatly below, showing the exact conversion in a clear and bold format—e.g., 100 USD = 9002.51 INR. The overall design combines a glassy card effect with a futuristic background, creating a stylish and user-friendly experience. The interface not only looks visually appealing but also ensures smooth usability for anyone who wants quick and accurate currency conversions.`,
    image: "",
    tags: ["React", "CSS"],
    liveUrl: "https://kk-currency-converter.netlify.app",
    githubUrl: "https://github.com/chkrishnaa/Currency-Converter",
    featured: false,
    category: "Frontend",
    role: "Frontend Developer",
    duration: "Feb 2024 - Mar 2024",
    status: "Live Project",
    technologies: ["React", "CSS", "API Integration"],
    videoUrl: "https://www.youtube.com/embed/ZmAIubnCDrs?si=Se3fVv_QHiERmlf4",
    galleryImages: [
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
      PROJECT_IMG_1,
    ],
  },

  {
    id: 4,
    title: "AI Image Creator",
    description:
      "AI Image Creator converts text into stunning visuals using models like Stable Diffusion XL, Open Journey, and FLUX.1-dev. Enter a prompt and generate unique, high-quality images instantly. Perfect for artists, designers, and creators looking for AI-powered inspiration! 🎨🚀",
    image: "",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://ai-image-creater.netlify.app",
    githubUrl: "https://github.com/chkrishnaa/ai-image-creater",
    featured: false,
    category: "Frontend",
    role: "Frontend Developer",
    duration: "Jan 2024 - Feb 2024",
    status: "Live Project",
    technologies: ["HTML", "CSS", "JavaScript", "AI APIs"],
    videoUrl: "",
    galleryImages: [],
  },
  // {
  //   id: 5,
  //   title: "AI Image Creator",
  //   description:
  //     "AI Image Creator converts text into stunning visuals using models like Stable Diffusion XL, Open Journey, and FLUX.1-dev. Enter a prompt and generate unique, high-quality images instantly. Perfect for artists, designers, and creators looking for AI-powered inspiration! 🎨🚀",
  //   image: "",
  //   tags: ["HTML", "CSS", "JavaScript"],
  //   liveUrl: "https://krishnakumar-portfolio-04012005.netlify.app",
  //   githubUrl: "https://github.com/chkrishnaa/ai-image-creater",
  //   featured: false,
  //   category: "Frontend",
  // },
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
    color: "hover:text-gray-500",
    bgColor: "hover:bg-gray-800/10",
    border: "hover:border-gray-400",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://linkedin.com/in/YourUsername", // Changed to a placeholder
    color: "hover:text-blue-800",
    bgColor: "hover:bg-blue-900/10",
    border: "hover:border-blue-800",
  },
  {
    name: "Youtube",
    icon: FiYoutube,
    url: "https://www.youtube.com/@KrishnakumarChaurashiya", // Changed to a placeholder
    color: "hover:text-red-400",
    bgColor: "hover:bg-red-500/10",
    border: "hover:border-red-400",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:your.email@example.com", // Changed to a placeholder
    color: "hover:text-green-400",
    bgColor: "hover:bg-green-500/10",
    border: "hover:border-green-400",
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