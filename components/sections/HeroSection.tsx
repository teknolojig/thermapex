'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Thermometer, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const features = [
    { icon: Shield, text: 'Polietilen İzolasyon' },
    { icon: Thermometer, text: 'Isı Yalıtımı' },
    { icon: CheckCircle2, text: 'Tekli & Çiftli Seçenekler' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-stone-950 via-amber-950/90 to-stone-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Copper Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-stone-950/50" />

      <div className="container mx-auto px-4 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Profesyonel Çözümler</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6 leading-tight"
            >
              <span className="text-primary">İzolasyonlu</span>{' '}
              Bakır Boru
              <br />
              <span className="text-amber-200/80">Çözümleri</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-amber-100/70 mb-8 leading-relaxed max-w-lg"
            >
              Yüksek kaliteli <strong className="text-white">polietilen izolasyonlu</strong> bakır borular
              ile ısıtma ve soğutma sistemleriniz için en iyi performansı sağlayın.
              Tekli ve çiftli seçeneklerle her ihtiyaca uygun çözümler.
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-amber-100/80">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="/urunler"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-primary/25 group"
              >
                Ürünleri İncele
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-lg font-semibold transition-all hover:scale-105"
              >
                Teklif Al
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-3xl blur-3xl" />

              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-stone-800/50 to-stone-900/50 rounded-3xl border border-amber-500/20 overflow-hidden backdrop-blur-sm p-8">
                {/* Product Cards */}
                <div className="space-y-4">
                  {/* Tekli Boru Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-4 border-primary bg-orange-900/50" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Tekli İzolasyonlu</h3>
                        <p className="text-amber-200/60 text-sm">Polietilen Bakır Boru</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Çiftli Boru Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-gradient-to-r from-amber-600/20 to-amber-700/10 border border-amber-500/30 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-amber-600/20 rounded-xl flex items-center justify-center">
                        <div className="flex gap-1">
                          <div className="w-5 h-5 rounded-full border-4 border-amber-400 bg-amber-900/50" />
                          <div className="w-5 h-5 rounded-full border-4 border-amber-400 bg-amber-900/50" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Çiftli İzolasyonlu</h3>
                        <p className="text-amber-200/60 text-sm">Polietilen Bakır Boru</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="grid grid-cols-2 gap-4 pt-4"
                  >
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-primary">%100</div>
                      <div className="text-xs text-amber-200/50">Bakır Saflığı</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-primary">EN 12735</div>
                      <div className="text-xs text-amber-200/50">Standart</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                Yeni Ürünler
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
