import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import LinkPreview from "../ui/link-preview";

// Custom link component for markdown with preview
const LinkRenderer = ({ href, children }) => {
  if (href && (href.startsWith("http") || href.startsWith("https"))) {
    return <LinkPreview url={href}>{children}</LinkPreview>;
  }
  return <a href={href}>{children}</a>;
};

const Overview = ({ description, isDarkMode }) => {
  if (!description) return null;

  // Check if description is markdown
  const isMarkdown =
    typeof description === "string" &&
    (description.includes("\n") ||
      description.includes("#") ||
      description.includes("**") ||
      description.includes("[") ||
      description.includes("```"));

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
        className={`markdown-content text-base leading-relaxed ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        } [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-6 ${
          isDarkMode ? "[&>h1]:text-gray-100" : "[&>h1]:text-gray-900"
        } [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:mt-5 ${
          isDarkMode ? "[&>h2]:text-gray-100" : "[&>h2]:text-gray-900"
        } [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-2 [&>h3]:mt-4 ${
          isDarkMode ? "[&>h3]:text-gray-100" : "[&>h3]:text-gray-900"
        } [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:mb-4 ${
          isDarkMode
            ? "[&>blockquote]:border-blue-400 [&>blockquote]:text-gray-300"
            : "[&>blockquote]:border-blue-500 [&>blockquote]:text-gray-600"
        } [&>table]:w-full [&>table]:border-collapse [&>table]:my-4 [&>table>thead>tr>th]:border [&>table>thead>tr>th]:p-2 [&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:p-2`}
      >
        {isMarkdown ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => <LinkRenderer {...props} />,
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={isDarkMode ? vscDarkPlus : vs}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className={`px-2 py-1 rounded text-sm ${
                      isDarkMode
                        ? "bg-gray-800 text-blue-300"
                        : "bg-gray-100 text-blue-600"
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt}
                  className="rounded-lg my-4 max-w-full"
                />
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        ) : (
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Overview;

