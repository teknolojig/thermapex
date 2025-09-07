"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Factory, Shield, Sparkles, Truck } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { ReferencesSection } from "@/components/home/references-section"
import { ProcessSection } from "@/components/home/process-section"
import { QuoteModal } from "@/components/ui/quote-modal"

const products = [
  {
    title: "PE Beyaz İzolasyonlu Bakır Boru",
    description: "Yüksek kaliteli beyaz PE izolasyonlu bakır borular. Mükemmel ısı yalıtımı ve dayanıklılık.",
    image: "/api/placeholder/400/300",
    href: "/urunler/pe-beyaz-izolasyonlu",
  },
  {
    title: "Çiftli İzolasyonlu Beyaz Bakır Boru",
    description: "Çift katmanlı izolasyon teknolojisi ile üstün performans ve uzun ömür.",
    image: "/api/placeholder/400/300",
    href: "/urunler/ciftli-beyaz",
  },
  {
    title: "PE Siyah İzolasyonlu Bakır Boru",
    description: "UV dayanımlı siyah PE kaplama ile dış mekan kullanımına uygun.",
    image: "/api/placeholder/400/300",
    href: "/urunler/pe-siyah-izolasyonlu",
  },
  {
    title: "Çiftli İzolasyonlu Siyah Bakır Boru",
    description: "Endüstriyel uygulamalar için ideal çift katmanlı siyah izolasyonlu borular.",
    image: "/api/placeholder/400/300",
    href: "/urunler/ciftli-siyah",
  },
]

const features = [
  {
    icon: Shield,
    title: "Yüksek Kalite",
    description: "EN standartlarına uygun üretim ve kalite kontrol süreçleri",
  },
  {
    icon: Factory,
    title: "Yerli Üretim",
    description: "Modern tesislerimizde %100 yerli üretim",
  },
  {
    icon: Truck,
    title: "Hızlı Teslimat",
    description: "Stoktan anında sevkiyat ve zamanında teslimat",
  },
  {
    icon: Sparkles,
    title: "İnovasyon",
    description: "Sürekli Ar-Ge çalışmaları ile yenilikçi çözümler",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="py-20 md:py-28">
        <div className="container-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ürünlerimiz
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Farklı ihtiyaçlara yönelik geniş ürün yelpazemiz ile her türlü projeye uygun çözümler sunuyoruz.
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 justify-items-center mx-auto max-w-7xl"
          >
            {products.map((product, index) => (
              <motion.div key={product.title} variants={item} className="w-full max-w-sm mx-auto">
                <Card className="group h-full overflow-hidden border-primary/10 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 w-full">
                  <CardHeader className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <motion.div 
                        className="w-full h-full flex items-center justify-center p-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src="/pebeyaz.png"
                          alt={product.title}
                          width={300}
                          height={200}
                          className="object-contain rounded-lg"
                        />
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="mb-6 line-clamp-3">
                      {product.description}
                    </CardDescription>
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300" 
                      asChild
                    >
                      <Link href={product.href}>
                        <span>Detaylar</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-muted/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container-content relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Neden Thermapex?
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Sektördeki tecrübemiz ve yenilikçi yaklaşımımızla müşterilerimize en iyi hizmeti sunuyoruz.
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 justify-items-center mx-auto max-w-6xl"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title} 
                variants={item}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center group w-full max-w-xs mx-auto"
              >
                <motion.div 
                  className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="h-10 w-10 text-primary" />
                </motion.div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <StatsSection />
      
      <ProcessSection />
      
      <ReferencesSection />

      <section className="py-20 md:py-28">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl" />
              
              <CardContent className="relative p-12 md:p-16">
                <div className="grid gap-12 md:grid-cols-2 items-center justify-items-center max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Projeniz İçin Teklif Alın
                      </span>
                    </h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                      İhtiyaçlarınıza özel çözümler ve rekabetçi fiyatlar için hemen bizimle iletişime geçin.
                    </p>
                    <motion.ul 
                      className="space-y-4 mb-8"
                      variants={container}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      {[
                        "24 saat içinde dönüş",
                        "Rekabetçi fiyatlar",
                        "Teknik destek"
                      ].map((text) => (
                        <motion.li key={text} variants={item} className="flex items-center gap-3">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-lg">{text}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    <QuoteModal>
                      <Button 
                        size="lg" 
                        className="group shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span>Hemen Teklif Al</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </QuoteModal>
                  </motion.div>
                  
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-sm">
                      <motion.div
                        animate={{ 
                          rotateY: [0, 360],
                        }}
                        transition={{ 
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="text-7xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        THERMAPEX
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  )
}