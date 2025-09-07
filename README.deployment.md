# Thermapex Deployment Guide for Coolify

## Deployment Options

### Option 1: Docker Deployment (Recommended)

Coolify will automatically detect and use the Dockerfile.

#### Required Environment Variables in Coolify:
```env
DATABASE_URL=file:/app/prisma/prod.db
NEXTAUTH_SECRET=your-secure-secret-min-32-chars
NEXTAUTH_URL=https://your-domain.com
JWT_SECRET=your-jwt-secret-min-32-chars
NODE_ENV=production
```

#### Persistent Volumes:
Add these volumes in Coolify:
- `/app/prisma` - For SQLite database persistence
- `/app/public/uploads` - For uploaded files (if needed)

### Option 2: Nixpacks Deployment

Coolify will automatically detect and use nixpacks.toml.

#### Database Migration:
Nixpacks will automatically run migrations during build.

### Option 3: PostgreSQL Setup (Production Recommended)

1. Create a PostgreSQL service in Coolify
2. Update DATABASE_URL:
```env
DATABASE_URL=postgresql://user:password@postgres:5432/thermapex?schema=public
```

3. Update prisma/schema.prisma:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Pre-Deployment Checklist

- [ ] Update environment variables in Coolify
- [ ] Set up persistent volumes
- [ ] Configure domain and SSL
- [ ] Set up database backups
- [ ] Configure health check URL: `/api/health`
- [ ] Set resource limits (min 512MB RAM recommended)

## Post-Deployment

1. Run database seed (if needed):
```bash
npx prisma db seed
```

2. Verify health endpoint:
```bash
curl https://your-domain.com/api/health
```

3. Create admin user:
- Default: admin@thermapex.com / admin123
- Change password immediately after first login

## Monitoring

- Health endpoint: `/api/health`
- Logs: Check Coolify application logs
- Database: Use Prisma Studio for debugging

## Troubleshooting

### Database Issues
- Ensure DATABASE_URL is correctly set
- Check if migrations ran successfully
- Verify database file permissions

### Build Failures
- Check Node.js version (requires v20+)
- Verify all dependencies are installed
- Check Prisma generation succeeded

### Runtime Issues
- Verify all environment variables are set
- Check application logs in Coolify
- Ensure port 3000 is exposed

## Performance Optimization

- Enable Coolify's auto-scaling if available
- Use CDN for static assets
- Enable gzip compression (already configured)
- Consider Redis for session storage in production