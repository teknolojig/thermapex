'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Thermometer, Award, Truck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const highlights = [
  {
    icon: Shield,
    title: 'EN 12735 Sertifikalı',
    description: 'Uluslararası standartlara uygun üretim',
  },
  {
    icon: Thermometer,
    title: '9mm Polietilen İzolasyon',
    description: 'Optimal ısı yalıtımı performansı',
  },
  {
    icon: Award,
    title: 'Premium Kalite Bakır',
    description: 'Cu-DHP %99.9 saflıkta bakır',
  },
  {
    icon: Truck,
    title: 'Hızlı Teslimat',
    description: 'Türkiye geneli güvenli sevkiyat',
  },
];

const features = [
  'Split klima sistemleri için ideal',
  'VRV/VRF sistemlerde kullanıma uygun',
  'Yüksek basınç dayanımı',
  'Kolay montaj imkanı',
  'Uzun ömürlü performans',
  'Enerji tasarrufu sağlar',
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="hakkimizda" className="py-24 bg-gradient-to-b from-white to-stone-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-stone-100 to-stone-200 relative">
                <Image
                  src="/tekli.png"
                  alt="İzolasyonlu Bakır Boru"
                  fill
                  className="object-contain p-8"
                />
              </div>
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-amber-100"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-1">25+</div>
                <div className="text-stone-600 text-sm font-medium">Yıllık Tecrübe</div>
              </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3 bg-amber-50 px-4 py-1.5 rounded-full">
              Hakkımızda
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-stone-900 mb-6">
              İzolasyonlu Bakır Boru
              <span className="block text-amber-600 mt-2">Uzmanı</span>
            </h2>

            <div className="space-y-4 text-stone-600 leading-relaxed mb-8">
              <p>
                <strong className="text-stone-800">Thermapex</strong> olarak, 25 yılı aşkın tecrübemizle
                klima ve soğutma sistemleri için <strong className="text-amber-700">polietilen izolasyonlu bakır borular</strong> sunuyoruz.
              </p>
              <p>
                Tekli ve çiftli izolasyonlu bakır borularımız, EN 12735 standardına uygun olarak üretilmekte
                ve 9mm kalınlığında beyaz polietilen izolasyon ile kaplanmaktadır. Split, multi-split ve
                VRV/VRF sistemleri için ideal çözümler sunuyoruz.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-stone-700 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-stone-100 hover:border-amber-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                        <Icon className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-stone-900 font-semibold text-sm mb-0.5 group-hover:text-amber-700 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-stone-500 text-xs leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
