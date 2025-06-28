
import CodeBlock from './CodeBlock';
import { processInlineCode } from './InlineFormatting';

interface MarkdownRendererProps {
  content: string;
  title: string;
}

const MarkdownRenderer = ({ content, title }: MarkdownRendererProps) => {
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
            <CodeBlock
              key={index}
              code={code}
              language={language}
              title={title}
              index={index}
            />
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
    <div className="prose prose-invert max-w-none">
      {renderMarkdownContent(content)}
    </div>
  );
};

export default MarkdownRenderer;
