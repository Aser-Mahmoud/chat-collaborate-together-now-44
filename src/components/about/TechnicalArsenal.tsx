
const TechnicalArsenal = () => {
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
    "CTF Challenges",
    "Penetration Testing",
    "Security Research"
  ];

  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="text-red-400 font-mono text-sm">[TECHNICAL_SKILLS]</span>
        <h2 className="text-4xl font-bold text-green-400 mt-2">
          Technical Arsenal
        </h2>
      </div>
      <div className="bg-gray-900/80 border-2 border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border border-green-700 rounded px-4 py-3 text-center hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/30 group hover:bg-gray-700/50"
            >
              <span className="text-green-300 font-mono text-sm group-hover:text-green-200 transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalArsenal;
