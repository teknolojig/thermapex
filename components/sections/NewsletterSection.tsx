'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      setIsSubmitted(true);
      setEmail('');

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

  return (
    <section className="py-16 md:py-20 bg-stone-50 relative overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #78716c 1px, transparent 1px), linear-gradient(to bottom, #78716c 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-600/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Inner Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05]">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(to right, #d97706 1px, transparent 1px), linear-gradient(to bottom, #d97706 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Decorative Line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="relative flex flex-col items-center gap-8">
              {/* Top - Text (Full Width) */}
              <div className="w-full text-center">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Bültene Abone Ol</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-white mb-3">
                  Fırsatları Kaçırmayın
                </h2>
                <p className="text-stone-400 text-sm md:text-base max-w-md mx-auto">
                  Yeni ürünler ve özel kampanyalardan haberdar olun.
                </p>
              </div>

              {/* Bottom - Form (Full Width) */}
              <div className="w-full max-w-lg">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-3 bg-green-500/10 text-green-400 py-4 px-6 rounded-xl border border-green-500/20"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Başarıyla abone oldunuz!</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-posta adresiniz"
                            required
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder:text-stone-500 border border-stone-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                          />
                        </div>
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Gönderiliyor</span>
                            </>
                          ) : (
                            <>
                              <span>Abone Ol</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm text-center sm:text-left"
                        >
                          {error}
                        </motion.div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
