'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const products = [
  {
    id: 'lwc-borular',
    title: 'LWC BAKIR BORULAR',
    image: '/images/products/BKS200075.jpg',
    link: '/urun-kategori/bakir-urunler/lwc-bakir-borular/',
  },
  {
    id: 'kangal-borular',
    title: 'KANGAL BAKIR BORULAR',
    image: '/images/products/BKS200254.jpg',
    link: '/urun-kategori/kangal-bakir-boru/',
  },
  {
    id: 'boy-borular',
    title: 'BOY BAKIR BORULAR',
    image: '/images/products/BKS200112.jpg',
    link: '/urun-kategori/bakir-urunler/boy-bakir-borular/',
  },
  {
    id: 'izolasyonlu-borular',
    title: 'İZOLASYONLU BAKIR BORU',
    image: '/images/products/BKS200129.jpg',
    link: '/urun-kategori/bakir-urunler/izolasyonlu-bakir-boru/',
  },
  {
    id: 'yivli-borular',
    title: 'YİVLİ BAKIR BORU',
    image: '/images/products/yivli.jpg',
    link: '/urun-kategori/bakir-urunler/yivli-bakir-boru/',
  },
  {
    id: 'bakir-pul',
    title: 'BAKIR PUL',
    image: '/images/products/M-4.jpg',
    link: '/urun-kategori/bakir-pul/',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, products.length - itemsPerPage);

  // Detect screen size for carousel behavior
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? maxIndex : prevIndex;
    });
  };

  return (
    <section id="urunler" className="py-20 md:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Ürünlerimiz
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6">
            Ürün <span className="text-primary">Gruplarımız</span>
          </h2>

          {/* Separator with Icon */}
          <div className="flex items-center justify-center gap-4">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-primary"
            />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md" />
              <ChevronDown className="w-8 h-8 text-primary relative z-10" />
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-primary"
            />
          </div>
        </motion.div>

        {/* Mobile Grid / Desktop Carousel Container */}
        <div className="relative">
          {/* Products Carousel Wrapper - Desktop Only */}
          <div className="relative">
            {/* Navigation Buttons - Desktop Only */}
            <button
              onClick={prevSlide}
              className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
            </button>

            <button
              onClick={nextSlide}
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
              aria-label="Next products"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
            </button>

            {/* Products - Grid on Mobile, Carousel on Desktop */}
            <div
              ref={ref}
              className="overflow-hidden"
            >
              <motion.div
                animate={{
                  x: isDesktop ? `-${currentIndex * (100 / itemsPerPage)}%` : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="grid grid-cols-2 gap-4 lg:flex lg:gap-6"
              >
                {products.map((product, index) => (
                  <motion.a
                    key={product.id}
                    href={product.link}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 lg:flex-none lg:w-[calc(25%-18px)]"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-500" />

                    {/* Hover Overlay with Primary Color */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/40 group-hover:via-primary/20 group-hover:to-orange-600/20 transition-all duration-500" />

                    {/* Animated Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent blur-xl" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      {/* Top Icon Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="self-end"
                      >
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                          <span className="text-white text-xl">→</span>
                        </div>
                      </motion.div>

                      {/* Bottom Content */}
                      <div className="relative">
                        <motion.div
                          initial={{ y: 0 }}
                          whileHover={{ y: -8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-white font-bold text-sm md:text-xl lg:text-2xl font-heading mb-3 drop-shadow-2xl leading-tight">
                            {product.title}
                          </h3>

                          {/* Animated Underline */}
                          <motion.div
                            className="flex gap-1 mb-4"
                            initial="rest"
                            whileHover="hover"
                          >
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="h-1 bg-primary rounded-full"
                                variants={{
                                  rest: { width: i === 0 ? '60%' : i === 1 ? '30%' : '10%' },
                                  hover: { width: i === 0 ? '80%' : i === 1 ? '15%' : '5%' }
                                }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                              />
                            ))}
                          </motion.div>

                          {/* View More Text */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2 text-white/80 text-sm font-medium"
                          >
                            <span>İncele</span>
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tl-3xl" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-br-3xl" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Pagination Dots - Desktop Only */}
          <div className="hidden lg:flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to position ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}