
import { ExternalLink, Zap, Mail, MessageSquare, Github } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="border-t border-green-800 pt-12">
      <div className="mb-8">
        <span className="text-red-400 font-mono text-sm">[COMMUNICATION_CHANNELS]</span>
        <h2 className="text-4xl font-bold text-green-400 mt-2">
          Contact & Collaboration
        </h2>
      </div>
      <div className="bg-gray-900/90 border-2 border-green-800 rounded-lg overflow-hidden backdrop-blur-sm shadow-2xl shadow-green-900/50">
        <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-green-800">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-400 ml-4 font-mono">contact.sh</span>
        </div>
        <div className="p-8">
          <p className="text-green-300/80 mb-8 text-lg leading-relaxed font-mono">
            # Interested in security consulting, collaboration on research,<br/>
            # or discussing advanced exploitation techniques?<br/>
            # Let's connect and push the boundaries of web security together.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <Mail className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" />
                <span className="text-green-400 font-mono font-bold">echo $EMAIL:</span>
                <span className="text-green-300 font-mono">v1g0@protonmail.com</span>
              </div>
              <div className="flex items-center space-x-4 group">
                <MessageSquare className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" />
                <span className="text-green-400 font-mono font-bold">echo $TWITTER:</span>
                <a href="#" className="text-green-300 hover:text-green-200 inline-flex items-center transition-colors font-mono">
                  @v1g0_security
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
              <div className="flex items-center space-x-4 group">
                <Github className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" />
                <span className="text-green-400 font-mono font-bold">echo $GITHUB:</span>
                <a href="#" className="text-green-300 hover:text-green-200 inline-flex items-center transition-colors font-mono">
                  github.com/v1g0
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-black px-8 py-4 rounded-lg font-bold transition-all duration-300 inline-flex items-center space-x-3 shadow-lg shadow-green-900/50 hover:shadow-green-900/70 transform hover:scale-105 font-mono">
                <Zap className="h-5 w-5" />
                <span>./collaborate.sh</span>
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
