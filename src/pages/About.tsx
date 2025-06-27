
import { Link } from "react-router-dom";
import { Terminal, Shield, Bug, Globe, Award, ArrowLeft, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const skills = [
    "Web Application Security",
    "Penetration Testing",
    "Bug Bounty Hunting",
    "OWASP Top 10",
    "SQL Injection",
    "XSS & CSRF",
    "Authentication Bypass",
    "Business Logic Flaws",
    "API Security Testing",
    "Source Code Review",
    "Network Security",
    "Social Engineering"
  ];

  const achievements = [
    {
      icon: Bug,
      title: "50+ Critical Bugs",
      description: "Discovered high-impact vulnerabilities across major platforms"
    },
    {
      icon: Award,
      title: "Hall of Fame",
      description: "Recognition from top tech companies for responsible disclosure"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Professional penetration testing for Fortune 500 companies"
    }
  ];

  const timeline = [
    {
      year: "2024",
      title: "Senior Security Consultant",
      description: "Leading web application security assessments for enterprise clients"
    },
    {
      year: "2023",
      title: "Bug Bounty Milestone",
      description: "Reached top 1% on major bug bounty platforms"
    },
    {
      year: "2022",
      title: "Security Research Focus",
      description: "Transitioned to full-time security research and bug hunting"
    },
    {
      year: "2021",
      title: "Started Penetration Testing",
      description: "Began professional career in cybersecurity"
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
              <Link to="/about" className="text-green-300">~/about</Link>
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
          <h1 className="text-4xl font-bold text-green-400 mb-4">About Me</h1>
          <p className="text-green-300/80 text-lg">
            Web penetration tester, bug bounty hunter, and security researcher passionate about web application security.
          </p>
        </div>

        {/* Terminal Bio */}
        <div className="mb-16">
          <div className="bg-gray-900 border border-green-800 rounded-lg overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400 ml-4">bio.sh</span>
            </div>
            <div className="p-6 space-y-2">
              <div className="text-green-400">$ cat /etc/passwd | grep security_researcher</div>
              <div className="text-green-300">security_researcher:x:1337:1337:Web Security Expert:/home/hacker:/bin/bash</div>
              <div className="text-green-400">$ whoami --verbose</div>
              <div className="text-green-300">Passionate web security professional with 3+ years of experience</div>
              <div className="text-green-300">Specializing in finding critical vulnerabilities in web applications</div>
              <div className="text-green-300">Active in bug bounty programs and responsible disclosure</div>
              <div className="text-green-400">$ grep -i "mission" /home/hacker/.profile</div>
              <div className="text-green-300">export MISSION="Making the web a safer place, one vulnerability at a time"</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-400 mb-8">Key Achievements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-gray-900 border-green-800">
                <CardContent className="p-6 text-center">
                  <achievement.icon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-300 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-green-400/80">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-400 mb-8">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-green-800 rounded px-4 py-3 text-center hover:border-green-600 transition-colors"
              >
                <span className="text-green-300 font-mono text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-400 mb-8">Career Timeline</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="bg-green-700 text-black px-3 py-1 rounded font-bold text-sm min-w-[60px] text-center">
                  {item.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-green-400/80">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-green-800 pt-12">
          <h2 className="text-3xl font-bold text-green-400 mb-8">Get In Touch</h2>
          <div className="bg-gray-900 border border-green-800 rounded-lg p-8">
            <p className="text-green-300/80 mb-6 text-lg">
              Interested in collaboration, security consulting, or just want to discuss web security? 
              Feel free to reach out!
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-green-400 font-mono">$ echo $EMAIL</span>
                <span className="text-green-300">security@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400 font-mono">$ echo $TWITTER</span>
                <a href="#" className="text-green-300 hover:text-green-200 inline-flex items-center">
                  @security_researcher
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400 font-mono">$ echo $LINKEDIN</span>
                <a href="#" className="text-green-300 hover:text-green-200 inline-flex items-center">
                  /in/security-expert
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
