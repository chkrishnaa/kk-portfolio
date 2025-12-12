import { Code2, GraduationCap, Award, Zap, Server, Heart, Rocket, Coffee, BookOpen } from "lucide-react";

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
