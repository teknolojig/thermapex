# Baykasoglu Website - Component Architecture Map

## Visual Structure

```
┌─────────────────────────────────────────────────────────┐
│                    HEADER (Sticky)                      │
│  Logo | Hakkımızda | Bakır Borular ▼ | Bakır Pul |    │
│       | İletişim | Phone | Email | Menu (Mobile)       │
└─────────────────────────────────────────────────────────┘
│
├─ HERO SECTION (Full Screen)
│  ├─ Badge: "Türkiye'nin Güvenilir Markası"
│  ├─ H1: "Türkiye'nin Lider Bakır Boru Tedarikçisi"
│  ├─ Subtitle + Description
│  ├─ CTA Buttons: [Ürünlerimizi İnceleyin] [İletişime Geçin]
│  └─ Trust Indicators: 25+ | %100 | 500+
│
├─ ABOUT SECTION (#hakkimizda)
│  ├─ Left Column: Company Text (3 paragraphs)
│  └─ Right Column: 2x2 Grid
│     ├─ Mission Card
│     ├─ Vision Card
│     ├─ Values Card
│     └─ Commitment Card
│
├─ FEATURES SECTION (#neden-biz)
│  ├─ Title: "Neden Baykasoğlu?"
│  └─ 3-Column Grid (responsive to 1 column)
│     ├─ Experience (Award icon)
│     ├─ Quality (BadgeCheck icon)
│     ├─ Competitive Pricing (TrendingDown icon)
│     ├─ Customer Satisfaction (ThumbsUp icon)
│     ├─ Corporate References (Building2 icon)
│     └─ Product Range (Package icon)
│
├─ STATISTICS SECTION (Animated Counters)
│  └─ 4-Column Grid
│     ├─ 25+ Yıllık Tecrübe
│     ├─ %100 Müşteri Memnuniyeti
│     ├─ 500+ Kurumsal Referans
│     └─ 10000+ Tamamlanan Proje
│
├─ PRODUCTS SECTION (#urunler)
│  ├─ Title: "Ürünlerimiz"
│  └─ 2-Column Grid (responsive to 1 column)
│     ├─ LWC Bakır Borular Card
│     │  ├─ Image Placeholder
│     │  ├─ Title + Description
│     │  ├─ 4 Features (checkmarks)
│     │  └─ CTA: "Fiyat Teklifi Alın"
│     ├─ Kangal Bakır Borular Card
│     ├─ Boy Bakır Borular Card
│     └─ İzolasyonlu Bakır Borular Card
│
├─ NEWSLETTER SECTION
│  └─ Glass-morphism Card
│     ├─ Icon: Mail
│     ├─ Title: "Kampanya ve İndirimlerden Haberdar Olun"
│     ├─ Form: [Email Input] [Abone Ol Button]
│     └─ Privacy Notice
│
├─ CONTACT SECTION (#iletisim)
│  ├─ Left Column (40%): Contact Info
│  │  ├─ Description
│  │  ├─ Phone (with icon)
│  │  ├─ Email (with icon)
│  │  ├─ Address (with icon)
│  │  └─ Working Hours
│  └─ Right Column (60%): Contact Form
│     ├─ Name Input (required)
│     ├─ Email Input (required)
│     ├─ Phone Input (required)
│     ├─ Message Textarea (required)
│     └─ Submit Button
│
└─────────────────────────────────────────────────────────┐
│                    FOOTER                                │
│  ┌──────────┬──────────┬──────────┬──────────┐         │
│  │ Company  │ Products │  Quick   │ Contact  │         │
│  │   Info   │  Links   │  Links   │   Info   │         │
│  └──────────┴──────────┴──────────┴──────────┘         │
│  ─────────────────────────────────────────────          │
│  Copyright | Privacy Policy | Terms of Use              │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
app/page.tsx
├── Header (components/layout/Header.tsx)
│   ├── Logo Link
│   ├── Desktop Navigation
│   │   ├── Link: Hakkımızda
│   │   ├── Dropdown: Bakır Borular
│   │   │   ├── LWC Bakır Borular
│   │   │   ├── Kangal Bakır Borular
│   │   │   ├── Boy Bakır Borular
│   │   │   └── İzolasyonlu Bakır Borular
│   │   ├── Link: Bakır Pul
│   │   └── Link: İletişim
│   ├── Contact Info
│   │   ├── Phone Link
│   │   └── Email Link
│   └── Mobile Menu Button
│       └── Mobile Navigation Drawer
│
├── main
│   ├── HeroSection (components/sections/HeroSection.tsx)
│   │   ├── Background Pattern
│   │   ├── Badge Component
│   │   ├── Heading (h1)
│   │   ├── Subtitle (p)
│   │   ├── CTA Buttons
│   │   │   ├── Primary Button → #urunler
│   │   │   └── Secondary Button → #iletisim
│   │   └── Trust Indicators Grid
│   │
│   ├── AboutSection (components/sections/AboutSection.tsx)
│   │   ├── Text Column
│   │   │   ├── Heading (h2)
│   │   │   └── Paragraphs (3)
│   │   └── Values Grid
│   │       ├── Mission Card
│   │       ├── Vision Card
│   │       ├── Values Card
│   │       └── Commitment Card
│   │
│   ├── FeaturesSection (components/sections/FeaturesSection.tsx)
│   │   ├── Section Header
│   │   │   ├── Heading (h2)
│   │   │   └── Subtitle (p)
│   │   └── Features Grid (6 items)
│   │       └── Feature Card (repeated)
│   │           ├── Icon Background
│   │           ├── Icon
│   │           ├── Title (h3)
│   │           └── Description (p)
│   │
│   ├── StatisticsSection (components/sections/StatisticsSection.tsx)
│   │   └── Stats Grid (4 items)
│   │       └── Stat Item (repeated)
│   │           ├── Counter Component
│   │           └── Label
│   │
│   ├── ProductsSection (components/sections/ProductsSection.tsx)
│   │   ├── Section Header
│   │   │   ├── Heading (h2)
│   │   │   └── Subtitle (p)
│   │   └── Products Grid (4 items)
│   │       └── Product Card (repeated)
│   │           ├── Image Placeholder
│   │           ├── Title (h3)
│   │           ├── Description (p)
│   │           ├── Features List
│   │           │   └── Feature Item (repeated)
│   │           │       ├── Checkmark Icon
│   │           │       └── Text
│   │           └── CTA Link
│   │
│   ├── NewsletterSection (components/sections/NewsletterSection.tsx)
│   │   └── Glass Card
│   │       ├── Icon Container
│   │       │   └── Mail Icon
│   │       ├── Heading (h2)
│   │       ├── Subtitle (p)
│   │       ├── Form | Success Message
│   │       │   ├── Email Input (with icon)
│   │       │   └── Submit Button
│   │       └── Privacy Notice (p)
│   │
│   └── ContactSection (components/sections/ContactSection.tsx)
│       ├── Section Header
│       │   ├── Heading (h2)
│       │   └── Subtitle (p)
│       ├── Contact Info Column
│       │   ├── Description
│       │   ├── Phone Link
│       │   │   ├── Icon
│       │   │   └── Text
│       │   ├── Email Link
│       │   │   ├── Icon
│       │   │   └── Text
│       │   ├── Address Display
│       │   │   ├── Icon
│       │   │   └── Text
│       │   └── Working Hours
│       └── Contact Form Column
│           ├── Form | Success Message
│           │   ├── Name Input (with icon)
│           │   ├── Email Input (with icon)
│           │   ├── Phone Input (with icon)
│           │   ├── Message Textarea (with icon)
│           │   └── Submit Button
│           └── Loading/Success States
│
└── Footer (components/layout/Footer.tsx)
    ├── Footer Grid (4 columns)
    │   ├── Company Info Column
    │   │   ├── Logo/Brand
    │   │   ├── Description
    │   │   └── Working Hours
    │   ├── Products Column
    │   │   ├── Heading (h4)
    │   │   └── Links List
    │   ├── Quick Links Column
    │   │   ├── Heading (h4)
    │   │   └── Links List
    │   └── Contact Column
    │       ├── Heading (h4)
    │       └── Contact Items
    │           ├── Phone Link
    │           ├── Email Link
    │           └── Address Display
    └── Bottom Bar
        ├── Copyright Text
        └── Legal Links
            ├── Privacy Policy
            └── Terms of Use
```

## Data Flow

```
User Interactions
│
├─ Navigation Click
│  └─> Smooth scroll to section (via href="#id")
│
├─ Dropdown Hover (Desktop)
│  └─> onMouseEnter/Leave → setIsDropdownOpen
│     └─> AnimatePresence → Framer Motion animation
│
├─ Mobile Menu Click
│  └─> onClick → setIsMobileMenuOpen
│     └─> AnimatePresence → Slide down animation
│
├─ Form Input Change
│  └─> onChange → setFormData/setEmail
│     └─> Controlled input value update
│
├─ Form Submit
│  └─> onSubmit → preventDefault
│     ├─> setIsLoading(true)
│     ├─> Simulate API call (setTimeout)
│     ├─> setIsSubmitted(true)
│     ├─> setIsLoading(false)
│     └─> Auto-reset after 5s
│
└─ Scroll Events
   ├─> window.addEventListener('scroll')
   │  └─> Update header style (isScrolled)
   └─> IntersectionObserver (Framer Motion)
      └─> Trigger entrance animations
```

## Animation Triggers

```
Page Load
├─> Hero Section: Immediate animation
└─> Other Sections: Waiting...

Scroll to View (useInView)
├─> About Section (-100px margin)
├─> Features Section (-100px margin)
├─> Statistics Section (-100px margin)
│   └─> Trigger counters (requestAnimationFrame)
├─> Products Section (-100px margin)
├─> Newsletter Section (-100px margin)
└─> Contact Section (-100px margin)

Hover Events
├─> Button → scale(1.05)
├─> Card → shadow-xl
├─> Link → color transition
└─> Icon → scale(1.1)
```

## Responsive Breakpoints

```
Mobile First (default)
↓
md: 768px   (Tablet)
├─> Grid: 1 col → 2 cols
├─> Text: smaller → larger
└─> Spacing: compact → comfortable
↓
lg: 1024px  (Desktop)
├─> Grid: 2 cols → 3 cols
├─> Header: mobile menu → full nav
└─> Layout: stacked → side-by-side
↓
xl: 1280px  (Large Desktop)
├─> Contact info visible
├─> Max widths applied
└─> Optimal spacing
```

## State Management

```
Component-Level State (useState)
├─ Header
│  ├─ isScrolled: boolean
│  ├─ isMobileMenuOpen: boolean
│  └─ isDropdownOpen: boolean
├─ NewsletterSection
│  ├─ email: string
│  ├─ isSubmitted: boolean
│  └─ isLoading: boolean
└─ ContactSection
   ├─ formData: { name, email, phone, message }
   ├─ isSubmitted: boolean
   └─ isLoading: boolean

No Global State Needed
- All components self-contained
- No props drilling
- No context required
```

## File Dependencies

```
app/page.tsx
├─ imports Header from '@/components/layout/Header'
├─ imports Footer from '@/components/layout/Footer'
├─ imports HeroSection from '@/components/sections/HeroSection'
├─ imports AboutSection from '@/components/sections/AboutSection'
├─ imports FeaturesSection from '@/components/sections/FeaturesSection'
├─ imports StatisticsSection from '@/components/sections/StatisticsSection'
├─ imports ProductsSection from '@/components/sections/ProductsSection'
├─ imports NewsletterSection from '@/components/sections/NewsletterSection'
└─ imports ContactSection from '@/components/sections/ContactSection'

All Components
├─ import { motion } from 'framer-motion'
├─ import { useInView } from 'framer-motion' (sections)
├─ import { Icon } from 'lucide-react'
├─ import { useState, useEffect, useRef } from 'react'
└─ use Tailwind classes for styling

app/layout.tsx
├─ imports Poppins, Open_Sans from 'next/font/google'
├─ imports './globals.css'
└─ provides fonts to all pages

globals.css
├─ imports Tailwind CSS
└─ defines CSS custom properties
```

## Icon Usage Map

```
Header/Footer
├─ Phone (phone link)
├─ Mail (email link)
├─ MapPin (address)
├─ Clock (working hours)
├─ Menu (mobile menu open)
├─ X (mobile menu close)
└─ ChevronDown (dropdown indicator)

Hero Section
├─ Award (trust badge)
└─ ArrowRight (CTA buttons)

About Section
├─ Target (mission)
├─ Eye (vision)
├─ Heart (values)
└─ Award (commitment)

Features Section
├─ Award (experience)
├─ BadgeCheck (quality)
├─ TrendingDown (pricing)
├─ ThumbsUp (satisfaction)
├─ Building2 (references)
└─ Package (products)

Products Section
├─ CheckCircle2 (features)
└─ ArrowRight (CTA)

Newsletter Section
├─ Mail (icon)
└─ Send (submit)

Contact Section
├─ User (name input)
├─ Mail (email input)
├─ Phone (phone input)
├─ MessageSquare (message input)
└─ Send (submit)
```

## Color Usage Guide

```
Primary (#CD8048)
├─ Brand logo
├─ Headings accent
├─ CTA buttons
├─ Icon backgrounds
├─ Links hover
├─ Statistics section background
└─ Newsletter section accents

Secondary (#2c3e50)
├─ Hero background
├─ Main headings
├─ Body text (dark)
└─ Footer background

Accent (#f8f9fa)
├─ Section backgrounds (alternating)
├─ Card backgrounds
└─ Input backgrounds

Text Muted (#6c757d)
├─ Secondary text
├─ Descriptions
└─ Footer text

White (#ffffff)
├─ Hero text
├─ Statistics text
├─ Card backgrounds
└─ Primary background
```

## Component Size Estimates

```
Lines of Code (approximate)
├─ Header.tsx              200 lines
├─ Footer.tsx              100 lines
├─ HeroSection.tsx         130 lines
├─ AboutSection.tsx        120 lines
├─ FeaturesSection.tsx     140 lines
├─ StatisticsSection.tsx   100 lines
├─ ProductsSection.tsx     180 lines
├─ NewsletterSection.tsx   130 lines
├─ ContactSection.tsx      240 lines
├─ page.tsx                 30 lines
├─ globals.css              55 lines
└─ utils.ts                  5 lines
─────────────────────────────────
Total:                   ~1,430 lines
```

---

**Quick Navigation:**
- See `IMPLEMENTATION_SUMMARY.md` for complete overview
- See `PROJECT_DOCUMENTATION.md` for technical details
- See `QUICK_START.md` for quick reference
