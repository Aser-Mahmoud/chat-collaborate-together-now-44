
import { Calendar, Clock, Eye, Target, Flag, Zap } from "lucide-react";

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
    <div className="mb-12">
      {/* Clean Cover Image */}
      <div className="relative mb-8 rounded-xl overflow-hidden border border-green-800 shadow-2xl shadow-green-900/50">
        <div className="relative h-48 md:h-64 w-full">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover filter brightness-75"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        </div>
      </div>

      {/* Title and Difficulty Outside Image */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <span className={`text-xs px-4 py-2 rounded-full font-mono font-bold border animate-pulse ${
            difficulty === 'Critical' 
              ? 'bg-red-900/80 text-red-200 border-red-700' 
              : difficulty === 'High'
              ? 'bg-orange-900/80 text-orange-200 border-orange-700'
              : 'bg-yellow-900/80 text-yellow-200 border-yellow-700'
          }`}>
            [SEVERITY: {difficulty.toUpperCase()}]
          </span>
          <div className="flex items-center space-x-2 text-green-400 bg-gray-900/60 px-3 py-1 rounded border border-green-800">
            <Flag className="h-4 w-4" />
            <span className="font-mono text-sm">{platform}</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-green-300 mb-4 font-mono tracking-wider">
          <span className="text-red-400">&gt; </span>
          {title}
          <span className="text-green-400 animate-pulse">_</span>
        </h1>
      </div>

      {/* Meta Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center backdrop-blur-sm hover:border-green-600 transition-all">
          <Calendar className="h-6 w-6 text-green-400 mx-auto mb-2" />
          <div className="text-green-300 font-mono text-sm">{date}</div>
        </div>
        <div className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center backdrop-blur-sm hover:border-green-600 transition-all">
          <Clock className="h-6 w-6 text-green-400 mx-auto mb-2" />
          <div className="text-green-300 font-mono text-sm">{readTime}</div>
        </div>
        <div className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center backdrop-blur-sm hover:border-green-600 transition-all">
          <Eye className="h-6 w-6 text-green-400 mx-auto mb-2" />
          <div className="text-green-300 font-mono text-sm">{platform}</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mb-8">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center text-sm bg-gray-900/80 text-green-200 px-4 py-2 rounded-full font-mono border border-green-800 backdrop-blur-sm hover:border-green-600 hover:bg-green-900/30 transition-all duration-300 cursor-pointer"
          >
            <Target className="h-3 w-3 mr-2" />
            #{tag.replace(/\s+/g, '_').toLowerCase()}
          </span>
        ))}
      </div>

      {/* Executive Summary */}
      <div className="bg-gray-900/40 border border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="h-6 w-6 text-green-400 animate-pulse" />
          <h3 className="text-2xl font-bold text-green-300 font-mono">[EXEC_SUMMARY]</h3>
        </div>
        <div className="bg-black/40 border border-green-700 rounded p-4 font-mono">
          <div className="text-green-400 text-xs mb-2">root@security:~$ cat executive_summary.txt</div>
          <p className="text-green-300/90 leading-relaxed text-lg">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WriteupHeader;
