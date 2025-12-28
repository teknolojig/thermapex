# Self-Hosted Quick Reference Card

## Documents Created

1. **SELFHOSTED_SUMMARY.md** (16 KB) - Start here
2. **SELF_HOSTED_ARCHITECTURE.md** (36 KB) - Architecture details
3. **START_HERE_SELFHOSTED.md** (22 KB) - Quick start guide
4. **DEPLOYMENT_GUIDE.md** (39 KB) - Complete deployment steps

## Technology Stack

```
Ubuntu 22.04 → Nginx → PM2 → Next.js 16 → PostgreSQL 15
                ↓
         Let's Encrypt SSL
```

## Cost Summary

| Setup | Monthly | Annual |
|-------|---------|--------|
| Self-Hosted | $12 | ~$159 |
| SaaS (Supabase+Vercel+Resend) | $65 | ~$795 |
| **Savings** | **$53** | **$636** |

## Server Requirements (Small Site)

- **CPU:** 1-2 vCPU
- **RAM:** 2 GB
- **Storage:** 20 GB SSD
- **Cost:** $12/month (~400 TRY)

## Quick Setup Timeline

1. Server Setup: 1 hour
2. Software Install: 1 hour
3. Database Config: 30 min
4. App Deploy: 1 hour
5. Nginx + SSL: 1 hour
6. Email Setup: 30 min
7. Backups + Security: 1 hour

**Total: 6-7 hours**

## Essential Commands

### Start/Stop
```bash
pm2 start baykasoglu-web
pm2 restart baykasoglu-web
pm2 logs baykasoglu-web
```

### Monitor
```bash
pm2 monit
df -h
free -h
```

### Backup
```bash
/var/www/baykasoglu/scripts/backup-db.sh
/var/www/baykasoglu/scripts/backup-files.sh
```

### Update
```bash
cd /var/www/baykasoglu
git pull
npm install
npm run build
pm2 restart baykasoglu-web
```

### Logs
```bash
pm2 logs baykasoglu-web
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

### Services
```bash
sudo systemctl restart nginx
sudo systemctl restart postgresql
pm2 restart all
```

## Database Structure

- **categories** - Product categories
- **products** - Product catalog
- **contact_submissions** - Contact + quote requests
- **pages** - Static pages
- **news** - Blog posts
- **certificates** - Quality certificates
- **site_settings** - Configuration
- **newsletter_subscribers** - Email list
- **admin_users** - Admin accounts
- **sessions** - NextAuth sessions

## File Structure

```
/var/www/baykasoglu/
├── app/                    # Next.js app
├── components/             # React components
├── lib/                    # Utilities
├── prisma/                 # Database schema
├── scripts/                # Backup scripts
├── uploads/                # User uploads
├── backups/                # Automated backups
├── .env.local              # Environment vars
└── ecosystem.config.js     # PM2 config
```

## Environment Variables

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@localhost:5432/baykasoglu
NEXTAUTH_URL=https://baykasoglu.com
NEXTAUTH_SECRET=generate_with_openssl
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=info@baykasoglu.com
ADMIN_EMAIL=admin@baykasoglu.com
NEXT_PUBLIC_APP_URL=https://baykasoglu.com
```

## Common Issues

### App Won't Start
```bash
pm2 logs baykasoglu-web --lines 100
```

### 502 Bad Gateway
```bash
pm2 status
pm2 restart baykasoglu-web
sudo systemctl restart nginx
```

### Database Error
```bash
sudo systemctl status postgresql
psql -U baykasoglu_user -d baykasoglu -h localhost
```

### Email Not Working
```bash
npx tsx scripts/test-email.ts
```

### Upload Fails
```bash
sudo chown -R deploy:deploy /var/www/baykasoglu/uploads
sudo chmod -R 775 /var/www/baykasoglu/uploads
```

## Security Checklist

- [ ] SSL certificate installed
- [ ] Firewall configured (UFW)
- [ ] SSH key auth only
- [ ] Root login disabled
- [ ] PostgreSQL local-only
- [ ] Strong passwords
- [ ] File permissions correct
- [ ] Backups automated

## VPS Providers

1. **Hetzner** - €4.51/month (Best value)
2. **DigitalOcean** - $12/month (Most popular)
3. **Vultr** - $12/month
4. **Linode** - $12/month

## Support Resources

- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- PostgreSQL: https://www.postgresql.org/docs
- Nginx: https://nginx.org/en/docs
- PM2: https://pm2.keymetrics.io/docs

## Next Steps

1. Read **SELFHOSTED_SUMMARY.md**
2. Get VPS server (Hetzner recommended)
3. Follow **DEPLOYMENT_GUIDE.md** step-by-step
4. Complete verification checklist
5. Login to admin panel
6. Add content and test

## URLs

- Website: https://baykasoglu.com
- Admin: https://baykasoglu.com/admin/login
- API: https://baykasoglu.com/api

## Maintenance Schedule

- **Daily:** Check logs (5 min)
- **Weekly:** Verify backups (10 min)
- **Monthly:** Update packages (30 min)
- **Quarterly:** Security audit (1 hour)

## Backup Locations

- Database: `/var/www/baykasoglu/backups/database/`
- Files: `/var/www/baykasoglu/backups/files/`
- Retention: 30 days
- Schedule: Daily at 2 AM (DB), 3 AM (Files)

## Key Features

- Product catalog (no e-commerce)
- Contact forms with email
- Quote request system
- Simple admin panel
- Content management
- News/blog
- Newsletter subscription
- File uploads (images + PDFs)
- SEO optimization

## What You Get

- Complete data ownership
- No vendor lock-in
- ~$50/month savings
- Full control
- Privacy & security
- Scalability
- Professional setup

---

**Total Investment:** 6-7 hours setup + $12/month
**Total Savings:** ~$636/year vs SaaS
**Complete Independence:** ✓

For detailed instructions, open **DEPLOYMENT_GUIDE.md**
