
import { useState } from "react";
import { Copy, Check, Code2, Target, AlertTriangle, Info, Terminal, Zap, Lock, Bug, Shield } from "lucide-react";

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

      // Enhanced Code blocks with cyberpunk terminal styling
      if (trimmedSection.startsWith('```')) {
        const codeMatch = trimmedSection.match(/```(\w+)?\n?([\s\S]*?)```/);
        if (codeMatch) {
          const language = codeMatch[1] || 'text';
          const code = codeMatch[2].trim();
          
          return (
            <div key={index} className="my-8">
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-cyan-500/50 rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/20 relative">
                {/* Glowing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-20 blur-sm"></div>
                <div className="relative bg-black rounded-xl">
                  {/* Terminal Header */}
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
                  
                  {/* Code Content */}
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
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent pointer-events-none"></div>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }

      // Enhanced Headers with cyberpunk styling
      if (trimmedSection.startsWith('#')) {
        const headerMatch = trimmedSection.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const text = headerMatch[2];
          
          if (level === 1) {
            return (
              <div key={index} className="mt-16 mb-10">
                <div className="relative bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-red-900/30 border border-purple-500/50 rounded-2xl p-8 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"></div>
                  <div className="relative flex items-center space-x-4 mb-3">
                    <Shield className="h-10 w-10 text-purple-400 animate-pulse drop-shadow-lg" />
                    <span className="text-purple-300 font-mono text-sm font-bold tracking-wider">[SECTION_INIT]</span>
                  </div>
                  <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 bg-clip-text font-mono leading-tight">
                    <span className="text-red-400 mr-2">&gt;&gt;</span>
                    {text}
                    <span className="text-purple-400 animate-pulse ml-1">_</span>
                  </h2>
                </div>
              </div>
            );
          } else if (level === 2) {
            return (
              <div key={index} className="mt-12 mb-8">
                <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-teal-900/40 border-l-4 border-gradient-to-b from-blue-400 via-cyan-400 to-teal-400 rounded-r-xl backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-teal-500/5"></div>
                  <Target className="h-7 w-7 text-cyan-400 drop-shadow-lg relative z-10" />
                  <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text font-mono relative z-10">
                    <span className="text-cyan-400 mr-2">[</span>
                    {text}
                    <span className="text-cyan-400 ml-2">]</span>
                  </h3>
                </div>
              </div>
            );
          } else {
            return (
              <h4 key={index} className="text-xl font-medium text-green-300 mt-10 mb-6 flex items-center font-mono">
                <Zap className="h-6 w-6 mr-3 text-yellow-400 drop-shadow-sm" />
                <span className="text-green-500 mr-2">&gt;</span>
                <span className="text-transparent bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text">{text}</span>
              </h4>
            );
          }
        }
      }

      // Enhanced Alert blocks
      if (trimmedSection.startsWith('**') && trimmedSection.endsWith('**')) {
        const text = trimmedSection.slice(2, -2);
        return (
          <div key={index} className="my-8 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 rounded-lg blur opacity-25"></div>
            <div className="relative p-6 bg-gradient-to-r from-red-900/30 via-pink-900/30 to-orange-900/30 border border-red-500/50 rounded-lg backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 animate-pulse"></div>
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="h-7 w-7 text-red-400 animate-pulse drop-shadow-lg" />
                <span className="text-red-300 font-mono text-sm font-bold tracking-wider">[CRITICAL_ALERT]</span>
              </div>
              <p className="font-bold text-transparent bg-gradient-to-r from-red-200 to-orange-200 bg-clip-text text-lg font-mono leading-relaxed">{text}</p>
            </div>
          </div>
        );
      }

      // Enhanced Lists with better styling
      if (trimmedSection.includes('\n- ') || trimmedSection.startsWith('- ')) {
        const items = trimmedSection.split('\n').filter(line => line.trim().startsWith('- '));
        return (
          <div key={index} className="my-8 relative">
            <div className="bg-gradient-to-br from-gray-900/60 via-slate-900/60 to-gray-800/60 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm shadow-xl shadow-emerald-500/10">
              <div className="flex items-center space-x-3 mb-5">
                <Info className="h-6 w-6 text-emerald-400 drop-shadow-sm" />
                <span className="text-emerald-300 font-mono text-sm font-bold tracking-wider">[LIST_ITEMS]</span>
              </div>
              <ul className="space-y-4">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-4 text-emerald-200/90 leading-relaxed font-mono group">
                    <span className="text-emerald-400 font-bold min-w-[2rem] group-hover:text-emerald-300 transition-colors duration-200">&gt;</span>
                    <span className="group-hover:text-emerald-100 transition-colors duration-200">{item.replace(/^-\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }

      // Enhanced Ordered lists
      if (trimmedSection.match(/^\d+\.\s/)) {
        const items = trimmedSection.split('\n').filter(line => line.trim().match(/^\d+\.\s/));
        return (
          <div key={index} className="my-8 relative">
            <div className="bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm shadow-xl shadow-blue-500/10">
              <div className="flex items-center space-x-3 mb-5">
                <Target className="h-6 w-6 text-blue-400 drop-shadow-sm" />
                <span className="text-blue-300 font-mono text-sm font-bold tracking-wider">[SEQUENCE]</span>
              </div>
              <ol className="space-y-4">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-4 text-blue-200/90 leading-relaxed font-mono group">
                    <span className="text-blue-300 font-bold min-w-[3rem] bg-blue-900/50 px-2 py-1 rounded border border-blue-600/30 group-hover:bg-blue-800/60 transition-colors duration-200">[{String(itemIndex + 1).padStart(2, '0')}]</span>
                    <span className="group-hover:text-blue-100 transition-colors duration-200 flex-1">{item.replace(/^\d+\.\s*/, '')}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );
      }

      // Enhanced inline code processing
      const processInlineCode = (text: string) => {
        return text.split(/(`[^`]+`)/).map((part, i) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={i} className="relative inline-block bg-gradient-to-r from-gray-800 to-gray-700 text-cyan-300 px-3 py-1 rounded-md font-mono text-sm border border-cyan-600/40 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 transition-all duration-200 hover:scale-105">
                <span className="text-cyan-500 text-xs absolute -top-1 -left-1 opacity-60">&lt;</span>
                {part.slice(1, -1)}
                <span className="text-cyan-500 text-xs absolute -bottom-1 -right-1 opacity-60">/&gt;</span>
              </code>
            );
          }
          return part;
        });
      };

      // Enhanced Regular paragraphs
      return (
        <div key={index} className="my-6 relative group">
          <div className="bg-gradient-to-r from-slate-900/40 via-gray-900/40 to-slate-800/40 border-l-4 border-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 rounded-r-lg p-6 backdrop-blur-sm hover:bg-gradient-to-r hover:from-slate-900/60 hover:via-gray-900/60 hover:to-slate-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <p className="text-slate-200 leading-relaxed text-lg font-mono relative">
              <span className="text-cyan-400 mr-3 font-bold group-hover:text-cyan-300 transition-colors duration-200">&gt;</span>
              <span className="group-hover:text-slate-100 transition-colors duration-200">
                {processInlineCode(trimmedSection)}
              </span>
            </p>
          </div>
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div className="relative">
      {/* Main Content Container with enhanced styling */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30 rounded-2xl backdrop-blur-sm shadow-2xl shadow-cyan-500/20 relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        
        {/* Terminal-style header with enhanced design */}
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
        
        {/* Content with improved spacing and effects */}
        <div className="relative p-8 lg:p-12">
          <div className="prose prose-invert max-w-none">
            {renderMarkdownContent(content)}
          </div>
        </div>
        
        {/* Bottom terminal line with enhanced styling */}
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
