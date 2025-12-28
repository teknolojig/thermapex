# Baykasoğlu Web Sitesi

Baykasoğlu bakır boru tedarikçisi kurumsal web sitesi.

## Teknolojiler

- **Framework**: Next.js 16.0.1 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth v5 (beta)
- **Email**: Nodemailer (Yandex SMTP)
- **Animation**: Framer Motion
- **Deployment**: PM2 + Nginx + Let's Encrypt SSL

## Geliştirme Ortamı

### Gereksinimler
- Node.js 18+
- PostgreSQL 14+
- npm veya yarn

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur
cp .env.example .env

# Database'i oluştur
npx prisma db push

# Development sunucusunu başlat
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/baykasoglu?schema=public"
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

SMTP_HOST=smtp.yandex.com.tr
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@baykasoglu.com
SMTP_PASSWORD=your-password
SMTP_FROM_NAME=Baykasoğlu
SMTP_FROM_EMAIL=noreply@baykasoglu.com
ADMIN_EMAIL=info@baykasoglu.com
```

## Production Deployment

### Server Bilgileri

**Sunucu**: 91.98.75.17
**SSH**: `ssh -p 2299 root@91.98.75.17` (şifre: Vm8KpL3xNqR7wT2sYc5HjF9)
**Domain**: baykasoglu.com

### Dizin Yapısı

```
/var/www/baykasoglu.com/
├── repo/                    # Git repository
├── logs/                    # PM2 ve Nginx logları
├── ecosystem.config.js      # PM2 konfigürasyonu
└── .env                     # Production environment variables
```

### PM2 Konfigürasyonu

```javascript
// /var/www/baykasoglu.com/ecosystem.config.js
module.exports = {
  apps: [{
    name: 'baykasoglu.com',
    cwd: '/var/www/baykasoglu.com/repo',
    script: 'npm',
    args: 'start',
    instances: 2,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3009
    },
    error_file: '/var/www/baykasoglu.com/logs/error.log',
    out_file: '/var/www/baykasoglu.com/logs/out.log',
    time: true
  }]
}
```

### Database

**PostgreSQL Bilgileri**:
- Database: `baykasoglu`
- User: `baykasoglu_user`
- Password: `BaykasPgSecure2025`
- Host: `localhost:5432`

### Nginx Konfigürasyonu

**Dosya Yolu**: `/etc/nginx/sites-available/baykasoglu.com.conf`
**Proxy Port**: 3009
**SSL**: Let's Encrypt (otomatik yenileme aktif)

### PM2 Komutları

```bash
# Uygulamayı başlat
pm2 start ecosystem.config.js

# Uygulamayı durdur
pm2 stop baykasoglu.com

# Uygulamayı yeniden başlat
pm2 restart baykasoglu.com

# Logları görüntüle
pm2 logs baykasoglu.com

# PM2 durumunu görüntüle
pm2 list

# PM2 kaydet (reboot sonrası otomatik başlat)
pm2 save
```

### Deployment Adımları

```bash
# 1. Sunucuya bağlan
ssh -p 2299 root@91.98.75.17

# 2. Proje dizinine git
cd /var/www/baykasoglu.com/repo

# 3. Son değişiklikleri çek
git pull origin main

# 4. Bağımlılıkları güncelle
npm install

# 5. Database güncellemelerini uygula (varsa)
npx prisma generate
npx prisma db push

# 6. Production build al
npm run build

# 7. PM2'yi yeniden başlat
pm2 restart baykasoglu.com

# 8. Logları kontrol et
pm2 logs baykasoglu.com --lines 50
```

### SSL Sertifikası Yenileme

SSL sertifikaları Let's Encrypt tarafından otomatik olarak yenilenir. Manuel yenileme için:

```bash
certbot renew --nginx
```

### Nginx Komutları

```bash
# Nginx konfigürasyonunu test et
nginx -t

# Nginx'i yeniden yükle
systemctl reload nginx

# Nginx durumunu kontrol et
systemctl status nginx
```

## Admin Panel

**URL**: https://baykasoglu.com/admin
**Email**: info@baykasoglu.com
**Şifre**: Baykas12345**

### Admin Özellikleri
- Dashboard
- E-Bülten Aboneleri Yönetimi
- Kategori Yönetimi
- Ürün Yönetimi (Ekleme, Düzenleme)
- SEO Metadata Yönetimi

## API Endpoints

### Public Endpoints
- `GET /api/categories` - Tüm kategoriler
- `GET /api/categories/[...slug]` - Kategori detayı
- `GET /api/products` - Tüm ürünler
- `GET /api/products/[slug]` - Ürün detayı
- `POST /api/contact` - İletişim formu
- `POST /api/newsletter` - E-bülten aboneliği
- `POST /api/quote-request` - Teklif talebi

### Admin Endpoints (Protected)
- `GET/POST /api/admin/categories` - Kategori yönetimi
- `GET/POST /api/admin/products` - Ürün yönetimi
- `PUT /api/admin/products/[id]` - Ürün güncelleme

## Sorun Giderme

### PM2 Uygulaması Çalışmıyor

```bash
# Logları kontrol et
pm2 logs baykasoglu.com

# Uygulamayı sil ve yeniden başlat
pm2 delete baykasoglu.com
pm2 start /var/www/baykasoglu.com/ecosystem.config.js
pm2 save
```

### Database Bağlantı Sorunu

```bash
# PostgreSQL durumunu kontrol et
systemctl status postgresql

# Database kullanıcısını test et
PGPASSWORD=BaykasPgSecure2025 psql -h localhost -U baykasoglu_user -d baykasoglu -c "SELECT 1;"
```

### Nginx 502 Bad Gateway

```bash
# Port 3009'un çalıştığını kontrol et
curl http://localhost:3009

# PM2'yi kontrol et
pm2 list | grep baykasoglu

# Nginx loglarını kontrol et
tail -f /var/www/baykasoglu.com/logs/nginx-error.log
```

## Lisans

Proprietary - Baykasoğlu © 2025
