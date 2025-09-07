"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { QuoteModal } from "@/components/ui/quote-modal"

const productImages = [
  {
    title: "PE Beyaz İzolasyonlu",
    description: "Yüksek Performans"
  },
  {
    title: "Çiftli İzolasyonlu",
    description: "Maksimum Verimlilik"
  },
  {
    title: "UV Dayanımlı",
    description: "Uzun Ömürlü"
  }
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % productImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full">
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Floating particles - fixed positions to avoid hydration mismatch */}
        {[
          { left: 15, top: 20 },
          { left: 85, top: 30 },
          { left: 25, top: 70 },
          { left: 75, top: 80 },
          { left: 45, top: 15 },
          { left: 65, top: 60 }
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Türkiye'nin Güvenilir Bakır Boru Üreticisi
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                Endüstriyel
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block relative"
              >
                <span className="relative z-10 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                  Bakır Boru
                </span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="block"
              >
                Çözümleri
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              Yüksek kaliteli PE izolasyonlu bakır boru sistemleri ile 
              projelerinize değer katıyoruz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                asChild
              >
                <Link href="/urunler">
                  <span className="relative z-10">Ürünlerimizi Keşfet</span>
                  <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <QuoteModal>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 px-8"
                >
                  <span>Hemen Teklif Al</span>
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </QuoteModal>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-8"
            >
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Yıllık Tecrübe</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">1500+</p>
                <p className="text-sm text-muted-foreground">Mutlu Müşteri</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">%100</p>
                <p className="text-sm text-muted-foreground">Yerli Üretim</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] h-[400px]"
          >
            {/* Main product showcase */}
            <div className="relative w-full h-full">
              {/* Copper pipe visual frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl overflow-hidden backdrop-blur-sm border border-primary/20">
                {/* Rotating product images */}
                {productImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center p-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: currentImage === index ? 1 : 0,
                      scale: currentImage === index ? 1 : 0.8,
                      rotateY: currentImage === index ? 0 : 90,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      {/* Real copper pipe image with white insulation */}
                      <div className="relative w-full max-w-md">
                        <div className="relative">
                          {/* White insulation layer */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-full h-32 shadow-xl" />
                          
                          {/* Copper pipe core */}
                          <div className="relative z-10 h-32 flex items-center justify-center">
                            <div className="w-4/5 h-20 bg-gradient-to-br from-[#b87333] via-[#d4924a] to-[#b87333] rounded-full shadow-inner transform rotate-3">
                              <div className="absolute inset-x-0 top-2 h-4 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                            </div>
                          </div>
                          
                          {/* PE texture pattern */}
                          <div 
                            className="absolute inset-0 opacity-10 rounded-full"
                            style={{
                              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`
                            }}
                          />
                        </div>
                        
                        {/* Product specifications */}
                        <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded border border-primary/20">
                            <span className="text-primary font-semibold">Çap:</span> 6.35-34.92mm
                          </div>
                          <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded border border-primary/20">
                            <span className="text-primary font-semibold">İzolasyon:</span> 13mm PE
                          </div>
                        </div>
                      </div>
                      
                      {/* Product label */}
                      <motion.div
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-sm font-medium text-primary">{image.title}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-br from-primary to-secondary text-white px-4 py-2 rounded-full shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <p className="text-sm font-bold">EN 12735-1</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-br from-secondary to-primary text-white px-4 py-2 rounded-full shadow-lg"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                }}
              >
                <p className="text-sm font-bold">ISO 9001</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - fixed position */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground/50 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}