import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { FiGithub, FiLinkedin, FiYoutube } from "react-icons/fi";


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