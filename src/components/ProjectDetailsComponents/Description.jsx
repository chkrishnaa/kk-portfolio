import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FiCopy, FiCheck } from "react-icons/fi";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import LinkPreview from "../ui/link-preview";
import { useState } from "react";

// Custom link component for markdown with preview
const LinkRenderer = ({ href, children }) => {
  if (href && (href.startsWith("http") || href.startsWith("https"))) {
    return <LinkPreview url={href}>{children}</LinkPreview>;
  }
  return <a href={href}>{children}</a>;
};
const renderCurlyTokens = (children, isDarkMode, variant = "inline") => {
  if (typeof children !== "string") return children;

  return children.split(/(\{[^}]+\})/g).map((part, i) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      return (
        <CurlyBadge
          key={i}
          value={part.slice(1, -1)}
          isDarkMode={isDarkMode}
          variant={variant}
        />
      );
    }
    return <span key={i}>{part}</span>;
  });
};


const CurlyBadge = ({ value, isDarkMode, variant = "inline" }) => {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-md font-medium mx-1";

  const variants = {
    h1: "text-2xl font-semibold",
    h2: "text-xl font-semibold",
    h3: "text-lg font-semibold",
    inline: "text-sm",
  };

  const colors = isDarkMode
    ? "bg-gray-800 ring-1 ring-gray-700"
    : "bg-gray-100 ring-1 ring-gray-200";

  return (
    <span className={`${base} ${variants[variant]} ${colors}`}>{value}</span>
  );
};




const CodeBlock = ({ children, className, isDarkMode }) => {
  const [copied, setCopied] = useState(false);

  const code = String(children)
    .replace(/\r\n/g, "\n")
    .replace(/^\s+|\s+$/g, "");

  const language = /language-(\w+)/.exec(className || "")?.[1] || "text";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      className={`relative my-4 rounded-lg overflow-hidden border ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 z-10 flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition
          ${
            copied
              ? "text-green-600 bg-green-100 border border-green-500 dark:bg-green-900/30"
              : isDarkMode
              ? "text-gray-300 bg-gray-800 hover:bg-gray-700"
              : "text-gray-700 bg-gray-200 hover:bg-gray-300"
          }
        `}
      >
        {copied && <span>Copied!</span>}
        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
      </button>

      <SyntaxHighlighter
        language={language}
        style={isDarkMode ? vscDarkPlus : vs}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          background: isDarkMode ? "#0f172a" : "#f9fafb",
          fontSize: "1rem",
          padding: "1rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};




const Description = ({ description, isDarkMode }) => {
  if (!description) return null;

  // Check if description is markdown
  // const isMarkdown =
  //   typeof description === "string" &&
  //   (description.includes("\n") ||
  //     description.includes("#") ||
  //     description.includes("**") ||
  //     description.includes("[") ||
  //     description.includes("```"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`rounded-2xl border p-8 ${
        isDarkMode
          ? "bg-gray-900/50 border-gray-800"
          : "bg-white/50 border-gray-200"
      } backdrop-blur-sm`}
    >
      <h1 className="text-2xl font-bold mb-4">Description</h1>
      <div
        className={`markdown-content text-sm text-justify leading-relaxed ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }

/* ---------------- HEADINGS ---------------- */
[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-6
${isDarkMode ? "[&>h1]:text-gray-100" : "[&>h1]:text-gray-900"}

[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:mt-5
${isDarkMode ? "[&>h2]:text-gray-100" : "[&>h2]:text-gray-900"}

[&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-2 [&>h3]:mt-4
${isDarkMode ? "[&>h3]:text-gray-100" : "[&>h3]:text-gray-900"}

/* ---------------- TEXT ---------------- */
[&>p]:mb-4 [&>p]:leading-relaxed
[&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4
[&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4
[&>li]:mb-2

/* ---------------- BLOCKQUOTE ---------------- */
[&>blockquote]:border-l-4 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:mb-4
${
  isDarkMode
    ? "[&>blockquote]:border-blue-400 [&>blockquote]:text-gray-300"
    : "[&>blockquote]:border-blue-500 [&>blockquote]:text-gray-600"
}

/* ================= INLINE CODE (SAFE) ================= */

/* Paragraphs */
[&>p>code]:px-2
[&>p>code]:py-0.5
[&>p>code]:rounded-md
[&>p>code]:text-sm
[&>p>code]:font-code
[&>p>code]:whitespace-nowrap

/* Lists */
[&>li>code]:px-2
[&>li>code]:py-0.5
[&>li>code]:rounded-md
[&>li>code]:text-sm
[&>li>code]:font-code
[&>li>code]:whitespace-nowrap


${
  isDarkMode
    ? `
      [&>p>code]:bg-gray-800
      [&>p>code]:text-blue-300
      [&>p>code]:ring-1
      [&>p>code]:ring-gray-700

      [&>li>code]:bg-gray-800
      [&>li>code]:text-blue-300
      [&>li>code]:ring-1
      [&>li>code]:ring-gray-700
    `
    : `
      [&>p>code]:bg-gray-100
      [&>p>code]:text-blue-600
      [&>p>code]:ring-1
      [&>p>code]:ring-gray-200

      [&>li>code]:bg-gray-100
      [&>li>code]:text-blue-600
      [&>li>code]:ring-1
      [&>li>code]:ring-gray-200
    `
}


/* ================= CODE BLOCKS ================= */
/* DO NOT style <pre> here — handled by CodeBlock */

/* ================= TABLES ================= */
[&>table]:w-full
[&>table]:my-6
[&>table]:border-collapse
[&>table]:rounded-lg
[&>table]:overflow-hidden
[&>table]:block
[&>table]:overflow-x-auto

[&>table>thead>tr>th]:px-4
[&>table>thead>tr>th]:py-3
[&>table>thead>tr>th]:text-left
[&>table>thead>tr>th]:font-semibold
[&>table>thead>tr>th]:border-b
[&>table>thead>tr:first-child>th:first-child]:rounded-tl-lg
[&>table>thead>tr:first-child>th:last-child]:rounded-tr-lg


[&>table>tbody>tr]:border-b
[&>table>tbody>tr>td]:px-4
[&>table>tbody>tr>td]:py-2

[&>table>tbody>tr:nth-child(even)]:bg-opacity-50


${
  isDarkMode
    ? `
      [&>table>thead]:bg-gray-800
      [&>table>thead>tr>th]:border-gray-700
      [&>table>tbody>tr]:border-gray-700
      [&>table>tbody>tr:hover]:bg-gray-800/60
      [&>table>tbody>tr:nth-child(even)]:bg-gray-800/40
    `
    : `
      [&>table>thead]:bg-gray-100
      [&>table>thead>tr>th]:border-gray-300
      [&>table>tbody>tr]:border-gray-200
      [&>table>tbody>tr:hover]:bg-gray-50
      [&>table>tbody>tr:nth-child(even)]:bg-gray-100/80

    `
}

/* ---------------- HR ---------------- */
[&>hr]:my-6
[&>hr]:border-0
[&>hr]:h-px
[&>hr]:bg-gray-400/40
`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            a: LinkRenderer,

            h1({ children }) {
              return <h1>{renderCurlyTokens(children, isDarkMode, "h1")}</h1>;
            },
            h2({ children }) {
              return <h2>{renderCurlyTokens(children, isDarkMode, "h2")}</h2>;
            },
            h3({ children }) {
              return <h3>{renderCurlyTokens(children, isDarkMode, "h3")}</h3>;
            },

            p({ children }) {
              return <p>{renderCurlyTokens(children, isDarkMode)}</p>;
            },

            li({ children }) {
              return <li>{renderCurlyTokens(children, isDarkMode)}</li>;
            },

            code({ inline, className, children }) {
              // ❗ ABSOLUTE RULE: NO curly logic here
              if (inline) {
                return (
                  <code
                    className={`px-2 py-0.5 rounded text-sm ${
                      isDarkMode
                        ? "bg-gray-800 text-blue-300"
                        : "bg-gray-100 text-blue-600"
                    }`}
                  >
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock className={className} isDarkMode={isDarkMode}>
                  {children}
                </CodeBlock>
              );
            },

            img({ src, alt }) {
              return (
                <img
                  src={src}
                  alt={alt}
                  className="rounded-lg my-4 w-full max-w-full"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              );
            },
          }}
        >
          {description}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default Description;

