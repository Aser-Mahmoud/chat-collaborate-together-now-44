
import { useState, useEffect } from 'react';

const TerminalBio = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  
  const terminalLines = [
    "$ cat /etc/passwd | grep v1g0",
    "v1g0:x:1337:1337:Elite Web Security Researcher:/home/v1g0:/bin/bash",
    "",
    "$ whoami --verbose",
    "→ Professional web penetration tester specializing in 0-day research",
    "→ CTF player and security educator sharing knowledge",
    "→ Breaking applications to make the web safer",
    "",
    "$ echo $MISSION",
    'export MISSION="One exploit at a time, making the digital world secure"',
    "",
    "$ curl -s https://v1g0.dev/status",
    "{",
    '  "status": "actively_hunting",',
    '  "current_focus": "advanced_web_exploitation",',
    '  "availability": "open_for_collaboration"',
    "}"
  ];

  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, terminalLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, terminalLines]);

  return (
    <div className="mb-16">
      <div className="bg-gray-900/90 border-2 border-green-800 rounded-lg overflow-hidden backdrop-blur-sm shadow-2xl shadow-green-900/50">
        <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-green-800">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          <span className="text-sm text-gray-400 ml-4 font-mono">v1g0@kali:~$</span>
        </div>
        <div className="p-8 space-y-1 min-h-[400px]">
          {displayedLines.map((line, index) => (
            <div key={index} className="font-mono text-sm">
              {line.startsWith('$') ? (
                <div className="text-green-400 font-bold">{line}</div>
              ) : line.startsWith('→') ? (
                <div className="text-green-300">{line}</div>
              ) : line.startsWith('export') ? (
                <div className="text-red-400">{line}</div>
              ) : line.includes('"status"') || line.includes('"current_focus"') || line.includes('"availability"') ? (
                <div className="text-cyan-400 ml-4">{line}</div>
              ) : line === '{' || line === '}' ? (
                <div className="text-cyan-400">{line}</div>
              ) : (
                <div className="text-green-300">{line}</div>
              )}
            </div>
          ))}
          {currentLineIndex < terminalLines.length && (
            <div className="text-green-400 animate-pulse">█</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalBio;
