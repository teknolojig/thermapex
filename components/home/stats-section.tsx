"use client"

import { motion } from "framer-motion"
import { Users, Award, Building2, Package } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
  {
    icon: Users,
    value: 1500,
    suffix: "+",
    label: "Mutlu Müşteri",
    color: "from-primary to-primary/80"
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Yıllık Tecrübe",
    color: "from-secondary to-secondary/80"
  },
  {
    icon: Building2,
    value: 10000,
    suffix: "m²",
    label: "Üretim Tesisi",
    color: "from-primary to-secondary"
  },
  {
    icon: Package,
    value: 500,
    suffix: "+",
    label: "Tamamlanan Proje",
    color: "from-secondary to-primary"
  }
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 50
    const increment = value / steps
    const stepDuration = duration / steps
    
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)
    
    return () => clearInterval(timer)
  }, [value])
  
  return (
    <span className="text-4xl md:text-5xl font-bold">
      {count.toLocaleString('tr-TR')}{suffix}
    </span>
  )
}

export function StatsSection() {
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
              Rakamlarla Thermapex
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Yılların deneyimi ve binlerce başarılı proje ile sektörün güvenilir partneri
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                className={`inline-flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${stat.color} mb-6 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="h-10 w-10 md:h-12 md:w-12 text-white" />
              </motion.div>
              <div className="space-y-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}