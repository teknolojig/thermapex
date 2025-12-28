import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        name: true,
        code: true,
        specifications: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!product) {
      return {
        title: 'Ürün Bulunamadı | Baykasoğlu',
        description: 'Aradığınız ürün bulunamadı.',
      };
    }

    const title = `${product.name} - Baykasoğlu`;

    // Otomatik anlamlı description oluştur
    const specs = product.specifications as any;
    let description = `${product.name} - ${product.category.name}. `;

    // Spesifikasyonlardan önemli bilgileri ekle
    if (specs) {
      const specParts: string[] = [];

      if (specs.dis_cap) specParts.push(`Dış Çap: ${specs.dis_cap}`);
      if (specs.et_kalinligi) specParts.push(`Et Kalınlığı: ${specs.et_kalinligi}`);
      if (specs.boy) specParts.push(`Boy: ${specs.boy}`);
      if (specs.agirlik) specParts.push(`Ağırlık: ${specs.agirlik}`);
      if (specs.standart) specParts.push(`Standart: ${specs.standart}`);

      if (specParts.length > 0) {
        description += specParts.join(', ') + '. ';
      }
    }

    description += 'Stoktan hemen teslim, uygun fiyatlarla Baykasoğlu güvencesiyle.';

    // Keywords oluştur
    const keywords = [
      product.name.toLowerCase(),
      product.category.name.toLowerCase(),
      'bakır boru',
      product.code.toLowerCase(),
      'baykasoğlu',
      'bakır boru fiyatları',
    ];

    if (specs) {
      if (specs.dis_cap) keywords.push(`${specs.dis_cap} bakır boru`);
      if (specs.standart) keywords.push(specs.standart.toLowerCase());
    }

    return {
      title,
      description,
      keywords: keywords.join(', '),
      alternates: {
        canonical: `https://baykasoglu.com/urun/${slug}`,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'tr_TR',
        url: `https://baykasoglu.com/urun/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Bakır Boru Ürünleri | Baykasoğlu',
      description: 'Baykasoğlu Bakır ürünlerini keşfedin.',
    };
  }
}

export default function ProductLayout({ children }: Props) {
  return children;
}
