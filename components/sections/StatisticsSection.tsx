'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { TrendingUp, Users, Package, Award } from 'lucide-react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const stats: Stat[] = [
  {
    value: 25,
    suffix: '+',
    label: 'YILLIK TECRÜBE',
    icon: TrendingUp,
    description: 'Sektörde güvenilir hizmet'
  },
  {
    value: 21,
    suffix: '',
    label: 'ÜRÜN ÇEŞİDİ',
    icon: Package,
    description: 'Tekli ve çiftli izolasyonlu'
  },
  {
    value: 100,
    suffix: '%',
    label: 'MÜŞTERİ MEMNUNİYETİ',
    icon: Users,
    description: 'Kaliteden ödün vermeden'
  },
  {
    value: 83,
    suffix: '+',
    label: 'KURUMSAL REFERANS',
    icon: Award,
    description: 'Güvenilir iş ortaklıkları'
  },
];

function Counter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatisticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-orange-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(217,119,6,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(217,119,6,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Decorative Circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-500 font-semibold text-sm uppercase tracking-wider mb-3 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Rakamlarla
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Rakamlarla <span className="text-amber-500">Thermapex</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed">
            İzolasyonlu bakır boru sektöründe güvenilir çözüm ortağınız
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 group-hover:bg-white/10 group-hover:border-amber-500/30">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top Accent Line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  />

                  <div className="relative text-center">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-amber-500" />
                    </div>

                    {/* Number */}
                    <motion.div
                      className="text-4xl md:text-5xl font-bold mb-2 font-heading text-white"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.1 + 0.2
                      }}
                    >
                      <Counter value={stat.value} />
                      {stat.suffix && <span className="text-amber-500">{stat.suffix}</span>}
                    </motion.div>

                    {/* Label */}
                    <div className="text-amber-500/80 text-xs font-bold tracking-wider mb-2">
                      {stat.label}
                    </div>

                    {/* Description */}
                    <div className="text-stone-500 text-xs">
                      {stat.description}
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-amber-500/5 rounded-tl-full transform translate-x-10 translate-y-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-stone-500 text-sm">
            Thermapex ile <span className="text-amber-500 font-medium">kaliteli ürün</span> ve <span className="text-amber-500 font-medium">güvenilir hizmet</span> garantisi
          </p>
        </motion.div>
      </div>
    </section>
  );
}
