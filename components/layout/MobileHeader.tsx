'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, FileText, Menu, X, ChevronDown, Home, Info, Mail, CircuitBoard, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import QuoteModal from '@/components/QuoteModal';

export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Mobil menü açıkken scroll'u engelle - Basit ve güvenli yöntem
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Sadece overflow hidden kullan, position fixed kullanma
      document.body.style.overflow = 'hidden';
      // iOS Safari için ek güvenlik
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const categoryLinks = [
    { name: 'LWC Bakır Borular', href: '/urun-kategori/bakir-urunler/lwc-bakir-borular' },
    { name: 'Kangal Bakır Boru', href: '/urun-kategori/kangal-bakir-boru' },
    { name: 'Boy Bakır Borular', href: '/urun-kategori/bakir-urunler/boy-bakir-borular' },
    { name: 'İzolasyonlu Bakır Boru', href: '/urun-kategori/bakir-urunler/izolasyonlu-bakir-boru' },
    { name: 'Yivli Bakır Boru', href: '/urun-kategori/bakir-urunler/yivli-bakir-boru' },
  ];

  return (
    <>
      {/* Mobile Header - Transparent ilk açılışta, scroll ile solid */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo with Animation - Desktop mantığı */}
            <Link href="/" className="flex items-center relative z-10">
              <motion.div
                className="relative w-36 h-9"
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

            {/* Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Full Screen Modern */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[9999] bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
          >
            {/* Decorative Elements - Same as category page */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#a2602e_0%,_transparent_50%)] opacity-20 animate-pulse" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#a2602e_0%,_transparent_50%)] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#a2602e_0%,_transparent_70%)] opacity-10" />
            </div>

            <div className="absolute inset-0 opacity-30">
              <div className="absolute w-96 h-96 bg-primary rounded-full blur-3xl" style={{ top: '10%', right: '10%' }} />
              <div className="absolute w-96 h-96 bg-primary/50 rounded-full blur-3xl" style={{ bottom: '10%', left: '10%' }} />
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 left-6 z-50"
            >
              <Image
                src="/beyaz.svg"
                alt="Baykasoğlu"
                width={150}
                height={40}
                className="object-contain"
              />
            </motion.div>

            {/* Menu Content */}
            <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto relative z-10">
              <nav className="flex-1 flex flex-col justify-center">
                {/* Main Links */}
                <div className="space-y-2 max-w-md mx-auto w-full">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10 rounded-2xl transition-all group"
                    >
                      <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-xl font-semibold">Ana Sayfa</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Link
                      href="/hakkimizda"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10 rounded-2xl transition-all group"
                    >
                      <Info className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-xl font-semibold">Hakkımızda</span>
                    </Link>
                  </motion.div>

                  {/* Bakır Borular Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between px-6 py-4 text-white hover:bg-white/10 rounded-2xl transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <CircuitBoard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-semibold">Bakır Borular</span>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 transition-transform ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-14 pr-6 py-2 space-y-1">
                            {categoryLinks.map((category, index) => (
                              <motion.div
                                key={category.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href={category.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                >
                                  {category.name}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Link
                      href="/urun-kategori/bakir-pul"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10 rounded-2xl transition-all group"
                    >
                      <CircuitBoard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-xl font-semibold">Bakır Pul</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      href="/iletisim"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10 rounded-2xl transition-all group"
                    >
                      <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-xl font-semibold">İletişim</span>
                    </Link>
                  </motion.div>
                </div>
              </nav>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 max-w-md mx-auto w-full mt-8"
              >
                <a
                  href="tel:+905454215761"
                  className="flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-2xl hover:bg-green-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Phone className="w-6 h-6" />
                  Hemen Ara
                </a>

                <button
                  onClick={() => {
                    setIsQuoteModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-white text-primary px-6 py-4 rounded-2xl hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FileText className="w-6 h-6" />
                  Teklif Al
                </button>

                <a
                  href="https://wa.me/905454215761"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-white/10 border-2 border-white/30 text-white px-6 py-4 rounded-2xl hover:bg-white/20 transition-all font-semibold text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  WhatsApp
                </a>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-center text-white/80"
              >
                <p className="text-sm mb-1">Müşteri Hizmetleri</p>
                <a href="tel:02128759557" className="text-xl font-bold text-white">
                  0212 875 95 57
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        isFromHeader={true}
      />
    </>
  );
}
