
import { Link } from "react-router-dom";
import { Terminal, ArrowLeft } from "lucide-react";
import TerminalBio from "@/components/about/TerminalBio";
import TechnicalArsenal from "@/components/about/TechnicalArsenal";
import ContactSection from "@/components/about/ContactSection";

const About = () => {
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
            <span className="text-red-400 font-mono text-sm">[USER_PROFILE_INIT]</span>
          </div>
          <h1 className="text-5xl font-bold text-green-400 mb-4">whoami</h1>
          <div className="bg-gray-900/50 border-l-4 border-green-500 pl-6 py-4 backdrop-blur-sm">
            <p className="text-green-300/90 text-xl font-mono leading-relaxed">
              # Professional web penetration tester and security researcher<br/>
              # Passionate about breaking applications and making the web safer<br/>
              # Sharing knowledge through writeups and educational content
            </p>
          </div>
        </div>

        {/* Terminal Bio */}
        <TerminalBio />

        {/* Technical Arsenal */}
        <TechnicalArsenal />

        {/* Contact Section */}
        <ContactSection />
      </div>
    </div>
  );
};

export default About;
