"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Phone, FileText, Factory, Truck, CheckCircle, ArrowRight } from "lucide-react"

const processSteps = [
  {
    icon: Phone,
    title: "İletişim",
    description: "Uzman ekibimizle iletişime geçin ve ihtiyaçlarınızı belirtin",
    color: "from-primary to-primary/80"
  },
  {
    icon: FileText,
    title: "Teklif",
    description: "24 saat içinde detaylı ve rekabetçi fiyat teklifi alın",
    color: "from-primary/80 to-secondary/80"
  },
  {
    icon: Factory,
    title: "Üretim",
    description: "Siparişiniz modern tesislerimizde özenle üretilir",
    color: "from-secondary/80 to-secondary"
  },
  {
    icon: Truck,
    title: "Teslimat",
    description: "Ürünleriniz güvenli paketleme ile zamanında teslim edilir",
    color: "from-secondary to-primary"
  },
  {
    icon: CheckCircle,
    title: "Destek",
    description: "Satış sonrası teknik destek ve garanti hizmetleri",
    color: "from-primary to-secondary"
  }
]

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Çalışma Sürecimiz
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Siparişten teslimata kadar profesyonel hizmet anlayışı
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <Card className="h-full border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 relative z-10 bg-background">
                  <div className="p-6 text-center">
                    <motion.div
                      className={`inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${step.color} mb-4 shadow-lg mx-auto`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <step.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-primary/20">{(index + 1).toString().padStart(2, '0')}</span>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </Card>

                {index < processSteps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 hidden lg:block z-20">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="h-6 w-6 text-primary/40" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="inline-block bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Hemen Başlayın
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Projeleriniz için en kaliteli bakır boru çözümlerini sunmaya hazırız.
                Hemen iletişime geçin ve özel teklifinizi alın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/teklif-al"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Teklif Al
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary/20 rounded-lg font-medium hover:bg-primary/5 transition-colors"
                >
                  İletişime Geç
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}