
import { Link } from "react-router-dom";
import { Terminal, ArrowLeft, Code, Wifi, Shield, Zap } from "lucide-react";
import TerminalBio from "@/components/about/TerminalBio";
import TechnicalArsenal from "@/components/about/TechnicalArsenal";
import ContactSection from "@/components/about/ContactSection";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Enhanced Background effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 via-transparent to-green-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        {/* Matrix-style background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-20 gap-px text-xs text-green-500/30">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="animate-pulse" style={{ animationDelay: `${Math.random() * 3}s` }}>
                {Math.random() > 0.7 ? '1' : '0'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="border-b border-green-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50 shadow-2xl shadow-green-900/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Terminal className="h-8 w-8 text-green-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-400 tracking-wider">
                  v1g0<span className="text-red-400 animate-pulse">_</span>blog
                </span>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-green-600 font-mono">[root@security]</span>
                  <Wifi className="h-3 w-3 text-green-500 animate-pulse" />
                  <span className="text-green-500">ONLINE</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:text-green-300 transition-all duration-300 relative group">
                <span>~/home</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link to="/blog" className="hover:text-green-300 transition-all duration-300 relative group">
                <span>~/writeups</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link to="/about" className="text-green-300 relative">
                <span>~/whoami</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Enhanced Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-green-300 hover:text-green-200 mb-8 group">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="font-mono">cd ../</span>
            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Code className="h-4 w-4 animate-spin" />
            </div>
          </Link>
          
          {/* Terminal-style status bar */}
          <div className="bg-gray-900/80 border border-green-800 rounded-t-lg p-3 mb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                </div>
                <span className="text-green-400 font-mono text-sm">v1g0@kali:~/profile$</span>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span className="text-green-400">SECURE</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3 text-yellow-400 animate-pulse" />
                  <span className="text-yellow-400">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced header content */}
          <div className="bg-gray-900/90 border-x border-b border-green-800 rounded-b-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50">
            <div className="mb-6">
              <span className="text-red-400 font-mono text-sm animate-pulse">[USER_PROFILE_INIT] ...</span>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-green-400 text-sm">></span>
                <span className="text-green-300 text-sm font-mono">Loading profile data...</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-green-400 mb-6 tracking-wider relative">
              whoami
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-green-400 to-green-600 animate-pulse"></div>
            </h1>
            
            <div className="bg-black/60 border border-green-700 rounded-lg p-6 backdrop-blur-sm relative overflow-hidden">
              {/* Scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/10 to-transparent h-full animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-green-400 font-mono">[PROFILE_LOADED]</span>
                  <div className="flex-1 h-px bg-green-700"></div>
                  <span className="text-green-500 text-xs">SUCCESS</span>
                </div>
                
                <div className="space-y-2 text-green-300/90 text-lg font-mono leading-relaxed">
                  <div className="flex items-start space-x-2">
                    <span className="text-red-400">#</span>
                    <span>Professional web penetration tester and security researcher</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-400">#</span>
                    <span>Passionate about breaking applications and making the web safer</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-red-400">#</span>
                    <span>Sharing knowledge through writeups and educational content</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-green-800">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-green-400">STATUS:</span>
                    <span className="text-green-300 animate-pulse">HUNTING VULNERABILITIES</span>
                    <div className="flex-1"></div>
                    <span className="text-green-600">UPTIME: 24/7</span>
                  </div>
                </div>
              </div>
            </div>
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
