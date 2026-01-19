import PROJECT_IMG_1 from "../../assets/ProjectImages/CurrencyConverterThumbnail.png";

export const PROJECTS = [
  {
    id: 1,
    title: "Blog App with AI Post Generator",
    description:
      "A full-stack blog app using the MERN stack - with full Markdown support, tag filtering, and integrated AI capabilities to generate article drafts based on user prompts.",
    image: "",
    technologies: [
      "React",
      "Mongo DB",
      "Express JS",
      "Node JS",
      "Tailwind CSS",
    ],
    tags: [],

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
    technologies: [
      "React",
      "Mongo DB",
      "Express JS",
      "Node JS",
      "Tailwind CSS",
    ],
    tags: [],
    liveUrl: "https://time-to-wish.vercel.app",
    githubUrl: "https://github.com/chkrishnaa/time-to-wish",
    featured: true,
    category: "Frontend",
    role: "Full-stack Developer",
    duration: "Mar 2024 - May 2024",
    status: "Live Project",
    technologies: ["React", "Node", "Express", "MongoDB", "WebSockets"],
    videoUrl: "",
    galleryImages: [PROJECT_IMG_1],
  },

  {
    id: 3,
    title: "Currency Converter",
    overview:
      "A sleek currency converter that lets you enter an amount, pick currencies with flag icons 🇺🇸➡️🇮🇳, use the flip button 🔁, and get instant exchange rates. Features a glass-effect UI with smooth and accurate conversions.",
    description: `
# 🌍 Currency Converter App

This currency converter app provides a clean and modern interface that makes converting money between different countries simple and intuitive. At the top, users can enter the amount they want to convert, followed by two dropdown menus—one for the source currency and one for the target currency. Each dropdown is enhanced with a country flag icon 🇺🇸🇮🇳, making it easier to quickly recognize currencies at a glance. The center also includes a swap/flip button 🔁, allowing users to instantly reverse the currency direction without manually changing both fields.

Once the currencies and amount are selected, users can tap the “Get Exchange Rate” button to fetch the latest conversion value. The result appears neatly below, showing the exact conversion in a clear and bold format—e.g., 100 USD = 9002.51 INR. The overall design combines a glassy card effect with a futuristic background, creating a stylish and user-friendly experience. The interface not only looks visually appealing but also ensures smooth usability for anyone who wants quick and accurate currency conversions.

---

## ✨ Features

- Convert any amount between global currencies
- Flag-based currency dropdowns for better identification
- Swap/flip button to reverse currency direction instantly
- Real-time conversion using Exchange Rate API
- Glass-effect UI with futuristic design
- Responsive layout for mobile and desktop
- Fast performance with React + Vite

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript

### Styling
- CSS3

### APIs
- Exchange Rate API
- Flags API

---

## 🚀 For getting Exchange Rate API Key
Visit to this link: https://www.exchangerate-api.com

---

# Getting Started with {.env} file

1. Create a file named {.env} in the root directory of your project.
2. Inside the ".env" file, add the following lines:
\`\`\`
VITE_EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
\`\`\`
3. Replace "your_exchange_rate_api_key" with your actual Exchange Rate API key.

---

\`\`\`js
console.log("Hello, World!");
\`\`\`

---

## Table:
| Name        | Role              | Experience (Years) | Tech Stack            |
|-------------|-------------------|--------------------|-----------------------|
| Krishna     | Frontend Dev      | 2                  | React, Tailwind       |
| Ananya      | Backend Dev       | 3                  | Node.js, MongoDB      |
| Rahul       | Full Stack Dev    | 4                  | MERN                  |
| Sneha       | UI/UX Designer    | 2                  | Figma, Adobe XD       |
| Amit        | DevOps Engineer   | 5                  | Docker, AWS           |

---

## 🖼️ Sample Image

![Sample Image](https://m.media-amazon.com/images/I/91Jal3ye12L._AC_UF1000,1000_QL80_.jpg)


`,
    image: "",
    tags: [
      "currency",
      "rate-conversion",
      "exchange-rates",
      "fixed-rates",
      "get-exchange",
      "real-time-exchange-rates",
      "money-conversion",
      "global-currency",
    ],
    liveUrl: "https://kk-currency-converter.netlify.app",
    githubUrl: "https://github.com/chkrishnaa/Currency-Converter",
    featured: false,
    category: "Frontend",
    role: "Frontend Developer",
    duration: "Feb 2024 - Mar 2024",
    status: "Live Project",
    technologies: ["React", "JaveScript", "CSS"],
    videoUrl: "https://www.youtube.com/embed/eC2Rq-AYMqo?si=8O2730P5yX_ikuec",
    galleryImages: [PROJECT_IMG_1],
    externalLinks: [
      {
        name: "Currency Converter Tutorial - YouTube",
        url: "https://www.youtube.com/watch?v=example1",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
      {
        name: "React Currency Converter Guide",
        url: "https://github.com/example/currency-converter",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
      {
        name: "Exchange Rate API Documentation",
        url: "https://www.youtube.com/watch?v=Y1Q4XXXmVk4",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
      {
        name: "Design Inspiration - Dribbble",
        url: "https://dribbble.com/shots/example",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
      {
        name: "UI/UX Case Study - Behance",
        url: "https://www.behance.net/gallery/example",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
      {
        name: "",
        url: "https://www.linkedin.com/posts/example",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
      {
        name: "Project Showcase - Instagram",
        url: "https://www.instagram.com/p/example",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
      {
        name: "",
        url: "https://twitter.com/example/status/123",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
      {
        name: "Community Discussion - Facebook",
        url: "https://www.facebook.com/groups/example",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
      {
        name: "Design Board - Pinterest",
        url: "https://www.pinterest.com/pin/example",
        addedDate: "Mar 2, 2025, 8:41 PM",
      },
    ],
  },

  {
    id: 4,
    title: "AI Image Creator",
    description:
      "AI Image Creator converts text into stunning visuals using models like Stable Diffusion XL, Open Journey, and FLUX.1-dev. Enter a prompt and generate unique, high-quality images instantly. Perfect for artists, designers, and creators looking for AI-powered inspiration! 🎨🚀",
    image: "",
    technologies: ["HTML", "CSS", "JavaScript"],
    tags: ["image-generation", "ai-images", "artificial-intelligence"],
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
