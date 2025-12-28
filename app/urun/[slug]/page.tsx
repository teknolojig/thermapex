'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  Phone,
  Mail,
  Check,
  ChevronRight,
  Ruler,
  Layers,
  Box,
  MapPin,
  Activity,
  Gauge,
  Hash,
  Weight,
  CircleDot,
  FileText,
  Home
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuoteModal from '@/components/QuoteModal';

interface Product {
  id: string;
  name: string;
  code: string;
  slug: string;
  description?: string;
  mainImage?: string;
  specifications: any;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug as string);
    }
  }, [params.slug]);

  const fetchProduct = async (slug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${slug}`);
      const data = await response.json();
      setProduct(data);

      // Fetch similar products from same category
      if (data && data.category) {
        const similarResponse = await fetch(`/api/products?category=${data.category.slug}&limit=4`);
        const similarData = await similarResponse.json();
        // Filter out current product
        setSimilarProducts(similarData.filter((p: Product) => p.id !== data.id).slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSpecLabel = (key: string): string => {
    const labels: { [key: string]: string } = {
      cap: 'Çap',
      etKalinlik: 'Et Kalınlığı',
      ambalajTuru: 'Ambalaj Türü',
      uretimYeri: 'Üretim Yeri',
      yivYuksekligi: 'Yiv Yüksekliği',
      yivAcisi: 'Yiv Açısı',
      sarmaDerecesi: 'Sarma Derecesi',
      disSayisi: 'Diş Sayısı',
      kgPerM: 'KG/M',
      boruTipi: 'Boru Tipi',
      urunAdi: 'Ürün Adı',
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const getSpecIcon = (key: string) => {
    const icons: { [key: string]: any } = {
      cap: CircleDot,
      etKalinlik: Layers,
      ambalajTuru: Box,
      uretimYeri: MapPin,
      yivYuksekligi: Ruler,
      yivAcisi: Activity,
      sarmaDerecesi: Gauge,
      disSayisi: Hash,
      kgPerM: Weight,
    };
    return icons[key] || CircleDot;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Yükleniyor...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h2>
            <Link href="/urunler" className="text-primary hover:underline">
              Ürünlere Dön
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 md:pt-32 pb-16 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#a2602e_0%,_transparent_50%)] opacity-20 animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#a2602e_0%,_transparent_50%)] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#a2602e_0%,_transparent_70%)] opacity-10" />
          </div>

          {/* Moving Gradient Orbs */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute w-96 h-96 bg-primary rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ top: '10%', right: '10%' }}
            />
            <motion.div
              className="absolute w-96 h-96 bg-primary/50 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ bottom: '10%', left: '10%' }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb - Horizontal Scrollable */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 overflow-x-auto scrollbar-hide"
            >
              <div className="flex items-center gap-2 text-sm text-white/70 whitespace-nowrap min-w-max">
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5 flex-shrink-0">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Ana Sayfa</span>
                </Link>
                <span className="flex-shrink-0">/</span>
                <Link href="/urunler" className="hover:text-white transition-colors flex-shrink-0">Ürünler</Link>
                <span className="flex-shrink-0">/</span>
                <Link href={`/urun-kategori/${product.category.slug}`} className="hover:text-white transition-colors flex-shrink-0">
                  {product.category.name}
                </Link>
                <span className="flex-shrink-0">/</span>
                <span className="text-white flex-shrink-0">{product.name}</span>
              </div>
            </motion.div>

            {/* Product Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">{product.category.name}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-lg md:text-xl text-white/90">
                Ürün Kodu: <span className="font-semibold text-white">{product.code}</span>
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Ürünlere Dön
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                  {product.mainImage ? (
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package className="w-24 h-24" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Product Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Description */}
              {product.description && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold font-heading mb-3 text-secondary">Ürün Açıklaması</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Specifications */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6">
                  <h3 className="text-xl font-bold font-heading flex items-center gap-2">
                    <Layers className="w-6 h-6" />
                    Teknik Özellikler
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications && Object.entries(product.specifications)
                      .filter(([key]) => key !== 'urunAdi' && key !== 'boruTipi')
                      .map(([key, value]) => {
                        const IconComponent = getSpecIcon(key);
                        return (
                          <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 uppercase tracking-wider">{getSpecLabel(key)}</div>
                              <div className="text-base font-semibold text-gray-900">{String(value)}</div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Category Info */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold font-heading text-secondary">Kategori</h3>
                </div>
                <Link href={`/urun-kategori/${product.category.slug}`}>
                  <div className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                    <span className="font-medium">{product.category.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>

              {/* CTA Section */}
              <div className="bg-secondary text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold font-heading mb-3">İletişime Geçin</h3>
                <p className="text-white/90 mb-6">
                  Bu ürün hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                  >
                    <FileText className="w-5 h-5" />
                    Teklif Al
                  </button>

                  <a
                    href="tel:02128759557"
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    Hemen Ara
                  </a>

                  <a
                    href={`https://wa.me/905454215761?text=Merhaba, ${product.name} (${product.code}) hakkında bilgi almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#20BA5A] transition-colors font-medium"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      <path d="M12.05 2.5C6.53 2.5 2.05 6.98 2.05 12.5c0 1.93.56 3.73 1.51 5.26L2 22.5l4.84-1.52c1.48.85 3.18 1.32 4.99 1.32 5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.18c-1.66 0-3.21-.5-4.51-1.35l-.32-.19-3.34 1.05 1.06-3.26-.21-.33c-.93-1.48-1.42-3.19-1.42-4.95 0-4.97 4.04-9.01 9.01-9.01s9.01 4.04 9.01 9.01-4.04 9.03-9.01 9.03z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">Benzer Ürünler</h2>
                    <p className="text-gray-600 mt-2">Aynı kategoriden diğer ürünlerimiz</p>
                  </div>
                  <Link
                    href={`/urun-kategori/${product.category.slug}`}
                    className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  >
                    Tümünü Gör
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarProducts.map((similarProduct, index) => (
                    <motion.div
                      key={similarProduct.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Link href={`/urun/${similarProduct.slug}`}>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                          <div className="relative aspect-square bg-gray-100 overflow-hidden">
                            {similarProduct.mainImage ? (
                              <Image
                                src={similarProduct.mainImage}
                                alt={similarProduct.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Package className="w-16 h-16" />
                              </div>
                            )}
                            <div className="absolute top-3 right-3">
                              <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-white rounded-full backdrop-blur-sm">
                                {similarProduct.category.name}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold font-heading text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                              {similarProduct.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">{similarProduct.code}</p>

                            {similarProduct.specifications && Object.keys(similarProduct.specifications).length > 0 && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-600 space-y-1">
                                  {Object.entries(similarProduct.specifications)
                                    .filter(([key]) => key !== 'urunAdi' && key !== 'boruTipi')
                                    .slice(0, 2)
                                    .map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="font-medium">{getSpecLabel(key)}:</span>
                                        <span className="text-gray-500">{String(value)}</span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}

                            <div className="mt-4 flex items-center justify-between text-sm">
                              <span className="text-primary font-medium group-hover:underline">
                                Detayları Gör
                              </span>
                              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center md:hidden">
                  <Link
                    href={`/urun-kategori/${product.category.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-medium"
                  >
                    Tümünü Gör
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productName={product?.name}
        productCode={product?.code}
      />
    </>
  );
}