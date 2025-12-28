# Self-Hosted Architecture - Baykasoglu Web

## Overview

This document outlines a **100% self-hosted architecture** for the Baykasoglu corporate website. Every component runs on your own infrastructure with zero dependency on external SaaS platforms.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet (HTTPS)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Let's Encrypt  │
                    │   SSL Certs     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │     Nginx       │
                    │  Reverse Proxy  │
                    │   Port 80/443   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │       PM2       │
                    │  Process Mgr    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Next.js App   │
                    │   Port 3000     │
                    └─────┬─────┬─────┘
                          │     │
              ┌───────────┘     └───────────┐
              │                             │
     ┌────────▼────────┐         ┌─────────▼─────────┐
     │   PostgreSQL    │         │  Local Filesystem │
     │   Port 5432     │         │   /var/www/...    │
     │   Database      │         │   File Storage    │
     └─────────────────┘         └───────────────────┘
              │
     ┌────────▼────────┐
     │   Nodemailer    │
     │   SMTP Client   │
     └────────┬────────┘
              │
     ┌────────▼────────┐
     │  SMTP Server    │
     │  (External or   │
     │   Postfix)      │
     └─────────────────┘
```

## Technology Stack

### Core Infrastructure
| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Server OS** | Ubuntu Server LTS | 22.04 | Base operating system |
| **Web Server** | Nginx | 1.18+ | Reverse proxy, static files, SSL |
| **App Runtime** | Node.js | 20 LTS | Next.js runtime |
| **Process Manager** | PM2 | Latest | Process monitoring, auto-restart |
| **Database** | PostgreSQL | 15+ | Primary data store |
| **ORM** | Prisma | 5.x | Type-safe database client |
| **Email** | Nodemailer | 6.x | Email sending |
| **SSL** | Let's Encrypt | - | Free SSL certificates |

### Application Stack
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | Next.js 16.0.1 | React framework with SSR |
| **UI Library** | React 19 | Component library |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **Authentication** | NextAuth.js v5 | Session management |
| **Validation** | Zod | Schema validation |
| **Image Processing** | Sharp | Image optimization |
| **Forms** | React Hook Form | Form handling |

## Database Architecture

### PostgreSQL Setup

#### Schema Design

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  technical_specs JSONB DEFAULT '{}',
  images JSONB DEFAULT '[]', -- Array of image paths
  pdf_url VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact submissions (contact form + quote requests)
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL, -- 'contact' or 'quote'
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  message TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER,
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'in_progress', 'completed'
  notes TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pages (About, Quality, etc.)
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- News/Blog posts
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt VARCHAR(500),
  content TEXT,
  image_url VARCHAR(255),
  author VARCHAR(100),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  issuer VARCHAR(255),
  issue_date DATE,
  expiry_date DATE,
  certificate_url VARCHAR(255),
  image_url VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Site settings
CREATE TABLE site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  type VARCHAR(50) DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Admin users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin', -- 'admin', 'editor', 'viewer'
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Session store for NextAuth
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX idx_news_published ON news(is_published, published_at DESC);
CREATE INDEX idx_sessions_token ON sessions(session_token);
CREATE INDEX idx_sessions_expires ON sessions(expires);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Category {
  id            String    @id @default(uuid()) @db.Uuid
  name          String    @db.VarChar(100)
  slug          String    @unique @db.VarChar(100)
  description   String?   @db.Text
  imageUrl      String?   @map("image_url") @db.VarChar(255)
  displayOrder  Int       @default(0) @map("display_order")
  isActive      Boolean   @default(true) @map("is_active")
  createdAt     DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt     DateTime  @default(now()) @updatedAt @map("updated_at") @db.Timestamptz(6)

  products      Product[]

  @@map("categories")
}

model Product {
  id                String    @id @default(uuid()) @db.Uuid
  categoryId        String?   @map("category_id") @db.Uuid
  name              String    @db.VarChar(255)
  slug              String    @unique @db.VarChar(255)
  description       String?   @db.Text
  shortDescription  String?   @map("short_description") @db.VarChar(500)
  technicalSpecs    Json      @default("{}") @map("technical_specs") @db.JsonB
  images            Json      @default("[]") @db.JsonB
  pdfUrl            String?   @map("pdf_url") @db.VarChar(255)
  featured          Boolean   @default(false)
  isActive          Boolean   @default(true) @map("is_active")
  metaTitle         String?   @map("meta_title") @db.VarChar(60)
  metaDescription   String?   @map("meta_description") @db.VarChar(160)
  displayOrder      Int       @default(0) @map("display_order")
  createdAt         DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt         DateTime  @default(now()) @updatedAt @map("updated_at") @db.Timestamptz(6)

  category          Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  contactSubmissions ContactSubmission[]

  @@index([categoryId])
  @@index([slug])
  @@index([featured])
  @@map("products")
}

model ContactSubmission {
  id          String    @id @default(uuid()) @db.Uuid
  type        String    @db.VarChar(50)
  fullName    String    @map("full_name") @db.VarChar(255)
  email       String    @db.VarChar(255)
  phone       String?   @db.VarChar(50)
  company     String?   @db.VarChar(255)
  message     String    @db.Text
  productId   String?   @map("product_id") @db.Uuid
  quantity    Int?
  status      String    @default("new") @db.VarChar(50)
  notes       String?   @db.Text
  ipAddress   String?   @map("ip_address") @db.Inet
  userAgent   String?   @map("user_agent") @db.Text
  createdAt   DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt   DateTime  @default(now()) @updatedAt @map("updated_at") @db.Timestamptz(6)

  product     Product?  @relation(fields: [productId], references: [id], onDelete: SetNull)

  @@index([status])
  @@index([createdAt(sort: Desc)])
  @@map("contact_submissions")
}

model Page {
  id              String    @id @default(uuid()) @db.Uuid
  slug            String    @unique @db.VarChar(255)
  title           String    @db.VarChar(255)
  content         String?   @db.Text
  metaTitle       String?   @map("meta_title") @db.VarChar(60)
  metaDescription String?   @map("meta_description") @db.VarChar(160)
  isPublished     Boolean   @default(true) @map("is_published")
  createdAt       DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt       DateTime  @default(now()) @updatedAt @map("updated_at") @db.Timestamptz(6)

  @@map("pages")
}

model News {
  id          String    @id @default(uuid()) @db.Uuid
  title       String    @db.VarChar(255)
  slug        String    @unique @db.VarChar(255)
  excerpt     String?   @db.VarChar(500)
  content     String?   @db.Text
  imageUrl    String?   @map("image_url") @db.VarChar(255)
  author      String?   @db.VarChar(100)
  isPublished Boolean   @default(false) @map("is_published")
  publishedAt DateTime? @map("published_at") @db.Timestamptz(6)
  createdAt   DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt   DateTime  @default(now()) @updatedAt @map("updated_at") @db.Timestamptz(6)

  @@index([isPublished, publishedAt(sort: Desc)])
  @@map("news")
}

model Certificate {
  id            String    @id @default(uuid()) @db.Uuid
  name          String    @db.VarChar(255)
  issuer        String?   @db.VarChar(255)
  issueDate     DateTime? @map("issue_date") @db.Date
  expiryDate    DateTime? @map("expiry_date") @db.Date
  certificateUrl String?  @map("certificate_url") @db.VarChar(255)
  imageUrl      String?   @map("image_url") @db.VarChar(255)
  displayOrder  Int       @default(0) @map("display_order")
  isActive      Boolean   @default(true) @map("is_active")
  createdAt     DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)

  @@map("certificates")
}

model SiteSetting {
  key         String    @id @db.VarChar(100)
  value       String?   @db.Text
  type        String    @default("string") @db.VarChar(50)
  description String?   @db.Text
  updatedAt   DateTime  @default(now()) @updatedAt @map("updated_at") @db.Timestamptz(6)

  @@map("site_settings")
}

model NewsletterSubscriber {
  id             String    @id @default(uuid()) @db.Uuid
  email          String    @unique @db.VarChar(255)
  isActive       Boolean   @default(true) @map("is_active")
  subscribedAt   DateTime  @default(now()) @map("subscribed_at") @db.Timestamptz(6)
  unsubscribedAt DateTime? @map("unsubscribed_at") @db.Timestamptz(6)

  @@map("newsletter_subscribers")
}

model AdminUser {
  id           String    @id @default(uuid()) @db.Uuid
  email        String    @unique @db.VarChar(255)
  passwordHash String    @map("password_hash") @db.VarChar(255)
  fullName     String?   @map("full_name") @db.VarChar(255)
  role         String    @default("admin") @db.VarChar(50)
  isActive     Boolean   @default(true) @map("is_active")
  lastLogin    DateTime? @map("last_login") @db.Timestamptz(6)
  createdAt    DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt    DateTime  @default(now()) @updatedAt @map("updated_at") @db.Timestamptz(6)

  sessions     Session[]

  @@map("admin_users")
}

model Session {
  id           String   @id @default(uuid()) @db.Uuid
  userId       String   @map("user_id") @db.Uuid
  sessionToken String   @unique @map("session_token") @db.VarChar(255)
  expires      DateTime @db.Timestamptz(6)
  createdAt    DateTime @default(now()) @map("created_at") @db.Timestamptz(6)

  user         AdminUser @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([sessionToken])
  @@index([expires])
  @@map("sessions")
}
```

## Email System

### Option 1: External SMTP (Recommended for Small Sites)

Use your existing email provider (Gmail, Office365, or hosting provider's SMTP).

**Configuration:**
```typescript
// lib/email/client.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'info@baykasoglu.com',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML if no text provided
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}
```

**Environment Variables:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=info@baykasoglu.com
```

### Option 2: Postfix (Self-Hosted Mail Server)

For complete independence, install Postfix on the same server.

**Installation (Ubuntu):**
```bash
sudo apt-get update
sudo apt-get install postfix mailutils

# Choose "Internet Site" during installation
# Set system mail name to your domain (e.g., baykasoglu.com)
```

**Configuration:**
```typescript
// lib/email/client.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: 'info@baykasoglu.com',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}
```

**SPF/DKIM Setup:**
To avoid spam folders, configure DNS records:

```dns
; SPF Record
@ TXT "v=spf1 ip4:YOUR_SERVER_IP ~all"

; DKIM (after generating keys with opendkim)
default._domainkey TXT "v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY"

; DMARC
_dmarc TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@baykasoglu.com"
```

## File Storage System

### Local Filesystem Structure

```
/var/www/baykasoglu/
├── uploads/
│   ├── products/
│   │   ├── original/      # Original uploads
│   │   ├── large/         # 1200x1200
│   │   ├── medium/        # 600x600
│   │   └── thumb/         # 200x200
│   ├── categories/
│   ├── news/
│   ├── certificates/
│   └── pdfs/
└── backups/
    ├── database/
    └── files/
```

### File Upload Handler

```typescript
// lib/uploads/handler.ts
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = '/var/www/baykasoglu/uploads';

export async function uploadImage(
  file: File,
  type: 'products' | 'categories' | 'news' | 'certificates'
): Promise<{ success: boolean; urls?: any; error?: string }> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File must be an image' };
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: 'File size must be under 10MB' };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${randomUUID()}.webp`;

    // Create directories if they don't exist
    const baseDir = join(UPLOAD_DIR, type);
    await mkdir(join(baseDir, 'original'), { recursive: true });
    await mkdir(join(baseDir, 'large'), { recursive: true });
    await mkdir(join(baseDir, 'medium'), { recursive: true });
    await mkdir(join(baseDir, 'thumb'), { recursive: true });

    // Save original
    const originalPath = join(baseDir, 'original', filename);
    await writeFile(originalPath, buffer);

    // Create optimized versions
    await sharp(buffer)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(join(baseDir, 'large', filename));

    await sharp(buffer)
      .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(baseDir, 'medium', filename));

    await sharp(buffer)
      .resize(200, 200, { fit: 'cover' })
      .webp({ quality: 75 })
      .toFile(join(baseDir, 'thumb', filename));

    return {
      success: true,
      urls: {
        original: `/uploads/${type}/original/${filename}`,
        large: `/uploads/${type}/large/${filename}`,
        medium: `/uploads/${type}/medium/${filename}`,
        thumb: `/uploads/${type}/thumb/${filename}`,
      },
    };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'Upload failed' };
  }
}

export async function uploadPDF(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (file.type !== 'application/pdf') {
      return { success: false, error: 'File must be a PDF' };
    }

    if (file.size > 20 * 1024 * 1024) {
      return { success: false, error: 'PDF size must be under 20MB' };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${randomUUID()}.pdf`;
    const pdfDir = join(UPLOAD_DIR, 'pdfs');

    await mkdir(pdfDir, { recursive: true });
    await writeFile(join(pdfDir, filename), buffer);

    return {
      success: true,
      url: `/uploads/pdfs/${filename}`,
    };
  } catch (error) {
    console.error('PDF upload error:', error);
    return { success: false, error: 'PDF upload failed' };
  }
}
```

### Nginx Static File Serving

```nginx
# Serve uploads directory
location /uploads/ {
    alias /var/www/baykasoglu/uploads/;
    expires 1y;
    add_header Cache-Control "public, immutable";

    # Security: Prevent PHP execution
    location ~ \.php$ {
        deny all;
    }
}
```

## Authentication System

### NextAuth.js v5 Configuration

```typescript
// lib/auth/config.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.isActive) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) {
          return null;
        }

        // Update last login
        await prisma.adminUser.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
});
```

### Password Hashing Utility

```typescript
// lib/auth/password.ts
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
```

### Creating First Admin User

```typescript
// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth/password';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@baykasoglu.com';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const fullName = process.env.ADMIN_NAME || 'Administrator';

  const passwordHash = await hashPassword(password);

  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      fullName,
      role: 'admin',
      isActive: true,
    },
  });

  console.log('Admin user created:', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

## Backup Strategy

### Automated Database Backups

```bash
#!/bin/bash
# /var/www/baykasoglu/scripts/backup-db.sh

# Configuration
DB_NAME="baykasoglu"
DB_USER="baykasoglu_user"
BACKUP_DIR="/var/www/baykasoglu/backups/database"
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Generate filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql.gz"

# Create backup
pg_dump -U $DB_USER -h localhost $DB_NAME | gzip > $BACKUP_FILE

# Remove old backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: $BACKUP_FILE"
```

### Automated File Backups

```bash
#!/bin/bash
# /var/www/baykasoglu/scripts/backup-files.sh

# Configuration
SOURCE_DIR="/var/www/baykasoglu/uploads"
BACKUP_DIR="/var/www/baykasoglu/backups/files"
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Generate filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/files_$TIMESTAMP.tar.gz"

# Create compressed archive
tar -czf $BACKUP_FILE -C /var/www/baykasoglu uploads/

# Remove old backups
find $BACKUP_DIR -name "files_*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo "Files backup completed: $BACKUP_FILE"
```

### Cron Schedule

```cron
# Database backup every day at 2 AM
0 2 * * * /var/www/baykasoglu/scripts/backup-db.sh >> /var/log/baykasoglu/backup-db.log 2>&1

# File backup every day at 3 AM
0 3 * * * /var/www/baykasoglu/scripts/backup-files.sh >> /var/log/baykasoglu/backup-files.log 2>&1

# PM2 save every 6 hours
0 */6 * * * pm2 save
```

## Security Considerations

### 1. File Permissions

```bash
# Application files
sudo chown -R www-data:www-data /var/www/baykasoglu
sudo chmod -R 755 /var/www/baykasoglu

# Uploads directory (writable)
sudo chmod -R 775 /var/www/baykasoglu/uploads
sudo chown -R www-data:www-data /var/www/baykasoglu/uploads

# Environment file (sensitive)
sudo chmod 600 /var/www/baykasoglu/.env.local
sudo chown www-data:www-data /var/www/baykasoglu/.env.local
```

### 2. PostgreSQL Security

```sql
-- Create dedicated database user
CREATE USER baykasoglu_user WITH PASSWORD 'strong_password_here';

-- Create database
CREATE DATABASE baykasoglu OWNER baykasoglu_user;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE baykasoglu TO baykasoglu_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO baykasoglu_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO baykasoglu_user;

-- Revoke public access
REVOKE ALL ON DATABASE baykasoglu FROM PUBLIC;
```

**PostgreSQL Configuration (pg_hba.conf):**
```
# Only allow local connections
local   baykasoglu      baykasoglu_user                 scram-sha-256
host    baykasoglu      baykasoglu_user  127.0.0.1/32   scram-sha-256
```

### 3. Nginx Security Headers

```nginx
# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;

# Hide nginx version
server_tokens off;

# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req zone=api burst=20 nodelay;
```

### 4. Environment Variables Security

```env
# .env.local (NEVER commit to git)
NODE_ENV=production

# Database
DATABASE_URL=postgresql://baykasoglu_user:STRONG_PASSWORD@localhost:5432/baykasoglu

# NextAuth
NEXTAUTH_URL=https://baykasoglu.com
NEXTAUTH_SECRET=GENERATE_WITH_openssl_rand_base64_32

# Email (Option 1: External SMTP)
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

### 5. Firewall Configuration

```bash
# UFW (Uncomplicated Firewall)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Server Requirements

### Small Site (<1,000 visitors/day)

**Minimum Specs:**
- CPU: 1-2 vCPU
- RAM: 2 GB
- Storage: 20 GB SSD
- Bandwidth: 1 TB/month

**Recommended VPS Providers:**
- DigitalOcean: $12/month (Basic Droplet)
- Vultr: $12/month (Cloud Compute)
- Linode: $12/month (Nanode)
- Hetzner: €4.51/month (CX21)

**Expected Performance:**
- Database: ~50 MB (1000 products)
- Files: ~2-5 GB (product images)
- Concurrent users: 50-100

### Medium Site (1,000-10,000 visitors/day)

**Recommended Specs:**
- CPU: 2-4 vCPU
- RAM: 4 GB
- Storage: 50 GB SSD
- Bandwidth: 3 TB/month

**Recommended VPS Providers:**
- DigitalOcean: $24/month (Premium AMD)
- Vultr: $24/month (High Performance)
- Linode: $24/month (Dedicated CPU)
- Hetzner: €9.02/month (CX31)

**Expected Performance:**
- Database: ~200 MB
- Files: ~10-20 GB
- Concurrent users: 200-500

### Large Site (10,000+ visitors/day)

**Recommended Specs:**
- CPU: 4-8 vCPU
- RAM: 8-16 GB
- Storage: 100 GB SSD
- Bandwidth: 5 TB/month

**Recommended VPS Providers:**
- DigitalOcean: $48-96/month
- Vultr: $48-96/month
- Linode: $48-96/month
- Hetzner: €18.03-36.05/month

**Expected Performance:**
- Database: ~500 MB - 1 GB
- Files: ~50-100 GB
- Concurrent users: 500-2000

**Consider:**
- CDN for static assets (Cloudflare Free Tier)
- Database connection pooling
- Redis caching layer
- Load balancer (if scaling horizontally)

## Monitoring and Logs

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Show logs
pm2 logs

# Show specific app logs
pm2 logs baykasoglu-web

# Flush logs
pm2 flush
```

### Log Rotation

```bash
# /etc/logrotate.d/baykasoglu
/var/log/baykasoglu/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

### PostgreSQL Logs

```bash
# View PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

## Performance Optimization

### 1. Database Query Optimization

```typescript
// Use select to fetch only needed fields
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    slug: true,
    images: true,
    category: {
      select: {
        name: true,
        slug: true,
      },
    },
  },
  where: { isActive: true },
  orderBy: { displayOrder: 'asc' },
});

// Use take and skip for pagination
const products = await prisma.product.findMany({
  take: 20,
  skip: (page - 1) * 20,
});
```

### 2. Database Connection Pooling

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 3. Image Optimization

Already handled by Sharp during upload. Serve WebP format for modern browsers.

### 4. Next.js Caching

```typescript
// app/urunler/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
  const products = await getProducts();
  // ...
}
```

### 5. PostgreSQL Configuration

```conf
# /etc/postgresql/15/main/postgresql.conf

# Memory settings (for 4GB RAM server)
shared_buffers = 1GB
effective_cache_size = 3GB
maintenance_work_mem = 256MB
work_mem = 16MB

# Connection settings
max_connections = 100

# Query planner
random_page_cost = 1.1
effective_io_concurrency = 200

# Logging
log_min_duration_statement = 1000  # Log slow queries (>1s)
```

## Disaster Recovery

### Restore from Backup

**Database Restore:**
```bash
# Stop the application
pm2 stop baykasoglu-web

# Drop and recreate database
psql -U postgres -c "DROP DATABASE baykasoglu;"
psql -U postgres -c "CREATE DATABASE baykasoglu OWNER baykasoglu_user;"

# Restore from backup
gunzip -c /var/www/baykasoglu/backups/database/backup_TIMESTAMP.sql.gz | \
  psql -U baykasoglu_user -d baykasoglu

# Restart application
pm2 start baykasoglu-web
```

**File Restore:**
```bash
# Stop the application
pm2 stop baykasoglu-web

# Remove current uploads
rm -rf /var/www/baykasoglu/uploads

# Restore from backup
tar -xzf /var/www/baykasoglu/backups/files/files_TIMESTAMP.tar.gz -C /var/www/baykasoglu

# Fix permissions
sudo chown -R www-data:www-data /var/www/baykasoglu/uploads
sudo chmod -R 775 /var/www/baykasoglu/uploads

# Restart application
pm2 start baykasoglu-web
```

## Cost Summary

### One-Time Costs
| Item | Cost (USD) | Cost (TRY) |
|------|-----------|-----------|
| Domain (.com.tr) | $15/year | ~500 TRY/year |
| SSL Certificate | $0 (Let's Encrypt) | 0 TRY |
| Initial Setup | - | - |

### Monthly Costs (Small Site)
| Item | Cost (USD) | Cost (TRY) |
|------|-----------|-----------|
| VPS Server | $12/month | ~400 TRY/month |
| Database | $0 (included) | 0 TRY |
| Email | $0 (SMTP) | 0 TRY |
| Storage | $0 (included) | 0 TRY |
| Backups | $0 (local) | 0 TRY |
| **Total** | **$12/month** | **~400 TRY/month** |

### Annual Cost
- **Small Site:** ~5,000 TRY/year (server + domain)
- **Medium Site:** ~10,000 TRY/year
- **Large Site:** ~20,000 TRY/year

### Comparison with SaaS

**SaaS Stack (Supabase + Resend + Vercel):**
- Free tier: 0 TRY/month (limited)
- Paid tier: $65-100/month (~2,200-3,400 TRY/month)

**Self-Hosted:**
- Small: $12/month (~400 TRY/month)
- **Savings: ~2,000 TRY/month** (24,000 TRY/year)

## Conclusion

This self-hosted architecture provides:

1. **Complete Independence:** No reliance on external SaaS platforms
2. **Cost Efficiency:** ~400 TRY/month vs ~2,200 TRY/month for SaaS
3. **Full Control:** Own your data, infrastructure, and scaling
4. **Privacy:** All data stays on your server
5. **Scalability:** Easy to upgrade server resources as needed
6. **Portability:** Can migrate to any server anytime

**Next Steps:**
1. Review this architecture document
2. Follow START_HERE_SELFHOSTED.md for setup instructions
3. Follow DEPLOYMENT_GUIDE.md for server deployment
