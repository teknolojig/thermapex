export const metadata = {
  title: 'İletişim - Thermapex',
  description: 'Thermapex ile iletişime geçin. Bakır boru siparişleriniz, fiyat teklifleri ve tüm sorularınız için 7/24 destek hattımız hizmetinizde. Hemen arayın!',
  keywords: 'thermapex iletişim, bakır boru sipariş, bakır boru fiyat teklifi, thermapex telefon, bakır boru satın al, istanbul bakır boru',
  alternates: {
    canonical: 'https://thermapex.com/iletisim',
  },
  openGraph: {
    title: 'İletişim - Thermapex',
    description: 'Thermapex ile iletişime geçin. 7/24 destek hattımız hizmetinizde.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://thermapex.com/iletisim',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
