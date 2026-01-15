'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  const productLinks = [
    { name: 'Tekli İzolasyonlu', href: '/urunler?category=tekli-beyaz-polietilen' },
    { name: 'Çiftli İzolasyonlu', href: '/urunler?category=ciftli-beyaz-polietilen' },
    { name: 'Kauçuk İzolasyonlu', href: '/urunler?category=kaucuk-izolasyonlu-bakir-boru' },
    { name: 'Tüm Ürünler', href: '/urunler' },
  ];

  return (
    <footer className="bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #d97706 1px, transparent 1px), linear-gradient(to bottom, #d97706 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Top Decorative Line */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600" />

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="mb-5">
              <Image
                src="/beyaz.svg"
                alt="Thermapex"
                width={160}
                height={48}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-5">
              EN 12735 sertifikalı, polietilen izolasyonlu bakır boru üreticisi. Kalite ve güven.
            </p>
            <div className="flex items-center gap-2 text-stone-500 text-sm">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Pzt - Cum: 08:00 - 18:00</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Sayfalar
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-amber-500 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Ürünler
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((product, index) => (
                <li key={index}>
                  <Link
                    href={product.href}
                    className="text-stone-400 hover:text-amber-500 transition-colors text-sm"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              İletişim
            </h4>
            <div className="space-y-3">
              <a
                href="tel:02128759557"
                className="flex items-center gap-3 text-stone-400 hover:text-amber-500 transition-colors group"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span className="text-sm">0212 875 95 57</span>
              </a>
              <a
                href="mailto:info@thermapex.com"
                className="flex items-center gap-3 text-stone-400 hover:text-amber-500 transition-colors group"
              >
                <Mail className="w-4 h-4 text-amber-500" />
                <span className="text-sm">info@thermapex.com</span>
              </a>
              <div className="flex items-start gap-3 text-stone-400">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Adnan Kahveci Mah. Büyükdere Cad.<br />
                  Şirin Sanayi Sitesi, B Blok No:22 F/7<br />
                  34528 Beylikdüzü / İSTANBUL
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-800 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm text-center md:text-left">
            © {currentYear} <span className="text-amber-500 font-medium">Thermapex</span>. Tüm hakları saklıdır.
          </p>
          <a
            href="https://teknolojig.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="Teknolojig"
          >
            <span className="text-stone-600 text-xs">Powered by</span>
            <Image
              src="/teknolojig.svg"
              alt="Teknolojig"
              width={80}
              height={20}
              className="h-5 w-auto opacity-60"
              title="Teknolojig"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
