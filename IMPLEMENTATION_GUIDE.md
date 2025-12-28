# Implementation Guide - Baykasoglu Corporate Website

This guide provides step-by-step instructions for implementing the corporate website. Follow each section in order.

---

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Supabase Setup](#supabase-setup)
3. [Resend Email Setup](#resend-email-setup)
4. [Database Schema Implementation](#database-schema-implementation)
5. [Server Actions Examples](#server-actions-examples)
6. [Admin Panel Architecture](#admin-panel-architecture)
7. [Deployment Steps](#deployment-steps)
8. [Troubleshooting](#troubleshooting)

---

## Initial Setup

### 1. Install Required Dependencies

```bash
cd /Volumes/HDD/baykasoglu/baykasoglu-web

# Core dependencies
npm install @supabase/supabase-js resend zod

# Email templates
npm install react-email @react-email/components

# UI components (Radix UI)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast sonner

# Form handling
npm install react-hook-form @hookform/resolvers

# Utilities
npm install date-fns slugify

# Dev dependencies
npm install --save-dev @types/react-email
```

### 2. Create Environment File

Create `.env.local` in the project root:

```env
# Supabase (will be filled in after setup)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend (will be filled in after setup)
RESEND_API_KEY=
RESEND_FROM_EMAIL=info@baykasoglu.com

# App configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@baykasoglu.com

# Optional - for production
# NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
# RECAPTCHA_SECRET_KEY=
```

### 3. Create Directory Structure

```bash
mkdir -p lib/{supabase,actions,validations,email/templates,utils,hooks,auth}
mkdir -p components/{admin,products,forms,ui}
mkdir -p app/admin/{products,contacts}
mkdir -p app/urunler/{kategori,\[slug\]}
mkdir -p app/teklif-al
mkdir -p supabase/migrations
mkdir -p scripts
mkdir -p docs
```

---

## Supabase Setup

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name:** baykasoglu-web
   - **Database Password:** (save this securely)
   - **Region:** Europe (West) - Frankfurt (closest to Turkey)
   - **Pricing Plan:** Free
5. Click "Create new project"
6. Wait 2-3 minutes for setup to complete

### Step 2: Get API Keys

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values to your `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### Step 3: Create Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the schema from below
4. Click "Run" or press Cmd+Enter

Create file `/supabase/migrations/001_initial_schema.sql`:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  long_description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,

  -- Product specifications (JSON)
  specifications JSONB DEFAULT '{}'::jsonb,

  -- Features (array of strings)
  features TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Images
  main_image VARCHAR(500),
  gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- Ordering
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  form_type VARCHAR(50) NOT NULL CHECK (form_type IN ('contact', 'quote_request', 'newsletter')),

  -- Contact info
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),

  -- Message details
  subject VARCHAR(255),
  message TEXT,

  -- Quote request specific
  product_ids UUID[] DEFAULT ARRAY[]::UUID[],
  quantity VARCHAR(100),

  -- Status tracking
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  notes TEXT,

  -- Metadata
  ip_address VARCHAR(45),
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pages table
CREATE TABLE pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  page_type VARCHAR(50) DEFAULT 'static',

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Content blocks (flexible JSON structure)
  content_blocks JSONB DEFAULT '[]'::jsonb,

  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News table
CREATE TABLE news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image VARCHAR(500),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates table
CREATE TABLE certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  certificate_image VARCHAR(500),
  certificate_pdf VARCHAR(500),
  issue_date DATE,
  expiry_date DATE,
  issuer VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings table
CREATE TABLE site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  value_type VARCHAR(50) DEFAULT 'string' CHECK (value_type IN ('string', 'number', 'boolean', 'json')),
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  unsubscribe_token UUID DEFAULT uuid_generate_v4() UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX idx_news_published ON news(published, published_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 4: Set Up Row Level Security (RLS)

Create file `/supabase/migrations/002_rls_policies.sql`:

```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (active = true);

CREATE POLICY "Categories are insertable by authenticated users"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Categories are updatable by authenticated users"
  ON categories FOR UPDATE
  TO authenticated
  USING (true);

-- Products policies
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (active = true);

CREATE POLICY "All products viewable by authenticated users"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Products are insertable by authenticated users"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Products are updatable by authenticated users"
  ON products FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Products are deletable by authenticated users"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Contact submissions policies
CREATE POLICY "Contact submissions are insertable by everyone"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Contact submissions are viewable by authenticated users"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Contact submissions are updatable by authenticated users"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true);

-- Pages policies
CREATE POLICY "Published pages are viewable by everyone"
  ON pages FOR SELECT
  USING (published = true);

CREATE POLICY "All pages viewable by authenticated users"
  ON pages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Pages are manageable by authenticated users"
  ON pages FOR ALL
  TO authenticated
  USING (true);

-- News policies
CREATE POLICY "Published news are viewable by everyone"
  ON news FOR SELECT
  USING (published = true);

CREATE POLICY "All news viewable by authenticated users"
  ON news FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "News are manageable by authenticated users"
  ON news FOR ALL
  TO authenticated
  USING (true);

-- Certificates policies
CREATE POLICY "Active certificates are viewable by everyone"
  ON certificates FOR SELECT
  USING (active = true);

CREATE POLICY "Certificates are manageable by authenticated users"
  ON certificates FOR ALL
  TO authenticated
  USING (true);

-- Site settings policies
CREATE POLICY "Site settings are viewable by everyone"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Site settings are manageable by authenticated users"
  ON site_settings FOR ALL
  TO authenticated
  USING (true);

-- Newsletter subscribers policies
CREATE POLICY "Newsletter subscribers can insert themselves"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Newsletter subscribers can update themselves via token"
  ON newsletter_subscribers FOR UPDATE
  USING (true);

CREATE POLICY "Newsletter subscribers viewable by authenticated users"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);
```

Run both SQL files in the Supabase SQL Editor.

### Step 5: Create Storage Buckets

1. Go to **Storage** in Supabase dashboard
2. Click "New bucket"
3. Create bucket: **product-images**
   - Name: `product-images`
   - Public bucket: ✓ (checked)
   - Click "Create bucket"
4. Create bucket: **certificates**
   - Name: `certificates`
   - Public bucket: ✓ (checked)
   - Click "Create bucket"

### Step 6: Set Up Storage Policies

For each bucket, add these policies:

1. Click on the bucket name
2. Go to "Policies" tab
3. Click "New policy" > "Custom policy"

**For product-images bucket:**

```sql
-- Public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images');

-- Authenticated users can update
CREATE POLICY "Authenticated users can update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images');

-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-images');
```

Repeat for `certificates` bucket (replace 'product-images' with 'certificates').

### Step 7: Create Admin User

1. Go to **Authentication** > **Users** in Supabase dashboard
2. Click "Add user" > "Create new user"
3. Fill in:
   - **Email:** admin@baykasoglu.com (or your email)
   - **Password:** (create a strong password)
   - **Auto Confirm User:** ✓ (checked)
4. Click "Create user"
5. Save the credentials securely

### Step 8: Seed Initial Data

Create file `/supabase/seed.sql`:

```sql
-- Insert default site settings
INSERT INTO site_settings (key, value, value_type, description) VALUES
  ('site_name', 'Baykasoglu Metal', 'string', 'Site name'),
  ('contact_email', 'info@baykasoglu.com', 'string', 'Main contact email'),
  ('contact_phone', '0212 875 95 57', 'string', 'Main phone number'),
  ('address', 'Mimar Sinan Mahallesi, Beylikdüzü, İstanbul, Türkiye', 'string', 'Company address'),
  ('working_hours', '{"weekdays": "Pazartesi - Cuma: 08:00 - 18:00", "weekend": "Cumartesi - Pazar: Kapalı"}', 'json', 'Working hours'),
  ('enable_newsletter', 'true', 'boolean', 'Enable newsletter subscription'),
  ('enable_quote_requests', 'true', 'boolean', 'Enable quote request forms');

-- Insert categories
INSERT INTO categories (slug, name, description, icon, display_order) VALUES
  ('lwc-borular', 'LWC Bakır Borular', 'Hafif çeperli bakır borular, enerji tasarrufu için ideal', 'Zap', 1),
  ('kangal-borular', 'Kangal Bakır Borular', 'Esnek ve dayanıklı kangal formunda borular', 'Package', 2),
  ('boy-borular', 'Boy Bakır Borular', 'Standart boy ölçülerinde endüstriyel borular', 'Ruler', 3),
  ('izolasyonlu-borular', 'İzolasyonlu Bakır Borular', 'Önceden yalıtılmış, enerji verimli borular', 'Shield', 4);

-- Insert sample products
INSERT INTO products (
  slug,
  title,
  description,
  long_description,
  category_id,
  featured,
  specifications,
  features
)
SELECT
  'lwc-bakar-boru-15mm',
  'LWC Bakır Boru 15mm',
  'Hafif çeperli bakır borular (LWC), ince cidar yapısı ile ısıtma ve soğutma sistemlerinde ideal çözüm sunar.',
  'LWC (Light Weight Copper) bakır borular, standart bakır borulara göre daha ince cidar kalınlığına sahiptir. Bu özelliği sayesinde malzeme tasarrufu sağlarken, aynı zamanda yüksek performans sunar. Özellikle HVAC sistemlerinde tercih edilen bu borular, kolay işlenebilir yapısı ve hafifliği ile montaj sürecini kolaylaştırır.',
  id,
  true,
  '{"diameter": "15mm", "thickness": "0.7mm", "length": "50m", "pressure": "35 bar", "standard": "EN 1057"}'::jsonb,
  ARRAY['Enerji tasarrufu sağlar', 'Kolay montaj', 'Uzun ömürlü', 'Korozyon direnci', 'Hafif yapı']
FROM categories WHERE slug = 'lwc-borular' LIMIT 1;

INSERT INTO products (
  slug,
  title,
  description,
  long_description,
  category_id,
  specifications,
  features
)
SELECT
  'kangal-bakar-boru-12mm',
  'Kangal Bakır Boru 12mm',
  'Esnek yapısı sayesinde her türlü tesisatta kolayca kullanılabilen, kangal formunda bakır borular.',
  'Kangal formundaki bakır borular, esnek yapıları sayesinde tesisat projelerinde büyük kolaylık sağlar. Tek parça halinde gelen bu borular, ek yerlerini minimize ederek sızıntı riskini azaltır. Çeşitli çap seçenekleri ile farklı projelere uyum sağlar.',
  id,
  '{"diameter": "12mm", "thickness": "1.0mm", "length": "25m", "pressure": "40 bar", "form": "Kangal"}'::jsonb,
  ARRAY['Esneklik ve dayanıklılık', 'Farklı çap seçenekleri', 'Hızlı kurulum', 'Minimum fire', 'Ek yeri azlığı']
FROM categories WHERE slug = 'kangal-borular' LIMIT 1;

INSERT INTO products (
  slug,
  title,
  description,
  long_description,
  category_id,
  specifications,
  features
)
SELECT
  'boy-bakar-boru-22mm',
  'Boy Bakır Boru 22mm',
  'Standart boy ölçülerinde üretilen, endüstriyel ve ticari projelerde tercih edilen bakır borular.',
  'Boy bakır borular, 5 metrelik standart uzunluklarda üretilir ve endüstriyel projelerde sıklıkla kullanılır. Yüksek kaliteli bakırdan üretilen bu borular, çeşitli kalınlık seçenekleri ile farklı basınç gereksinimlerine cevap verir.',
  id,
  '{"diameter": "22mm", "thickness": "1.0mm", "length": "5m", "pressure": "50 bar", "form": "Düz boru"}'::jsonb,
  ARRAY['Standart boyutlar', 'Yüksek kalite', 'Profesyonel kullanım', 'Çeşitli kalınlıklar', 'Dayanıklı']
FROM categories WHERE slug = 'boy-borular' LIMIT 1;

INSERT INTO products (
  slug,
  title,
  description,
  long_description,
  category_id,
  featured,
  specifications,
  features
)
SELECT
  'izolasyonlu-bakar-boru-18mm',
  'İzolasyonlu Bakır Boru 18mm',
  'Önceden yalıtılmış bakır borular, enerji kaybını minimize eder ve montaj süresini kısaltır.',
  'İzolasyonlu bakır borular, fabrika ortamında özel yalıtım malzemesi ile kaplanmış olarak gelir. Bu özellik, hem enerji verimliliği sağlar hem de montaj sürecini hızlandırır. Yoğuşma problemini ortadan kaldırır ve enerji kayıplarını minimuma indirir.',
  id,
  true,
  '{"diameter": "18mm", "thickness": "0.8mm", "insulation": "13mm PE foam", "length": "15m", "temperature": "-40°C to +105°C"}'::jsonb,
  ARRAY['Enerji verimliliği', 'Yalıtım kalitesi', 'Hızlı montaj', 'Yoğuşma önleme', 'Çift kat koruma']
FROM categories WHERE slug = 'izolasyonlu-borular' LIMIT 1;
```

Run this in SQL Editor to populate initial data.

### Step 9: Create Supabase Client Files

Create `/lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Create `/lib/supabase/server.ts`:

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting errors
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    }
  )
}
```

Create `/lib/supabase/service.ts` (for admin operations):

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

---

## Resend Email Setup

### Step 1: Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address
4. Log in to dashboard

### Step 2: Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click "Create API Key"
3. Name: "Baykasoglu Web"
4. Permissions: "Full Access"
5. Click "Create"
6. Copy the API key and add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

### Step 3: Verify Domain (Production)

For production, you need to verify your domain:

1. Go to **Domains** in Resend dashboard
2. Click "Add Domain"
3. Enter: `baykasoglu.com`
4. Follow instructions to add DNS records:
   - Add TXT record for verification
   - Add DKIM, SPF records
5. Wait for verification (can take up to 48 hours)

For development, you can use `onboarding@resend.dev` as sender.

### Step 4: Create Email Client

Create `/lib/email/client.ts`:

```typescript
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@baykasoglu.com'
```

### Step 5: Create Email Templates

Create `/lib/email/templates/contact-confirmation.tsx`:

```typescript
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from '@react-email/components'

interface ContactConfirmationEmailProps {
  name: string
  message: string
}

export default function ContactConfirmationEmail({
  name,
  message,
}: ContactConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Mesajınız Alındı</Heading>

          <Text style={text}>
            Sayın {name},
          </Text>

          <Text style={text}>
            Bizimle iletişime geçtiğiniz için teşekkür ederiz. Mesajınız başarıyla alındı
            ve ekibimiz en kısa sürede size geri dönüş yapacaktır.
          </Text>

          <Section style={messageBox}>
            <Text style={messageLabel}>Gönderdiğiniz Mesaj:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Baykasoglu Metal<br />
            Mimar Sinan Mahallesi, Beylikdüzü, İstanbul<br />
            Tel: 0212 875 95 57<br />
            Email: info@baykasoglu.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
}

const text = {
  color: '#484848',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 40px',
}

const messageBox = {
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  margin: '24px 40px',
  padding: '24px',
}

const messageLabel = {
  color: '#6c757d',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
}

const messageText = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 40px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 40px',
}
```

Create `/lib/email/templates/admin-notification.tsx`:

```typescript
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Button,
} from '@react-email/components'

interface AdminNotificationEmailProps {
  formType: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  submissionId: string
}

export default function AdminNotificationEmail({
  formType,
  name,
  email,
  phone,
  company,
  message,
  submissionId,
}: AdminNotificationEmailProps) {
  const formTypeText = formType === 'quote_request' ? 'Teklif Talebi' : 'İletişim Formu'

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Yeni {formTypeText}</Heading>

          <Section style={infoBox}>
            <Text style={infoLabel}>Gönderen:</Text>
            <Text style={infoText}>{name}</Text>

            <Text style={infoLabel}>E-posta:</Text>
            <Text style={infoText}>{email}</Text>

            {phone && (
              <>
                <Text style={infoLabel}>Telefon:</Text>
                <Text style={infoText}>{phone}</Text>
              </>
            )}

            {company && (
              <>
                <Text style={infoLabel}>Şirket:</Text>
                <Text style={infoText}>{company}</Text>
              </>
            )}

            <Text style={infoLabel}>Mesaj:</Text>
            <Text style={infoText}>{message}</Text>
          </Section>

          <Button
            href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/contacts/${submissionId}`}
            style={button}
          >
            Admin Panelde Görüntüle
          </Button>

          <Hr style={hr} />

          <Text style={footer}>
            Bu e-posta otomatik olarak gönderilmiştir.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
}

const infoBox = {
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  margin: '24px 40px',
  padding: '24px',
}

const infoLabel = {
  color: '#6c757d',
  fontSize: '12px',
  fontWeight: 'bold',
  margin: '16px 0 4px 0',
}

const infoText = {
  color: '#1a1a1a',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
}

const button = {
  backgroundColor: '#D4AF37',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '12px 0',
  margin: '24px auto',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 40px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 40px',
  textAlign: 'center' as const,
}
```

---

## Database Schema Implementation

Already covered in [Supabase Setup](#supabase-setup) section above. The complete schema is in `/supabase/migrations/001_initial_schema.sql`.

---

## Server Actions Examples

### Product Actions

Create `/lib/actions/products.ts`:

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/service'
import { revalidatePath } from 'next/cache'
import slugify from 'slugify'

export interface Product {
  id: string
  slug: string
  title: string
  description: string
  long_description?: string
  category_id?: string
  featured: boolean
  active: boolean
  specifications: Record<string, any>
  features: string[]
  meta_title?: string
  meta_description?: string
  main_image?: string
  gallery_images: string[]
  display_order: number
  created_at: string
  updated_at: string
}

export async function getProducts(filters?: {
  category?: string
  search?: string
  featured?: boolean
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('active', true)
    .order('display_order', { ascending: true })

  if (filters?.category) {
    query = query.eq('category_id', filters.category)
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  if (filters?.featured !== undefined) {
    query = query.eq('featured', filters.featured)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as Product
}

export async function createProduct(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const long_description = formData.get('long_description') as string
  const category_id = formData.get('category_id') as string
  const featured = formData.get('featured') === 'true'

  // Generate slug from title
  const slug = slugify(title, { lower: true, strict: true, locale: 'tr' })

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert({
      slug,
      title,
      description,
      long_description,
      category_id: category_id || null,
      featured,
      active: true,
      specifications: {},
      features: [],
      gallery_images: [],
      display_order: 0,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    throw new Error('Failed to create product')
  }

  revalidatePath('/urunler')
  revalidatePath('/admin/products')

  return data
}

export async function updateProduct(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const long_description = formData.get('long_description') as string
  const category_id = formData.get('category_id') as string
  const featured = formData.get('featured') === 'true'
  const active = formData.get('active') === 'true'

  const { data, error } = await supabaseAdmin
    .from('products')
    .update({
      title,
      description,
      long_description,
      category_id: category_id || null,
      featured,
      active,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    throw new Error('Failed to update product')
  }

  revalidatePath('/urunler')
  revalidatePath(`/urunler/${data.slug}`)
  revalidatePath('/admin/products')

  return data
}

export async function deleteProduct(id: string) {
  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    throw new Error('Failed to delete product')
  }

  revalidatePath('/urunler')
  revalidatePath('/admin/products')

  return { success: true }
}

export async function toggleProductStatus(id: string) {
  // Get current status
  const { data: product } = await supabaseAdmin
    .from('products')
    .select('active')
    .eq('id', id)
    .single()

  if (!product) {
    throw new Error('Product not found')
  }

  // Toggle status
  const { error } = await supabaseAdmin
    .from('products')
    .update({ active: !product.active })
    .eq('id', id)

  if (error) {
    console.error('Error toggling product status:', error)
    throw new Error('Failed to toggle product status')
  }

  revalidatePath('/urunler')
  revalidatePath('/admin/products')

  return { success: true }
}
```

### Contact Form Actions

Create `/lib/actions/contact.ts`:

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/email/client'
import ContactConfirmationEmail from '@/lib/email/templates/contact-confirmation'
import AdminNotificationEmail from '@/lib/email/templates/admin-notification'
import { headers } from 'next/headers'

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  const supabase = await createClient()
  const headersList = await headers()

  // Get IP and user agent for tracking
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const userAgent = headersList.get('user-agent') || 'unknown'

  // Save to database
  const { data: submission, error: dbError } = await supabase
    .from('contact_submissions')
    .insert({
      form_type: 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      status: 'new',
      ip_address: ip,
      user_agent: userAgent,
    })
    .select()
    .single()

  if (dbError) {
    console.error('Error saving contact submission:', dbError)
    throw new Error('Failed to save contact submission')
  }

  // Send confirmation email to customer
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: formData.email,
      subject: 'Mesajınız Alındı - Baykasoglu Metal',
      react: ContactConfirmationEmail({
        name: formData.name,
        message: formData.message,
      }),
    })
  } catch (emailError) {
    console.error('Error sending confirmation email:', emailError)
    // Don't throw - submission is saved, email is non-critical
  }

  // Send notification to admin
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Yeni İletişim Formu - ${formData.name}`,
      react: AdminNotificationEmail({
        formType: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        submissionId: submission.id,
      }),
    })
  } catch (emailError) {
    console.error('Error sending admin notification:', emailError)
  }

  return { success: true, id: submission.id }
}

export async function submitQuoteRequest(formData: {
  name: string
  email: string
  phone: string
  company?: string
  message: string
  productIds?: string[]
  quantity?: string
}) {
  const supabase = await createClient()
  const headersList = await headers()

  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const userAgent = headersList.get('user-agent') || 'unknown'

  const { data: submission, error: dbError } = await supabase
    .from('contact_submissions')
    .insert({
      form_type: 'quote_request',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
      product_ids: formData.productIds || [],
      quantity: formData.quantity,
      status: 'new',
      ip_address: ip,
      user_agent: userAgent,
    })
    .select()
    .single()

  if (dbError) {
    console.error('Error saving quote request:', dbError)
    throw new Error('Failed to save quote request')
  }

  // Send emails (similar to contact form)
  // ... email logic

  return { success: true, id: submission.id }
}

export async function subscribeNewsletter(email: string) {
  const supabase = await createClient()

  // Check if already subscribed
  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select()
    .eq('email', email)
    .single()

  if (existing) {
    if (existing.subscribed) {
      return { success: false, message: 'Already subscribed' }
    } else {
      // Re-subscribe
      await supabase
        .from('newsletter_subscribers')
        .update({ subscribed: true, subscribed_at: new Date().toISOString() })
        .eq('email', email)

      return { success: true, message: 'Re-subscribed successfully' }
    }
  }

  // New subscription
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email })

  if (error) {
    console.error('Error subscribing to newsletter:', error)
    throw new Error('Failed to subscribe')
  }

  // Send welcome email
  // ... email logic

  return { success: true, message: 'Subscribed successfully' }
}
```

---

## Admin Panel Architecture

### Middleware for Auth Protection

Create `/middleware.ts`:

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      // Already on login page
      if (user) {
        // Redirect to admin dashboard if already logged in
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return response
    }

    // Require auth for all other admin pages
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

### Admin Layout

Create `/app/admin/layout.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/Sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar user={user} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
```

### Admin Sidebar Component

Create `/components/admin/Sidebar.tsx`:

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Mail,
  FileText,
  Settings,
  LogOut
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Contacts', href: '/admin/contacts', icon: Mail },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar({ user }: { user: any }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Baykasoglu</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="px-3">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg mb-1
                ${isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 mb-2">{user.email}</div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
```

---

## Deployment Steps

### Step 1: Prepare for Production

1. **Update Environment Variables**
   - Get production Supabase URL and keys
   - Verify Resend domain and update FROM_EMAIL
   - Set NEXT_PUBLIC_APP_URL to production domain

2. **Test Build Locally**
   ```bash
   npm run build
   npm run start
   ```
   - Fix any build errors
   - Test critical paths

### Step 2: Deploy to Vercel

1. **Install Vercel CLI (Optional)**
   ```bash
   npm install -g vercel
   ```

2. **Connect GitHub Repository**
   - Push code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Project**
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

4. **Add Environment Variables**
   In Vercel project settings, add all env variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - RESEND_API_KEY
   - RESEND_FROM_EMAIL
   - ADMIN_EMAIL
   - NEXT_PUBLIC_APP_URL (production URL)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Test the deployment

### Step 3: Configure Custom Domain

1. In Vercel project settings, go to **Domains**
2. Add your domain: `baykasoglu.com`
3. Follow DNS configuration instructions:
   - Add A record pointing to Vercel's IP
   - Or add CNAME record to Vercel
4. Wait for DNS propagation (can take up to 48 hours)
5. Vercel will automatically provision SSL certificate

### Step 4: Post-Deployment

1. **Update Supabase Settings**
   - Go to Supabase dashboard > Authentication > URL Configuration
   - Add production URL to allowed redirect URLs
   - Add production domain to allowed origins

2. **Test Everything**
   - Test all pages load
   - Submit test contact form
   - Test admin login
   - Test product CRUD
   - Check email delivery

3. **Set Up Monitoring**
   - Enable Vercel Analytics (free)
   - Set up error tracking (Sentry optional)
   - Configure uptime monitoring

### Step 5: Ongoing Maintenance

**Weekly:**
- Check contact submissions
- Monitor email delivery

**Monthly:**
- Review Vercel analytics
- Check Supabase usage
- Update dependencies

**As Needed:**
- Add new products
- Update content
- Respond to contact submissions

---

## Troubleshooting

### Common Issues

**1. Supabase Connection Error**
```
Error: Invalid Supabase URL
```
**Solution:** Check that NEXT_PUBLIC_SUPABASE_URL is set correctly in .env.local

**2. RLS Policy Blocking Queries**
```
Error: new row violates row-level security policy
```
**Solution:** Review RLS policies, ensure authenticated user or correct policy exists

**3. Email Not Sending**
```
Error: Failed to send email
```
**Solution:**
- Check RESEND_API_KEY is valid
- Verify domain is verified in Resend
- Check "from" email matches verified domain

**4. Image Upload Failing**
```
Error: Storage bucket not found
```
**Solution:**
- Verify storage bucket exists in Supabase
- Check storage policies allow upload
- Verify file size is under limit (50MB)

**5. Build Error on Vercel**
```
Error: Module not found
```
**Solution:**
- Run `npm install` locally
- Check all imports are correct
- Ensure all dependencies in package.json

**6. Admin Panel Not Accessible**
```
Redirecting to /admin/login
```
**Solution:**
- Check middleware is configured correctly
- Verify user is authenticated
- Check cookies are enabled

### Getting Help

- **Supabase:** [docs.supabase.com](https://docs.supabase.com)
- **Resend:** [resend.com/docs](https://resend.com/docs)
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)

---

## Next Steps

After following this guide, you should have:
- Supabase database fully set up
- Email service configured
- Development environment ready
- Understanding of the architecture

Now you can proceed with Week 2 of the development plan: building the product catalog pages.

Good luck with the implementation!
