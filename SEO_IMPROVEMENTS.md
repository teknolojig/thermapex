# SEO ve Performans Geliştirmeleri - Baykasoğlu Bakır

## 📋 Yapılan İyileştirmeler

### 1. ✅ Canonical URLs
**Neden Önemli:** Duplicate content'i önler, arama motorlarına hangi URL'nin ana versiyon olduğunu söyler.

**Eklenen Sayfalar:**
- Ana sayfa: `https://baykasoglu.com`
- Hakkımızda: `https://baykasoglu.com/hakkimizda`
- İletişim: `https://baykasoglu.com/iletisim`
- Bakır Fiyatları: `https://baykasoglu.com/bakir-fiyatlari`
- Tüm Ürünler: `https://baykasoglu.com/urunler`
- Tüm Kategori Sayfaları (6 adet)
- Tüm Ürün Detay Sayfaları (dinamik)

**Kod Örneği:**
```typescript
alternates: {
  canonical: 'https://baykasoglu.com/urun/lwc-bakir-boru-3-4-x0-35-mm',
}
```

---

### 2. ✅ Schema.org / JSON-LD Structured Data
**Neden Önemli:** Rich snippets, Google'da gelişmiş gösterim, bilgi panelleri.

**Oluşturulan Schema Tipleri:**

#### a) Organization Schema
- Şirket bilgileri
- İletişim detayları
- Lokasyon
- **Dosya:** `components/seo/OrganizationSchema.tsx`

#### b) Product Schema
- Ürün adı, açıklama
- SKU, kategori
- Marka bilgisi
- Stok durumu
- **Dosya:** `components/seo/ProductSchema.tsx`

#### c) BreadcrumbList Schema
- Sayfa hiyerarşisi
- Navigation yolu
- **Dosya:** `components/seo/BreadcrumbSchema.tsx`

**Kullanım:**
```tsx
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import ProductSchema from '@/components/seo/ProductSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

// Ana sayfada
<OrganizationSchema />

// Ürün sayfasında
<ProductSchema 
  name="LWC Bakır Boru 3/4"
  description="..."
  sku="BKS200145"
  category="Bakır Borular"
/>

// Breadcrumb ile
<BreadcrumbSchema items={[
  { name: 'Ürünler', url: 'https://baykasoglu.com/urunler' },
  { name: 'LWC Bakır Boru', url: 'https://baykasoglu.com/urun/...' }
]} />
```

---

### 3. ✅ Breadcrumb Navigation
**Neden Önemli:** UX iyileştirmesi, SEO sinyali, kullanıcı navigasyonu.

**Özellikler:**
- Responsive tasarım
- Aria labels (accessibility)
- Home icon
- Otomatik current page detection
- **Dosya:** `components/ui/Breadcrumbs.tsx`

**Kullanım:**
```tsx
<Breadcrumbs items={[
  { name: 'Ürünler', url: '/urunler' },
  { name: 'Bakır Borular', url: '/urun-kategori/bakir-urunler' },
  { name: 'LWC Bakır Boru 3/4"', url: '#' }
]} />
```

---

### 4. ✅ Next.js Image Optimization
**Neden Önemli:** Performans, otomatik WebP/AVIF dönüşümü, lazy loading.

**Yapılandırma** (`next.config.ts`):
```typescript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

**Avantajlar:**
- Otomatik WebP/AVIF formatı
- Responsive image sizes
- Lazy loading (otomatik)
- Browser caching

---

### 5. ✅ Robots.txt
**Neden Önemli:** Arama motorlarına hangi sayfaları tarayabileceğini söyler.

**Dosya:** `public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://baykasoglu.com/sitemap.xml

Disallow: /api/
Disallow: /_next/
```

---

### 6. ✅ Sitemap.xml (Dinamik)
**Durum:** Zaten mevcut, tüm ürünler otomatik ekleniyor.

**Dosya:** `app/sitemap.ts`
- Ana sayfa
- Tüm statik sayfalar
- Tüm kategori sayfaları
- Veritabanından tüm ürünler (dinamik)

---

## 📊 SEO Checklist Durumu

### ✅ Tamamlanan
- [x] Title tags (tüm sayfalarda)
- [x] Meta descriptions
- [x] Meta keywords
- [x] OpenGraph tags
- [x] Canonical URLs
- [x] Structured Data (Schema.org)
- [x] Breadcrumbs (UI + Schema)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Image optimization
- [x] Mobile responsive
- [x] SSL/HTTPS ready

### ⚠️ Kullanıma Hazır (Entegrasyona ihtiyaç var)
- [ ] Schema.org komponentlerini sayfalara ekle
- [ ] Breadcrumb'ları sayfalara ekle
- [ ] Alt text'leri kontrol et (mevcut resimlerde)

---

## 🎯 Kullanım Kılavuzu

### Ana Sayfaya Organization Schema Eklemek:
```tsx
// app/page.tsx
import OrganizationSchema from '@/components/seo/OrganizationSchema';

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      {/* Diğer içerik */}
    </>
  );
}
```

### Ürün Sayfasına Product Schema ve Breadcrumb Eklemek:
```tsx
// app/urun/[slug]/page.tsx
'use client';

import ProductSchema from '@/components/seo/ProductSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function ProductPage({ product }: Props) {
  const breadcrumbItems = [
    { name: 'Ürünler', url: '/urunler' },
    { name: product.category.name, url: `/urun-kategori/${product.category.slug}` },
    { name: product.name, url: `/urun/${product.slug}` }
  ];

  return (
    <>
      <ProductSchema
        name={product.name}
        description={product.description}
        sku={product.code}
        category={product.category.name}
      />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({
        ...item,
        url: `https://baykasoglu.com${item.url}`
      }))} />
      
      <div className="container">
        <Breadcrumbs items={breadcrumbItems} />
        {/* Ürün içeriği */}
      </div>
    </>
  );
}
```

### Kategori Sayfasına Breadcrumb Eklemek:
```tsx
// app/urunler/ProductsContent.tsx
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

const breadcrumbItems = [
  { name: 'Ürünler', url: '/urunler' },
  { name: 'LWC Bakır Borular', url: '/urun-kategori/bakir-urunler/lwc-bakir-borular' }
];

<>
  <BreadcrumbSchema items={breadcrumbItems.map(item => ({
    ...item,
    url: `https://baykasoglu.com${item.url}`
  }))} />
  <Breadcrumbs items={breadcrumbItems} />
</>
```

---

## 🔍 Test Araçları

### 1. Google Search Console
- Sitemap submit et: `https://baykasoglu.com/sitemap.xml`
- URL inspection tool ile sayfa kontrolü
- Core Web Vitals izleme

### 2. Google Rich Results Test
https://search.google.com/test/rich-results
- Schema.org yapısını test et
- Rich snippets önizleme

### 3. PageSpeed Insights
https://pagespeed.web.dev/
- Performans skoru
- Core Web Vitals
- SEO skorları

### 4. Schema Markup Validator
https://validator.schema.org/
- JSON-LD syntax kontrolü

---

## 📈 Beklenen SEO Faydaları

1. **Rich Snippets:**
   - Ürün bilgileri Google'da direkt görünür
   - Stok durumu, fiyat bilgisi (eklenirse)
   - Rating/reviews (eklenirse)

2. **Improved Click-Through Rate (CTR):**
   - Breadcrumbs URL'de görünür
   - Rich snippets daha fazla alan kaplar
   - Daha profesyonel görünüm

3. **Better Indexing:**
   - Canonical URLs duplicate content'i önler
   - Sitemap tüm sayfaların hızlı indexlenmesini sağlar
   - Structured data context sağlar

4. **Mobile Performance:**
   - WebP/AVIF formatları %30-50 daha küçük
   - Lazy loading sayfa hızını artırır
   - Responsive images optimal yükleme

---

## 🚀 Production Deployment Checklist

- [ ] Tüm environment variables set edildi mi?
- [ ] `next.config.ts` production'da çalışıyor mu?
- [ ] Sitemap URL'leri production domain'i kullanıyor mu?
- [ ] Canonical URLs production domain'i kullanıyor mu?
- [ ] robots.txt production domain'i kullanıyor mu?
- [ ] SSL certificate aktif mi?
- [ ] Google Search Console ownership doğrulandı mı?
- [ ] Sitemap Search Console'a submit edildi mi?

---

## 📞 Destek

Sorularınız için: teknolojig.com

