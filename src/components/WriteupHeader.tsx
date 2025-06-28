
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
      {/* Cover Image */}
      <div className="relative mb-8 rounded-xl overflow-hidden border border-green-800 shadow-2xl shadow-green-900/50">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className={`text-xs px-3 py-1 rounded-full font-mono font-bold border ${
              difficulty === 'Critical' 
                ? 'bg-red-900/80 text-red-200 border-red-700' 
                : 'bg-orange-900/80 text-orange-200 border-orange-700'
            }`}>
              {difficulty.toUpperCase()}
            </span>
            <div className="flex items-center space-x-2 text-green-400">
              <Flag className="h-4 w-4" />
              <span className="font-mono text-sm">{platform}</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {title}
          </h1>
        </div>
      </div>

      {/* Meta Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center backdrop-blur-sm">
          <Calendar className="h-6 w-6 text-green-400 mx-auto mb-2" />
          <div className="text-green-300 font-mono text-sm">{date}</div>
        </div>
        <div className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center backdrop-blur-sm">
          <Clock className="h-6 w-6 text-green-400 mx-auto mb-2" />
          <div className="text-green-300 font-mono text-sm">{readTime}</div>
        </div>
        <div className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center backdrop-blur-sm">
          <Eye className="h-6 w-6 text-green-400 mx-auto mb-2" />
          <div className="text-green-300 font-mono text-sm">{platform}</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mb-8">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center text-sm bg-gray-900/80 text-green-200 px-4 py-2 rounded-full font-mono border border-green-800 backdrop-blur-sm hover:border-green-600 transition-all duration-300"
          >
            <Target className="h-3 w-3 mr-2" />
            #{tag.replace(/\s+/g, '_').toLowerCase()}
          </span>
        ))}
      </div>

      {/* Executive Summary */}
      <div className="bg-gray-900/40 border border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50 mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="h-6 w-6 text-green-400" />
          <h3 className="text-2xl font-bold text-green-300">Executive Summary</h3>
        </div>
        <p className="text-green-400/90 leading-relaxed text-lg font-mono">
          {summary}
        </p>
      </div>
    </div>
  );
};

export default WriteupHeader;
