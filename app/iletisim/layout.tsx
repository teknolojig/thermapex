export const metadata = {
  title: 'İletişim - Baykasoğlu',
  description: 'Baykasoğlu Bakır ile iletişime geçin. Bakır boru siparişleriniz, fiyat teklifleri ve tüm sorularınız için 7/24 destek hattımız hizmetinizde. Hemen arayın!',
  keywords: 'baykasoğlu iletişim, bakır boru sipariş, bakır boru fiyat teklifi, baykasoğlu telefon, bakır boru satın al, istanbul bakır boru',
  alternates: {
    canonical: 'https://baykasoglu.com/iletisim',
  },
  openGraph: {
    title: 'İletişim - Baykasoğlu',
    description: 'Baykasoğlu Bakır ile iletişime geçin. 7/24 destek hattımız hizmetinizde.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://baykasoglu.com/iletisim',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
