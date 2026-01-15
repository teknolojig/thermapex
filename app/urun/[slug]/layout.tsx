import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // URL'den gelen slug'ı decode et ve normalize et
  const decodedSlug = decodeURIComponent(slug);

  try {
    const product = await prisma.products.findFirst({
      where: { slug: decodedSlug },
      select: {
        name: true,
        code: true,
        slug: true,
        specifications: true,
        categories: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!product) {
      return {
        title: 'Ürün Bulunamadı | Thermapex',
        description: 'Aradığınız ürün bulunamadı.',
      };
    }

    const title = `${product.name} - Thermapex`;

    // Otomatik anlamlı description oluştur
    const specs = product.specifications as any;
    let description = `${product.name} - ${product.categories.name}. `;

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

    description += 'Stoktan hemen teslim, uygun fiyatlarla Thermapex güvencesiyle.';

    // Keywords oluştur
    const keywords = [
      product.name.toLowerCase(),
      product.categories.name.toLowerCase(),
      'bakır boru',
      product.code.toLowerCase(),
      'thermapex',
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
        canonical: `https://thermapex.com/urun/${encodeURIComponent(product.slug)}`,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'tr_TR',
        url: `https://thermapex.com/urun/${encodeURIComponent(product.slug)}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Bakır Boru Ürünleri | Thermapex',
      description: 'Thermapex ürünlerini keşfedin.',
    };
  }
}

export default function ProductLayout({ children }: Props) {
  return children;
}
