'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(205,128,72,0.5) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content - Horizontal Layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 pb-12 border-b border-gray-700/50">

          {/* Left - Brand & Description */}
          <div className="flex-1 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <Image
                  src="/beyaz.svg"
                  alt="Baykasoğlu"
                  width={200}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Türkiye'nin lider bakır boru tedarikçisi. 25 yılı aşkın tecrübemizle, yüksek kalite standartları ve müşteri memnuniyeti garantisi sunuyoruz.
              </p>
              <div className="flex items-center gap-3 text-gray-400 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">Pazartesi - Cuma: 08:00 - 18:00</span>
              </div>
            </motion.div>
          </div>

          {/* Center - Quick Links & Products */}
          <div className="flex flex-wrap gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-8 h-px bg-primary" />
                Hızlı Erişim
              </h4>
              <ul className="space-y-2">
                {[
                  { name: 'Ana Sayfa', href: '/' },
                  { name: 'Hakkımızda', href: '/hakkimizda' },
                  { name: 'İletişim', href: '/iletisim' },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-8 h-px bg-primary" />
                Ürünlerimiz
              </h4>
              <ul className="space-y-2">
                {[
                  { name: 'LWC Bakır Borular', href: '/urun-kategori/bakir-urunler/lwc-bakir-borular' },
                  { name: 'Kangal Bakır Boru', href: '/urun-kategori/kangal-bakir-boru' },
                  { name: 'Boy Bakır Borular', href: '/urun-kategori/bakir-urunler/boy-bakir-borular' },
                  { name: 'İzolasyonlu Bakır Boru', href: '/urun-kategori/bakir-urunler/izolasyonlu-bakir-boru' },
                  { name: 'Yivli Bakır Boru', href: '/urun-kategori/bakir-urunler/yivli-bakir-boru' },
                  { name: 'Bakır Pul', href: '/urun-kategori/bakir-pul' },
                ].map((product, index) => (
                  <li key={index}>
                    <Link
                      href={product.href}
                      className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                      <span>{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:max-w-xs"
          >
            <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="w-8 h-px bg-primary" />
              İletişim
            </h4>
            <div className="space-y-4">
              <a
                href="tel:02128759557"
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group bg-white/5 hover:bg-white/10 rounded-lg p-3"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Telefon</div>
                  <div className="font-semibold">0212 875 95 57</div>
                </div>
              </a>

              <a
                href="mailto:info@baykasoglu.com"
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group bg-white/5 hover:bg-white/10 rounded-lg p-3"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">E-posta</div>
                  <div className="font-semibold text-sm">info@baykasoglu.com</div>
                </div>
              </a>

              <div className="flex items-center gap-3 text-gray-400 bg-white/5 rounded-lg p-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Adres</div>
                  <div className="text-sm">Adnan Kahveci Mah. Büyükdere Cad.<br />Şirin Sanayi Sitesi, B Blok No:22 F/7<br />34528 Beylikdüzü / İSTANBUL</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-500 text-center md:text-left">
              © {currentYear} <span className="text-primary font-semibold">Baykasoğlu</span>. Tüm hakları saklıdır.
            </p>
            <a
              href="https://teknolojig.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              title="Teknolojig"
            >
              <span className="text-gray-500 text-sm">Powered by</span>
              <Image
                src="/teknolojig.svg"
                alt="Teknolojig"
                width={100}
                height={24}
                className="h-6 w-auto"
                title="Teknolojig"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
