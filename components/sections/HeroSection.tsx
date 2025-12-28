'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/baykashero.jpg"
          alt="Baykasoğlu Bakır Boru"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        {/* Additional vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6"
          >
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Türkiye'nin Güvenilir Markası</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight drop-shadow-2xl"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}
          >
            Türkiye'nin Lider{' '}
            <span className="text-primary drop-shadow-2xl">Bakır Boru</span>{' '}
            Tedarikçisi
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)' }}
          >
            Yüksek kaliteli bakır boru, kangal bakır boru ve bakır pul ürünleriyle
            sektörde 25 yılı aşkın tecrübemizle yanınızdayız. Rekabetçi fiyat,
            hızlı teslimat ve %100 müşteri memnuniyeti garantisi.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#urunler"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              Ürünlerimizi İnceleyin
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
            >
              Hemen İletişime Geçin
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            document.getElementById('hakkimizda')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-white/80 text-sm font-medium drop-shadow-lg">
            Aşağı Kaydır
          </span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1 backdrop-blur-sm bg-white/5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
