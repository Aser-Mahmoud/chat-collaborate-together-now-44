
import { useState } from "react";
import { Copy, Check, Code2, Target, AlertTriangle, Info } from "lucide-react";

interface WriteupContentProps {
  content: string;
  title: string;
}

const WriteupContent = ({ content, title }: WriteupContentProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, codeTitle: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(codeTitle);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderMarkdownContent = (content: string) => {
    // Split content into sections by double newlines
    const sections = content.split(/\n\n+/);
    
    return sections.map((section, index) => {
      const trimmedSection = section.trim();
      
      if (!trimmedSection) return null;

      // Code blocks with language detection
      if (trimmedSection.startsWith('```')) {
        const codeMatch = trimmedSection.match(/```(\w+)?\n?([\s\S]*?)```/);
        if (codeMatch) {
          const language = codeMatch[1] || 'text';
          const code = codeMatch[2].trim();
          
          return (
            <div key={index} className="my-8">
              <div className="bg-gray-950 border border-green-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-green-800">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-green-400 font-mono text-sm">
                      {language === 'bash' ? 'exploit.sh' : 
                       language === 'python' ? 'exploit.py' :
                       language === 'javascript' ? 'exploit.js' :
                       language === 'sql' ? 'payload.sql' :
                       language === 'html' ? 'malicious.html' :
                       `code.${language}`}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(code, `${title}-${index}`)}
                    className="text-green-400 hover:text-green-300 transition-colors flex items-center space-x-2 bg-green-900/30 hover:bg-green-800/40 px-3 py-1 rounded border border-green-700"
                  >
                    {copiedCode === `${title}-${index}` ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span className="text-xs font-mono">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span className="text-xs font-mono">COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-6 text-green-300 font-mono text-sm overflow-x-auto bg-gray-950">
                  <code className="text-green-400">{code}</code>
                </pre>
              </div>
            </div>
          );
        }
      }

      // Headers (# ## ###)
      if (trimmedSection.startsWith('#')) {
        const headerMatch = trimmedSection.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const text = headerMatch[2];
          
          if (level === 1) {
            return (
              <h2 key={index} className="text-3xl font-bold text-green-300 mt-12 mb-6 flex items-center border-b border-green-800 pb-3">
                <Code2 className="h-8 w-8 mr-3 text-green-400" />
                {text}
              </h2>
            );
          } else if (level === 2) {
            return (
              <h3 key={index} className="text-2xl font-semibold text-green-400 mt-10 mb-5 flex items-center">
                <Target className="h-6 w-6 mr-3" />
                {text}
              </h3>
            );
          } else {
            return (
              <h4 key={index} className="text-xl font-medium text-green-300 mt-8 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                {text}
              </h4>
            );
          }
        }
      }

      // Bold text blocks **text**
      if (trimmedSection.startsWith('**') && trimmedSection.endsWith('**')) {
        const text = trimmedSection.slice(2, -2);
        return (
          <div key={index} className="my-6 p-4 bg-green-900/20 border-l-4 border-green-500 rounded-r backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-green-400" />
              <p className="font-semibold text-green-300 text-lg">{text}</p>
            </div>
          </div>
        );
      }

      // Unordered lists (- item)
      if (trimmedSection.includes('\n- ') || trimmedSection.startsWith('- ')) {
        const items = trimmedSection.split('\n').filter(line => line.trim().startsWith('- '));
        return (
          <ul key={index} className="space-y-3 my-6 ml-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start space-x-3 text-green-400/90 leading-relaxed">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{item.replace(/^-\s*/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Ordered lists (1. item)
      if (trimmedSection.match(/^\d+\.\s/)) {
        const items = trimmedSection.split('\n').filter(line => line.trim().match(/^\d+\.\s/));
        return (
          <ol key={index} className="space-y-3 my-6 ml-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start space-x-3 text-green-400/90 leading-relaxed">
                <span className="text-green-300 font-mono font-bold min-w-[1.5rem]">{itemIndex + 1}.</span>
                <span>{item.replace(/^\d+\.\s*/, '')}</span>
              </li>
            ))}
          </ol>
        );
      }

      // Inline code `code`
      const processInlineCode = (text: string) => {
        return text.split(/(`[^`]+`)/).map((part, i) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={i} className="bg-gray-800 text-green-300 px-2 py-1 rounded font-mono text-sm border border-green-700">
                {part.slice(1, -1)}
              </code>
            );
          }
          return part;
        });
      };

      // Regular paragraphs
      return (
        <p key={index} className="text-green-400/90 leading-relaxed my-6 text-lg">
          {processInlineCode(trimmedSection)}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="bg-gray-900/20 border border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50">
      <div className="prose prose-invert max-w-none">
        {renderMarkdownContent(content)}
      </div>
    </div>
  );
};

export default WriteupContent;
