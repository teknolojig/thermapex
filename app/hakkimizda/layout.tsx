export const metadata = {
  title: 'Hakkımızda - Thermapex',
  description: 'Thermapex Bakır, 25 yılı aşkın tecrübesi ile bakır boru sektöründe lider konumda. Kalite, güven ve müşteri memnuniyeti odaklı hizmet anlayışımız ile yanınızdayız.',
  keywords: 'thermapex bakır, hakkımızda, bakır boru tedarikçisi, bakır boru üreticisi, istanbul bakır boru, güvenilir bakır tedarikçisi',
  alternates: {
    canonical: 'https://thermapex.com/hakkimizda',
  },
  openGraph: {
    title: 'Hakkımızda - Thermapex',
    description: 'Thermapex Bakır, 25 yılı aşkın tecrübesi ile bakır boru sektöründe lider konumda.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://thermapex.com/hakkimizda',
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
