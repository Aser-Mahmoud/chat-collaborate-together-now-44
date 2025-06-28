
import { useState } from "react";
import { Copy, Check, Code2, Target } from "lucide-react";

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

  const renderWriteupContent = (content: string) => {
    const sections = content.split('\n\n');
    
    return sections.map((section, index) => {
      if (section.startsWith('```')) {
        const codeMatch = section.match(/```(\w+)?\n([\s\S]*?)```/);
        if (codeMatch) {
          const language = codeMatch[1] || 'bash';
          const code = codeMatch[2];
          
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
                    <span className="text-green-400 font-mono text-sm">exploit.{language}</span>
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
      } else if (section.startsWith('#')) {
        const level = section.match(/^#+/)?.[0].length || 1;
        const text = section.replace(/^#+\s*/, '');
        
        if (level === 1) {
          return (
            <h2 key={index} className="text-3xl font-bold text-green-300 mt-12 mb-6 flex items-center">
              <Code2 className="h-8 w-8 mr-3 text-green-400" />
              {text}
            </h2>
          );
        } else {
          return (
            <h3 key={index} className="text-xl font-semibold text-green-400 mt-8 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              {text}
            </h3>
          );
        }
      } else if (section.startsWith('**') && section.endsWith('**')) {
        return (
          <div key={index} className="my-6 p-4 bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="font-semibold text-green-300">{section.replace(/\*\*/g, '')}</p>
          </div>
        );
      } else if (section.startsWith('- ')) {
        const items = section.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-6 text-green-400/90 ml-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="leading-relaxed">
                {item.replace('- ', '')}
              </li>
            ))}
          </ul>
        );
      } else if (section.trim()) {
        return (
          <p key={index} className="text-green-400/90 leading-relaxed my-6 text-lg">
            {section}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="bg-gray-900/20 border border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50">
      <div className="prose prose-invert max-w-none">
        {renderWriteupContent(content)}
      </div>
    </div>
  );
};

export default WriteupContent;
