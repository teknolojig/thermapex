# Start Here - Self-Hosted Baykasoglu Web

## What This Is

A **100% self-hosted** corporate website running on your own server with zero external dependencies. Everything from database to email to file storage runs on infrastructure you control.

## Technology Stack

### Infrastructure (Self-Hosted)
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Server OS** | Ubuntu 22.04 LTS | Operating system |
| **Web Server** | Nginx | Reverse proxy + SSL |
| **Runtime** | Node.js 20 LTS | Application runtime |
| **Process Manager** | PM2 | Keep app running |
| **Database** | PostgreSQL 15+ | Data storage |
| **Email** | Nodemailer + SMTP | Email sending |
| **Storage** | Local filesystem | File uploads |
| **SSL** | Let's Encrypt | Free certificates |

### Application Stack
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Next.js | 16.0.1 |
| **UI** | React | 19.2.0 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **ORM** | Prisma | 5.x |
| **Authentication** | NextAuth.js | v5 |
| **Image Processing** | Sharp | Latest |
| **Validation** | Zod | Latest |

## Server Requirements

### For Small Site (<1,000 visitors/day)
- **CPU:** 1-2 vCPU
- **RAM:** 2 GB
- **Storage:** 20 GB SSD
- **Bandwidth:** 1 TB/month
- **Cost:** ~$12/month (~400 TRY/month)

### Recommended VPS Providers
1. **Hetzner** (Best value) - €4.51/month
2. **DigitalOcean** - $12/month
3. **Vultr** - $12/month
4. **Linode** - $12/month

## Quick Start Checklist

### Phase 1: Server Setup (1-2 hours)
- [ ] Rent a VPS server (Ubuntu 22.04)
- [ ] Point domain to server IP
- [ ] SSH into server
- [ ] Update system packages
- [ ] Create non-root user with sudo

### Phase 2: Install Software (1 hour)
- [ ] Install Node.js 20 LTS
- [ ] Install PostgreSQL 15+
- [ ] Install Nginx
- [ ] Install PM2 globally
- [ ] Install certbot (SSL certificates)

### Phase 3: Database Setup (30 minutes)
- [ ] Create PostgreSQL database
- [ ] Create database user
- [ ] Configure PostgreSQL security
- [ ] Test database connection

### Phase 4: Application Setup (1 hour)
- [ ] Clone/upload project to server
- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Set up Prisma
- [ ] Run database migrations
- [ ] Build Next.js app

### Phase 5: Web Server Configuration (1 hour)
- [ ] Configure Nginx reverse proxy
- [ ] Set up SSL with Let's Encrypt
- [ ] Configure static file serving
- [ ] Set up PM2 to run app
- [ ] Test website in browser

### Phase 6: Email & Uploads (30 minutes)
- [ ] Configure SMTP settings
- [ ] Create uploads directory
- [ ] Set file permissions
- [ ] Test email sending
- [ ] Test file uploads

### Phase 7: Production Setup (1 hour)
- [ ] Set up automated backups
- [ ] Configure log rotation
- [ ] Set up PM2 startup script
- [ ] Configure firewall
- [ ] Create admin user
- [ ] Final security check

**Total Time: 6-7 hours**

## Installation Steps

### 1. Server Setup

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Create a new user (replace 'deploy' with your username)
sudo adduser deploy
sudo usermod -aG sudo deploy

# Switch to new user
su - deploy
```

### 2. Install Node.js

```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should be v20.x.x
npm --version
```

### 3. Install PostgreSQL

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql << EOF
CREATE USER baykasoglu_user WITH PASSWORD 'CHANGE_THIS_PASSWORD';
CREATE DATABASE baykasoglu OWNER baykasoglu_user;
GRANT ALL PRIVILEGES ON DATABASE baykasoglu TO baykasoglu_user;
\c baykasoglu
GRANT ALL ON SCHEMA public TO baykasoglu_user;
EOF

# Test connection
psql -U baykasoglu_user -d baykasoglu -h localhost
# Enter password when prompted, then type \q to exit
```

### 4. Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Test - visit http://your-server-ip in browser
# You should see "Welcome to nginx"
```

### 5. Install PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### 6. Install Certbot (SSL)

```bash
# Install certbot
sudo apt install -y certbot python3-certbot-nginx

# We'll configure SSL after deploying the app
```

### 7. Clone and Setup Application

```bash
# Create application directory
sudo mkdir -p /var/www/baykasoglu
sudo chown deploy:deploy /var/www/baykasoglu

# Navigate to directory
cd /var/www/baykasoglu

# Upload your project files here (use git, scp, or rsync)
# Example with git:
git clone https://github.com/yourusername/baykasoglu-web.git .

# Install dependencies
npm install

# Install additional required packages
npm install @prisma/client prisma
npm install next-auth@beta bcryptjs
npm install nodemailer sharp zod
npm install react-hook-form @hookform/resolvers
npm install @types/bcryptjs @types/nodemailer --save-dev
```

### 8. Configure Environment Variables

```bash
# Create .env.local file
nano .env.local
```

```env
# Environment
NODE_ENV=production

# Database
DATABASE_URL=postgresql://baykasoglu_user:CHANGE_THIS_PASSWORD@localhost:5432/baykasoglu

# NextAuth
NEXTAUTH_URL=https://baykasoglu.com
NEXTAUTH_SECRET=RUN_THIS_COMMAND_openssl_rand_base64_32

# Email - Option 1: External SMTP (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=info@baykasoglu.com

# Email - Option 2: Local Postfix (if installed)
# SMTP_HOST=localhost
# SMTP_PORT=25
# SMTP_FROM=info@baykasoglu.com

# Admin
ADMIN_EMAIL=admin@baykasoglu.com

# Application
NEXT_PUBLIC_APP_URL=https://baykasoglu.com
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Save and exit:** Press `Ctrl+X`, then `Y`, then `Enter`

### 9. Set Up Prisma

```bash
# Initialize Prisma
npx prisma init

# Copy the schema from SELF_HOSTED_ARCHITECTURE.md
# Or create it manually
nano prisma/schema.prisma
# Paste the Prisma schema from the architecture doc

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push
```

### 10. Create Database Schema

```bash
# Connect to PostgreSQL
psql -U baykasoglu_user -d baykasoglu -h localhost

# Copy and paste the SQL schema from SELF_HOSTED_ARCHITECTURE.md
# Or run it from a file:
psql -U baykasoglu_user -d baykasoglu -h localhost -f schema.sql
```

### 11. Build Next.js Application

```bash
# Build the application
npm run build

# This will create .next directory with optimized production build
```

### 12. Create Admin User

```bash
# Create script to add admin user
nano scripts/create-admin.ts
```

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@baykasoglu.com';
  const password = 'Admin123!'; // CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN
  const fullName = 'Administrator';

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      fullName,
      role: 'admin',
      isActive: true,
    },
  });

  console.log('Admin user created:');
  console.log('Email:', admin.email);
  console.log('Password:', password);
  console.log('Please change the password after first login!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

```bash
# Run the script
npx tsx scripts/create-admin.ts
```

### 13. Create Uploads Directory

```bash
# Create uploads directory structure
sudo mkdir -p /var/www/baykasoglu/uploads/{products,categories,news,certificates,pdfs}/{original,large,medium,thumb}

# Set permissions
sudo chown -R deploy:deploy /var/www/baykasoglu/uploads
sudo chmod -R 775 /var/www/baykasoglu/uploads
```

### 14. Configure PM2

```bash
# Create PM2 ecosystem file
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'baykasoglu-web',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/baykasoglu',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/baykasoglu/error.log',
    out_file: '/var/log/baykasoglu/out.log',
    log_file: '/var/log/baykasoglu/combined.log',
    time: true
  }]
};
```

```bash
# Create log directory
sudo mkdir -p /var/log/baykasoglu
sudo chown deploy:deploy /var/log/baykasoglu

# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
# Follow the command it outputs (copy/paste and run it)

# Check if app is running
pm2 status
pm2 logs
```

### 15. Configure Nginx

```bash
# Remove default configuration
sudo rm /etc/nginx/sites-enabled/default

# Create new configuration
sudo nano /etc/nginx/sites-available/baykasoglu
```

```nginx
# Redirect HTTP to HTTPS (will be configured after SSL)
server {
    listen 80;
    listen [::]:80;
    server_name baykasoglu.com www.baykasoglu.com;

    # Allow Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Temporary: Proxy to app (will redirect to HTTPS after SSL setup)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/baykasoglu /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Test - visit http://your-domain.com
# You should see your Next.js app
```

### 16. Set Up SSL with Let's Encrypt

```bash
# Get SSL certificate
sudo certbot --nginx -d baykasoglu.com -d www.baykasoglu.com

# Follow the prompts:
# - Enter your email address
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (choose Yes)

# Certbot will automatically update your Nginx configuration

# Test SSL renewal
sudo certbot renew --dry-run

# SSL certificates auto-renew via cron
```

**Final Nginx Configuration (after SSL):**

```nginx
# HTTP - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name baykasoglu.com www.baykasoglu.com;
    return 301 https://$host$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name baykasoglu.com www.baykasoglu.com;

    # SSL Configuration (managed by certbot)
    ssl_certificate /etc/letsencrypt/live/baykasoglu.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/baykasoglu.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Hide nginx version
    server_tokens off;

    # Max upload size
    client_max_body_size 20M;

    # Serve static files from uploads
    location /uploads/ {
        alias /var/www/baykasoglu/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";

        # Security: Prevent PHP execution
        location ~ \.php$ {
            deny all;
        }
    }

    # Next.js static files
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Rate limiting for API endpoints
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Rate limit zone (add to http block in nginx.conf)
# sudo nano /etc/nginx/nginx.conf
# Add this inside http { } block:
# limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
```

### 17. Set Up Firewall

```bash
# Configure UFW firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### 18. Set Up Automated Backups

```bash
# Create backup scripts directory
mkdir -p /var/www/baykasoglu/scripts

# Create database backup script
nano /var/www/baykasoglu/scripts/backup-db.sh
```

```bash
#!/bin/bash
DB_NAME="baykasoglu"
DB_USER="baykasoglu_user"
BACKUP_DIR="/var/www/baykasoglu/backups/database"
RETENTION_DAYS=30

mkdir -p $BACKUP_DIR
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql.gz"

export PGPASSWORD='YOUR_DB_PASSWORD'
pg_dump -U $DB_USER -h localhost $DB_NAME | gzip > $BACKUP_FILE
unset PGPASSWORD

find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
echo "Backup completed: $BACKUP_FILE"
```

```bash
# Create file backup script
nano /var/www/baykasoglu/scripts/backup-files.sh
```

```bash
#!/bin/bash
SOURCE_DIR="/var/www/baykasoglu/uploads"
BACKUP_DIR="/var/www/baykasoglu/backups/files"
RETENTION_DAYS=30

mkdir -p $BACKUP_DIR
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/files_$TIMESTAMP.tar.gz"

tar -czf $BACKUP_FILE -C /var/www/baykasoglu uploads/
find $BACKUP_DIR -name "files_*.tar.gz" -mtime +$RETENTION_DAYS -delete
echo "Files backup completed: $BACKUP_FILE"
```

```bash
# Make scripts executable
chmod +x /var/www/baykasoglu/scripts/*.sh

# Set up cron jobs
crontab -e

# Add these lines:
# Database backup daily at 2 AM
0 2 * * * /var/www/baykasoglu/scripts/backup-db.sh >> /var/log/baykasoglu/backup-db.log 2>&1

# File backup daily at 3 AM
0 3 * * * /var/www/baykasoglu/scripts/backup-files.sh >> /var/log/baykasoglu/backup-files.log 2>&1
```

### 19. Configure Email (Gmail Example)

If using Gmail SMTP:

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Create new app password for "Mail"
5. Use this password in .env.local as SMTP_PASSWORD

**Test email sending:**

```bash
# Create test script
nano scripts/test-email.ts
```

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function test() {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: 'your-email@example.com',
    subject: 'Test Email',
    text: 'This is a test email from Baykasoglu website.',
  });

  console.log('Message sent:', info.messageId);
}

test().catch(console.error);
```

```bash
# Run test
npx tsx scripts/test-email.ts
```

## Verification Checklist

After installation, verify everything works:

### Database
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Connect to database
psql -U baykasoglu_user -d baykasoglu -h localhost

# List tables
\dt

# Exit
\q
```

### Application
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs baykasoglu-web --lines 50

# Check if app responds
curl http://localhost:3000
```

### Web Server
```bash
# Check Nginx status
sudo systemctl status nginx

# Test Nginx config
sudo nginx -t

# View logs
sudo tail -f /var/log/nginx/error.log
```

### SSL Certificate
```bash
# Check certificate
sudo certbot certificates

# Test SSL
curl -I https://baykasoglu.com
```

### File Uploads
```bash
# Check permissions
ls -la /var/www/baykasoglu/uploads

# Should be owned by deploy:deploy with 775 permissions
```

### Firewall
```bash
# Check firewall status
sudo ufw status verbose
```

## Common Operations

### Update Application

```bash
# Navigate to app directory
cd /var/www/baykasoglu

# Pull latest changes (if using git)
git pull

# Install any new dependencies
npm install

# Run database migrations if needed
npx prisma db push

# Rebuild application
npm run build

# Restart PM2
pm2 restart baykasoglu-web

# Check logs
pm2 logs baykasoglu-web
```

### View Logs

```bash
# PM2 application logs
pm2 logs baykasoglu-web

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log

# Backup logs
tail -f /var/log/baykasoglu/backup-db.log
```

### Restart Services

```bash
# Restart application
pm2 restart baykasoglu-web

# Restart Nginx
sudo systemctl restart nginx

# Restart PostgreSQL
sudo systemctl restart postgresql

# Restart all
pm2 restart all && sudo systemctl restart nginx
```

### Database Operations

```bash
# Backup database manually
/var/www/baykasoglu/scripts/backup-db.sh

# Restore from backup
gunzip -c /var/www/baykasoglu/backups/database/backup_TIMESTAMP.sql.gz | \
  psql -U baykasoglu_user -d baykasoglu -h localhost

# Reset database (DANGER!)
npx prisma db push --force-reset
```

### Monitor Resources

```bash
# Real-time monitoring
pm2 monit

# Disk usage
df -h

# Memory usage
free -h

# CPU and processes
top

# Press 'q' to exit top
```

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs baykasoglu-web --lines 100

# Common issues:
# 1. Database connection - check DATABASE_URL in .env.local
# 2. Port already in use - change PORT in ecosystem.config.js
# 3. Missing dependencies - run npm install
# 4. Build errors - run npm run build
```

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql -U baykasoglu_user -d baykasoglu -h localhost

# If fails, check:
# 1. PostgreSQL is running: sudo systemctl status postgresql
# 2. User exists: sudo -u postgres psql -c "\du"
# 3. Database exists: sudo -u postgres psql -c "\l"
# 4. Password is correct in .env.local
```

### Nginx Returns 502 Bad Gateway

```bash
# Check if app is running
pm2 status

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log

# Restart both
pm2 restart baykasoglu-web
sudo systemctl restart nginx
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

### Email Not Sending

```bash
# Test SMTP connection
npx tsx scripts/test-email.ts

# Check logs
pm2 logs baykasoglu-web | grep -i email

# Verify .env.local settings
cat .env.local | grep SMTP
```

### Upload Permission Denied

```bash
# Fix permissions
sudo chown -R deploy:deploy /var/www/baykasoglu/uploads
sudo chmod -R 775 /var/www/baykasoglu/uploads

# Restart app
pm2 restart baykasoglu-web
```

## Performance Optimization

### Enable Nginx Gzip

```nginx
# Add to /etc/nginx/nginx.conf in http block
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
```

### Configure PostgreSQL

```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/15/main/postgresql.conf

# For 2GB RAM server, set:
shared_buffers = 512MB
effective_cache_size = 1536MB
maintenance_work_mem = 128MB
work_mem = 8MB

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Add Redis Caching (Optional)

```bash
# Install Redis
sudo apt install redis-server

# Install Redis client
npm install ioredis
```

## Security Checklist

- [ ] SSH login with keys only (disable password auth)
- [ ] Firewall enabled and configured
- [ ] PostgreSQL only accessible from localhost
- [ ] Strong database password
- [ ] .env.local has proper permissions (600)
- [ ] SSL certificate installed and auto-renewing
- [ ] Admin password changed from default
- [ ] Regular backups configured
- [ ] Log files monitored
- [ ] Server updates automated

## Cost Summary

### Initial Setup
- **Domain:** ~$15/year
- **VPS Server:** $12/month (small) to $48/month (large)
- **SSL:** $0 (Let's Encrypt)
- **Total Year 1:** ~$159-$591

### Monthly Costs (Small Site)
- **Server:** $12/month
- **Database:** $0 (included)
- **Email:** $0 (SMTP)
- **Storage:** $0 (included)
- **Backups:** $0 (local)
- **Total:** $12/month (~400 TRY)

**Annual Cost: ~$150/year vs ~$1200/year for SaaS**

## Next Steps

1. **Access Admin Panel**
   - Go to https://baykasoglu.com/admin/login
   - Login with admin credentials
   - Change password immediately

2. **Add Content**
   - Add product categories
   - Add products with images
   - Create about/quality pages
   - Test contact forms

3. **Monitor**
   - Check PM2 logs daily
   - Monitor server resources
   - Test backups weekly
   - Update server monthly

4. **Read Full Documentation**
   - SELF_HOSTED_ARCHITECTURE.md - Complete architecture
   - DEPLOYMENT_GUIDE.md - Detailed deployment steps
   - IMPLEMENTATION_GUIDE.md - Feature implementation

## Support Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Nginx: https://nginx.org/en/docs/
- PM2: https://pm2.keymetrics.io/docs/

### Community
- Next.js Discord
- PostgreSQL Community
- DigitalOcean Community Tutorials
- Stack Overflow

## Conclusion

You now have a **100% self-hosted** website with:

- Complete data ownership
- No vendor lock-in
- ~$12/month cost (vs $65+ for SaaS)
- Full control and customization
- Privacy and security

**Your site is live at:** https://baykasoglu.com

Good luck!
