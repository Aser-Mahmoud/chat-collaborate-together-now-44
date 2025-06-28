
import { Calendar, Clock, Eye, Target, Flag, Zap, Shield, Terminal } from "lucide-react";

interface WriteupHeaderProps {
  title: string;
  date: string;
  readTime: string;
  difficulty: string;
  platform: string;
  tags: string[];
  coverImage: string;
  summary: string;
}

const WriteupHeader = ({
  title,
  date,
  readTime,
  difficulty,
  platform,
  tags,
  coverImage,
  summary
}: WriteupHeaderProps) => {
  return (
    <div className="mb-16">
      {/* Enhanced Cover Image with cyberpunk effects */}
      <div className="relative mb-10 rounded-2xl overflow-hidden border border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
        <div className="relative bg-black rounded-2xl overflow-hidden">
          <div className="relative h-56 md:h-72 w-full">
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover filter brightness-60 contrast-125"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"></div>
          </div>
        </div>
      </div>

      {/* Title and Difficulty with enhanced styling */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className={`text-sm px-6 py-3 rounded-full font-mono font-bold border-2 relative overflow-hidden group ${
            difficulty === 'Critical' 
              ? 'bg-gradient-to-r from-red-900/80 to-pink-900/80 text-red-200 border-red-500/70 shadow-lg shadow-red-500/30' 
              : difficulty === 'High'
              ? 'bg-gradient-to-r from-orange-900/80 to-red-900/80 text-orange-200 border-orange-500/70 shadow-lg shadow-orange-500/30'
              : 'bg-gradient-to-r from-yellow-900/80 to-orange-900/80 text-yellow-200 border-yellow-500/70 shadow-lg shadow-yellow-500/30'
          }`}>
            <span className="relative z-10">[SEVERITY: {difficulty.toUpperCase()}]</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </span>
          <div className="flex items-center space-x-3 text-cyan-400 bg-gradient-to-r from-cyan-900/60 to-blue-900/60 px-5 py-3 rounded-full border border-cyan-500/50 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-300 group">
            <Flag className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-mono text-sm font-semibold">{platform}</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono tracking-wider relative">
          <span className="text-red-400 mr-2">&gt; </span>
          <span className="text-transparent bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text">
            {title}
          </span>
          <span className="text-cyan-400 animate-pulse ml-2">_</span>
        </h1>
      </div>

      {/* Enhanced Meta Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-slate-900/80 via-gray-900/80 to-slate-800/80 border border-emerald-500/40 rounded-xl px-6 py-5 text-center backdrop-blur-sm hover:border-emerald-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 group">
          <Calendar className="h-7 w-7 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
          <div className="text-emerald-200 font-mono text-sm font-semibold">{date}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-900/80 via-gray-900/80 to-slate-800/80 border border-blue-500/40 rounded-xl px-6 py-5 text-center backdrop-blur-sm hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group">
          <Clock className="h-7 w-7 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
          <div className="text-blue-200 font-mono text-sm font-semibold">{readTime}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-900/80 via-gray-900/80 to-slate-800/80 border border-purple-500/40 rounded-xl px-6 py-5 text-center backdrop-blur-sm hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
          <Eye className="h-7 w-7 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
          <div className="text-purple-200 font-mono text-sm font-semibold">{platform}</div>
        </div>
      </div>

      {/* Enhanced Tags */}
      <div className="flex flex-wrap gap-4 mb-12">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center text-sm bg-gradient-to-r from-gray-900/80 via-slate-900/80 to-gray-800/80 text-cyan-200 px-5 py-3 rounded-full font-mono border border-cyan-500/40 backdrop-blur-sm hover:border-cyan-400/70 hover:bg-gradient-to-r hover:from-cyan-900/40 hover:via-blue-900/40 hover:to-purple-900/40 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-cyan-500/20"
          >
            <Target className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
            <span className="group-hover:text-cyan-100 transition-colors duration-200">
              #{tag.replace(/\s+/g, '_').toLowerCase()}
            </span>
          </span>
        ))}
      </div>

      {/* Enhanced Executive Summary */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur opacity-20"></div>
        <div className="relative bg-gradient-to-br from-gray-900/60 via-black/60 to-slate-900/60 border border-purple-500/40 rounded-2xl p-10 backdrop-blur-sm shadow-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <Zap className="h-8 w-8 text-purple-400 animate-pulse drop-shadow-lg" />
            <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text font-mono">
              [EXEC_SUMMARY]
            </h3>
          </div>
          <div className="bg-black/60 border border-purple-500/30 rounded-xl p-6 font-mono relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5"></div>
            <div className="relative flex items-center space-x-3 mb-4">
              <Terminal className="h-5 w-5 text-purple-400" />
              <div className="text-purple-300 text-sm font-bold">root@security:~$ cat executive_summary.txt</div>
            </div>
            <p className="text-slate-200 leading-relaxed text-lg relative z-10">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteupHeader;
