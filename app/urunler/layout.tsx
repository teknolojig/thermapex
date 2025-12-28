import { headers } from 'next/headers';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Kategori SEO bilgileri
const CATEGORY_SEO: { [key: string]: { title: string; description: string; keywords: string } } = {
  'bakir-urunler/lwc-bakir-borular': {
    title: 'LWC Bakır Boru Çeşitleri ve Ölçüleri | Baykasoğlu',
    description: 'LWC bakır boru çeşitleri ve teknik özellikleri. Soğutma ve iklimlendirme sistemleri için kaliteli LWC bakır borular.',
    keywords: 'lwc bakır boru, lwc boru ölçüleri, lwc bakır boru çeşitleri, soğutma borusu'
  },
  'bakir-urunler/boy-bakir-borular': {
    title: 'Boy Bakır Boru Çeşitleri ve Ölçüleri | Baykasoğlu',
    description: 'Boy bakır boru ölçüleri ve teknik detayları. Farklı uzunluklarda kaliteli boy bakır boru çeşitleri.',
    keywords: 'boy bakır boru, boy boru çeşitleri, bakır boru ölçüleri'
  },
  'bakir-urunler/izolasyonlu-bakir-boru': {
    title: 'İzolasyonlu Bakır Boru Çeşitleri | Baykasoğlu',
    description: 'İzolasyonlu bakır boru çeşitleri ve özellikleri. Enerji tasarruflu özel kaplamalı bakır borular.',
    keywords: 'izolasyonlu bakır boru, izolasyon boru çeşitleri, kaplı bakır boru'
  },
  'bakir-urunler/yivli-bakir-boru': {
    title: 'Yivli Bakır Boru Çeşitleri ve Özellikleri | Baykasoğlu',
    description: 'Yivli bakır boru çeşitleri ve kullanım alanları. Özel tasarımlı yüzeye sahip bakır borular.',
    keywords: 'yivli bakır boru, yivli boru çeşitleri, özel bakır boru'
  },
  'kangal-bakir-boru': {
    title: 'Kangal Bakır Boru Çeşitleri | Baykasoğlu',
    description: 'Kangal bakır boru çeşitleri ve özellikleri. Rulo halinde esnek bakır borular, tesisat için ideal.',
    keywords: 'kangal bakır boru, rulo bakır boru, kangal boru çeşitleri'
  },
  'bakir-pul': {
    title: 'Bakır Pul Çeşitleri ve Ölçüleri | Baykasoğlu',
    description: 'Bakır pul ürünleri ve teknik özellikleri. Farklı sektörler için kaliteli bakır levha ve rulo çeşitleri.',
    keywords: 'bakır pul, bakır levha, bakır rulo, bakır pul çeşitleri'
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  // Kategori sayfası kontrolü
  if (pathname.startsWith('/urun-kategori/')) {
    const categorySlug = pathname.replace('/urun-kategori/', '');
    const seoData = CATEGORY_SEO[categorySlug];

    if (seoData) {
      return {
        title: seoData.title,
        description: seoData.description,
        keywords: seoData.keywords,
        openGraph: {
          title: seoData.title,
          description: seoData.description,
          type: 'website',
          locale: 'tr_TR',
          url: `https://baykasoglu.com${pathname}`,
        },
        alternates: {
          canonical: `https://baykasoglu.com${pathname}`,
        },
      };
    }
  }

  // Varsayılan metadata (tüm ürünler sayfası)
  return {
    title: 'Bakır Boru Ürünlerimiz | Baykasoğlu',
    description: 'Bakır boru çeşitleri, LWC, kangal, boy, izolasyonlu ve yivli bakır borular. Kaliteli bakır ürünler.',
    keywords: 'bakır boru, lwc boru, kangal boru, bakır pul, bakır boru çeşitleri',
    openGraph: {
      title: 'Bakır Boru Ürünlerimiz | Baykasoğlu',
      description: 'Bakır boru çeşitleri, LWC, kangal, boy, izolasyonlu ve yivli bakır borular.',
      type: 'website',
      locale: 'tr_TR',
      url: 'https://baykasoglu.com/urunler',
    },
    alternates: {
      canonical: 'https://baykasoglu.com/urunler',
    },
  };
}

export default function UrunlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
