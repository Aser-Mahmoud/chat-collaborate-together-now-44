
import { Terminal, Shield, Bug, Globe, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const terminalLines = [
    "$ whoami",
    "v1g0_h4ck3r",
    "$ ls skills/",
    "web_pentesting/ bug_bounty/ ctf_pwning/ vuln_research/",
    "$ cat mission.txt",
    "Breaking the web, one exploit at a time...",
    "$ echo $STATUS",
    "Currently hunting bugs and writing exploits 🔥",
  ];

  const highlights = [
    {
      icon: Bug,
      title: "Bug Bounty Hunter",
      description: "Discovering critical 0-days in web applications",
      count: "50+ Critical Bugs",
      gradient: "from-red-600 to-red-400"
    },
    {
      icon: Shield,
      title: "Web Pentesting",
      description: "Professional penetration testing & security audits",
      count: "Enterprise Security",
      gradient: "from-blue-600 to-blue-400"
    },
    {
      icon: Globe,
      title: "CTF Player",
      description: "Competing in web exploitation challenges",
      count: "Top 1% Player",
      gradient: "from-purple-600 to-purple-400"
    }
  ];

  const writeups = [
    {
      title: "SQL Injection → RCE: Fortune 500 Takedown",
      description: "How a simple SQLi led to complete server compromise",
      difficulty: "Critical",
      platform: "Private Program",
      bounty: "$15,000",
      tags: ["SQLi", "RCE", "Privilege Escalation"]
    },
    {
      title: "CSRF to Account Takeover via XSS Chain",
      description: "Chaining CSRF + Stored XSS for complete account compromise",
      difficulty: "High",
      platform: "HackerOne",
      bounty: "$8,500",
      tags: ["CSRF", "XSS", "Account Takeover"]
    },
    {
      title: "Race Condition in Payment System",
      description: "Exploiting race conditions to bypass payment validation",
      difficulty: "Critical",
      platform: "Bugcrowd",
      bounty: "$12,000",
      tags: ["Race Condition", "Business Logic", "Payment Bypass"]
    },
    {
      title: "SSRF to Internal Network Pwning",
      description: "From SSRF to full internal infrastructure compromise",
      difficulty: "Critical",
      platform: "Private Program",
      bounty: "$20,000",
      tags: ["SSRF", "Network Pivoting", "Internal Recon"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix rain effect background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-transparent to-green-900/20"></div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-green-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-green-900/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="h-7 w-7 text-green-400 animate-pulse" />
              <span className="text-2xl font-bold text-green-400">
                v1g0<span className="text-red-400">_</span>blog
              </span>
              <span className="text-xs text-green-600 font-mono">[root@security]</span>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:text-green-300 transition-all duration-300 hover:glow">~/home</Link>
              <Link to="/blog" className="hover:text-green-300 transition-all duration-300 hover:glow">~/writeups</Link>
              <Link to="/about" className="hover:text-green-300 transition-all duration-300 hover:glow">~/whoami</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4">
              <span className="text-red-400 font-mono text-sm">[SECURITY_RESEARCHER]</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-green-400 leading-tight">
              Web Pwn3r
              <br />
              <span className="text-green-300">& Bug Hunt3r</span>
            </h1>
            <p className="text-xl text-green-300/80 mb-8 leading-relaxed">
              Professional web penetration tester sharing critical vulnerabilities, 
              advanced exploitation techniques, and bug bounty hunting strategies.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/blog"
                className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-black px-8 py-4 rounded-lg font-bold transition-all duration-300 inline-flex items-center space-x-2 shadow-lg shadow-green-900/50 hover:shadow-green-900/70 transform hover:scale-105"
              >
                <span>Read Writeups</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-green-700 hover:bg-green-700/20 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:border-green-500 shadow-lg shadow-green-900/30"
              >
                About v1g0
              </Link>
            </div>
          </div>

          {/* Terminal */}
          <div className="bg-gray-900 border-2 border-green-800 rounded-lg overflow-hidden shadow-2xl shadow-green-900/50">
            <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-green-800">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <span className="text-sm text-gray-400 ml-4 font-mono">v1g0@kali:~$</span>
            </div>
            <div className="p-6 space-y-3 min-h-[300px]">
              {terminalLines.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.startsWith('$') 
                      ? 'text-green-400 font-bold' 
                      : line.includes('/') 
                        ? 'text-cyan-400' 
                        : line.includes('🔥')
                          ? 'text-red-400'
                          : 'text-green-300'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {line}
                </div>
              ))}
              <div className="flex items-center animate-pulse">
                <span className="text-green-400 font-bold">$ </span>
                <div className="w-3 h-6 bg-green-400 ml-1 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center text-green-400">
          <span className="text-red-400">[</span>Exploitation Focus<span className="text-red-400">]</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <Card key={index} className="bg-gray-900/80 border-green-800 hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/50 backdrop-blur-sm group">
              <CardContent className="p-8 text-center">
                <div className={`bg-gradient-to-br ${item.gradient} p-4 rounded-full inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-green-300 mb-3">
                  {item.title}
                </h3>
                <p className="text-green-400/80 mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-sm text-green-500 font-mono bg-gray-800 px-3 py-1 rounded-full inline-block">
                  {item.count}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Writeups */}
      <section className="container mx-auto px-6 py-20 border-t border-green-800">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-green-400">
            <span className="text-red-400">[</span>Latest Exploits<span className="text-red-400">]</span>
          </h2>
          <Link 
            to="/blog" 
            className="text-green-300 hover:text-green-200 transition-colors inline-flex items-center space-x-2 font-mono group"
          >
            <span>View All Writeups</span>
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {writeups.map((writeup, index) => (
            <Card key={index} className="bg-gray-900/80 border-green-800 hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-900/50 backdrop-blur-sm group">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-mono font-bold ${
                    writeup.difficulty === 'Critical' 
                      ? 'bg-red-800 text-red-200' 
                      : 'bg-orange-800 text-orange-200'
                  }`}>
                    {writeup.difficulty.toUpperCase()}
                  </span>
                  <span className="text-green-400 font-mono text-sm">{writeup.bounty}</span>
                </div>
                
                <h3 className="text-xl font-bold text-green-300 mb-3 group-hover:text-green-200 transition-colors">
                  {writeup.title}
                </h3>
                
                <p className="text-green-400/80 mb-4 leading-relaxed">
                  {writeup.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {writeup.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-green-800/50 text-green-200 px-2 py-1 rounded font-mono border border-green-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-500 font-mono">
                    Platform: {writeup.platform}
                  </span>
                  <button className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-black px-4 py-2 rounded font-bold text-sm transition-all duration-300 inline-flex items-center space-x-2 group-hover:scale-105">
                    <span>Read Exploit</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="text-green-400 font-mono mb-4">
              <span className="text-red-400">root@v1g0:~# </span>
              echo "Stay curious, stay ethical, stay 1337!"
            </div>
            <div className="text-green-600 text-sm font-mono">
              [Responsible Disclosure Only] | [Educational Purposes] | [Hack The Planet]
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
