
export const processInlineCode = (text: string) => {
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

export const processBold = (text: string) => {
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

export const processItalic = (text: string) => {
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
