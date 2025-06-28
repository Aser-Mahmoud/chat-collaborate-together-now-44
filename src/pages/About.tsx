import { Link } from "react-router-dom";
import { Terminal, Shield, Bug, Globe, Award, ArrowLeft, ExternalLink, Target, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const skills = [
    "Web Application Security",
    "Advanced SQL Injection",
    "XSS & CSRF Exploitation", 
    "Authentication Bypass",
    "Business Logic Flaws",
    "Race Condition Exploits",
    "SSRF & XXE Attacks",
    "API Security Testing",
    "Source Code Analysis",
    "Bug Bounty Hunting",
    "Penetration Testing",
    "Social Engineering"
  ];

  const achievements = [
    {
      icon: Bug,
      title: "50+ Critical Bugs",
      description: "Discovered high-impact 0-days across major platforms",
      gradient: "from-red-600 to-red-400"
    },
    {
      icon: Award,
      title: "Hall of Fame",
      description: "Recognition from Fortune 500 companies for responsible disclosure",
      gradient: "from-yellow-600 to-yellow-400"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Leading penetration tests for top-tier organizations",
      gradient: "from-blue-600 to-blue-400"
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "Senior Security Researcher",
      description: "Leading critical vulnerability research and advanced exploitation development",
      icon: Target
    },
    {
      year: "2023",
      title: "Bug Bounty Elite",
      description: "Achieved top 1% ranking on major platforms with $100K+ in rewards",
      icon: Award
    },
    {
      year: "2022",
      title: "Full-Time Hunter",
      description: "Transitioned to professional bug bounty hunting and security research",
      icon: Bug
    },
    {
      year: "2021",
      title: "Pentesting Genesis",
      description: "Started professional career in cybersecurity and web exploitation",
      icon: Shield
    }
  ];

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
              <Link to="/blog" className="hover:text-green-300 transition-all duration-300">~/writeups</Link>
              <Link to="/about" className="text-green-300">~/whoami</Link>
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
            <span className="text-red-400 font-mono text-sm">[USER_PROFILE]</span>
          </div>
          <h1 className="text-5xl font-bold text-green-400 mb-4">whoami</h1>
          <p className="text-green-300/80 text-xl">
            Professional web penetration tester, bug bounty hunter, and security researcher 
            passionate about breaking things and making the web safer.
          </p>
        </div>

        {/* Terminal Bio */}
        <div className="mb-16">
          <div className="bg-gray-900/80 border-2 border-green-800 rounded-lg overflow-hidden backdrop-blur-sm shadow-2xl shadow-green-900/50">
            <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-green-800">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <span className="text-sm text-gray-400 ml-4 font-mono">v1g0@kali:~$</span>
            </div>
            <div className="p-8 space-y-3">
              <div className="text-green-400 font-bold">$ cat /etc/passwd | grep v1g0</div>
              <div className="text-green-300">v1g0:x:1337:1337:Elite Web Security Researcher:/home/v1g0:/bin/bash</div>
              
              <div className="text-green-400 font-bold">$ whoami --verbose</div>
              <div className="text-green-300">→ Professional web penetration tester with 3+ years of experience</div>
              <div className="text-green-300">→ Specialized in finding critical 0-day vulnerabilities</div>
              <div className="text-green-300">→ Active bug bounty hunter with $150K+ in rewards</div>
              <div className="text-green-300">→ Responsible disclosure advocate and security educator</div>
              
              <div className="text-green-400 font-bold">$ echo $MISSION</div>
              <div className="text-red-400">export MISSION="Breaking the web to make it safer, one exploit at a time"</div>
              
              <div className="text-green-400 font-bold">$ curl -s https://v1g0.dev/status</div>
              <div className="text-cyan-400">{"{"}</div>
              <div className="text-cyan-400 ml-4">"status": "actively_hunting",</div>
              <div className="text-cyan-400 ml-4">"current_focus": "advanced_web_exploitation",</div>
              <div className="text-cyan-400 ml-4">"availability": "open_for_collaboration"</div>
              <div className="text-cyan-400">{"}"}</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-8">
            <span className="text-red-400">[</span>Key Achievements<span className="text-red-400">]</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-gray-900/80 border-green-800 hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/50 backdrop-blur-sm group">
                <CardContent className="p-8 text-center">
                  <div className={`bg-gradient-to-br ${achievement.gradient} p-4 rounded-full inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-300 mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-green-400/80 leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-8">
            <span className="text-red-400">[</span>Technical Arsenal<span className="text-red-400">]</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/30 backdrop-blur-sm group"
              >
                <span className="text-green-300 font-mono text-sm group-hover:text-green-200 transition-colors">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-green-400 mb-8">
            <span className="text-red-400">[</span>Career Timeline<span className="text-red-400">]</span>
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="bg-gradient-to-r from-green-700 to-green-600 text-black px-4 py-2 rounded-lg font-bold text-sm min-w-[80px] text-center shadow-lg shadow-green-900/50">
                  {item.year}
                </div>
                <div className="bg-gray-900/80 border border-green-800 rounded-lg p-2 group-hover:border-green-600 transition-colors backdrop-blur-sm">
                  <item.icon className="h-6 w-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-300 mb-2 group-hover:text-green-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-green-400/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-green-800 pt-12">
          <h2 className="text-4xl font-bold text-green-400 mb-8">
            <span className="text-red-400">[</span>Contact & Collaboration<span className="text-red-400">]</span>
          </h2>
          <div className="bg-gray-900/80 border-2 border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50">
            <p className="text-green-300/80 mb-8 text-xl leading-relaxed">
              Interested in security consulting, collaboration on research, or discussing advanced exploitation techniques? 
              Let's connect and push the boundaries of web security together.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-green-400 font-mono font-bold">$ echo $EMAIL</span>
                  <span className="text-green-300">v1g0@protonmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-green-400 font-mono font-bold">$ echo $TWITTER</span>
                  <a href="#" className="text-green-300 hover:text-green-200 inline-flex items-center transition-colors">
                    @v1g0_security
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-green-400 font-mono font-bold">$ echo $LINKEDIN</span>
                  <a href="#" className="text-green-300 hover:text-green-200 inline-flex items-center transition-colors">
                    /in/v1g0-security
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-black px-8 py-4 rounded-lg font-bold transition-all duration-300 inline-flex items-center space-x-3 shadow-lg shadow-green-900/50 hover:shadow-green-900/70 transform hover:scale-105">
                  <Zap className="h-5 w-5" />
                  <span>Let's Collaborate</span>
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
