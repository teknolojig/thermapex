'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Snowflake,
  ShieldCheck,
  Gauge,
  Wrench,
  Zap,
  Timer,
} from 'lucide-react';

const features = [
  {
    icon: Snowflake,
    title: 'Optimal İzolasyon',
    description:
      '9mm kalınlığında beyaz polietilen izolasyon ile mükemmel ısı yalıtımı. Enerji kayıplarını minimize eder.',
  },
  {
    icon: ShieldCheck,
    title: 'EN 12735 Sertifikalı',
    description:
      'Uluslararası standartlara uygun üretim. Cu-DHP %99.9 saflıkta bakır kullanımı.',
  },
  {
    icon: Gauge,
    title: 'Yüksek Basınç Dayanımı',
    description:
      'R410A ve R32 soğutucu gazlar için uygun. 45 bar test basıncına dayanıklı.',
  },
  {
    icon: Wrench,
    title: 'Kolay Montaj',
    description:
      'Esnek yapısı sayesinde kolay bükülür ve şekil alır. Montaj süresini kısaltır.',
  },
  {
    icon: Zap,
    title: 'Enerji Verimliliği',
    description:
      'İzolasyon sayesinde ısı kayıpları önlenir, klima sisteminiz daha verimli çalışır.',
  },
  {
    icon: Timer,
    title: 'Uzun Ömür',
    description:
      'Korozyona dayanıklı bakır ve UV korumalı izolasyon ile uzun yıllar sorunsuz kullanım.',
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
  hidden: { opacity: 0, y: 30 },
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
    <section id="neden-biz" className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3 bg-amber-50 px-4 py-1.5 rounded-full">
            Avantajlarımız
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-stone-900 mb-4">
            Neden <span className="text-amber-600">Thermapex</span>?
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            İzolasyonlu bakır borularımızın öne çıkan özellikleri ve size sağladığı avantajlar
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden"
              >
                {/* Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Content - Icon Left, Text Right */}
                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-amber-600" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-heading text-stone-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-stone-500 text-sm">
            Tüm ürünlerimiz <span className="text-amber-600 font-semibold">EN 12735</span> standardına uygun olarak üretilmektedir.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
