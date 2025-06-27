
import { Terminal, Shield, Bug, Globe, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const terminalLines = [
    "$ whoami",
    "web_pentester",
    "$ ls skills/",
    "bug_bounty/ web_security/ ctf_player/ vulnerability_research/",
    "$ cat mission.txt",
    "Securing the web, one bug at a time...",
  ];

  const highlights = [
    {
      icon: Bug,
      title: "Bug Bounty Hunter",
      description: "Finding critical vulnerabilities in web applications",
      count: "50+ Bugs Found"
    },
    {
      icon: Shield,
      title: "Security Research",
      description: "Deep diving into web application security",
      count: "Research & Analysis"
    },
    {
      icon: Globe,
      title: "Web Pentesting",
      description: "Professional penetration testing services",
      count: "Enterprise Security"
    }
  ];

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
              <Link to="/blog" className="hover:text-green-300 transition-colors">~/blog</Link>
              <Link to="/about" className="hover:text-green-300 transition-colors">~/about</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-400">
              Web Security
              <br />
              <span className="text-green-300">Research Blog</span>
            </h1>
            <p className="text-xl text-green-300/80 mb-8 leading-relaxed">
              Deep insights into web application security, bug bounty hunting, 
              and penetration testing from the trenches.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/blog"
                className="bg-green-700 hover:bg-green-600 text-black px-6 py-3 rounded font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <span>Read Blog</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="border border-green-700 hover:bg-green-700/20 px-6 py-3 rounded font-semibold transition-colors"
              >
                About Me
              </Link>
            </div>
          </div>

          {/* Terminal */}
          <div className="bg-gray-900 border border-green-800 rounded-lg overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400 ml-4">terminal</span>
            </div>
            <div className="p-6 space-y-2">
              {terminalLines.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.startsWith('$') 
                      ? 'text-green-400' 
                      : line.includes('/') 
                        ? 'text-blue-400' 
                        : 'text-green-300'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {line}
                </div>
              ))}
              <div className="flex items-center animate-pulse">
                <span className="text-green-400">$ </span>
                <div className="w-2 h-5 bg-green-400 ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-green-400">
          Security Focus Areas
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <Card key={index} className="bg-gray-900 border-green-800 hover:border-green-600 transition-colors">
              <CardContent className="p-6 text-center">
                <item.icon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-green-400/80 mb-4">
                  {item.description}
                </p>
                <div className="text-sm text-green-500 font-mono">
                  {item.count}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Posts Preview */}
      <section className="container mx-auto px-6 py-16 border-t border-green-800">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-green-400">Latest Research</h2>
          <Link 
            to="/blog" 
            className="text-green-300 hover:text-green-200 transition-colors inline-flex items-center space-x-1"
          >
            <span>View All Posts</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Advanced SQL Injection in Modern Web Apps",
              preview: "Exploring sophisticated SQL injection techniques that bypass modern security measures...",
              date: "2024-01-15",
              tags: ["SQL Injection", "Web Security"]
            },
            {
              title: "CSRF to Account Takeover: A Bug Bounty Case Study",
              preview: "How a simple CSRF vulnerability led to complete account compromise in a major platform...",
              date: "2024-01-10",
              tags: ["CSRF", "Bug Bounty"]
            }
          ].map((post, index) => (
            <Card key={index} className="bg-gray-900 border-green-800 hover:border-green-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-green-800 text-green-200 px-2 py-1 rounded font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-green-300 mb-2">
                  {post.title}
                </h3>
                <p className="text-green-400/80 mb-4 line-clamp-3">
                  {post.preview}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-500 font-mono">
                    {post.date}
                  </span>
                  <Link
                    to="/blog"
                    className="text-green-300 hover:text-green-200 transition-colors text-sm font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-800 bg-gray-900/50">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-green-400/60">
            <p className="font-mono">$ echo "Happy Hacking!" && exit</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
