# Self-Hosted Architecture Summary

## Quick Overview

You now have **three comprehensive documents** for deploying a 100% self-hosted Next.js website with **zero external dependencies**.

## Document Guide

### 1. SELF_HOSTED_ARCHITECTURE.md
**What it covers:**
- Complete system architecture with diagrams
- Database schema (PostgreSQL + Prisma)
- Email system options (SMTP or Postfix)
- File storage strategy (local filesystem)
- Authentication system (NextAuth.js v5)
- Backup and disaster recovery
- Security best practices
- Server requirements and costs
- Performance optimization

**Read this if you want to:**
- Understand the overall architecture
- Make technology decisions
- Plan server resources
- Understand cost implications

### 2. START_HERE_SELFHOSTED.md
**What it covers:**
- Quick start checklist (6-7 hours total)
- Technology stack overview
- Step-by-step installation instructions
- Environment variable configuration
- Common operations (restart, update, logs)
- Troubleshooting guide
- Cost comparison with SaaS

**Read this if you want to:**
- Get started quickly
- Follow a condensed installation guide
- Understand daily operations
- See cost breakdown

### 3. DEPLOYMENT_GUIDE.md
**What it covers:**
- Detailed server setup (every command explained)
- PostgreSQL installation and configuration
- Application deployment
- Nginx configuration with SSL
- PM2 process manager setup
- Email configuration (Gmail SMTP example)
- Automated backup scripts
- Security hardening
- Monitoring and logs
- Update and rollback procedures
- Comprehensive troubleshooting

**Read this if you want to:**
- Deploy to production step-by-step
- Understand every command
- Set up backups and monitoring
- Troubleshoot issues
- Update and maintain the system

## Technology Stack

### Infrastructure (All Self-Hosted)
```
Ubuntu 22.04 LTS
├── Nginx (Web Server + Reverse Proxy + SSL)
├── Node.js 20 LTS (Application Runtime)
├── PM2 (Process Manager)
├── PostgreSQL 15+ (Database)
├── Let's Encrypt (SSL Certificates - Free)
└── Local Filesystem (File Storage)
```

### Application Stack
```
Next.js 16.0.1
├── React 19.2.0
├── TypeScript 5.x
├── Tailwind CSS 4.x
├── Prisma (Database ORM)
├── NextAuth.js v5 (Authentication)
├── Nodemailer (Email)
└── Sharp (Image Processing)
```

## Cost Comparison

### Self-Hosted (Your Setup)
| Item | Monthly | Annual |
|------|---------|--------|
| VPS Server (Small) | $12 | $144 |
| Domain | - | $15 |
| SSL Certificate | $0 | $0 |
| Database | $0 | $0 |
| Email | $0 | $0 |
| Storage | $0 | $0 |
| **Total** | **$12** | **~$159** |

### SaaS Alternative (Supabase + Resend + Vercel)
| Item | Monthly | Annual |
|------|---------|--------|
| Supabase Pro | $25 | $300 |
| Resend Pro | $20 | $240 |
| Vercel Pro | $20 | $240 |
| Domain | - | $15 |
| **Total** | **$65** | **~$795** |

### Savings
- **Monthly:** $53 saved (~1,800 TRY)
- **Annual:** $636 saved (~21,500 TRY)
- **3 Years:** $1,908 saved (~65,000 TRY)

## Server Requirements

### Small Site (<1,000 visitors/day)
- **CPU:** 1-2 vCPU
- **RAM:** 2 GB
- **Storage:** 20 GB SSD
- **Cost:** $12/month
- **Providers:** Hetzner (€4.51), DigitalOcean, Vultr, Linode

### Medium Site (1,000-10,000 visitors/day)
- **CPU:** 2-4 vCPU
- **RAM:** 4 GB
- **Storage:** 50 GB SSD
- **Cost:** $24/month

### Large Site (10,000+ visitors/day)
- **CPU:** 4-8 vCPU
- **RAM:** 8-16 GB
- **Storage:** 100 GB SSD
- **Cost:** $48-96/month

## Key Features

### 1. Database (PostgreSQL)
- 10 tables for complete functionality
- Product catalog with categories
- Contact forms and quote requests
- News/blog system
- Admin user management
- Session storage
- Full-text search ready
- JSONB for flexible data

### 2. Email System (Nodemailer)
**Option 1: External SMTP (Recommended)**
- Use Gmail, Office365, or hosting provider
- Easy setup with app passwords
- Reliable delivery

**Option 2: Self-Hosted Postfix**
- Complete independence
- Requires SPF/DKIM/DMARC setup
- More complex but powerful

### 3. File Storage
- Local filesystem with organized structure
- Automatic image optimization (Sharp)
- Multiple sizes: original, large, medium, thumb
- WebP format for efficiency
- PDF support for product catalogs
- Nginx serves files directly (fast)

### 4. Authentication
- NextAuth.js v5 with database sessions
- bcrypt password hashing (12 rounds)
- Role-based access control
- Session management
- Secure cookie handling

### 5. Backups
- Automated daily database backups
- Automated daily file backups
- 30-day retention by default
- Compressed storage (gzip)
- Easy restoration procedures

### 6. Security
- SSL/TLS encryption (HTTPS)
- Firewall (UFW) configured
- SSH key authentication only
- PostgreSQL local-only access
- File permission controls
- Security headers in Nginx
- Rate limiting
- Fail2Ban for brute force protection

## Quick Start Path

### Phase 1: Read Documentation (30 minutes)
1. Read this summary
2. Skim SELF_HOSTED_ARCHITECTURE.md
3. Bookmark DEPLOYMENT_GUIDE.md

### Phase 2: Get Server (30 minutes)
1. Choose VPS provider (Hetzner recommended)
2. Create Ubuntu 22.04 LTS server
3. Point domain to server IP
4. Save SSH credentials

### Phase 3: Follow Deployment Guide (5-6 hours)
1. Open DEPLOYMENT_GUIDE.md
2. Follow Section 1: Server Setup
3. Follow Section 2: Install Software
4. Continue through Section 13
5. Complete verification checklist

### Phase 4: Go Live (30 minutes)
1. Login to admin panel
2. Change default password
3. Add initial content
4. Test all features
5. Announce launch

## Database Schema Overview

```
categories (Product categories)
├── id, name, slug, description
└── display_order, is_active

products (Product catalog)
├── id, name, slug, description
├── category_id (FK)
├── technical_specs (JSONB)
├── images (JSONB array)
├── featured, is_active
└── SEO fields

contact_submissions (Contact + Quote)
├── id, type (contact/quote)
├── full_name, email, phone, company
├── message, product_id (FK)
├── status (new/in_progress/completed)
└── ip_address, user_agent

pages (Static pages)
├── id, slug, title, content
└── SEO fields

news (Blog posts)
├── id, title, slug, excerpt, content
├── author, is_published
└── published_at

certificates (Quality certs)
├── id, name, issuer
├── issue_date, expiry_date
└── certificate_url, image_url

site_settings (Configuration)
├── key, value, type
└── description

newsletter_subscribers
├── id, email
├── is_active
└── subscribed_at, unsubscribed_at

admin_users
├── id, email, password_hash
├── full_name, role
└── is_active, last_login

sessions (NextAuth)
├── id, user_id (FK)
├── session_token, expires
└── created_at
```

## File Structure

```
/var/www/baykasoglu/
├── app/                          # Next.js app directory
│   ├── admin/                   # Admin panel
│   │   ├── login/
│   │   ├── products/
│   │   └── contacts/
│   ├── urunler/                 # Product catalog
│   └── api/                     # API routes
├── components/                   # React components
├── lib/
│   ├── prisma.ts                # Database client
│   ├── auth/                    # Authentication
│   ├── email/                   # Email system
│   └── uploads/                 # Upload handlers
├── prisma/
│   └── schema.prisma            # Database schema
├── scripts/
│   ├── create-admin.ts          # Create admin user
│   ├── backup-db.sh             # Database backup
│   └── backup-files.sh          # File backup
├── uploads/                      # User uploads
│   ├── products/
│   ├── categories/
│   ├── news/
│   └── pdfs/
├── backups/                      # Automated backups
│   ├── database/
│   └── files/
├── .env.local                    # Environment variables
├── ecosystem.config.js           # PM2 configuration
└── package.json
```

## Environment Variables

```env
# Required Variables
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=info@your-domain.com

# Application
ADMIN_EMAIL=admin@your-domain.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Common Operations

### Start/Stop/Restart
```bash
pm2 start baykasoglu-web
pm2 stop baykasoglu-web
pm2 restart baykasoglu-web
pm2 reload baykasoglu-web  # Zero-downtime restart
```

### View Logs
```bash
pm2 logs baykasoglu-web
pm2 logs baykasoglu-web --lines 100
tail -f /var/log/baykasoglu/combined.log
```

### Monitor Resources
```bash
pm2 monit
top
df -h
free -h
```

### Backup Manually
```bash
/var/www/baykasoglu/scripts/backup-db.sh
/var/www/baykasoglu/scripts/backup-files.sh
```

### Update Application
```bash
cd /var/www/baykasoglu
git pull origin main
npm install
npm run build
pm2 restart baykasoglu-web
```

### Restart Services
```bash
pm2 restart baykasoglu-web
sudo systemctl restart nginx
sudo systemctl restart postgresql
```

## Troubleshooting Quick Reference

### App Won't Start
```bash
pm2 logs baykasoglu-web --lines 100
npm run build
pm2 restart baykasoglu-web
```

### 502 Bad Gateway
```bash
pm2 status
pm2 restart baykasoglu-web
sudo systemctl restart nginx
```

### Database Connection Error
```bash
sudo systemctl status postgresql
psql -U baykasoglu_user -d baykasoglu -h localhost
```

### Email Not Sending
```bash
npx tsx scripts/test-email.ts
cat .env.local | grep SMTP
pm2 logs | grep -i email
```

### Upload Fails
```bash
ls -la /var/www/baykasoglu/uploads
sudo chown -R deploy:deploy /var/www/baykasoglu/uploads
sudo chmod -R 775 /var/www/baykasoglu/uploads
```

## Security Checklist

- [x] SSL certificate installed (Let's Encrypt)
- [x] Firewall configured (UFW)
- [x] SSH key authentication only
- [x] Root login disabled
- [x] PostgreSQL local-only access
- [x] Strong database password
- [x] .env.local secured (chmod 600)
- [x] File permissions correct
- [x] Security headers in Nginx
- [x] Rate limiting enabled
- [x] Automated backups configured
- [x] Log rotation configured
- [x] Admin password changed from default

## Performance Tips

### Database
- Use indexes on frequently queried fields
- Enable connection pooling (Prisma handles this)
- Optimize PostgreSQL config for your RAM
- Use JSONB for flexible data structures

### Caching
- Nginx caches static files
- Next.js has built-in caching
- Use `revalidate` in page components
- Consider Redis for session storage (optional)

### Images
- Sharp optimizes on upload
- Multiple sizes generated automatically
- WebP format reduces bandwidth
- Nginx serves with proper cache headers

### Monitoring
- PM2 real-time monitoring
- Check logs daily
- Monitor disk space
- Set up alerts for critical issues

## Recommended VPS Providers

### 1. Hetzner (Best Value)
- **Location:** Germany, Finland, USA
- **Price:** €4.51/month (CX21)
- **Specs:** 2 vCPU, 4 GB RAM, 40 GB SSD
- **Website:** hetzner.com

### 2. DigitalOcean (Most Popular)
- **Location:** Global
- **Price:** $12/month (Basic Droplet)
- **Specs:** 2 vCPU, 2 GB RAM, 50 GB SSD
- **Website:** digitalocean.com

### 3. Vultr
- **Location:** Global
- **Price:** $12/month (Cloud Compute)
- **Specs:** 2 vCPU, 2 GB RAM, 55 GB SSD
- **Website:** vultr.com

### 4. Linode (Now Akamai)
- **Location:** Global
- **Price:** $12/month (Nanode)
- **Specs:** 1 vCPU, 2 GB RAM, 50 GB SSD
- **Website:** linode.com

## Support Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- PostgreSQL: https://www.postgresql.org/docs
- Nginx: https://nginx.org/en/docs
- PM2: https://pm2.keymetrics.io/docs
- NextAuth.js: https://authjs.dev

### Community
- Next.js Discord
- Prisma Community
- PostgreSQL Mailing Lists
- Stack Overflow
- DigitalOcean Community Tutorials

## What Makes This Self-Hosted Solution Special

### 1. Complete Ownership
- Your data, your server, your rules
- No vendor lock-in
- Can migrate anytime
- No sudden price increases
- No feature restrictions

### 2. Privacy
- No third-party data access
- GDPR compliant by design
- Full audit trail
- Data never leaves your server

### 3. Cost Efficiency
- Save ~$50/month vs SaaS
- Predictable costs
- No per-user pricing
- No bandwidth overage fees

### 4. Flexibility
- Customize anything
- Add any features
- No API limitations
- Direct database access

### 5. Performance
- Dedicated resources
- No shared infrastructure
- Direct file serving
- Optimized for your needs

### 6. Scalability
- Upgrade server anytime
- Horizontal scaling possible
- Add CDN if needed
- Database replication ready

## Timeline

### Initial Setup: 6-7 hours
- Server setup: 1 hour
- Software installation: 1 hour
- Database configuration: 30 minutes
- Application deployment: 1 hour
- Nginx + SSL setup: 1 hour
- Email configuration: 30 minutes
- Backups + Security: 1 hour
- Testing + Verification: 1 hour

### Ongoing Maintenance: 1-2 hours/month
- Monitor logs: 15 min/week
- Check backups: 15 min/week
- Update packages: 30 min/month
- Review security: 30 min/month

## Success Criteria

After deployment, you should have:

- [x] Website accessible via HTTPS
- [x] Admin panel working (https://domain.com/admin/login)
- [x] Database connected and populated
- [x] Email sending working
- [x] File uploads working
- [x] Backups running automatically
- [x] SSL auto-renewal configured
- [x] Monitoring and logs accessible
- [x] Firewall protecting server
- [x] Documentation ready for maintenance

## Next Steps

1. **Read DEPLOYMENT_GUIDE.md** - Follow it step-by-step
2. **Get a VPS Server** - Choose from recommended providers
3. **Deploy Application** - Follow the guide exactly
4. **Test Everything** - Use verification checklist
5. **Add Content** - Login to admin and populate site
6. **Monitor** - Check logs and backups regularly
7. **Maintain** - Update monthly, backup weekly

## Final Notes

### Why This Approach?

**Traditional SaaS Approach:**
- Monthly fees forever
- Data in someone else's hands
- Limited customization
- Vendor dependency

**Self-Hosted Approach:**
- One-time setup
- Low monthly cost
- Complete control
- Independence

### Who Is This For?

**Perfect for:**
- Small businesses
- Corporate websites
- Portfolio sites
- B2B companies
- Product catalogs
- Information sites

**Not ideal for:**
- Very high traffic (>100k visitors/day)
- Real-time applications
- Complex e-commerce
- Apps requiring global CDN
- Teams without technical skills

### Long-Term Benefits

**Year 1:**
- Save ~$600 in hosting costs
- Learn server management
- Own your infrastructure

**Year 3:**
- Save ~$1,800 total
- Experienced with deployment
- Can replicate for other projects

**Year 5:**
- Save ~$3,000 total
- Complete infrastructure knowledge
- Can consult others

## Conclusion

You now have everything needed to deploy a **100% self-hosted Next.js website**:

- Complete architecture documentation
- Step-by-step deployment guide
- Quick start instructions
- Troubleshooting resources
- Maintenance procedures

**Total Cost:** ~$12/month (~400 TRY)
**Total Savings:** ~$636/year (~21,500 TRY)
**Setup Time:** 6-7 hours
**Maintenance:** 1-2 hours/month

**Your website. Your server. Your control.**

Good luck with your deployment!

---

## Document Map

```
SELFHOSTED_SUMMARY.md (You are here)
├── Quick overview and comparison
├── Cost analysis
└── Next steps guide

SELF_HOSTED_ARCHITECTURE.md
├── System architecture
├── Database schema
├── Technology decisions
└── Performance optimization

START_HERE_SELFHOSTED.md
├── Quick start checklist
├── Installation steps
├── Common operations
└── Troubleshooting

DEPLOYMENT_GUIDE.md
├── Step-by-step deployment
├── Every command explained
├── Security hardening
└── Update procedures
```

Start with this summary, then proceed to DEPLOYMENT_GUIDE.md for implementation.
