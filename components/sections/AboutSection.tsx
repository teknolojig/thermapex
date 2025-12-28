'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Heart, Award } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Misyonumuz',
    description:
      'Bakır boru sektöründe kalite standartlarını yükselterek, müşterilerimize en iyi hizmeti sunmak.',
  },
  {
    icon: Eye,
    title: 'Vizyonumuz',
    description:
      'Türkiye ve bölgede bakır boru tedarikinde lider olmak, yenilikçi çözümlerle sektöre değer katmak.',
  },
  {
    icon: Heart,
    title: 'Değerlerimiz',
    description:
      'Kalite, güvenilirlik, müşteri memnuniyeti ve sürekli gelişim ilkelerimizdir.',
  },
  {
    icon: Award,
    title: 'Taahhüdümüz',
    description:
      'Her projede %100 müşteri memnuniyeti sağlamak ve zamanında teslimat yapmak.',
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

  return (
    <section id="hakkimizda" className="py-20 md:py-16 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              Kurumsal
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-secondary mb-6">
              <span className="text-primary">Baykasoğlu</span> Hakkında
            </h2>
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Baykasoğlu olarak, 25 yılı aşkın süredir bakır boru sektöründe
                faaliyet göstermekteyiz. Sektördeki deneyimimiz ve müşteri odaklı
                yaklaşımımızla, Türkiye'nin önde gelen bakır boru tedarikçilerinden
                biri haline geldik.
              </p>
              <p>
                LWC bakır borular, kangal bakır borular, boy bakır borular ve
                izolasyonlu bakır borular olmak üzere geniş ürün yelpazemizle her
                türlü projeye çözüm sunuyoruz. Yüksek kalite standartlarımız,
                rekabetçi fiyatlarımız ve müşteri memnuniyetine verdiğimiz önemle
                sektörde fark yaratıyoruz.
              </p>
              <p>
                500'den fazla kurumsal firma ile çalıştığımız için, en zorlu
                projelerde bile güvenilir bir iş ortağıyız. Uzman kadromuz ve
                modern tesislerimizle, müşterilerimizin tüm ihtiyaçlarına hızlı
                ve profesyonel çözümler sunuyoruz.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Values Grid */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>

                    <h3 className="text-lg font-semibold font-heading text-secondary mb-2 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>

                    <p className="text-text-muted text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-b-2xl"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
