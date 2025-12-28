# Baykasoglu Website - Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd /Volumes/HDD/baykasoglu/baykasoglu-web
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## Quick Edits

### Change Colors
Edit `/Volumes/HDD/baykasoglu/baykasoglu-web/app/globals.css`:
```css
--primary: #CD8048;        /* Your brand color */
--primary-dark: #b86f3d;   /* Darker shade */
```

### Update Contact Info
Edit `/Volumes/HDD/baykasoglu/baykasoglu-web/components/layout/Header.tsx` and `Footer.tsx`:
- Phone: `0212 875 95 57`
- Email: `info@baykasoglu.com`
- Address: `Mimar Sinan Mahallesi, Beylikdüzü, İstanbul`

### Add/Remove Products
Edit `/Volumes/HDD/baykasoglu/baykasoglu-web/components/sections/ProductsSection.tsx`:
```typescript
const products = [
  {
    id: 'product-id',
    title: 'Product Name',
    description: 'Product description...',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    image: '/products/image.jpg',
  },
  // Add more products...
];
```

### Update Company Text
Edit `/Volumes/HDD/baykasoglu/baykasoglu-web/components/sections/AboutSection.tsx` for company information.

---

## Project Structure

```
baykasoglu-web/
├── app/
│   ├── page.tsx              ← Main home page
│   ├── layout.tsx            ← Root layout
│   └── globals.css           ← Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx        ← Navigation
│   │   └── Footer.tsx        ← Footer
│   └── sections/
│       ├── HeroSection.tsx           ← Hero banner
│       ├── AboutSection.tsx          ← About company
│       ├── FeaturesSection.tsx       ← Features grid
│       ├── StatisticsSection.tsx     ← Stats with counters
│       ├── ProductsSection.tsx       ← Product cards
│       ├── NewsletterSection.tsx     ← Newsletter form
│       └── ContactSection.tsx        ← Contact form
└── lib/
    └── utils.ts              ← Utility functions
```

---

## Component Overview

### Layout Components
- **Header**: Sticky navigation with dropdown, contact info
- **Footer**: 4-column footer with links and contact details

### Section Components
All sections are self-contained and can be reordered in `app/page.tsx`:

```typescript
<HeroSection />           // Hero banner with CTA
<AboutSection />          // Company information
<FeaturesSection />       // "Why Us" features
<StatisticsSection />     // Animated statistics
<ProductsSection />       // Product catalog
<NewsletterSection />     // Email subscription
<ContactSection />        // Contact form
```

---

## Customization Tips

### Animations
All animations use Framer Motion. To adjust:
```typescript
// Change animation duration
transition={{ duration: 0.6 }}  // 0.6 seconds

// Change animation delay
transition={{ delay: 0.2 }}      // 0.2 second delay

// Disable animation
initial={{ opacity: 1 }}         // Start visible
animate={{ opacity: 1 }}         // Stay visible
```

### Responsive Design
Tailwind breakpoints:
```typescript
className="text-lg md:text-xl lg:text-2xl"
//         mobile    tablet    desktop
```

### Colors
Use these classes throughout:
- `bg-primary` - Brand orange
- `text-primary` - Brand orange text
- `bg-secondary` - Dark blue-gray
- `text-secondary` - Dark text
- `bg-accent` - Light gray background
- `text-muted` - Muted gray text

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clean build cache
rm -rf .next
npm run build
```

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit
```

---

## What's Working Out of the Box

✅ Responsive design (mobile, tablet, desktop)
✅ Smooth scroll animations
✅ Interactive forms (UI only)
✅ Mobile navigation menu
✅ Dropdown menus
✅ Animated statistics counters
✅ Newsletter subscription form (UI)
✅ Contact form (UI)
✅ Custom scrollbar
✅ SEO-friendly structure
✅ TypeScript types
✅ Production build ready

---

## What Needs Backend Integration

🔧 Contact form submission (needs email service)
🔧 Newsletter subscription (needs email marketing)
🔧 Form data storage (needs database)

**Recommended services:**
- Email: SendGrid, Resend, AWS SES
- Newsletter: Mailchimp, ConvertKit, Klaviyo
- Database: Supabase, PlanetScale, MongoDB Atlas

---

## Need Help?

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **TypeScript:** https://www.typescriptlang.org/docs

---

## Deployment

### Vercel (Easiest)
1. Push code to GitHub
2. Import project on Vercel
3. Deploy automatically

### Manual Deploy
```bash
npm run build
npm start
```

---

**Last Updated:** November 3, 2025
