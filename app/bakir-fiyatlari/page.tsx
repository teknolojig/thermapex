'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Phone, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CopperPricesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-secondary via-secondary/95 to-primary-dark relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(205,128,72,0.5) 1px, transparent 0)`,
              backgroundSize: '48px 48px'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <TrendingUp className="w-12 h-12 text-primary" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
                <span className="text-primary">Bakır Fiyatları</span>
              </h1>

              <p className="text-white/80 text-lg md:text-xl mb-12">
                Güncel bakır boru fiyatları için bizimle iletişime geçin
              </p>

              {/* Contact Cards */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <motion.a
                  href="tel:02128759557"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-2xl p-8 transition-all border border-white/20"
                >
                  <Phone className="w-8 h-8 text-primary mb-4 mx-auto" />
                  <h3 className="text-white font-semibold mb-2">Telefon</h3>
                  <p className="text-white/70 text-sm mb-3">Hemen arayın</p>
                  <p className="text-primary font-bold text-xl">0212 875 95 57</p>
                </motion.a>

                <motion.a
                  href="mailto:info@baykasoglu.com"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-2xl p-8 transition-all border border-white/20"
                >
                  <Mail className="w-8 h-8 text-primary mb-4 mx-auto" />
                  <h3 className="text-white font-semibold mb-2">E-posta</h3>
                  <p className="text-white/70 text-sm mb-3">Teklif isteyin</p>
                  <p className="text-primary font-bold text-lg">info@baykasoglu.com</p>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-secondary mb-6">
                Güncel Fiyat Teklifleri
              </h2>

              <p className="text-text-muted mb-8 leading-relaxed">
                Bakır boru fiyatları günlük piyasa koşullarına göre değişkenlik göstermektedir.
                En güncel ve size özel fiyat teklifimiz için lütfen bizimle iletişime geçin.
              </p>

              <div className="space-y-4 text-sm text-text-muted mb-8">
                <p className="flex items-start gap-2 justify-center">
                  <span className="text-primary mt-1">•</span>
                  <span>Tüm ürünlerimiz için güncel fiyat bilgisi</span>
                </p>
                <p className="flex items-start gap-2 justify-center">
                  <span className="text-primary mt-1">•</span>
                  <span>Toptan alımlarda özel indirimler</span>
                </p>
                <p className="flex items-start gap-2 justify-center">
                  <span className="text-primary mt-1">•</span>
                  <span>Hızlı teklif ve teslimat</span>
                </p>
              </div>

              <a
                href="/iletisim"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Teklif Almak İçin İletişime Geçin
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
