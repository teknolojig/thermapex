import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import ProductsSection from '@/components/sections/ProductsSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

export const metadata = {
  title: 'Baykasoğlu - Türkiye\'nin Lider Bakır Boru Tedarikçisi',
  description: 'Türkiye\'nin güvenilir bakır boru tedarikçisi Baykasoğlu. LWC, kangal, boy, izolasyonlu ve yivli bakır boru çeşitleri ile bakır pul ürünlerinde 25 yılı aşkın tecrübe. Kaliteli ürünler, uygun fiyatlar, hızlı teslimat.',
  keywords: 'bakır boru, LWC bakır boru, kangal bakır boru, boy bakır boru, izolasyonlu bakır boru, yivli bakır boru, bakır pul, bakır boru fiyatları, bakır boru istanbul, baykasoğlu, bakır boru tedarikçisi',
  alternates: {
    canonical: 'https://baykasoglu.com',
  },
  openGraph: {
    title: 'Baykasoğlu - Türkiye\'nin Lider Bakır Boru Tedarikçisi',
    description: 'Türkiye\'nin güvenilir bakır boru tedarikçisi Baykasoğlu. 25 yılı aşkın tecrübe ile LWC, kangal, boy, izolasyonlu bakır boru ve bakır pul ürünlerinde kaliteli hizmet.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://baykasoglu.com',
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <StatisticsSection />
        <ProductsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
