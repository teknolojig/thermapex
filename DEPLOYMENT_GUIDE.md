# Deployment Guide - Self-Hosted Baykasoglu Web

## Overview

This guide provides step-by-step instructions for deploying the Baykasoglu website to a self-hosted Ubuntu server. Every command is explained and tested.

**Estimated Time:** 6-7 hours for first-time setup

**Prerequisites:**
- Ubuntu 22.04 LTS server with root access
- Domain name pointing to server IP
- Basic SSH knowledge

## Table of Contents

1. [Server Setup](#1-server-setup)
2. [Install Required Software](#2-install-required-software)
3. [PostgreSQL Configuration](#3-postgresql-configuration)
4. [Application Deployment](#4-application-deployment)
5. [Nginx Configuration](#5-nginx-configuration)
6. [SSL Certificate Setup](#6-ssl-certificate-setup)
7. [PM2 Process Manager](#7-pm2-process-manager)
8. [File Upload System](#8-file-upload-system)
9. [Email Configuration](#9-email-configuration)
10. [Backup Automation](#10-backup-automation)
11. [Security Hardening](#11-security-hardening)
12. [Monitoring & Logs](#12-monitoring--logs)
13. [Update Procedures](#13-update-procedures)

---

## 1. Server Setup

### 1.1 Initial Server Access

```bash
# SSH into your server as root
ssh root@YOUR_SERVER_IP

# If using SSH key:
ssh -i /path/to/key.pem root@YOUR_SERVER_IP
```

### 1.2 Update System Packages

```bash
# Update package lists
apt update

# Upgrade installed packages
apt upgrade -y

# Install essential tools
apt install -y curl wget git build-essential software-properties-common
```

### 1.3 Create Deployment User

```bash
# Create new user (replace 'deploy' with your preferred username)
adduser deploy

# Sample responses:
# New password: [Enter a strong password]
# Retype new password: [Enter again]
# Full Name []: Deploy User
# Room Number []: [Press Enter]
# Work Phone []: [Press Enter]
# Home Phone []: [Press Enter]
# Other []: [Press Enter]
# Is the information correct? [Y/n] Y

# Add user to sudo group
usermod -aG sudo deploy

# Verify user was created
id deploy
# Output: uid=1000(deploy) gid=1000(deploy) groups=1000(deploy),27(sudo)
```

### 1.4 Configure SSH Key Authentication (Recommended)

```bash
# On your LOCAL machine (not server), generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id deploy@YOUR_SERVER_IP

# Test login (should not ask for password)
ssh deploy@YOUR_SERVER_IP
```

### 1.5 Configure SSH for Security

```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Make these changes:
# PermitRootLogin no                    # Disable root login
# PasswordAuthentication no             # Disable password auth (after SSH keys work)
# PubkeyAuthentication yes              # Enable key authentication
# Port 22                               # Consider changing to non-standard port

# Save and exit (Ctrl+X, Y, Enter)

# Restart SSH service
sudo systemctl restart sshd

# IMPORTANT: Keep current SSH session open and test new connection in another terminal
# before closing your current session!
```

### 1.6 Set Hostname

```bash
# Set hostname
sudo hostnamectl set-hostname baykasoglu

# Verify
hostnamectl
```

---

## 2. Install Required Software

### 2.1 Install Node.js 20 LTS

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version
# Expected output: v20.x.x

npm --version
# Expected output: 10.x.x
```

### 2.2 Install PostgreSQL 15

```bash
# Add PostgreSQL repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Import repository signing key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update package lists
sudo apt update

# Install PostgreSQL 15
sudo apt install -y postgresql-15 postgresql-contrib-15

# Verify installation
psql --version
# Expected output: psql (PostgreSQL) 15.x

# Check service status
sudo systemctl status postgresql
# Should show: Active: active (exited)

# Enable PostgreSQL to start on boot
sudo systemctl enable postgresql
```

### 2.3 Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Verify installation
nginx -v
# Expected output: nginx version: nginx/1.18.x

# Start Nginx
sudo systemctl start nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
# Should show: Active: active (running)

# Test - visit http://YOUR_SERVER_IP in browser
# You should see "Welcome to nginx" page
```

### 2.4 Install PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
# Expected output: 5.x.x

# Update PM2
pm2 update
```

### 2.5 Install Certbot (for SSL)

```bash
# Install Certbot and Nginx plugin
sudo apt install -y certbot python3-certbot-nginx

# Verify installation
certbot --version
# Expected output: certbot 1.x.x
```

### 2.6 Install Image Processing Tools

```bash
# Install dependencies for Sharp (image processing)
sudo apt install -y libvips-dev

# Verify installation
vips --version
```

---

## 3. PostgreSQL Configuration

### 3.1 Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql

# You should now see: postgres=#
# Run the following SQL commands:
```

```sql
-- Create database user with password
CREATE USER baykasoglu_user WITH PASSWORD 'CHANGE_THIS_TO_STRONG_PASSWORD';

-- Create database
CREATE DATABASE baykasoglu OWNER baykasoglu_user;

-- Grant all privileges on database
GRANT ALL PRIVILEGES ON DATABASE baykasoglu TO baykasoglu_user;

-- Connect to the database
\c baykasoglu

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO baykasoglu_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO baykasoglu_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO baykasoglu_user;

-- Quit psql
\q
```

### 3.2 Test Database Connection

```bash
# Test connection (you'll be prompted for password)
psql -U baykasoglu_user -d baykasoglu -h localhost

# If successful, you'll see: baykasoglu=>
# Type \q to exit
```

### 3.3 Configure PostgreSQL for Local Connections

```bash
# Edit pg_hba.conf
sudo nano /etc/postgresql/15/main/pg_hba.conf

# Find the line that says:
# local   all             all                                     peer

# Add this line BEFORE the peer line:
local   baykasoglu      baykasoglu_user                         scram-sha-256
host    baykasoglu      baykasoglu_user  127.0.0.1/32           scram-sha-256

# Save and exit (Ctrl+X, Y, Enter)

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### 3.4 Create Database Schema

```bash
# Save the schema SQL to a file
nano /tmp/schema.sql
```

Copy the entire SQL schema from `SELF_HOSTED_ARCHITECTURE.md` (the section with CREATE TABLE statements).

```bash
# Run the schema file
psql -U baykasoglu_user -d baykasoglu -h localhost -f /tmp/schema.sql

# Enter password when prompted

# Verify tables were created
psql -U baykasoglu_user -d baykasoglu -h localhost -c "\dt"

# You should see a list of 10 tables:
# - categories
# - products
# - contact_submissions
# - pages
# - news
# - certificates
# - site_settings
# - newsletter_subscribers
# - admin_users
# - sessions
```

---

## 4. Application Deployment

### 4.1 Create Application Directory

```bash
# Create directory
sudo mkdir -p /var/www/baykasoglu

# Set ownership to deploy user
sudo chown -R deploy:deploy /var/www/baykasoglu

# Navigate to directory
cd /var/www/baykasoglu
```

### 4.2 Upload Application Files

**Option A: Using Git (Recommended)**

```bash
# Clone repository
git clone https://github.com/yourusername/baykasoglu-web.git .

# Or if private repository:
git clone https://YOUR_TOKEN@github.com/yourusername/baykasoglu-web.git .
```

**Option B: Using SCP from Local Machine**

```bash
# On your LOCAL machine, from project directory:
scp -r ./* deploy@YOUR_SERVER_IP:/var/www/baykasoglu/

# Or using rsync (more efficient):
rsync -avz --exclude 'node_modules' --exclude '.next' \
  ./* deploy@YOUR_SERVER_IP:/var/www/baykasoglu/
```

**Option C: Manual Upload**

Use SFTP client like FileZilla or Cyberduck to upload files.

### 4.3 Install Dependencies

```bash
# Navigate to project directory
cd /var/www/baykasoglu

# Install production dependencies
npm ci --only=production

# Install all dependencies (including dev)
npm install
```

### 4.4 Install Additional Required Packages

```bash
# Database and ORM
npm install @prisma/client prisma

# Authentication
npm install next-auth@beta bcryptjs
npm install @types/bcryptjs --save-dev

# Email
npm install nodemailer
npm install @types/nodemailer --save-dev

# Image processing
npm install sharp

# Validation
npm install zod

# Forms
npm install react-hook-form @hookform/resolvers

# UI Components (if not already installed)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select @radix-ui/react-label
npm install sonner

# Date utilities
npm install date-fns

# Slug generation
npm install slugify
```

### 4.5 Set Up Environment Variables

```bash
# Create environment file
nano .env.local
```

```env
# Environment
NODE_ENV=production

# Database
DATABASE_URL=postgresql://baykasoglu_user:YOUR_DB_PASSWORD@localhost:5432/baykasoglu

# NextAuth
NEXTAUTH_URL=https://baykasoglu.com
NEXTAUTH_SECRET=

# Email - External SMTP (Gmail Example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=info@baykasoglu.com

# Admin
ADMIN_EMAIL=admin@baykasoglu.com

# Application
NEXT_PUBLIC_APP_URL=https://baykasoglu.com
```

**Generate NEXTAUTH_SECRET:**

```bash
# Generate random secret
openssl rand -base64 32

# Copy the output and paste it as NEXTAUTH_SECRET value
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

**Secure the file:**

```bash
# Set proper permissions (only owner can read)
chmod 600 .env.local
```

### 4.6 Set Up Prisma

```bash
# Create Prisma directory
mkdir -p prisma

# Create schema file
nano prisma/schema.prisma
```

Copy the Prisma schema from `SELF_HOSTED_ARCHITECTURE.md`.

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates/updates tables)
npx prisma db push

# Verify
npx prisma db pull
```

### 4.7 Create Admin User

```bash
# Create scripts directory
mkdir -p scripts

# Create admin user script
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

  console.log('Creating admin user...');
  console.log('Email:', email);

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const admin = await prisma.adminUser.create({
      data: {
        email,
        passwordHash,
        fullName,
        role: 'admin',
        isActive: true,
      },
    });

    console.log('\nAdmin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password:', password);
    console.log('\nIMPORTANT: Change this password after first login!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

```bash
# Install tsx for running TypeScript
npm install -g tsx

# Run the script
npx tsx scripts/create-admin.ts

# Save the output - you'll need the email and password to login
```

### 4.8 Build Application

```bash
# Build Next.js application
npm run build

# This creates optimized production build in .next directory
# Wait for build to complete (may take 2-5 minutes)

# Verify build succeeded
ls -la .next

# You should see .next directory with server, static, etc.
```

---

## 5. Nginx Configuration

### 5.1 Remove Default Configuration

```bash
# Remove default site
sudo rm /etc/nginx/sites-enabled/default
```

### 5.2 Create Application Configuration

```bash
# Create new configuration file
sudo nano /etc/nginx/sites-available/baykasoglu
```

```nginx
# Initial configuration (HTTP only - we'll add HTTPS after SSL setup)
server {
    listen 80;
    listen [::]:80;
    server_name baykasoglu.com www.baykasoglu.com;

    # Allow Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Proxy all requests to Next.js
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

    # Max upload size
    client_max_body_size 20M;
}
```

### 5.3 Enable Site

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/baykasoglu /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Expected output:
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# Reload Nginx
sudo systemctl reload nginx
```

---

## 6. SSL Certificate Setup

### 6.1 Obtain SSL Certificate

```bash
# Make sure your domain points to your server IP
# Test with: ping baykasoglu.com

# Get SSL certificate
sudo certbot --nginx -d baykasoglu.com -d www.baykasoglu.com

# Follow the prompts:
# 1. Enter email address: your-email@example.com
# 2. Agree to Terms of Service: A
# 3. Share email with EFF: Y or N (your choice)
# 4. Redirect HTTP to HTTPS: 2 (Yes, redirect)

# Certbot will automatically update your Nginx configuration
```

### 6.2 Verify SSL Certificate

```bash
# Check certificate status
sudo certbot certificates

# Test automatic renewal
sudo certbot renew --dry-run

# If successful, you'll see:
# Congratulations, all simulated renewals succeeded
```

### 6.3 Update Nginx Configuration for Production

```bash
# Edit configuration
sudo nano /etc/nginx/sites-available/baykasoglu
```

```nginx
# HTTP - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name baykasoglu.com www.baykasoglu.com;

    # Allow Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect all other requests to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
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
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Hide nginx version
    server_tokens off;

    # Max upload size
    client_max_body_size 20M;

    # Serve static uploads
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
}
```

### 6.4 Add Rate Limiting

```bash
# Edit main Nginx configuration
sudo nano /etc/nginx/nginx.conf

# Find the http { } block and add inside it:
```

```nginx
http {
    # ... existing configuration ...

    # Rate limiting zones
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=30r/s;

    # ... rest of configuration ...
}
```

### 6.5 Apply Configuration

```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 7. PM2 Process Manager

### 7.1 Create PM2 Ecosystem File

```bash
# Navigate to project directory
cd /var/www/baykasoglu

# Create ecosystem file
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
    time: true,
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

### 7.2 Create Log Directory

```bash
# Create log directory
sudo mkdir -p /var/log/baykasoglu

# Set ownership
sudo chown -R deploy:deploy /var/log/baykasoglu

# Set permissions
sudo chmod -R 755 /var/log/baykasoglu
```

### 7.3 Start Application with PM2

```bash
# Start application
pm2 start ecosystem.config.js

# Expected output:
# [PM2] Process successfully started
# App name:baykasoglu-web id:0 mode:fork pid:12345 status:online

# Check status
pm2 status

# View logs
pm2 logs baykasoglu-web --lines 50

# Save PM2 process list
pm2 save

# Configure PM2 to start on system boot
pm2 startup

# This will output a command like:
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/deploy

# Copy and run that command
```

### 7.4 Test Application

```bash
# Test if app is running
curl http://localhost:3000

# You should see HTML output

# Test via domain (HTTP)
curl http://baykasoglu.com

# Test via domain (HTTPS)
curl https://baykasoglu.com

# Visit in browser: https://baykasoglu.com
```

### 7.5 PM2 Useful Commands

```bash
# View real-time logs
pm2 logs baykasoglu-web

# View monitoring dashboard
pm2 monit

# Restart application
pm2 restart baykasoglu-web

# Stop application
pm2 stop baykasoglu-web

# Delete from PM2
pm2 delete baykasoglu-web

# Show detailed info
pm2 show baykasoglu-web

# Flush logs
pm2 flush
```

---

## 8. File Upload System

### 8.1 Create Upload Directories

```bash
# Create directory structure
sudo mkdir -p /var/www/baykasoglu/uploads/{products,categories,news,certificates,pdfs}/{original,large,medium,thumb}

# Set ownership
sudo chown -R deploy:deploy /var/www/baykasoglu/uploads

# Set permissions (writable by application)
sudo chmod -R 775 /var/www/baykasoglu/uploads
```

### 8.2 Create Backup Directory

```bash
# Create backup directories
sudo mkdir -p /var/www/baykasoglu/backups/{database,files}

# Set ownership
sudo chown -R deploy:deploy /var/www/baykasoglu/backups

# Set permissions
sudo chmod -R 755 /var/www/baykasoglu/backups
```

### 8.3 Test File Upload

```bash
# Create a test image
cd /var/www/baykasoglu/uploads/products/original

# Download a test image
curl -o test.jpg https://via.placeholder.com/1200

# Test Sharp image processing
node -e "
const sharp = require('sharp');
sharp('test.jpg')
  .resize(600, 600)
  .webp({ quality: 80 })
  .toFile('test.webp')
  .then(() => console.log('Image processed successfully'))
  .catch(err => console.error('Error:', err));
"

# Check if test.webp was created
ls -lh test.webp
```

---

## 9. Email Configuration

### 9.1 Configure Gmail SMTP (Recommended)

**Step 1: Enable 2-Step Verification**

1. Go to https://myaccount.google.com/security
2. Click on "2-Step Verification"
3. Follow the setup process

**Step 2: Create App Password**

1. Go to https://myaccount.google.com/apppasswords
2. Select app: "Mail"
3. Select device: "Other" (enter "Baykasoglu Website")
4. Click "Generate"
5. Copy the 16-character password

**Step 3: Update Environment Variables**

```bash
# Edit .env.local
nano /var/www/baykasoglu/.env.local

# Update SMTP settings:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM=info@baykasoglu.com
```

### 9.2 Alternative: Configure Custom Domain SMTP

If you have email hosting with your domain:

```env
SMTP_HOST=mail.baykasoglu.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@baykasoglu.com
SMTP_PASSWORD=your-email-password
SMTP_FROM=info@baykasoglu.com
```

### 9.3 Test Email Sending

```bash
# Create test email script
nano /var/www/baykasoglu/scripts/test-email.ts
```

```typescript
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function test() {
  console.log('Testing email configuration...');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP User:', process.env.SMTP_USER);

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email from Baykasoglu Website',
      text: 'This is a test email to verify SMTP configuration.',
      html: '<p>This is a test email to verify SMTP configuration.</p>',
    });

    console.log('✓ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('✗ Email sending failed:');
    console.error(error);
  }
}

test();
```

```bash
# Install dotenv
npm install dotenv

# Run test
npx tsx scripts/test-email.ts

# Check your inbox for the test email
```

---

## 10. Backup Automation

### 10.1 Create Database Backup Script

```bash
# Create scripts directory if not exists
mkdir -p /var/www/baykasoglu/scripts

# Create database backup script
nano /var/www/baykasoglu/scripts/backup-db.sh
```

```bash
#!/bin/bash

# Configuration
DB_NAME="baykasoglu"
DB_USER="baykasoglu_user"
DB_PASSWORD="YOUR_DB_PASSWORD"  # Replace with actual password
BACKUP_DIR="/var/www/baykasoglu/backups/database"
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Generate filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql.gz"

# Set password for pg_dump
export PGPASSWORD="$DB_PASSWORD"

# Create backup
echo "Starting database backup..."
pg_dump -U $DB_USER -h localhost $DB_NAME | gzip > $BACKUP_FILE

# Unset password
unset PGPASSWORD

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "Backup completed successfully: $BACKUP_FILE"

    # Get file size
    FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "Backup size: $FILE_SIZE"

    # Remove old backups
    echo "Removing backups older than $RETENTION_DAYS days..."
    find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete

    # Count remaining backups
    BACKUP_COUNT=$(ls -1 $BACKUP_DIR/backup_*.sql.gz 2>/dev/null | wc -l)
    echo "Total backups: $BACKUP_COUNT"
else
    echo "ERROR: Backup failed!"
    exit 1
fi
```

### 10.2 Create File Backup Script

```bash
# Create file backup script
nano /var/www/baykasoglu/scripts/backup-files.sh
```

```bash
#!/bin/bash

# Configuration
SOURCE_DIR="/var/www/baykasoglu/uploads"
BACKUP_DIR="/var/www/baykasoglu/backups/files"
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Generate filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/files_$TIMESTAMP.tar.gz"

# Create backup
echo "Starting files backup..."
tar -czf $BACKUP_FILE -C /var/www/baykasoglu uploads/

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "Files backup completed successfully: $BACKUP_FILE"

    # Get file size
    FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "Backup size: $FILE_SIZE"

    # Remove old backups
    echo "Removing backups older than $RETENTION_DAYS days..."
    find $BACKUP_DIR -name "files_*.tar.gz" -mtime +$RETENTION_DAYS -delete

    # Count remaining backups
    BACKUP_COUNT=$(ls -1 $BACKUP_DIR/files_*.tar.gz 2>/dev/null | wc -l)
    echo "Total backups: $BACKUP_COUNT"
else
    echo "ERROR: Files backup failed!"
    exit 1
fi
```

### 10.3 Make Scripts Executable

```bash
# Make scripts executable
chmod +x /var/www/baykasoglu/scripts/backup-db.sh
chmod +x /var/www/baykasoglu/scripts/backup-files.sh

# Test database backup
/var/www/baykasoglu/scripts/backup-db.sh

# Test file backup
/var/www/baykasoglu/scripts/backup-files.sh

# Verify backups were created
ls -lh /var/www/baykasoglu/backups/database/
ls -lh /var/www/baykasoglu/backups/files/
```

### 10.4 Schedule Automated Backups

```bash
# Edit crontab
crontab -e

# Add these lines at the end:
```

```cron
# Database backup every day at 2:00 AM
0 2 * * * /var/www/baykasoglu/scripts/backup-db.sh >> /var/log/baykasoglu/backup-db.log 2>&1

# File backup every day at 3:00 AM
0 3 * * * /var/www/baykasoglu/scripts/backup-files.sh >> /var/log/baykasoglu/backup-files.log 2>&1

# PM2 save every 6 hours
0 */6 * * * /usr/bin/pm2 save

# Certbot renewal check twice daily
0 0,12 * * * certbot renew --quiet
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

```bash
# Verify cron jobs
crontab -l
```

---

## 11. Security Hardening

### 11.1 Configure Firewall

```bash
# Install UFW if not installed
sudo apt install -y ufw

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (IMPORTANT: Do this first!)
sudo ufw allow ssh

# Or if using custom SSH port:
# sudo ufw allow 2222/tcp

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Verify rules
sudo ufw status verbose

# Expected output:
# Status: active
# To                         Action      From
# --                         ------      ----
# 22/tcp                     ALLOW IN    Anywhere
# Nginx Full                 ALLOW IN    Anywhere
```

### 11.2 Disable Root SSH Login

Already configured in Section 1.5, but verify:

```bash
# Check SSH config
sudo grep -E 'PermitRootLogin|PasswordAuthentication' /etc/ssh/sshd_config

# Should show:
# PermitRootLogin no
# PasswordAuthentication no
```

### 11.3 Configure Fail2Ban (Optional but Recommended)

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Create local configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit configuration
sudo nano /etc/fail2ban/jail.local

# Find [sshd] section and ensure:
# enabled = true
# maxretry = 3
# bantime = 3600

# Start and enable Fail2Ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

### 11.4 Secure File Permissions

```bash
# Application files
sudo chown -R deploy:deploy /var/www/baykasoglu
sudo chmod -R 755 /var/www/baykasoglu

# Uploads directory (needs to be writable)
sudo chmod -R 775 /var/www/baykasoglu/uploads

# Environment file (sensitive)
chmod 600 /var/www/baykasoglu/.env.local

# Scripts
chmod 700 /var/www/baykasoglu/scripts/*.sh

# Logs
sudo chmod -R 755 /var/log/baykasoglu
```

### 11.5 Secure PostgreSQL

```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/15/main/postgresql.conf

# Ensure these settings:
# listen_addresses = 'localhost'
# max_connections = 100

# Edit pg_hba.conf
sudo nano /etc/postgresql/15/main/pg_hba.conf

# Ensure only local connections:
# local   all             postgres                                peer
# local   baykasoglu      baykasoglu_user                         scram-sha-256
# host    baykasoglu      baykasoglu_user  127.0.0.1/32           scram-sha-256
# host    baykasoglu      baykasoglu_user  ::1/128                scram-sha-256

# Restart PostgreSQL
sudo systemctl restart postgresql
```

---

## 12. Monitoring & Logs

### 12.1 Set Up Log Rotation

```bash
# Create logrotate configuration
sudo nano /etc/logrotate.d/baykasoglu
```

```
/var/log/baykasoglu/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 deploy deploy
    sharedscripts
    postrotate
        /usr/bin/pm2 reloadLogs
    endscript
}
```

```bash
# Test logrotate configuration
sudo logrotate -d /etc/logrotate.d/baykasoglu

# Force rotation (for testing)
sudo logrotate -f /etc/logrotate.d/baykasoglu
```

### 12.2 View Logs

```bash
# PM2 application logs
pm2 logs baykasoglu-web

# Last 100 lines
pm2 logs baykasoglu-web --lines 100

# Follow logs in real-time
pm2 logs baykasoglu-web --raw

# View specific log file
tail -f /var/log/baykasoglu/combined.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log

# Backup logs
tail -f /var/log/baykasoglu/backup-db.log
tail -f /var/log/baykasoglu/backup-files.log
```

### 12.3 Monitor System Resources

```bash
# PM2 monitoring dashboard
pm2 monit

# Disk usage
df -h

# Memory usage
free -h

# CPU and process info
top

# Press 'q' to exit top

# Disk I/O
sudo iotop

# Network connections
sudo netstat -tulpn

# Check open files
sudo lsof -i :3000
sudo lsof -i :80
sudo lsof -i :443
```

### 12.4 Set Up Monitoring Alerts (Optional)

Create a simple monitoring script:

```bash
# Create monitoring script
nano /var/www/baykasoglu/scripts/monitor.sh
```

```bash
#!/bin/bash

# Configuration
ADMIN_EMAIL="admin@baykasoglu.com"
DISK_THRESHOLD=80
MEMORY_THRESHOLD=90

# Check disk usage
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt $DISK_THRESHOLD ]; then
    echo "WARNING: Disk usage is ${DISK_USAGE}%" | \
        mail -s "Baykasoglu Server: High Disk Usage" $ADMIN_EMAIL
fi

# Check memory usage
MEMORY_USAGE=$(free | grep Mem | awk '{print int($3/$2 * 100)}')
if [ $MEMORY_USAGE -gt $MEMORY_THRESHOLD ]; then
    echo "WARNING: Memory usage is ${MEMORY_USAGE}%" | \
        mail -s "Baykasoglu Server: High Memory Usage" $ADMIN_EMAIL
fi

# Check if application is running
if ! pm2 describe baykasoglu-web > /dev/null 2>&1; then
    echo "ERROR: Application is not running!" | \
        mail -s "Baykasoglu Server: Application Down" $ADMIN_EMAIL
    pm2 start ecosystem.config.js
fi
```

```bash
# Make executable
chmod +x /var/www/baykasoglu/scripts/monitor.sh

# Add to crontab (run every 5 minutes)
crontab -e

# Add:
*/5 * * * * /var/www/baykasoglu/scripts/monitor.sh
```

---

## 13. Update Procedures

### 13.1 Update Application Code

```bash
# SSH into server
ssh deploy@YOUR_SERVER_IP

# Navigate to project directory
cd /var/www/baykasoglu

# Pull latest changes (if using git)
git pull origin main

# Or upload new files via SCP/rsync

# Install any new dependencies
npm install

# Run database migrations if needed
npx prisma db push

# Rebuild application
npm run build

# Restart PM2
pm2 restart baykasoglu-web

# Check logs for errors
pm2 logs baykasoglu-web --lines 50

# Verify site is working
curl https://baykasoglu.com
```

### 13.2 Update System Packages

```bash
# Update package lists
sudo apt update

# List upgradable packages
apt list --upgradable

# Upgrade packages
sudo apt upgrade -y

# Remove unnecessary packages
sudo apt autoremove -y

# Reboot if kernel was updated
sudo reboot
```

### 13.3 Update Node.js

```bash
# Check current version
node --version

# Update to latest Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify new version
node --version

# Rebuild application
cd /var/www/baykasoglu
npm rebuild
npm run build

# Restart application
pm2 restart baykasoglu-web
```

### 13.4 Update PostgreSQL

```bash
# Check current version
psql --version

# Backup database before upgrade
/var/www/baykasoglu/scripts/backup-db.sh

# Update PostgreSQL (example: 15 to 16)
sudo apt install postgresql-16

# Follow PostgreSQL upgrade guide if major version change
```

### 13.5 Update NPM Packages

```bash
# Navigate to project
cd /var/www/baykasoglu

# Check for outdated packages
npm outdated

# Update all packages (be careful with major versions)
npm update

# Or update specific package
npm update next

# Update to latest versions (including major)
# npx npm-check-updates -u
# npm install

# Rebuild and test
npm run build
pm2 restart baykasoglu-web
```

### 13.6 Rollback Procedure

If something goes wrong:

```bash
# Stop application
pm2 stop baykasoglu-web

# Restore from git (if using git)
git reset --hard HEAD~1
git pull origin main

# Or restore from backup
cp -r /var/www/baykasoglu.backup /var/www/baykasoglu

# Restore database if needed
gunzip -c /var/www/baykasoglu/backups/database/backup_TIMESTAMP.sql.gz | \
  psql -U baykasoglu_user -d baykasoglu -h localhost

# Restore files if needed
tar -xzf /var/www/baykasoglu/backups/files/files_TIMESTAMP.tar.gz \
  -C /var/www/baykasoglu

# Rebuild application
npm install
npm run build

# Restart application
pm2 restart baykasoglu-web

# Check logs
pm2 logs baykasoglu-web
```

---

## Verification Checklist

After deployment, verify everything is working:

### System Checks
- [ ] Server is accessible via SSH
- [ ] Firewall is configured and active
- [ ] System packages are up to date

### Database
- [ ] PostgreSQL is running
- [ ] Database and user created
- [ ] Tables created successfully
- [ ] Admin user created

### Application
- [ ] Code deployed to /var/www/baykasoglu
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Application built successfully
- [ ] PM2 running application
- [ ] Application responds on localhost:3000

### Web Server
- [ ] Nginx is running
- [ ] Site configuration enabled
- [ ] SSL certificate obtained
- [ ] HTTPS redirect working
- [ ] Site accessible via domain

### Email
- [ ] SMTP credentials configured
- [ ] Test email sent successfully
- [ ] Email received in inbox

### File System
- [ ] Upload directories created
- [ ] Proper permissions set
- [ ] Backup directories created
- [ ] Test file upload works

### Backups
- [ ] Backup scripts created
- [ ] Manual backup tested
- [ ] Cron jobs scheduled
- [ ] Backup restoration tested

### Security
- [ ] Root login disabled
- [ ] Password authentication disabled
- [ ] Firewall configured
- [ ] File permissions correct
- [ ] .env.local secured

### Monitoring
- [ ] PM2 monitoring works
- [ ] Logs accessible
- [ ] Log rotation configured
- [ ] Resource monitoring setup

---

## Troubleshooting Common Issues

### Issue: Application Won't Start

```bash
# Check PM2 logs
pm2 logs baykasoglu-web --lines 100

# Common causes:
# 1. Port 3000 already in use
sudo lsof -i :3000
sudo kill -9 PID

# 2. Database connection failed
psql -U baykasoglu_user -d baykasoglu -h localhost

# 3. Missing environment variables
cat .env.local

# 4. Build errors
cd /var/www/baykasoglu
npm run build
```

### Issue: 502 Bad Gateway

```bash
# Check if app is running
pm2 status

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log

# Restart both services
pm2 restart baykasoglu-web
sudo systemctl restart nginx
```

### Issue: Database Connection Refused

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Check connection settings
cat .env.local | grep DATABASE_URL

# Test connection
psql -U baykasoglu_user -d baykasoglu -h localhost
```

### Issue: SSL Certificate Errors

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew --force-renewal

# Check Nginx SSL config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Issue: File Upload Fails

```bash
# Check permissions
ls -la /var/www/baykasoglu/uploads

# Fix permissions
sudo chown -R deploy:deploy /var/www/baykasoglu/uploads
sudo chmod -R 775 /var/www/baykasoglu/uploads

# Check disk space
df -h

# Restart application
pm2 restart baykasoglu-web
```

### Issue: Email Not Sending

```bash
# Test SMTP connection
npx tsx scripts/test-email.ts

# Check environment variables
cat .env.local | grep SMTP

# Check application logs
pm2 logs baykasoglu-web | grep -i email

# Verify SMTP credentials with provider
```

---

## Performance Tuning

### Optimize PostgreSQL

```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/15/main/postgresql.conf

# For 2GB RAM server:
shared_buffers = 512MB
effective_cache_size = 1536MB
maintenance_work_mem = 128MB
work_mem = 8MB
random_page_cost = 1.1

# For 4GB RAM server:
shared_buffers = 1GB
effective_cache_size = 3GB
maintenance_work_mem = 256MB
work_mem = 16MB

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Enable Nginx Caching

```bash
# Edit Nginx config
sudo nano /etc/nginx/sites-available/baykasoglu

# Add to server block:
```

```nginx
# Cache configuration
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=app_cache:10m max_size=1g inactive=60m use_temp_path=off;

server {
    # ... existing config ...

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable Gzip Compression

```bash
# Edit main Nginx config
sudo nano /etc/nginx/nginx.conf

# Add to http block:
```

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript image/svg+xml;
```

---

## Conclusion

You have successfully deployed a fully self-hosted Next.js application!

### What You've Accomplished

1. Configured a secure Ubuntu server
2. Installed and configured PostgreSQL database
3. Deployed Next.js application with PM2
4. Set up Nginx reverse proxy with SSL
5. Configured automated backups
6. Hardened security
7. Set up monitoring and logging

### Next Steps

1. **Login to Admin Panel:** https://baykasoglu.com/admin/login
2. **Add Content:** Products, categories, pages
3. **Test All Features:** Contact forms, quote requests, uploads
4. **Monitor:** Check logs and server resources daily
5. **Maintain:** Keep system updated and backups verified

### Estimated Costs

- **VPS Server:** $12/month (~400 TRY)
- **Domain:** $15/year (~500 TRY)
- **SSL Certificate:** $0 (Let's Encrypt)
- **Total:** ~$160/year

**vs SaaS Alternative:** ~$1,200/year

**Annual Savings:** ~$1,040/year

### Support

For issues:
- Check logs: `pm2 logs baykasoglu-web`
- Review this guide
- Consult SELF_HOSTED_ARCHITECTURE.md

Your website is live, secure, and completely under your control!
