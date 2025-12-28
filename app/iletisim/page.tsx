import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/sections/ContactSection';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section - Similar to category page */}
        <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 md:pt-32 pb-20 overflow-hidden">
          {/* Decorative Elements - Same as category page */}
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
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-sm font-medium">Bize Ulaşın</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
                İletişim
              </h1>

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Size en iyi hizmeti verebilmek için buradayız. Sorularınız ve talepleriniz için bize ulaşın.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}