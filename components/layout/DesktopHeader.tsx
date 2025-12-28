'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, FileText, ChevronDown, Home, Info, CircuitBoard, Mail } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import QuoteModal from '@/components/QuoteModal';

export default function DesktopHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const categoryLinks = [
    { name: 'LWC Bakır Borular', href: '/urun-kategori/bakir-urunler/lwc-bakir-borular' },
    { name: 'Kangal Bakır Boru', href: '/urun-kategori/kangal-bakir-boru' },
    { name: 'Boy Bakır Borular', href: '/urun-kategori/bakir-urunler/boy-bakir-borular' },
    { name: 'İzolasyonlu Bakır Boru', href: '/urun-kategori/bakir-urunler/izolasyonlu-bakir-boru' },
    { name: 'Yivli Bakır Boru', href: '/urun-kategori/bakir-urunler/yivli-bakir-boru' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden lg:flex fixed top-0 left-0 right-0 z-50 justify-center transition-all duration-500 ${
          isScrolled
            ? 'bg-transparent py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <motion.div
          layout
          className={`transition-all duration-500 ${
            isScrolled
              ? 'max-w-6xl bg-white/95 backdrop-blur-md shadow-lg rounded-full px-10 py-5'
              : 'container mx-auto px-4'
          }`}
        >
          <motion.div
            layout
            className="flex items-center justify-between gap-4"
          >
            {/* Logo with Resize Animation */}
            <Link href="/" className="flex items-center group relative z-10">
              <motion.div
                layout
                className={`relative transition-all duration-500 ${
                  isScrolled ? 'w-44 h-11' : 'w-48 h-12'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isScrolled ? (
                    <motion.div
                      key="logo-dark"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/logo.svg"
                        alt="Baykasoğlu"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="logo-white"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src="/beyaz.svg"
                        alt="Baykasoğlu"
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* Desktop Navigation with Modern Hover Effects */}
            <nav className="flex items-center gap-6">
              {/* Hakkımızda Link */}
              <Link
                href="/hakkimizda"
                className={`relative font-medium transition-all duration-300 px-1 py-2 flex items-center gap-2 ${
                  isScrolled
                    ? 'text-foreground/80 hover:text-primary'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                <Info className="w-4 h-4" />
                <span className="relative z-10">Hakkımızda</span>
                <motion.span
                  className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-primary-dark rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </Link>

              {/* Bakır Borular Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className={`relative flex items-center gap-2 font-medium transition-all duration-300 px-1 py-2 ${
                    isScrolled
                      ? 'text-foreground/80 hover:text-primary'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  <CircuitBoard className="w-4 h-4" />
                  <span className="relative z-10">Bakır Borular</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                  <motion.span
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-primary-dark rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isDropdownOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                    >
                      {categoryLinks.map((category, index) => (
                        <Link
                          key={category.name}
                          href={category.href}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                            className="block px-6 py-4 text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200 border-b border-gray-50 last:border-0 group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{category.name}</span>
                              <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bakır Pul Link */}
              <Link
                href="/urun-kategori/bakir-pul"
                className={`relative font-medium transition-all duration-300 px-1 py-2 flex items-center gap-2 ${
                  isScrolled
                    ? 'text-foreground/80 hover:text-primary'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                <CircuitBoard className="w-4 h-4" />
                <span className="relative z-10">Bakır Pul</span>
                <motion.span
                  className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-primary-dark rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </Link>

              {/* İletişim Link */}
              <Link
                href="/iletisim"
                className={`relative font-medium transition-all duration-300 px-1 py-2 flex items-center gap-2 ${
                  isScrolled
                    ? 'text-foreground/80 hover:text-primary'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span className="relative z-10">İletişim</span>
                <motion.span
                  className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-primary-dark rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </Link>
            </nav>

            {/* Action Buttons - Desktop */}
            <div className="flex items-center gap-3">
              {/* Hemen Ara Button */}
              <motion.a
                href="tel:02128759557"
                layout
                className={`group relative overflow-hidden rounded-full transition-all duration-500 ${
                  isScrolled
                    ? 'bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 py-2'
                    : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3'
                }`}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <Phone className={`transition-all duration-500 ${
                    isScrolled ? 'w-4 h-4' : 'w-5 h-5'
                  }`} />
                  <AnimatePresence mode="wait">
                    {!isScrolled && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-semibold whitespace-nowrap"
                      >
                        Hemen Ara
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              {/* Teklif Al Button */}
              <motion.button
                onClick={() => setIsQuoteModalOpen(true)}
                layout
                className={`group relative overflow-hidden rounded-full transition-all duration-500 ${
                  isScrolled
                    ? 'bg-primary hover:bg-primary-dark text-white px-3 py-2'
                    : 'bg-primary hover:bg-primary-dark text-white px-6 py-3'
                }`}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <FileText className={`transition-all duration-500 ${
                    isScrolled ? 'w-4 h-4' : 'w-5 h-5'
                  }`} />
                  <AnimatePresence mode="wait">
                    {!isScrolled && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-semibold whitespace-nowrap"
                      >
                        Teklif Al
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        isFromHeader={true}
      />
    </>
  );
}