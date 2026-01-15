'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, ChevronRight, Package } from 'lucide-react';
import { getSeoContent } from './SeoContent';

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    products: number;
  };
}

// Kategori açıklamaları - her kategori için özel metin
const CATEGORY_INFO: { [key: string]: { name: string; description: string; subtitle: string } } = {
  'tekli-beyaz-polietilen': {
    name: 'Tekli İzolasyonlu Bakır Boru',
    description: '9mm beyaz polietilen izolasyonlu tekli bakır borular. Split ve VRV/VRF klima sistemleri için ideal çözüm.',
    subtitle: 'Polietilen Bakır Boru'
  },
  'ciftli-beyaz-polietilen': {
    name: 'Çiftli İzolasyonlu Bakır Boru',
    description: '9mm beyaz polietilen izolasyonlu çiftli bakır borular. Gaz ve sıvı hatları için tek pakette pratik çözüm.',
    subtitle: 'Polietilen Bakır Boru'
  },
  'kaucuk-izolasyonlu-bakir-boru': {
    name: 'Kauçuk İzolasyonlu Bakır Boru',
    description: '13mm siyah kauçuk izolasyonlu bakır borular. Split ve VRF klima sistemleri için profesyonel çözüm.',
    subtitle: 'Kauçuk Bakır Boru'
  }
};

interface Product {
  id: string;
  name: string;
  code: string;
  slug: string;
  mainImage?: string | null;
  specifications: any;
  categories: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ProductsContentProps {
  initialCategories?: Category[];
  initialProducts?: Product[];
  initialCategorySlug?: string;
}

export default function ProductsContent({
  initialCategories = [],
  initialProducts = [],
  initialCategorySlug = ''
}: ProductsContentProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(
    initialCategorySlug
      ? initialCategories.find(c => c.slug === initialCategorySlug) || null
      : null
  );
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [specFilters, setSpecFilters] = useState<{ [key: string]: Set<string> }>({});
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Get page title immediately from pathname or query (for instant display)
  const getPageTitle = () => {
    // Önce query parameter kontrol et
    const categoryFromQuery = searchParams.get('category');
    if (categoryFromQuery && CATEGORY_INFO[categoryFromQuery]) {
      return CATEGORY_INFO[categoryFromQuery].name;
    }

    if (pathname.startsWith('/urun-kategori/')) {
      const categorySlug = pathname.replace('/urun-kategori/', '');
      if (CATEGORY_INFO[categorySlug]) {
        return CATEGORY_INFO[categorySlug].name;
      }
    }
    return currentCategory ? currentCategory.name : 'Ürünlerimiz';
  };

  // Extract spec filters from initial products
  useEffect(() => {
    if (initialProducts.length > 0 && isInitialLoad) {
      extractSpecificationFilters(initialProducts);
    }
  }, []);

  // Kategoriyi al - pathname veya query parameter'dan
  useEffect(() => {
    let categorySlug = '';

    // Önce query parameter kontrol et (?category=xxx)
    const categoryFromQuery = searchParams.get('category');
    if (categoryFromQuery) {
      categorySlug = categoryFromQuery;
    }
    // Eğer query yoksa pathname kontrol et
    else if (pathname.startsWith('/urun-kategori/')) {
      categorySlug = pathname.replace('/urun-kategori/', '');
    }

    // Skip fetch on initial load if we have initial data matching the URL
    if (isInitialLoad && categorySlug === initialCategorySlug) {
      setIsInitialLoad(false);
      return;
    }

    setIsInitialLoad(false);

    if (categorySlug) {
      setSelectedCategory(categorySlug);
      fetchProductsForCategory(categorySlug);
    } else {
      setSelectedCategory('');
      setCurrentCategory(null);
      fetchProductsForCategory('');
    }

    // Only fetch categories if we don't have them
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [pathname, searchParams]);

  // Kategoriler yüklendiğinde current category'yi set et
  useEffect(() => {
    if (selectedCategory && categories.length > 0) {
      const found = categories.find(cat => cat.slug === selectedCategory);
      setCurrentCategory(found || null);
    } else if (!selectedCategory) {
      setCurrentCategory(null);
    }
  }, [selectedCategory, categories]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProductsForCategory = async (categorySlug: string) => {
    try {
      setLoading(true);
      const url = categorySlug
        ? `/api/products?category=${categorySlug}`
        : '/api/products';
      console.log('📦 Fetching products from:', url);

      const response = await fetch(url);
      const data = await response.json();

      console.log(`✅ Fetched ${data.length} products for category:`, categorySlug || 'all');
      setProducts(data);
      setFilteredProducts(data);
      extractSpecificationFilters(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const extractSpecificationFilters = (products: Product[]) => {
    const filters: { [key: string]: Set<string> } = {};

    products.forEach((product) => {
      if (product.specifications) {
        Object.entries(product.specifications).forEach(([key, value]) => {
          if (value && key !== 'urunAdi' && key !== 'boruTipi') {
            if (!filters[key]) {
              filters[key] = new Set();
            }
            filters[key].add(String(value));
          }
        });
      }
    });

    setSpecFilters(filters);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Arama filtresi
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query)
      );
    }

    // Teknik özellik filtreleri
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((p) => {
          const specValue = p.specifications?.[key];
          return specValue && String(specValue) === value;
        });
      }
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedFilters, products]);

  const toggleSpecFilter = (key: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? '' : value,
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFilters({});
  };

  const getFilterLabel = (key: string): string => {
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
    };
    return labels[key] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Minimal Amber Design */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white pt-28 md:pt-36 pb-20 md:pb-24 overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #d97706 1px, transparent 1px), linear-gradient(to bottom, #d97706 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl" />

        {/* Decorative Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Breadcrumb Style Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-amber-500" />
              <span className="text-amber-500 font-medium text-sm uppercase tracking-wider">
                {currentCategory ? 'Kategori' : 'Ürünler'}
              </span>
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                <Package className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-amber-400">
                  {filteredProducts.length} Ürün
                </span>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
              <span className="text-white">{getPageTitle()}</span>
            </h1>

            <p className="text-lg md:text-xl text-stone-400 leading-relaxed max-w-2xl">
              {selectedCategory && CATEGORY_INFO[selectedCategory]
                ? CATEGORY_INFO[selectedCategory].description
                : 'Polietilen izolasyonlu bakır boru çeşitlerimizi inceleyin'}
            </p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-6 mt-8"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-stone-400 text-sm">EN 12735 Sertifikalı</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-stone-400 text-sm">9mm Polietilen İzolasyon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="text-stone-400 text-sm">Hızlı Teslimat</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün adı veya kodu ile ara..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-lg"
            >
              <Filter className="w-5 h-5" />
              Filtrele
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                {/* Kategori seçilmediğinde kategori listesi göster */}
                {!selectedCategory && (
                  <>
                    <h3 className="text-lg font-bold font-heading mb-4">Kategoriler</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Link key={category.id} href={`/urun-kategori/${category.slug}`}>
                          <button className="w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <span>{category.name}</span>
                              <span className="text-sm opacity-75">
                                {category._count.products}
                              </span>
                            </div>
                          </button>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {/* Kategori seçildiğinde sadece filtreler göster */}
                {selectedCategory && (
                  <>
                    <div className="mb-4">
                      <Link href="/urunler">
                        <button className="text-sm text-primary hover:underline flex items-center gap-1">
                          <ChevronDown className="w-4 h-4 rotate-90" />
                          Tüm Kategoriler
                        </button>
                      </Link>
                    </div>

                    {Object.keys(specFilters).length > 0 && (
                      <>
                        <h3 className="text-lg font-bold font-heading mb-4">Filtrele</h3>
                        {Object.entries(specFilters).map(([key, values]) => (
                          <div key={key} className="mb-4">
                            <h4 className="font-medium text-sm text-gray-700 mb-2">
                              {getFilterLabel(key)}
                            </h4>
                            <div className="space-y-1 max-h-48 overflow-y-auto">
                              {Array.from(values).sort().map((value) => (
                                <label
                                  key={value}
                                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters[key] === value}
                                    onChange={() => toggleSpecFilter(key, value)}
                                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary checked:bg-primary checked:border-primary"
                                  />
                                  <span className="text-sm text-gray-700">{value}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">{filteredProducts.length}</span> ürün bulundu
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse">
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Ürün bulunamadı</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/urun/${product.slug}`}>
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                        {/* Image */}
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                          {product.mainImage ? (
                            <Image
                              src={product.mainImage}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package className="w-16 h-16" />
                            </div>
                          )}
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-white rounded-full backdrop-blur-sm">
                              {product.categories.name}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-bold font-heading text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">{product.code}</p>

                          {/* Specifications Preview */}
                          {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <div className="text-xs text-gray-600 space-y-1">
                                {Object.entries(product.specifications)
                                  .filter(([key]) => key !== 'urunAdi' && key !== 'boruTipi')
                                  .slice(0, 3)
                                  .map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="font-medium">{getFilterLabel(key)}:</span>
                                      <span className="text-gray-500">{String(value)}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}

                          {/* View Details */}
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
            )}
          </div>
        </div>

        {/* SEO Content Section */}
        {selectedCategory && currentCategory && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-100"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {currentCategory.name} Hakkında Detaylı Bilgi
              </h2>

              <div className="prose prose-lg max-w-none text-gray-700">
                {getSeoContent(selectedCategory)}
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}