'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  category: {
    name: string;
    slug: string;
  };
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, products.length - itemsPerPage);

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

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Bu kategoride henüz ürün bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {products.length > itemsPerPage && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
            aria-label="Önceki ürünler"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
            aria-label="Sonraki ürünler"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" />
          </button>
        </>
      )}

      {/* Products Carousel */}
      <div className="overflow-hidden">
        <motion.div
          animate={{
            x: `-${currentIndex * (100 / itemsPerPage)}%`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="flex gap-4 lg:gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 flex-none w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-18px)]"
            >
              <Link href={`/urunler/${product.slug}`} className="block w-full h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={product.imageUrl || '/images/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-500" />

                {/* Hover Overlay with Primary Color */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/40 group-hover:via-primary/20 group-hover:to-orange-600/20 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  {/* Top Icon Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="self-end"
                  >
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                      <span className="text-white text-lg">→</span>
                    </div>
                  </motion.div>

                  {/* Bottom Content */}
                  <div className="relative">
                    <motion.div
                      initial={{ y: 0 }}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white font-bold text-lg md:text-xl font-heading mb-2 drop-shadow-2xl leading-tight">
                        {product.name}
                      </h3>

                      {product.description && (
                        <p className="text-white/80 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Animated Underline */}
                      <motion.div
                        className="flex gap-1 mb-3"
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
                        <span>Detayları Gör</span>
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
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-br-3xl" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      {products.length > itemsPerPage && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`${index + 1}. pozisyona git`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
