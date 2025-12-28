export const metadata = {
  title: 'Güncel Bakır Fiyatları | Bakır Boru Fiyat Listesi | Thermapex',
  description: 'Güncel bakır boru fiyatları ve bakır fiyat hareketleri. LME bakır fiyatları, bakır boru fiyat listesi için bizimle iletişime geçin.',
  keywords: 'bakır fiyatları, bakır boru fiyatları, güncel bakır fiyatları, lme bakır fiyatları, bakır fiyat listesi',
  alternates: {
    canonical: 'https://thermapex.com/bakir-fiyatlari',
  },
  openGraph: {
    title: 'Güncel Bakır Fiyatları - Thermapex',
    description: 'Güncel bakır boru fiyatları için bizimle iletişime geçin.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://thermapex.com/bakir-fiyatlari',
  },
};

export default function BakirFiyatlariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
