'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Award,
  ShieldCheck,
  DollarSign,
  Smile,
  Building2,
  Package,
} from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Tecrübe',
    description:
      '25 yılı aşkın tecrübesi ile Baykasoğlu ihtiyaçlarınıza yönelik ideal bir tedarikçidir.',
  },
  {
    icon: ShieldCheck,
    title: 'Yüksek Kalite',
    description:
      'Markalarımız altında üretilen tüm ürünler uluslarası standartlara uygun yüksek kalitede üretilmektedir.',
  },
  {
    icon: DollarSign,
    title: 'Uygun Fiyat',
    description:
      'Yüksek kalite ile üretilen ürünlerimizi en uygun fiyatlara müşterilerimize sunmak birincil önceliklerimizdendir',
  },
  {
    icon: Smile,
    title: 'Müşteri Memnuniyeti',
    description:
      '%100 Müşteri memnuniyeti konusunda ki hassasiyettimiz, en önemli prensibimizdir.',
  },
  {
    icon: Building2,
    title: 'Kurumsal Referanslar',
    description:
      'Binlerce kurumsal referansa hizmet sağlayan sektörün en büyük şirketlerinden biriyiz',
  },
  {
    icon: Package,
    title: 'Binlerce Çeşit',
    description:
      'Tüm bakır ihtiyaçlarınıza yönelik çeşitli ölçü ve kalınlıkta binlerce ürün çeşidine sahibiz.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="neden-biz" className="py-20 md:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px',
          color: '#CD8048'
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            Avantajlarımız
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-secondary mb-4">
            Neden <span className="text-primary">Baykasoğlu</span>?
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Sektörde öncü konumumuzu koruyan değerlerimiz ve sunduğumuz avantajlar
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  {/* Icon container with animation */}
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-sm group-hover:shadow-md"
                  >
                    <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>

                  <h3 className="text-xl font-bold font-heading text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-text-muted leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full transform translate-x-12 translate-y-12 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
