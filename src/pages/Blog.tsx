
import { useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, Search, Tag, Calendar, ArrowLeft, ExternalLink, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const writeups = [
    {
      id: 1,
      title: "Advanced SQL Injection → RCE Chain",
      excerpt: "Complete walkthrough of exploiting second-order SQLi to achieve remote code execution on a Fortune 500 target.",
      content: "In this deep-dive writeup, we'll explore how a blind SQL injection vulnerability...",
      date: "2024-01-15",
      tags: ["SQL Injection", "RCE", "Second-Order", "Privilege Escalation"],
      readTime: "15 min read",
      difficulty: "Critical",
      bounty: "$15,000",
      platform: "Private Program"
    },
    {
      id: 2,
      title: "CSRF → Account Takeover via XSS Chain",
      excerpt: "Chaining CSRF with Stored XSS to achieve complete account compromise. Full technical breakdown with PoC.",
      content: "During a recent bug bounty engagement, I discovered a critical CSRF vulnerability...",
      date: "2024-01-10",
      tags: ["CSRF", "XSS", "Account Takeover", "DOM Manipulation"],
      readTime: "12 min read",
      difficulty: "High",
      bounty: "$8,500",
      platform: "HackerOne"
    },
    {
      id: 3,
      title: "Race Condition in Payment Processing",
      excerpt: "Exploiting race conditions in financial applications to bypass payment validation and achieve unauthorized transactions.",
      content: "Race conditions in financial applications can have devastating consequences...",
      date: "2024-01-05",
      tags: ["Race Condition", "Business Logic", "Payment Bypass", "Concurrency"],
      readTime: "18 min read",
      difficulty: "Critical",
      bounty: "$12,000",
      platform: "Bugcrowd"
    },
    {
      id: 4,
      title: "SSRF to Internal Network Compromise",
      excerpt: "From Server-Side Request Forgery to complete internal infrastructure takeover. Advanced pivoting techniques revealed.",
      content: "SSRF vulnerabilities are gateway attacks to internal networks...",
      date: "2023-12-28",
      tags: ["SSRF", "Network Pivoting", "Internal Recon", "AWS Metadata"],
      readTime: "22 min read",
      difficulty: "Critical",
      bounty: "$20,000",
      platform: "Private Program"
    },
    {
      id: 5,
      title: "Authentication Bypass via JWT Confusion",
      excerpt: "Exploiting JWT algorithm confusion and key disclosure to achieve authentication bypass in enterprise applications.",
      content: "JWT implementation flaws continue to plague modern applications...",
      date: "2023-12-20",
      tags: ["JWT", "Authentication Bypass", "Algorithm Confusion", "Cryptographic Attacks"],
      readTime: "14 min read",
      difficulty: "High",
      bounty: "$7,500",
      platform: "Intigriti"
    },
    {
      id: 6,
      title: "DOM XSS in Modern SPA Framework",
      excerpt: "Finding and exploiting DOM-based XSS in React applications. Advanced client-side exploitation techniques.",
      content: "Single Page Applications have introduced new attack surfaces...",
      date: "2023-12-15",
      tags: ["DOM XSS", "React", "Client-Side", "JavaScript Security"],
      readTime: "16 min read",
      difficulty: "Medium",
      bounty: "$4,200",
      platform: "HackerOne"
    }
  ];

  const allTags = [...new Set(writeups.flatMap(post => post.tags))];

  const filteredPosts = writeups.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Background effect */}
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
              <Link to="/" className="hover:text-green-300 transition-all duration-300">~/home</Link>
              <Link to="/blog" className="text-green-300">~/writeups</Link>
              <Link to="/about" className="hover:text-green-300 transition-all duration-300">~/whoami</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-green-300 hover:text-green-200 mb-6 group">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono">cd ../</span>
          </Link>
          <div className="mb-4">
            <span className="text-green-500 font-mono text-sm bg-green-900/30 px-3 py-1 rounded border border-green-700">EXPLOIT_DATABASE</span>
          </div>
          <h1 className="text-5xl font-bold text-green-400 mb-4">Security Writeups</h1>
          <p className="text-green-300/80 text-xl leading-relaxed">
            Deep technical analysis of critical vulnerabilities, exploitation techniques, 
            and bug bounty findings from real-world engagements.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-green-400" />
            <input
              type="text"
              placeholder="$ grep -r 'exploit' writeups/ | grep -i"
              className="w-full bg-gray-900/80 border-2 border-green-800 rounded-lg pl-12 pr-4 py-3 text-green-400 placeholder-green-600 focus:border-green-600 focus:outline-none backdrop-blur-sm text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTag("")}
              className={`px-4 py-2 text-sm rounded-lg border-2 transition-all duration-300 font-mono ${
                selectedTag === "" 
                  ? "bg-green-700 border-green-600 text-black shadow-lg shadow-green-900/50" 
                  : "border-green-800 text-green-400 hover:border-green-600 hover:bg-green-800/20"
              }`}
            >
              ALL_EXPLOITS
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 text-sm rounded-lg border-2 transition-all duration-300 font-mono ${
                  selectedTag === tag 
                    ? "bg-green-700 border-green-600 text-black shadow-lg shadow-green-900/50" 
                    : "border-green-800 text-green-400 hover:border-green-600 hover:bg-green-800/20"
                }`}
              >
                #{tag.replace(/\s+/g, '_').toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Writeups */}
        <div className="space-y-8">
          {filteredPosts.map((writeup) => (
            <Card key={writeup.id} className="bg-gray-900/80 border-green-800 hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-900/50 backdrop-blur-sm group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-mono font-bold ${
                      writeup.difficulty === 'Critical' 
                        ? 'bg-red-800 text-red-200' 
                        : writeup.difficulty === 'High'
                          ? 'bg-orange-800 text-orange-200'
                          : 'bg-yellow-800 text-yellow-200'
                    }`}>
                      {writeup.difficulty.toUpperCase()}
                    </span>
                    <span className="text-green-500 font-mono text-sm">{writeup.platform}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-mono font-bold text-lg">{writeup.bounty}</div>
                    <div className="text-green-600 text-xs font-mono">BOUNTY_REWARD</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {writeup.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center text-xs bg-green-800/50 text-green-200 px-3 py-1 rounded-full font-mono border border-green-700"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-green-300 mb-4 group-hover:text-green-200 cursor-pointer transition-colors">
                  {writeup.title}
                </h2>

                <p className="text-green-400/80 mb-6 leading-relaxed text-lg">
                  {writeup.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-green-500">
                    <span className="inline-flex items-center font-mono">
                      <Calendar className="h-4 w-4 mr-2" />
                      {writeup.date}
                    </span>
                    <span className="font-mono">{writeup.readTime}</span>
                  </div>
                  <Link 
                    to={`/writeup/${writeup.id}`}
                    className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-black px-6 py-3 rounded-lg font-bold transition-all duration-300 inline-flex items-center space-x-2 group-hover:scale-105 shadow-lg shadow-green-900/50"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Exploit Details</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-900/80 border border-green-800 rounded-lg p-8 backdrop-blur-sm">
              <p className="text-green-400/60 font-mono text-lg mb-2">
                $ find writeups/ -name "*{searchTerm || selectedTag}*" -type f
              </p>
              <p className="text-red-400 font-mono">
                find: No exploits found matching your criteria
              </p>
              <p className="text-green-600 font-mono text-sm mt-2">
                Try adjusting your search parameters or clear filters
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
