'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 25, suffix: '', label: 'YILLIK TECRÜBE' },
  { value: 100, suffix: '%', label: 'MÜŞTERİ MEMNUNİYETİ' },
  { value: 83, suffix: '+', label: 'KURUMSAL REFERANS' },
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
    <section className="py-24 md:py-16 bg-secondary relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-dark/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-600/15 via-transparent to-transparent" />
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(205,128,72,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(205,128,72,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Decorative Animated Circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl"
      />

      {/* Diagonal Wave Pattern */}
      <div className="absolute top-0 right-0 w-full h-full opacity-8">
        <div className="absolute inset-0" style={{
          background: `repeating-linear-gradient(
            -45deg,
            rgba(205,128,72,0.08),
            rgba(205,128,72,0.08) 2px,
            transparent 2px,
            transparent 40px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Rakamlarla <span className="text-primary">Baykasoğlu</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Bugün, Baykasoğlu olarak yüzlerce projede yer almanın haklı gururunu yaşıyoruz.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative"
            >
              {/* Card Background */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 overflow-hidden transition-all duration-500 group-hover:bg-white/10 group-hover:border-primary/50">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Accent Line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                />

                <div className="relative text-center">
                  {/* Number */}
                  <motion.div
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-heading bg-gradient-to-br from-white via-white to-primary/80 bg-clip-text text-transparent"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.15 + 0.2
                    }}
                  >
                    <Counter value={stat.value} />
                    {stat.suffix && <span className="text-primary ml-1">{stat.suffix}</span>}
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    className="w-16 h-1 bg-primary/50 mx-auto mb-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 64 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                  />

                  {/* Label */}
                  <div className="text-white/90 text-sm md:text-base font-semibold tracking-wide">
                    {stat.label}
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:translate-x-12 group-hover:translate-y-12 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
