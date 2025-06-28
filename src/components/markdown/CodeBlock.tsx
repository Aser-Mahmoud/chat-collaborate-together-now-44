
import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  title: string;
  index: number;
}

const CodeBlock = ({ code, language, title, index }: CodeBlockProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, codeTitle: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(codeTitle);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getFileName = (language: string) => {
    switch (language) {
      case 'bash': return '🔓 exploit.sh';
      case 'python': return '🐍 payload.py';
      case 'javascript': return '⚡ exploit.js';
      case 'sql': return '💉 injection.sql';
      case 'html': return '🕸️ malicious.html';
      default: return `📄 code.${language}`;
    }
  };

  return (
    <div className="my-8">
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
                  {getFileName(language)}
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
};

export default CodeBlock;
