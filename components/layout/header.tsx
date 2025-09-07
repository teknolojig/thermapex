"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"
import { QuoteModal } from "@/components/ui/quote-modal"

const products = [
  {
    title: "PE Beyaz İzolasyonlu Bakır Boru",
    href: "/urunler/pe-beyaz-izolasyonlu",
    description: "Yüksek kaliteli beyaz PE izolasyonlu bakır borular",
  },
  {
    title: "Çiftli İzolasyonlu Beyaz Bakır Boru",
    href: "/urunler/ciftli-beyaz",
    description: "Çift katmanlı izolasyona sahip beyaz bakır borular",
  },
  {
    title: "PE Siyah İzolasyonlu Bakır Boru",
    href: "/urunler/pe-siyah-izolasyonlu",
    description: "Dayanıklı siyah PE izolasyonlu bakır borular",
  },
  {
    title: "Çiftli İzolasyonlu Siyah Bakır Boru",
    href: "/urunler/ciftli-siyah",
    description: "Çift katmanlı izolasyona sahip siyah bakır borular",
  },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container flex h-18 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center group">
          <div className="relative overflow-hidden rounded-lg">
            <img src="/logo.svg" alt="Thermapex Logo" className="h-14 w-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </div>
        </Link>

        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary overflow-hidden">
                  <span className="relative z-10">Ana Sayfa</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Ürünler</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {products.map((product) => (
                    <li key={product.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={product.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {product.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {product.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/hakkimizda" className="group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary overflow-hidden">
                  <span className="relative z-10">Hakkımızda</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/iletisim" className="group relative inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary overflow-hidden">
                  <span className="relative z-10">İletişim</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <QuoteModal>
            <Button className="hidden md:inline-flex group relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-secondary hover:from-primary/90 hover:to-secondary text-white shadow-lg hover:shadow-2xl transition-all duration-500 px-6 py-2.5 rounded-xl font-semibold">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="relative z-10 w-4 h-4 mr-2" />
              <span className="relative z-10">Teklif Al</span>
              <ArrowRight className="relative z-10 w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 duration-300" />
            </Button>
          </QuoteModal>

          {/* Mobile Menu Trigger */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden relative z-50 h-10 w-10 rounded-xl hover:bg-primary/10 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* Full Screen Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
              >
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-1/2 -left-1/2 w-full h-full">
                    <motion.div
                      className="absolute w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
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
                      className="absolute w-96 h-96 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl"
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
                </div>

                <motion.nav 
                  className="relative z-10 flex flex-col items-center justify-center h-full px-8 space-y-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                  >
                    <img src="/logo.svg" alt="Thermapex Logo" className="h-16 w-auto mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Türkiye'nin Güvenilir Bakır Boru Üreticisi</p>
                  </motion.div>

                  <div className="space-y-6 text-center w-full max-w-sm">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        href="/"
                        className="block text-2xl font-semibold py-3 px-6 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Ana Sayfa
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-3"
                    >
                      <p className="text-xl font-semibold text-primary">Ürünler</p>
                      <div className="space-y-2">
                        {products.map((product, index) => (
                          <motion.div
                            key={product.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <Link
                              href={product.href}
                              className="block text-lg text-muted-foreground hover:text-primary py-2 px-4 rounded-lg hover:bg-primary/5 transition-all duration-300"
                              onClick={() => setIsOpen(false)}
                            >
                              {product.title}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <Link
                        href="/hakkimizda"
                        className="block text-2xl font-semibold py-3 px-6 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Hakkımızda
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      <Link
                        href="/iletisim"
                        className="block text-2xl font-semibold py-3 px-6 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        İletişim
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="pt-6"
                    >
                      <QuoteModal>
                        <Button 
                          className="w-full group relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-secondary hover:from-primary/90 hover:to-secondary text-white shadow-lg hover:shadow-2xl transition-all duration-500 px-8 py-4 rounded-xl font-semibold text-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <Sparkles className="relative z-10 w-5 h-5 mr-3" />
                          <span className="relative z-10">Hemen Teklif Al</span>
                          <ArrowRight className="relative z-10 w-5 h-5 ml-3 transition-transform group-hover:translate-x-1 duration-300" />
                        </Button>
                      </QuoteModal>
                    </motion.div>
                  </div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}