# Baykasoglu Web - Self-Hosted Documentation

## Welcome

This is a **100% self-hosted Next.js corporate website** with zero external dependencies. Everything runs on your own server - database, files, email, authentication.

## Quick Start

1. **Read this first:** [SELFHOSTED_SUMMARY.md](./SELFHOSTED_SUMMARY.md) (5 minutes)
2. **Then follow this:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) (6-7 hours)
3. **Keep handy:** [SELFHOSTED_QUICKREF.md](./SELFHOSTED_QUICKREF.md) (quick reference)

## Documentation Index

### Core Documents

| Document | Size | Purpose | Read When |
|----------|------|---------|-----------|
| **README_SELFHOSTED.md** | 2 KB | You are here | Start |
| **SELFHOSTED_SUMMARY.md** | 16 KB | Overview & comparison | Planning |
| **DEPLOYMENT_GUIDE.md** | 39 KB | Step-by-step deployment | Deploying |
| **START_HERE_SELFHOSTED.md** | 22 KB | Quick start guide | Reference |
| **SELF_HOSTED_ARCHITECTURE.md** | 36 KB | Technical architecture | Deep dive |
| **SELFHOSTED_QUICKREF.md** | 3 KB | Command reference | Daily ops |

### Legacy Documents (Ignore These)

- START_HERE.md - Old SaaS-based approach
- IMPLEMENTATION_GUIDE.md - Supabase/Vercel guide
- REVISED_PLAN.md - SaaS timeline

## What You'll Build

A professional corporate website with:

- Product catalog (information only, no e-commerce)
- Contact forms with email notifications
- Quote request system for B2B customers
- Admin panel for content management
- News/blog section
- File upload system (images + PDFs)
- SEO optimization
- Mobile responsive design

## Technology Stack

### Infrastructure (Self-Hosted)
- **OS:** Ubuntu 22.04 LTS
- **Web Server:** Nginx (reverse proxy + SSL)
- **Runtime:** Node.js 20 LTS
- **Process Manager:** PM2
- **Database:** PostgreSQL 15+
- **SSL:** Let's Encrypt (free)
- **Email:** Nodemailer + SMTP
- **Storage:** Local filesystem

### Application
- **Framework:** Next.js 16.0.1
- **UI:** React 19.2.0
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x
- **ORM:** Prisma
- **Auth:** NextAuth.js v5
- **Images:** Sharp
- **Validation:** Zod

## Cost Comparison

### Self-Hosted (This Approach)
```
VPS Server:       $12/month
Domain:           $15/year
SSL:              $0 (free)
Database:         $0 (included)
Email:            $0 (SMTP)
Storage:          $0 (included)
─────────────────────────────
Monthly:          $12 (~400 TRY)
Annual:           ~$159 (~5,400 TRY)
```

### SaaS Alternative (Supabase + Vercel + Resend)
```
Supabase Pro:     $25/month
Vercel Pro:       $20/month
Resend Pro:       $20/month
Domain:           $15/year
─────────────────────────────
Monthly:          $65 (~2,200 TRY)
Annual:           ~$795 (~27,000 TRY)
```

### Savings
- **Monthly:** $53 (~1,800 TRY)
- **Annual:** $636 (~21,600 TRY)
- **3 Years:** $1,908 (~65,000 TRY)

## Server Requirements

### Small Site (<1,000 visitors/day)
- CPU: 1-2 vCPU
- RAM: 2 GB
- Storage: 20 GB SSD
- Cost: $12/month

### Medium Site (1,000-10,000 visitors/day)
- CPU: 2-4 vCPU
- RAM: 4 GB
- Storage: 50 GB SSD
- Cost: $24/month

### Large Site (10,000+ visitors/day)
- CPU: 4-8 vCPU
- RAM: 8-16 GB
- Storage: 100 GB SSD
- Cost: $48-96/month

## Recommended VPS Providers

1. **Hetzner** (Best value) - €4.51/month for 2 vCPU, 4 GB RAM
2. **DigitalOcean** - $12/month for 2 vCPU, 2 GB RAM
3. **Vultr** - $12/month for 2 vCPU, 2 GB RAM
4. **Linode** - $12/month for 1 vCPU, 2 GB RAM

## Timeline

### Initial Setup: 6-7 hours
1. Server setup (1 hour)
2. Software installation (1 hour)
3. Database configuration (30 min)
4. Application deployment (1 hour)
5. Nginx + SSL setup (1 hour)
6. Email configuration (30 min)
7. Backups + security (1 hour)
8. Testing (30 min)

### Ongoing Maintenance: 1-2 hours/month
- Monitor logs: 15 min/week
- Check backups: 15 min/week
- Update packages: 30 min/month
- Security review: 30 min/month

## Features Overview

### Database (PostgreSQL)
- 10 tables covering all functionality
- Product catalog with categories
- Contact submissions and quotes
- Content management
- Admin user system
- Session storage

### Email System
- Nodemailer for sending emails
- SMTP configuration (Gmail, Office365, or custom)
- Email templates for all notifications
- Contact form notifications
- Quote request notifications

### File Storage
- Local filesystem with organized structure
- Automatic image optimization
- Multiple sizes: original, large, medium, thumb
- WebP format for efficiency
- PDF support for catalogs

### Authentication
- NextAuth.js v5 with database sessions
- Secure password hashing (bcrypt)
- Role-based access control
- Admin panel protection

### Security
- SSL/TLS encryption (HTTPS)
- Firewall configuration (UFW)
- SSH key authentication only
- Database access restrictions
- File permission controls
- Security headers
- Rate limiting

### Backups
- Automated daily database backups
- Automated daily file backups
- 30-day retention
- Compressed storage
- Easy restoration

## Quick Commands

### Application
```bash
pm2 start baykasoglu-web     # Start
pm2 restart baykasoglu-web   # Restart
pm2 stop baykasoglu-web      # Stop
pm2 logs baykasoglu-web      # View logs
pm2 monit                    # Monitor
```

### Services
```bash
sudo systemctl restart nginx        # Restart Nginx
sudo systemctl restart postgresql   # Restart PostgreSQL
```

### Backups
```bash
/var/www/baykasoglu/scripts/backup-db.sh      # Backup database
/var/www/baykasoglu/scripts/backup-files.sh   # Backup files
```

### Monitoring
```bash
pm2 monit                    # PM2 dashboard
df -h                        # Disk space
free -h                      # Memory usage
top                          # CPU and processes
```

### Logs
```bash
pm2 logs baykasoglu-web                          # App logs
sudo tail -f /var/log/nginx/error.log            # Nginx errors
sudo tail -f /var/log/postgresql/postgresql-*    # PostgreSQL logs
```

## Documentation Guide

### For First-Time Setup

1. **Start:** Read [SELFHOSTED_SUMMARY.md](./SELFHOSTED_SUMMARY.md)
   - Understand the architecture
   - Compare costs
   - Review requirements

2. **Deploy:** Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
   - Step-by-step instructions
   - Every command explained
   - Troubleshooting included

3. **Reference:** Keep [SELFHOSTED_QUICKREF.md](./SELFHOSTED_QUICKREF.md)
   - Common commands
   - Quick fixes
   - Essential info

### For Daily Operations

1. **Quick Commands:** [SELFHOSTED_QUICKREF.md](./SELFHOSTED_QUICKREF.md)
2. **Troubleshooting:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#troubleshooting-common-issues)
3. **Updates:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#13-update-procedures)

### For Deep Understanding

1. **Architecture:** [SELF_HOSTED_ARCHITECTURE.md](./SELF_HOSTED_ARCHITECTURE.md)
2. **Database Schema:** [SELF_HOSTED_ARCHITECTURE.md](./SELF_HOSTED_ARCHITECTURE.md#database-architecture)
3. **Security:** [SELF_HOSTED_ARCHITECTURE.md](./SELF_HOSTED_ARCHITECTURE.md#security-considerations)

## Project Structure

```
/var/www/baykasoglu/
├── app/                          # Next.js pages
│   ├── admin/                   # Admin panel
│   ├── urunler/                 # Products
│   └── api/                     # API routes
├── components/                   # React components
├── lib/                          # Utilities
│   ├── prisma.ts                # Database client
│   ├── auth/                    # Authentication
│   ├── email/                   # Email system
│   └── uploads/                 # Upload handlers
├── prisma/
│   └── schema.prisma            # Database schema
├── scripts/
│   ├── create-admin.ts          # Create admin
│   ├── backup-db.sh             # DB backup
│   └── backup-files.sh          # File backup
├── uploads/                      # User uploads
├── backups/                      # Automated backups
├── .env.local                    # Environment vars
├── ecosystem.config.js           # PM2 config
└── package.json
```

## Environment Variables

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@localhost:5432/baykasoglu
NEXTAUTH_URL=https://baykasoglu.com
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=info@baykasoglu.com
ADMIN_EMAIL=admin@baykasoglu.com
NEXT_PUBLIC_APP_URL=https://baykasoglu.com
```

## Security Checklist

After deployment, verify:

- [ ] SSL certificate installed and auto-renewing
- [ ] Firewall configured (UFW)
- [ ] SSH key authentication only
- [ ] Root login disabled
- [ ] PostgreSQL only accepts local connections
- [ ] Strong database password set
- [ ] .env.local has 600 permissions
- [ ] File permissions correct (755 for app, 775 for uploads)
- [ ] Security headers in Nginx
- [ ] Rate limiting enabled
- [ ] Automated backups running
- [ ] Log rotation configured
- [ ] Admin password changed from default

## Troubleshooting

### Common Issues

1. **App won't start:** Check `pm2 logs baykasoglu-web`
2. **502 Bad Gateway:** Check if app is running with `pm2 status`
3. **Database error:** Verify PostgreSQL is running
4. **Email not sending:** Test SMTP credentials
5. **Upload fails:** Check file permissions

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#troubleshooting-common-issues) for detailed solutions.

## Support Resources

### Official Documentation
- **Next.js:** https://nextjs.org/docs
- **Prisma:** https://www.prisma.io/docs
- **PostgreSQL:** https://www.postgresql.org/docs
- **Nginx:** https://nginx.org/en/docs
- **PM2:** https://pm2.keymetrics.io/docs
- **NextAuth.js:** https://authjs.dev

### Community
- Next.js Discord
- Prisma Community Slack
- PostgreSQL Mailing Lists
- Stack Overflow
- DigitalOcean Community Tutorials

## Key Benefits

### Complete Independence
- Your data, your server, your rules
- No vendor lock-in
- Can migrate anytime
- No sudden price increases

### Cost Efficiency
- Save ~$50/month vs SaaS
- Predictable costs
- No per-user pricing
- No bandwidth overage fees

### Privacy & Security
- Data never leaves your server
- GDPR compliant by design
- Full control over access
- Complete audit trail

### Flexibility
- Customize anything
- Add any features
- No API limitations
- Direct database access

### Scalability
- Upgrade server anytime
- Add resources as needed
- Horizontal scaling possible
- Database replication ready

## What's Next?

### Right Now (5 minutes)
1. Read [SELFHOSTED_SUMMARY.md](./SELFHOSTED_SUMMARY.md)
2. Choose a VPS provider
3. Register server

### Today (6-7 hours)
1. Open [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Follow each section step-by-step
3. Complete verification checklist
4. Test website

### This Week
1. Login to admin panel
2. Change admin password
3. Add product categories
4. Upload products
5. Test contact forms
6. Verify backups

### Ongoing
1. Monitor logs weekly
2. Check backups weekly
3. Update packages monthly
4. Review security quarterly

## Success Criteria

Your deployment is successful when:

- [ ] Website loads at https://baykasoglu.com
- [ ] SSL certificate shows as valid
- [ ] Admin panel accessible
- [ ] Can login with admin credentials
- [ ] Database queries work
- [ ] Email sending works
- [ ] File uploads work
- [ ] Backups running automatically
- [ ] All services start on reboot

## Need Help?

1. **Check the docs:**
   - [SELFHOSTED_QUICKREF.md](./SELFHOSTED_QUICKREF.md) for quick fixes
   - [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for troubleshooting

2. **Review logs:**
   ```bash
   pm2 logs baykasoglu-web
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Search community:**
   - Stack Overflow
   - Next.js Discord
   - DigitalOcean Community

## Contact & Contributions

- **Project:** Baykasoglu Corporate Website
- **Stack:** Next.js 16 + PostgreSQL 15 + TypeScript
- **Deployment:** Self-hosted on Ubuntu 22.04

## License

This is a private corporate website. All rights reserved.

---

## Ready to Start?

**Open [SELFHOSTED_SUMMARY.md](./SELFHOSTED_SUMMARY.md) to begin.**

Then follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step deployment.

Good luck with your self-hosted deployment!
