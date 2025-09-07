"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Building, Star } from "lucide-react"

const references = [
  {
    name: "Zorlu Center",
    category: "AVM & Ofis",
    description: "VRF sistem bakır boru tedariki",
    rating: 5
  },
  {
    name: "İstanbul Havalimanı",
    category: "Havalimanı",
    description: "Klima sistemi bakır boruları",
    rating: 5
  },
  {
    name: "Acıbadem Hastanesi",
    category: "Sağlık",
    description: "Merkezi klima sistemi",
    rating: 5
  },
  {
    name: "Hilton Hotels",
    category: "Otel",
    description: "Soğutma sistemi renovasyonu",
    rating: 5
  },
  {
    name: "Koç Üniversitesi",
    category: "Eğitim",
    description: "Kampüs genişleme projesi",
    rating: 5
  },
  {
    name: "Turkcell Plaza",
    category: "Ofis",
    description: "Isıtma-soğutma sistemleri",
    rating: 5
  }
]

const testimonials = [
  {
    text: "Thermapex ile çalışmak bir ayrıcalık. Ürün kalitesi ve profesyonel yaklaşımları ile projelerimizde her zaman güvenilir bir partner oldular.",
    author: "Mehmet Yılmaz",
    position: "Proje Müdürü",
    company: "ABC İnşaat"
  },
  {
    text: "Zamanında teslimat ve kaliteli ürünler. Teknik destek ekibi çok yardımcı oluyor. Kesinlikle tavsiye ediyorum.",
    author: "Ayşe Kaya",
    position: "Satın Alma Müdürü",
    company: "XYZ Mühendislik"
  }
]

export function ReferencesSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-content relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Referanslarımız
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Türkiye&apos;nin önde gelen firmalarına hizmet vermekten gurur duyuyoruz
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {references.map((ref, index) => (
            <motion.div
              key={ref.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(ref.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{ref.name}</h3>
                  <p className="text-sm text-primary mb-2">{ref.category}</p>
                  <p className="text-sm text-muted-foreground">{ref.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <div className="p-8">
                  <div className="mb-6">
                    <svg className="h-10 w-10 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-lg mb-6 italic">{testimonial.text}</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}