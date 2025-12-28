export const metadata = {
  title: 'Hakkımızda - Baykasoğlu',
  description: 'Baykasoğlu Bakır, 25 yılı aşkın tecrübesi ile bakır boru sektöründe lider konumda. Kalite, güven ve müşteri memnuniyeti odaklı hizmet anlayışımız ile yanınızdayız.',
  keywords: 'baykasoğlu bakır, hakkımızda, bakır boru tedarikçisi, bakır boru üreticisi, istanbul bakır boru, güvenilir bakır tedarikçisi',
  alternates: {
    canonical: 'https://baykasoglu.com/hakkimizda',
  },
  openGraph: {
    title: 'Hakkımızda - Baykasoğlu',
    description: 'Baykasoğlu Bakır, 25 yılı aşkın tecrübesi ile bakır boru sektöründe lider konumda.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://baykasoglu.com/hakkimizda',
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
