
import { useState } from "react";
import { Copy, Check, Code2, Target, AlertTriangle, Info, Terminal, Zap } from "lucide-react";

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
    const sections = content.split(/\n\n+/);
    
    return sections.map((section, index) => {
      const trimmedSection = section.trim();
      
      if (!trimmedSection) return null;

      // Enhanced Code blocks with terminal styling
      if (trimmedSection.startsWith('```')) {
        const codeMatch = trimmedSection.match(/```(\w+)?\n?([\s\S]*?)```/);
        if (codeMatch) {
          const language = codeMatch[1] || 'text';
          const code = codeMatch[2].trim();
          
          return (
            <div key={index} className="my-8">
              <div className="bg-black border border-green-800 rounded-lg overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="bg-gray-900 px-6 py-3 flex items-center justify-between border-b border-green-800">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Terminal className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-mono text-sm">
                        {language === 'bash' ? 'exploit.sh' : 
                         language === 'python' ? 'exploit.py' :
                         language === 'javascript' ? 'exploit.js' :
                         language === 'sql' ? 'payload.sql' :
                         language === 'html' ? 'malicious.html' :
                         `code.${language}`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(code, `${title}-${index}`)}
                    className="text-green-400 hover:text-green-300 transition-colors flex items-center space-x-2 bg-green-900/30 hover:bg-green-800/40 px-3 py-1 rounded border border-green-700 group"
                  >
                    {copiedCode === `${title}-${index}` ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span className="text-xs font-mono">[COPIED]</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono">[COPY]</span>
                      </>
                    )}
                  </button>
                </div>
                
                {/* Code Content */}
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800/50 border-r border-green-800/30 flex flex-col justify-start pt-4">
                    {code.split('\n').map((_, i) => (
                      <div key={i} className="text-green-600/40 text-xs font-mono px-2 leading-6">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                  <pre className="pl-16 pr-6 py-4 text-green-300 font-mono text-sm overflow-x-auto bg-black min-h-[3rem]">
                    <code className="text-green-400">{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          );
        }
      }

      // Enhanced Headers with terminal styling
      if (trimmedSection.startsWith('#')) {
        const headerMatch = trimmedSection.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const text = headerMatch[2];
          
          if (level === 1) {
            return (
              <div key={index} className="mt-12 mb-8">
                <div className="bg-gray-900/60 border border-green-800 rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <Code2 className="h-8 w-8 text-green-400 animate-pulse" />
                    <span className="text-green-600 font-mono text-sm">[SECTION_INIT]</span>
                  </div>
                  <h2 className="text-3xl font-bold text-green-300 font-mono">
                    <span className="text-red-400">&gt;&gt; </span>
                    {text}
                    <span className="text-green-400 animate-pulse">_</span>
                  </h2>
                </div>
              </div>
            );
          } else if (level === 2) {
            return (
              <div key={index} className="mt-10 mb-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-900/40 border-l-4 border-green-500 rounded-r backdrop-blur-sm">
                  <Target className="h-6 w-6 text-green-400" />
                  <h3 className="text-2xl font-semibold text-green-300 font-mono">
                    <span className="text-green-600">[</span>
                    {text}
                    <span className="text-green-600">]</span>
                  </h3>
                </div>
              </div>
            );
          } else {
            return (
              <h4 key={index} className="text-xl font-medium text-green-300 mt-8 mb-4 flex items-center font-mono">
                <Zap className="h-5 w-5 mr-3 text-green-400" />
                <span className="text-green-600">&gt; </span>
                {text}
              </h4>
            );
          }
        }
      }

      // Enhanced Bold text blocks
      if (trimmedSection.startsWith('**') && trimmedSection.endsWith('**')) {
        const text = trimmedSection.slice(2, -2);
        return (
          <div key={index} className="my-6 p-6 bg-red-900/20 border border-red-600/50 rounded-lg backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600 animate-pulse"></div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-400 animate-pulse" />
              <span className="text-red-300 font-mono text-xs">[ALERT]</span>
            </div>
            <p className="font-bold text-red-200 text-lg mt-2 font-mono">{text}</p>
          </div>
        );
      }

      // Enhanced Lists with terminal styling
      if (trimmedSection.includes('\n- ') || trimmedSection.startsWith('- ')) {
        const items = trimmedSection.split('\n').filter(line => line.trim().startsWith('- '));
        return (
          <div key={index} className="my-6 bg-gray-900/30 border border-green-800/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-mono text-sm">[LIST_ITEMS]</span>
            </div>
            <ul className="space-y-3">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-3 text-green-400/90 leading-relaxed font-mono">
                  <span className="text-green-400 font-bold min-w-[1.5rem]">&gt;</span>
                  <span>{item.replace(/^-\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // Enhanced Ordered lists
      if (trimmedSection.match(/^\d+\.\s/)) {
        const items = trimmedSection.split('\n').filter(line => line.trim().match(/^\d+\.\s/));
        return (
          <div key={index} className="my-6 bg-gray-900/30 border border-green-800/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-mono text-sm">[SEQUENCE]</span>
            </div>
            <ol className="space-y-3">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-3 text-green-400/90 leading-relaxed font-mono">
                  <span className="text-green-300 font-bold min-w-[2rem]">[{String(itemIndex + 1).padStart(2, '0')}]</span>
                  <span>{item.replace(/^\d+\.\s*/, '')}</span>
                </li>
              ))}
            </ol>
          </div>
        );
      }

      // Enhanced inline code processing
      const processInlineCode = (text: string) => {
        return text.split(/(`[^`]+`)/).map((part, i) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={i} className="bg-gray-800 text-green-300 px-2 py-1 rounded font-mono text-sm border border-green-700 relative">
                <span className="text-green-600 text-xs absolute -top-2 -left-1">&lt;</span>
                {part.slice(1, -1)}
                <span className="text-green-600 text-xs absolute -bottom-2 -right-1">/&gt;</span>
              </code>
            );
          }
          return part;
        });
      };

      // Enhanced Regular paragraphs
      return (
        <div key={index} className="my-6 p-4 bg-gray-900/20 border-l-2 border-green-600/50 rounded-r backdrop-blur-sm">
          <p className="text-green-400/90 leading-relaxed text-lg font-mono">
            <span className="text-green-600 mr-2">&gt;</span>
            {processInlineCode(trimmedSection)}
          </p>
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div className="bg-black/80 border border-green-800 rounded-lg backdrop-blur-sm shadow-2xl shadow-green-900/50 relative overflow-hidden">
      {/* Terminal-style header */}
      <div className="bg-gray-900 border-b border-green-800 px-8 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-green-400 font-mono text-sm">v1g0@security:~/writeups$ cat {title.toLowerCase().replace(/\s+/g, '_')}.md</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8">
        <div className="prose prose-invert max-w-none">
          {renderMarkdownContent(content)}
        </div>
      </div>
      
      {/* Bottom terminal line */}
      <div className="bg-gray-900 border-t border-green-800 px-8 py-2">
        <span className="text-green-600 font-mono text-xs">[EOF] Press any key to continue...</span>
      </div>
    </div>
  );
};

export default WriteupContent;
