
import { useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, Search, Tag, Calendar, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Advanced SQL Injection in Modern Web Applications",
      excerpt: "Deep dive into sophisticated SQL injection techniques that bypass modern security measures including WAFs and prepared statements.",
      content: "In this comprehensive analysis, we'll explore advanced SQL injection vectors...",
      date: "2024-01-15",
      tags: ["SQL Injection", "Web Security", "Penetration Testing"],
      readTime: "12 min read"
    },
    {
      id: 2,
      title: "CSRF to Account Takeover: A Bug Bounty Case Study",
      excerpt: "How a simple CSRF vulnerability led to complete account compromise in a major platform. Full disclosure with remediation steps.",
      content: "During a recent bug bounty engagement, I discovered a critical CSRF vulnerability...",
      date: "2024-01-10",
      tags: ["CSRF", "Bug Bounty", "Account Takeover"],
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "XSS in Single Page Applications: Modern Attack Vectors",
      excerpt: "Exploring DOM-based XSS vulnerabilities in React, Vue, and Angular applications with real-world examples.",
      content: "Single Page Applications have introduced new attack surfaces for XSS...",
      date: "2024-01-05",
      tags: ["XSS", "SPA", "JavaScript Security"],
      readTime: "15 min read"
    },
    {
      id: 4,
      title: "Authentication Bypass Through Parameter Pollution",
      excerpt: "Discovering how HTTP Parameter Pollution can lead to authentication bypass in web applications.",
      content: "Parameter pollution is often overlooked but can lead to serious security issues...",
      date: "2023-12-28",
      tags: ["Authentication", "Parameter Pollution", "Web Security"],
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "Race Conditions in Financial Applications",
      excerpt: "Finding and exploiting race conditions that led to unauthorized transactions in fintech platforms.",
      content: "Race conditions in financial applications can have devastating consequences...",
      date: "2023-12-20",
      tags: ["Race Conditions", "Fintech", "Critical Bugs"],
      readTime: "18 min read"
    },
    {
      id: 6,
      title: "SSRF to Internal Network Compromise",
      excerpt: "How Server-Side Request Forgery vulnerabilities can be chained to compromise internal infrastructure.",
      content: "SSRF vulnerabilities are gateway attacks to internal networks...",
      date: "2023-12-15",
      tags: ["SSRF", "Internal Networks", "Infrastructure"],
      readTime: "14 min read"
    }
  ];

  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Navigation */}
      <nav className="border-b border-green-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">sec_blog</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/" className="hover:text-green-300 transition-colors">~/home</Link>
              <Link to="/blog" className="text-green-300">~/blog</Link>
              <Link to="/about" className="hover:text-green-300 transition-colors">~/about</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-green-300 hover:text-green-200 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-green-400 mb-4">Security Research Blog</h1>
          <p className="text-green-300/80 text-lg">
            In-depth analysis of web vulnerabilities, bug bounty findings, and penetration testing insights.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-green-400" />
            <input
              type="text"
              placeholder="$ grep -i 'vulnerability' posts/"
              className="w-full bg-gray-900 border border-green-800 rounded pl-10 pr-4 py-2 text-green-400 placeholder-green-600 focus:border-green-600 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag("")}
              className={`px-3 py-1 text-sm rounded border transition-colors ${
                selectedTag === "" 
                  ? "bg-green-700 border-green-600 text-black" 
                  : "border-green-800 text-green-400 hover:border-green-600"
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-sm rounded border transition-colors ${
                  selectedTag === tag 
                    ? "bg-green-700 border-green-600 text-black" 
                    : "border-green-800 text-green-400 hover:border-green-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-gray-900 border-green-800 hover:border-green-600 transition-colors">
              <CardContent className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center text-xs bg-green-800 text-green-200 px-2 py-1 rounded font-mono"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-green-300 mb-3 hover:text-green-200 cursor-pointer">
                  {post.title}
                </h2>

                <p className="text-green-400/80 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-green-500">
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <button className="text-green-300 hover:text-green-200 font-semibold transition-colors">
                    Read Full Analysis →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-green-400/60 font-mono">
              $ find posts/ -name "*{searchTerm || selectedTag}*"
              <br />
              No results found. Try adjusting your search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
