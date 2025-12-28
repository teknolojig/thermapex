# Revised Development Plan - Baykasoglu Corporate Website

**Project Type:** Corporate Information Website (NO E-commerce)
**Duration:** 4 Weeks
**Technology Stack:** Next.js 16.0.1, Supabase, Resend, Vercel

---

## Executive Summary

This is a **simplified, realistic plan** for building a corporate website with product catalog, contact forms, and simple admin panel. NO shopping cart, NO payment processing - this is purely informational.

### Budget Overview
- **Development:** 160 hours × 1,000 TL = 160,000 TL
- **Infrastructure:** 0 TL/month (free tiers)
- **Total First Year:** ~160,000 TL

### Technology Stack (All Free Tiers)
- **Frontend:** Next.js 16.0.1 + React 19 (already set up)
- **Database:** Supabase (500MB database, 1GB file storage)
- **Authentication:** Supabase Auth (admin only)
- **Email:** Resend (3,000 emails/month)
- **File Storage:** Supabase Storage (product images)
- **Hosting:** Vercel (100GB bandwidth)

---

## Database Schema Design

### Table: products
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  long_description TEXT,
  category_id UUID REFERENCES categories(id),
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,

  -- Product specifications
  specifications JSONB,
  -- Example: {"diameter": "15mm", "thickness": "1mm", "length": "5m"}

  features TEXT[], -- Array of feature strings

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Images
  main_image VARCHAR(500),
  gallery_images TEXT[], -- Array of image URLs

  -- Ordering
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(active);
```

### Table: categories
```sql
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100), -- Icon name (lucide-react)
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

### Table: contact_submissions
```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type VARCHAR(50) NOT NULL, -- 'contact' | 'quote_request' | 'newsletter'

  -- Contact info
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),

  -- Message details
  subject VARCHAR(255),
  message TEXT,

  -- Quote request specific
  product_ids UUID[], -- Array of product IDs for quote requests
  quantity VARCHAR(100),

  -- Status tracking
  status VARCHAR(50) DEFAULT 'new', -- 'new' | 'read' | 'replied' | 'archived'
  notes TEXT, -- Admin notes

  -- Metadata
  ip_address VARCHAR(45),
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);
```

### Table: pages
```sql
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,

  -- Page type
  page_type VARCHAR(50) DEFAULT 'static', -- 'static' | 'about' | 'quality'

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Content blocks (flexible JSON structure)
  content_blocks JSONB,
  /* Example:
  [
    {"type": "hero", "heading": "...", "text": "...", "image": "..."},
    {"type": "text", "content": "..."},
    {"type": "image_gallery", "images": [...]}
  ]
  */

  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: news
```sql
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

CREATE INDEX idx_news_published ON news(published, published_at DESC);
```

### Table: certificates
```sql
CREATE TABLE certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
```

### Table: site_settings
```sql
CREATE TABLE site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  value_type VARCHAR(50) DEFAULT 'string', -- 'string' | 'number' | 'boolean' | 'json'
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value, value_type, description) VALUES
  ('site_name', 'Baykasoglu Metal', 'string', 'Site name'),
  ('contact_email', 'info@baykasoglu.com', 'string', 'Main contact email'),
  ('contact_phone', '0212 875 95 57', 'string', 'Main phone number'),
  ('address', 'Mimar Sinan Mahallesi, Beylikdüzü, İstanbul', 'string', 'Company address'),
  ('working_hours', '{"weekdays": "08:00-18:00", "weekend": "Kapalı"}', 'json', 'Working hours'),
  ('enable_newsletter', 'true', 'boolean', 'Enable newsletter subscription'),
  ('enable_quote_requests', 'true', 'boolean', 'Enable quote request forms');
```

---

## API Endpoints / Server Actions

### Products
- `GET /api/products` - List all active products (with filtering, pagination)
- `GET /api/products/[slug]` - Get single product by slug
- `GET /api/categories` - List all categories
- `GET /api/categories/[slug]/products` - Products by category

### Admin (Server Actions)
```typescript
// app/actions/products.ts
'use server'

export async function createProduct(data: ProductFormData)
export async function updateProduct(id: string, data: ProductFormData)
export async function deleteProduct(id: string)
export async function toggleProductStatus(id: string)
export async function uploadProductImage(formData: FormData)

// app/actions/contact.ts
export async function submitContactForm(data: ContactFormData)
export async function submitQuoteRequest(data: QuoteRequestData)
export async function subscribeNewsletter(email: string)

// app/actions/admin.ts
export async function getContactSubmissions(filters: any)
export async function updateSubmissionStatus(id: string, status: string)
export async function addAdminNote(id: string, note: string)
```

---

## Week-by-Week Breakdown

## WEEK 1: Database & Backend Setup (40 hours)

### Day 1-2: Supabase Setup (8 hours)
**Deliverables:**
- [ ] Supabase project created
- [ ] Database schema implemented (all tables)
- [ ] Row Level Security (RLS) policies configured
- [ ] Storage buckets created (product-images, certificates)
- [ ] Admin user created
- [ ] Environment variables configured (.env.local)

**Tasks:**
1. Create Supabase account and new project
2. Run SQL migrations for all tables
3. Configure RLS policies:
   - Public read access for products, categories, pages, news
   - Admin-only write access
   - Contact submissions: insert allowed for anonymous, read for admin
4. Create storage buckets with public read access
5. Set up Supabase Auth for admin panel
6. Add Supabase client to Next.js project

**Files to Create:**
- `/lib/supabase/client.ts` - Supabase client
- `/lib/supabase/server.ts` - Server-side client
- `/supabase/migrations/001_initial_schema.sql`
- `/supabase/migrations/002_rls_policies.sql`
- `/supabase/seed.sql` - Seed data for testing

### Day 3-4: Server Actions & API Layer (12 hours)
**Deliverables:**
- [ ] Product CRUD server actions
- [ ] Contact form submission actions
- [ ] Email service integrated (Resend)
- [ ] File upload utilities
- [ ] Data validation schemas (Zod)

**Tasks:**
1. Install dependencies: `@supabase/supabase-js`, `resend`, `zod`
2. Create server actions for products
3. Create contact form submission action
4. Set up Resend email service
5. Create email templates (HTML)
6. Implement image upload to Supabase Storage
7. Add form validation with Zod

**Files to Create:**
- `/lib/actions/products.ts`
- `/lib/actions/contact.ts`
- `/lib/actions/admin.ts`
- `/lib/actions/upload.ts`
- `/lib/validations/product.ts`
- `/lib/validations/contact.ts`
- `/lib/email/client.ts`
- `/lib/email/templates/contact-confirmation.tsx`
- `/lib/email/templates/quote-request.tsx`
- `/lib/email/templates/admin-notification.tsx`

### Day 5: Data Migration & Testing (8 hours)
**Deliverables:**
- [ ] Existing product data migrated to database
- [ ] Categories populated
- [ ] Test data for all entities
- [ ] API endpoints tested

**Tasks:**
1. Create seed script for categories (LWC, Kangal, Boy, İzolasyonlu)
2. Migrate hardcoded products to database
3. Add sample news articles
4. Add sample certificates
5. Test all CRUD operations
6. Test RLS policies
7. Verify email sending

**Files to Create:**
- `/scripts/migrate-products.ts`
- `/scripts/seed-categories.ts`
- `/scripts/test-email.ts`

### Day 6-7: Email Integration (12 hours)
**Deliverables:**
- [ ] Resend account configured
- [ ] Email templates created
- [ ] Auto-responder working
- [ ] Admin notifications working
- [ ] Email queue system (optional)

**Tasks:**
1. Create Resend account and verify domain
2. Design responsive email templates
3. Implement contact form auto-responder
4. Implement quote request emails
5. Implement admin notification emails
6. Add email rate limiting
7. Test all email scenarios

---

## WEEK 2: Product Catalog (40 hours)

### Day 1-2: Product Data Layer (10 hours)
**Deliverables:**
- [ ] Product hooks created
- [ ] Category hooks created
- [ ] Search functionality
- [ ] Filtering logic
- [ ] Pagination implemented

**Tasks:**
1. Create custom hooks for data fetching
2. Implement search by title/description
3. Add category filtering
4. Add specification filtering
5. Implement pagination
6. Add loading states
7. Error handling

**Files to Create:**
- `/lib/hooks/useProducts.ts`
- `/lib/hooks/useCategories.ts`
- `/lib/hooks/useSearch.ts`
- `/lib/utils/search.ts`
- `/lib/utils/filters.ts`

### Day 3-4: Product Listing Pages (12 hours)
**Deliverables:**
- [ ] Product catalog page (/urunler)
- [ ] Category pages (/urunler/kategori/[slug])
- [ ] Search results page
- [ ] Filtering UI components
- [ ] Responsive grid layout

**Tasks:**
1. Update existing ProductsSection to fetch from database
2. Create full product catalog page with all products
3. Create category navigation
4. Implement search bar
5. Create filter sidebar (category, specs)
6. Add sort options (name, newest, featured)
7. Mobile-responsive design

**Files to Update/Create:**
- `/components/sections/ProductsSection.tsx` (update)
- `/app/urunler/page.tsx` (new)
- `/app/urunler/kategori/[slug]/page.tsx` (new)
- `/components/products/ProductGrid.tsx`
- `/components/products/ProductCard.tsx`
- `/components/products/ProductFilters.tsx`
- `/components/products/SearchBar.tsx`
- `/components/products/CategoryNav.tsx`

### Day 5-6: Product Detail Pages (12 hours)
**Deliverables:**
- [ ] Product detail page (/urunler/[slug])
- [ ] Image gallery component
- [ ] Specifications display
- [ ] Related products section
- [ ] Quote request CTA
- [ ] Breadcrumb navigation

**Tasks:**
1. Create dynamic product detail route
2. Implement image gallery with zoom
3. Display full specifications
4. Show all features with icons
5. Add "Request Quote" button linking to form
6. Show related products from same category
7. Add structured data (JSON-LD) for SEO
8. Generate dynamic metadata

**Files to Create:**
- `/app/urunler/[slug]/page.tsx`
- `/components/products/ProductDetail.tsx`
- `/components/products/ImageGallery.tsx`
- `/components/products/SpecificationTable.tsx`
- `/components/products/RelatedProducts.tsx`
- `/lib/utils/seo.ts`

### Day 7: Search & Performance (6 hours)
**Deliverables:**
- [ ] Full-text search working
- [ ] Search suggestions
- [ ] Image optimization
- [ ] Page speed optimized
- [ ] SEO metadata

**Tasks:**
1. Implement full-text search in Supabase
2. Add search suggestions as user types
3. Optimize images with Next.js Image component
4. Add loading skeletons
5. Implement route prefetching
6. Add Open Graph tags
7. Test page speed with Lighthouse

---

## WEEK 3: Forms & Email System (40 hours)

### Day 1-2: Contact Form Enhancement (10 hours)
**Deliverables:**
- [ ] Contact form connected to database
- [ ] Form validation
- [ ] Email notifications working
- [ ] Auto-responder emails
- [ ] Success/error states

**Tasks:**
1. Update existing ContactSection to use server action
2. Add form validation with Zod
3. Save submissions to database
4. Send admin notification email
5. Send auto-responder to customer
6. Add reCAPTCHA (optional)
7. Rate limiting on submissions
8. Toast notifications for feedback

**Files to Update/Create:**
- `/components/sections/ContactSection.tsx` (update)
- `/components/forms/ContactForm.tsx`
- `/lib/validations/contact.ts`
- `/lib/email/send-contact-notification.ts`

### Day 3-4: Quote Request System (12 hours)
**Deliverables:**
- [ ] Quote request form created
- [ ] Multi-product quote requests
- [ ] Email templates for quotes
- [ ] Quote submission tracking
- [ ] PDF generation (optional)

**Tasks:**
1. Create quote request form component
2. Allow selecting multiple products
3. Add quantity and delivery date fields
4. Company information fields
5. Send detailed quote emails
6. Format quote details nicely
7. Save quote data with product references
8. Add quote request page (/teklif-al)

**Files to Create:**
- `/app/teklif-al/page.tsx`
- `/components/forms/QuoteRequestForm.tsx`
- `/components/forms/ProductSelector.tsx`
- `/lib/email/templates/quote-request.tsx`
- `/lib/email/templates/quote-confirmation.tsx`

### Day 5: Newsletter System (8 hours)
**Deliverables:**
- [ ] Newsletter subscription form
- [ ] Email validation
- [ ] Welcome email
- [ ] Unsubscribe functionality
- [ ] Double opt-in (optional)

**Tasks:**
1. Update existing NewsletterSection
2. Add newsletter_subscribers table
3. Create subscription server action
4. Send welcome email
5. Add unsubscribe link to emails
6. Handle duplicate subscriptions
7. GDPR compliance (consent checkbox)

**Files to Update/Create:**
- `/components/sections/NewsletterSection.tsx` (update)
- `/lib/actions/newsletter.ts`
- `/lib/email/templates/newsletter-welcome.tsx`
- `/app/api/unsubscribe/route.ts`

### Day 6-7: Email Templates & Testing (10 hours)
**Deliverables:**
- [ ] All email templates designed
- [ ] Mobile-responsive emails
- [ ] Email testing completed
- [ ] Spam score checked
- [ ] Delivery monitoring

**Tasks:**
1. Design professional email templates
2. Use React Email or MJML
3. Test emails in multiple clients
4. Check spam score
5. Set up DKIM/SPF records
6. Add email preview functionality
7. Test all email scenarios
8. Document email flows

**Files to Create:**
- `/lib/email/templates/base-layout.tsx`
- `/lib/email/styles.ts`
- `/tests/email-preview.tsx`
- `/docs/EMAIL_FLOWS.md`

---

## WEEK 4: Admin Panel & Deployment (40 hours)

### Day 1-2: Admin Authentication (10 hours)
**Deliverables:**
- [ ] Admin login page
- [ ] Supabase Auth integration
- [ ] Protected admin routes
- [ ] Session management
- [ ] Admin middleware

**Tasks:**
1. Create admin login page (/admin/login)
2. Implement Supabase Auth
3. Create auth middleware
4. Protect all admin routes
5. Add logout functionality
6. Password reset flow
7. Session timeout handling

**Files to Create:**
- `/app/admin/login/page.tsx`
- `/middleware.ts`
- `/lib/auth/admin.ts`
- `/lib/auth/session.ts`
- `/components/admin/LoginForm.tsx`

### Day 3-4: Admin Dashboard (12 hours)
**Deliverables:**
- [ ] Admin dashboard layout
- [ ] Overview statistics
- [ ] Recent submissions list
- [ ] Quick actions
- [ ] Admin navigation

**Tasks:**
1. Create admin layout with sidebar
2. Dashboard overview page
3. Statistics widgets (total products, pending contacts, etc.)
4. Recent contact submissions
5. Admin navigation menu
6. Responsive admin layout
7. Dark mode (optional)

**Files to Create:**
- `/app/admin/layout.tsx`
- `/app/admin/page.tsx`
- `/components/admin/AdminLayout.tsx`
- `/components/admin/Sidebar.tsx`
- `/components/admin/StatCard.tsx`
- `/components/admin/RecentSubmissions.tsx`

### Day 5: Product Management UI (10 hours)
**Deliverables:**
- [ ] Product list view
- [ ] Product create/edit form
- [ ] Image upload interface
- [ ] Category management
- [ ] Bulk actions

**Tasks:**
1. Create products list page (/admin/products)
2. Product create/edit form
3. Image upload with preview
4. Gallery image management
5. Drag-and-drop image reordering
6. Category selector
7. Specifications editor (JSON form)
8. Features array editor
9. Product status toggle
10. Delete confirmation

**Files to Create:**
- `/app/admin/products/page.tsx`
- `/app/admin/products/new/page.tsx`
- `/app/admin/products/[id]/edit/page.tsx`
- `/components/admin/ProductForm.tsx`
- `/components/admin/ImageUpload.tsx`
- `/components/admin/SpecsEditor.tsx`
- `/components/admin/ProductTable.tsx`

### Day 6: Contact Management (4 hours)
**Deliverables:**
- [ ] Contact submissions list
- [ ] Submission detail view
- [ ] Status management
- [ ] Admin notes
- [ ] Export to CSV

**Tasks:**
1. Contact submissions list page
2. Filter by status, date, form type
3. Detail view modal/page
4. Update submission status
5. Add admin notes
6. Mark as read/replied
7. Export functionality

**Files to Create:**
- `/app/admin/contacts/page.tsx`
- `/app/admin/contacts/[id]/page.tsx`
- `/components/admin/ContactTable.tsx`
- `/components/admin/ContactDetail.tsx`
- `/components/admin/StatusBadge.tsx`

### Day 7: Testing & Deployment (4 hours)
**Deliverables:**
- [ ] Full application testing
- [ ] Vercel deployment
- [ ] Environment variables configured
- [ ] Domain connected
- [ ] SSL certificate
- [ ] Performance audit

**Tasks:**
1. Complete end-to-end testing
2. Fix any bugs found
3. Deploy to Vercel
4. Configure environment variables
5. Connect custom domain
6. Test production build
7. Run Lighthouse audit
8. Set up error monitoring (Sentry optional)
9. Create deployment checklist
10. Document deployment process

**Files to Create:**
- `/docs/DEPLOYMENT.md`
- `/docs/ENVIRONMENT_VARIABLES.md`
- `/.env.example`

---

## Component Updates Needed

### Existing Components to Update

1. **ProductsSection.tsx**
   - Remove hardcoded products array
   - Fetch from Supabase
   - Add loading state
   - Error handling

2. **ContactSection.tsx**
   - Connect to server action
   - Add form validation
   - Improve error handling
   - Add toast notifications

3. **NewsletterSection.tsx**
   - Connect to server action
   - Add to database
   - Send welcome email

4. **Header.tsx**
   - Add search icon/modal
   - Update navigation links
   - Add admin link (when logged in)

5. **Footer.tsx**
   - Dynamic content from settings
   - Add newsletter signup

### New Components to Create

**Product Components:**
- ProductGrid.tsx
- ProductCard.tsx
- ProductDetail.tsx
- ProductFilters.tsx
- SearchBar.tsx
- CategoryNav.tsx
- ImageGallery.tsx
- SpecificationTable.tsx
- RelatedProducts.tsx

**Form Components:**
- ContactForm.tsx
- QuoteRequestForm.tsx
- ProductSelector.tsx
- NewsletterForm.tsx

**Admin Components:**
- AdminLayout.tsx
- Sidebar.tsx
- StatCard.tsx
- ProductForm.tsx
- ProductTable.tsx
- ContactTable.tsx
- ContactDetail.tsx
- ImageUpload.tsx
- SpecsEditor.tsx
- StatusBadge.tsx
- LoginForm.tsx

**UI Components:**
- LoadingSkeleton.tsx
- ErrorBoundary.tsx
- Toast.tsx
- Modal.tsx
- Pagination.tsx
- DataTable.tsx
- FileUpload.tsx

---

## Testing Checklist

### Frontend Testing
- [ ] All pages render correctly
- [ ] Navigation works on all pages
- [ ] Forms submit successfully
- [ ] Form validation works
- [ ] Error states display properly
- [ ] Loading states show correctly
- [ ] Images load and display
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Browser compatibility (Chrome, Firefox, Safari)
- [ ] Accessibility (keyboard navigation, screen readers)

### Backend Testing
- [ ] All server actions work
- [ ] Database queries execute
- [ ] RLS policies enforce correctly
- [ ] File uploads work
- [ ] Email sending works
- [ ] Rate limiting works
- [ ] Error handling works
- [ ] Validation catches bad data

### Email Testing
- [ ] Contact form emails send
- [ ] Quote request emails send
- [ ] Auto-responders send
- [ ] Newsletter welcome email sends
- [ ] Emails render in Gmail, Outlook, Apple Mail
- [ ] Unsubscribe links work
- [ ] Email variables populate correctly

### Admin Testing
- [ ] Admin login works
- [ ] Admin routes are protected
- [ ] Product CRUD operations work
- [ ] Image uploads work
- [ ] Contact management works
- [ ] Category management works
- [ ] Logout works
- [ ] Session timeout works

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile performance good
- [ ] Database queries optimized

### Security Testing
- [ ] RLS policies prevent unauthorized access
- [ ] Admin routes require authentication
- [ ] Form inputs are sanitized
- [ ] SQL injection prevented
- [ ] XSS attacks prevented
- [ ] CSRF protection enabled
- [ ] Rate limiting on forms
- [ ] Environment variables secure

### SEO Testing
- [ ] Meta tags present on all pages
- [ ] Open Graph tags work
- [ ] Structured data valid
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] URLs are SEO-friendly
- [ ] Alt tags on images

---

## Dependencies to Install

```bash
# Core dependencies
npm install @supabase/supabase-js
npm install resend
npm install zod
npm install react-email @react-email/components

# UI Components (optional but recommended)
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-select
npm install @radix-ui/react-toast
npm install sonner # Toast notifications

# Form handling
npm install react-hook-form
npm install @hookform/resolvers

# Utilities
npm install date-fns
npm install slugify

# Dev dependencies
npm install --save-dev @types/react-email
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=info@baykasoglu.com

# App
NEXT_PUBLIC_APP_URL=https://baykasoglu.com
ADMIN_EMAIL=admin@baykasoglu.com

# Optional
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

---

## Success Metrics

### Week 1
- Database fully set up with all tables
- RLS policies working
- Email sending functional
- Seed data populated

### Week 2
- Product catalog displays all products from database
- Product detail pages working
- Search and filtering functional
- Mobile responsive

### Week 3
- Contact form saves to database and sends emails
- Quote request system working
- Newsletter signup functional
- All email templates complete

### Week 4
- Admin panel fully functional
- Product CRUD working
- Contact management working
- Successfully deployed to Vercel

---

## Risk Mitigation

### Technical Risks
1. **Supabase RLS Complexity**
   - Mitigation: Start with simple policies, test thoroughly
   - Fallback: Use API routes with server-side auth

2. **Email Deliverability**
   - Mitigation: Verify domain, set up DKIM/SPF
   - Fallback: Use alternative email service (SendGrid)

3. **Image Upload/Storage**
   - Mitigation: Test with various file sizes, implement limits
   - Fallback: Use Cloudinary if Supabase Storage has issues

### Timeline Risks
1. **Scope Creep**
   - Mitigation: Stick strictly to planned features
   - Document feature requests for Phase 2

2. **Third-party Service Issues**
   - Mitigation: Have backup services identified
   - Test all services early in project

---

## Post-Launch (Phase 2 - Future)

### Potential Enhancements (After Initial 4 Weeks)
- Advanced analytics dashboard
- Customer portal for tracking quote requests
- Multi-language support (English)
- Product comparison tool
- Live chat integration
- Advanced search with filters
- Blog/articles section
- Customer testimonials
- Video gallery
- Downloadable product catalogs (PDF)

### Maintenance Plan
- Weekly: Check contact submissions, monitor emails
- Monthly: Review analytics, update products
- Quarterly: Security audit, dependency updates
- Yearly: Design refresh, feature additions

---

## Conclusion

This 4-week plan delivers a fully functional corporate website with:
- Dynamic product catalog
- Professional contact forms
- Email automation
- Simple admin panel
- Zero infrastructure cost to start

The focus is on **practical, achievable goals** with room to grow. No e-commerce complexity, just a solid information website that serves your B2B customers effectively.
