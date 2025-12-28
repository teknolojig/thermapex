'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Circle, Layers } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 'tekli',
    title: 'Tekli İzolasyonlu',
    subtitle: 'Polietilen Bakır Boru',
    description: '9mm beyaz polietilen izolasyonlu tekli bakır borular. Split ve VRV sistemler için ideal.',
    image: '/tekli.png',
    link: '/urunler?category=tekli-beyaz-polietilen',
    icon: Circle,
    gradient: 'from-amber-500/20 to-orange-600/20',
    borderColor: 'border-amber-500/30',
  },
  {
    id: 'ciftli',
    title: 'Çiftli İzolasyonlu',
    subtitle: 'Polietilen Bakır Boru',
    description: '9mm beyaz polietilen izolasyonlu çiftli bakır borular. Gaz ve sıvı hatları için tek pakette.',
    image: '/tekli.png',
    link: '/urunler?category=ciftli-beyaz-polietilen',
    icon: Layers,
    gradient: 'from-orange-500/20 to-amber-600/20',
    borderColor: 'border-orange-500/30',
  },
];

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="urunler" className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3 bg-amber-50 px-4 py-1.5 rounded-full">
            Ürünlerimiz
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-stone-900 mb-4">
            Ürün <span className="text-amber-600">Gruplarımız</span>
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Yüksek kaliteli polietilen izolasyonlu bakır borular ile klima ve soğutma sistemleriniz için en iyi çözümler
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              >
                <Link href={product.link}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border ${product.borderColor}`}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Content */}
                    <div className="relative p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                              <Icon className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                                {product.title}
                              </h3>
                              <p className="text-amber-600 font-medium text-sm">
                                {product.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: -45 }}
                          className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors"
                        >
                          <ArrowRight className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                        </motion.div>
                      </div>

                      {/* Image */}
                      <div className="relative h-48 mb-6 bg-gradient-to-br from-stone-100 to-stone-50 rounded-2xl overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Description */}
                      <p className="text-stone-600 mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Bottom CTA */}
                      <div className="mt-6 pt-6 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-stone-500 text-sm">Ürünleri İncele</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-amber-600 font-semibold flex items-center gap-1"
                        >
                          Detaylı Bilgi
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* All Products Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-amber-500/25"
          >
            Tüm Ürünleri Görüntüle
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
