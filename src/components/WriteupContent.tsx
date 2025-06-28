
import { Lock, Bug } from "lucide-react";
import MarkdownRenderer from './markdown/MarkdownRenderer';

interface WriteupContentProps {
  content: string;
  title: string;
}

const WriteupContent = ({ content, title }: WriteupContentProps) => {
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
          <MarkdownRenderer content={content} title={title} />
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
