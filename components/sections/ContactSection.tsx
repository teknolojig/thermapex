'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, User, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="iletisim" className="py-20 md:py-16 bg-accent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-secondary mb-4">
            İletişime Geçin
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Sorularınız için bize ulaşın, en kısa sürede size dönüş yapalım
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto" ref={ref}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold font-heading text-secondary mb-6">
                İletişim Bilgileri
              </h3>
              <p className="text-text-muted mb-8 leading-relaxed">
                Uzman ekibimiz size yardımcı olmak için hazır. Bize telefon,
                e-posta veya formu doldurarak ulaşabilirsiniz.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="tel:02128759557"
                className="flex items-start gap-4 group hover:translate-x-2 transition-transform"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-secondary mb-1">Telefon</div>
                  <div className="text-text-muted">0212 875 95 57</div>
                </div>
              </a>

              <a
                href="mailto:info@thermapex.com"
                className="flex items-start gap-4 group hover:translate-x-2 transition-transform"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-secondary mb-1">E-posta</div>
                  <div className="text-text-muted">info@thermapex.com</div>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-secondary mb-1">Adres</div>
                  <div className="text-text-muted">
                    Adnan Kahveci Mah. Büyükdere Cad.
                    <br />
                    Şirin Sanayi Sitesi, B Blok No:22 F/7
                    <br />
                    34528 Beylikdüzü / İSTANBUL
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="text-sm text-text-muted">
                <strong className="text-secondary">Çalışma Saatleri:</strong>
                <br />
                Pazartesi - Cuma: 08:00 - 18:00
                <br />
                Cumartesi - Pazar: Kapalı
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-secondary mb-3">
                    Mesajınız Gönderildi!
                  </h3>
                  <p className="text-text-muted">
                    En kısa sürede size geri dönüş yapacağız.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
                    >
                      {error}
                    </motion.div>
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-secondary mb-2"
                    >
                      Adınız Soyadınız
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-secondary mb-2"
                    >
                      E-posta Adresiniz
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-secondary mb-2"
                    >
                      Telefon Numaranız
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="0500 000 00 00"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-secondary mb-2"
                    >
                      Mesajınız
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-text-muted" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        Mesajı Gönder
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
