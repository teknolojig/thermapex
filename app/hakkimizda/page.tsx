'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Package, Clock, Shield, TrendingUp, Award, Users, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const products = [
    'LWC Bakır Boru (Level Wound Coil)',
    'Pancake Bakır Boru',
    'Boy Bakır Boru',
    'PE İzolasyonlu Bakır Boru',
    'Kauçuk İzolasyonlu Bakır Boru'
  ];

  const features = [
    {
      icon: Package,
      title: 'Zengin Stok Çeşitliliği',
      description: 'Geniş ürün yelpazesi ile stoktan hemen teslim'
    },
    {
      icon: Clock,
      title: 'Hızlı Teslimat',
      description: 'Özel alaşım ve özel ölçü talepleri için hızlı teslimat süresi'
    },
    {
      icon: Shield,
      title: 'Yüksek Kalite',
      description: 'Her zaman daha yüksek kaliteli bakır boru arayışı'
    },
    {
      icon: TrendingUp,
      title: 'Uygun Fiyat',
      description: 'Rekabetçi fiyat politikası ile değer yaratıyoruz'
    }
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 md:pt-32 pb-20 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#a2602e_0%,_transparent_50%)] opacity-20 animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#a2602e_0%,_transparent_50%)] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#a2602e_0%,_transparent_70%)] opacity-10" />
          </div>

          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-96 h-96 bg-primary rounded-full blur-3xl" style={{ top: '10%', right: '10%' }} />
            <div className="absolute w-96 h-96 bg-primary/50 rounded-full blur-3xl" style={{ bottom: '10%', left: '10%' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Kurumsal</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
                Hakkımızda
              </h1>

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Türkiye'nin güvenilir bakır boru tedarikçisi olarak, kalite ve müşteri memnuniyeti odaklı hizmet anlayışımızla sektörde öncü konumdayız.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
              {/* Logo & Company Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:sticky lg:top-32"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-lg">
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/hakkkimizda-100.jpg"
                        alt="Thermapex Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
                    Baykasoğlu Bakır A.Ş.
                  </h2>

                  <p className="text-gray-600 text-center mb-6">
                    Geniş ürün çeşitliliği ile stoktan hemen teslim, bakır boru tedariği sağlamaktadır.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Stoktan Anında Teslimat</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Özel Alaşım & Ölçü Seçenekleri</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Yüksek Kalite Garantisi</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Uygun Fiyat Politikası</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* About Text */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Özel alaşım, özel ölçü talepleri için, hızlı teslimat süresi, yüksek kaliteli ürünü, uygun fiyat politikası ile tüm değerli müşterilerine sunmaktadır.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Kurulduğu günden bu yana, her zaman, daha yüksek kaliteli bakır boru arayışları ile zengin bir tedarik ağı kurmuştur.
                  </p>
                </div>

                {/* Product List */}
                <div className="bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-2xl p-8 border border-primary/10">
                  <h3 className="text-2xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-3">
                    <Package className="w-6 h-6 text-primary" />
                    Başlıca Ürün Gruplarımız
                  </h3>

                  <div className="space-y-3">
                    {products.map((product, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 hover:bg-white transition-all"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-gray-800 font-medium">{product}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Vision */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    Vizyonumuz
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-4">
                    Zengin stok çeşitliliği, uygun fiyat politikası, hızlı ve güleryüzlü hizmeti ile daima bir adım önde olmayı hedefleyen <strong>Baykasoğlu Bakır A.Ş.</strong> her geçen gün, hedeflerine bir adım daha yaklaşmıştır.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    Deneyimli ve genç ekibimiz ile, sektörel gelişmeleri devamlı takip ederek, stok ve tedarik kapasitesini her geçen gün yükseltecek ve her zaman daha iyiyi arayışımız devam edecektir.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                Neden Thermapex?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Sektördeki tecrübemiz ve müşteri odaklı yaklaşımımızla fark yaratıyoruz
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
