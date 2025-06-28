
import { useState } from "react";
import { Copy, Check, Terminal, Lock, Bug } from "lucide-react";

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

  // Define all processing functions first
  const processInlineCode = (text: string) => {
    return text.split(/(`[^`]+`)/).map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-gray-800 text-cyan-300 px-2 py-1 rounded font-mono text-sm border border-cyan-600/40">
            {part.slice(1, -1)}
          </code>
        );
      }
      // Process bold and italic for non-code parts
      const withBold = processBold(part);
      return withBold.map((boldPart, j) => {
        if (typeof boldPart === 'string') {
          return processItalic(boldPart);
        }
        return boldPart;
      });
    });
  };

  const processBold = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-cyan-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const processItalic = (text: string) => {
    return text.split(/(\*[^*]+\*)/).map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return (
          <em key={i} className="italic text-purple-300">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  const renderMarkdownContent = (content: string) => {
    const sections = content.split(/\n\n+/);
    
    return sections.map((section, index) => {
      const trimmedSection = section.trim();
      
      if (!trimmedSection) return null;

      // Enhanced Code blocks with cyberpunk terminal styling
      if (trimmedSection.startsWith('```')) {
        const codeMatch = trimmedSection.match(/```(\w+)?\n?([\s\S]*?)```/);
        if (codeMatch) {
          const language = codeMatch[1] || 'text';
          const code = codeMatch[2].trim();
          
          return (
            <div key={index} className="my-8">
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-cyan-500/50 rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/20 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-20 blur-sm"></div>
                <div className="relative bg-black rounded-xl">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 flex items-center justify-between border-b border-cyan-500/30">
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50" style={{animationDelay: '0.3s'}}></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" style={{animationDelay: '0.6s'}}></div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Terminal className="h-5 w-5 text-cyan-400" />
                        <span className="text-cyan-300 font-mono text-sm font-semibold">
                          {language === 'bash' ? '🔓 exploit.sh' : 
                           language === 'python' ? '🐍 payload.py' :
                           language === 'javascript' ? '⚡ exploit.js' :
                           language === 'sql' ? '💉 injection.sql' :
                           language === 'html' ? '🕸️ malicious.html' :
                           `📄 code.${language}`}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(code, `${title}-${index}`)}
                      className="text-cyan-400 hover:text-cyan-200 transition-all duration-300 flex items-center space-x-2 bg-cyan-900/30 hover:bg-cyan-800/50 px-4 py-2 rounded-lg border border-cyan-600/50 hover:border-cyan-400/70 group hover:shadow-lg hover:shadow-cyan-400/20"
                    >
                      {copiedCode === `${title}-${index}` ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span className="text-xs font-mono font-bold">[COPIED]</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-mono font-bold">[COPY]</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-b from-gray-800/80 to-gray-900/80 border-r border-cyan-500/20 flex flex-col justify-start pt-4">
                      {code.split('\n').map((_, i) => (
                        <div key={i} className="text-cyan-500/60 text-xs font-mono px-3 leading-6 font-semibold">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                      ))}
                    </div>
                    <pre className="pl-16 pr-6 py-6 text-cyan-200 font-mono text-sm overflow-x-auto bg-gradient-to-br from-black via-gray-900 to-black min-h-[4rem] relative">
                      <code className="text-green-300 drop-shadow-sm">{code}</code>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent pointer-events-none"></div>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }

      // Headers with consistent styling
      if (trimmedSection.startsWith('#')) {
        const headerMatch = trimmedSection.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const text = headerMatch[2];
          
          if (level === 1) {
            return (
              <h1 key={index} className="text-3xl font-bold text-cyan-200 mt-12 mb-6 pb-3 border-b border-cyan-500/30">
                {text}
              </h1>
            );
          } else if (level === 2) {
            return (
              <h2 key={index} className="text-2xl font-semibold text-blue-200 mt-10 mb-5">
                {text}
              </h2>
            );
          } else if (level === 3) {
            return (
              <h3 key={index} className="text-xl font-medium text-purple-200 mt-8 mb-4">
                {text}
              </h3>
            );
          } else {
            return (
              <h4 key={index} className="text-lg font-medium text-green-200 mt-6 mb-3">
                {text}
              </h4>
            );
          }
        }
      }

      // Enhanced Lists - unordered
      if (trimmedSection.includes('\n- ') || trimmedSection.startsWith('- ')) {
        const items = trimmedSection.split('\n').filter(line => line.trim().startsWith('- '));
        return (
          <ul key={index} className="my-6 space-y-2 pl-6 list-disc list-inside">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-slate-200 leading-relaxed">
                {processInlineCode(item.replace(/^-\s*/, ''))}
              </li>
            ))}
          </ul>
        );
      }

      // Ordered lists
      if (trimmedSection.match(/^\d+\.\s/)) {
        const items = trimmedSection.split('\n').filter(line => line.trim().match(/^\d+\.\s/));
        return (
          <ol key={index} className="my-6 space-y-2 pl-6 list-decimal list-inside">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-slate-200 leading-relaxed">
                {processInlineCode(item.replace(/^\d+\.\s*/, ''))}
              </li>
            ))}
          </ol>
        );
      }

      // Blockquotes
      if (trimmedSection.startsWith('>')) {
        const quote = trimmedSection.replace(/^>\s*/, '');
        return (
          <blockquote key={index} className="border-l-4 border-cyan-500 pl-6 py-4 my-6 bg-gray-900/50 rounded-r-lg">
            <p className="text-slate-300 italic leading-relaxed">
              {processInlineCode(quote)}
            </p>
          </blockquote>
        );
      }

      // Standard paragraphs with consistent styling
      return (
        <p key={index} className="text-slate-200 leading-relaxed text-base my-4">
          {processInlineCode(trimmedSection)}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30 rounded-2xl backdrop-blur-sm shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        
        <div className="relative bg-gradient-to-r from-gray-900 via-black to-gray-800 border-b border-cyan-500/30 px-8 py-5">
          <div className="flex items-center space-x-6">
            <div className="flex space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50 animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500/50 animate-pulse" style={{animationDelay: '0.6s'}}></div>
            </div>
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-cyan-400" />
              <span className="text-cyan-300 font-mono text-sm font-semibold">root@exploit-lab:~/writeups$</span>
              <span className="text-purple-400 font-mono text-sm">cat {title.toLowerCase().replace(/\s+/g, '_')}.md</span>
            </div>
          </div>
        </div>
        
        <div className="relative p-8 lg:p-12">
          <div className="prose prose-invert max-w-none">
            {renderMarkdownContent(content)}
          </div>
        </div>
        
        <div className="relative bg-gradient-to-r from-gray-900 via-black to-gray-800 border-t border-cyan-500/30 px-8 py-4">
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 font-mono text-sm font-semibold flex items-center space-x-2">
              <Bug className="h-4 w-4" />
              <span>[EOF] Exploit analysis complete...</span>
            </span>
            <span className="text-purple-400 font-mono text-xs animate-pulse">Press any key to continue...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteupContent;
