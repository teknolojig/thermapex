const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@thermapex.com' },
    update: {},
    create: {
      email: 'admin@thermapex.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });
  
  console.log('Created admin user:', admin.email);

  // Create default settings
  const settings = await prisma.settings.findFirst();
  
  if (!settings) {
    await prisma.settings.create({
      data: {
        companyName: 'Thermapex',
        companyEmail: 'info@thermapex.com',
        companyPhone: '+90 555 555 5555',
        companyAddress: 'İstanbul, Türkiye',
        seoTitle: 'Thermapex - Bakır Boru Sistemleri',
        seoDescription: 'PE İzolasyonlu bakır borular ve endüstriyel bakır çözümleri',
        seoKeywords: 'bakır boru, PE izolasyon, endüstriyel bakır',
      },
    });
    console.log('Created default settings');
  }

  // Create sample products
  const products = [
    {
      name: 'PE İzolasyonlu Bakır Boru 15mm',
      slug: 'pe-izolasyonlu-bakir-boru-15mm',
      category: 'PE İzolasyonlu Borular',
      description: 'Yüksek kaliteli PE izolasyonlu 15mm bakır boru. Isıtma ve soğutma sistemleri için ideal.',
      technicalInfo: 'Çap: 15mm, İzolasyon Kalınlığı: 9mm, Maksimum Sıcaklık: 95°C',
      image: '/images/products/pe-15mm.jpg',
      features: 'UV dayanımlı, Yüksek ısı yalıtımı, Korozyona dayanıklı, 50 yıl ömür garantisi',
    },
    {
      name: 'PE İzolasyonlu Bakır Boru 22mm',
      slug: 'pe-izolasyonlu-bakir-boru-22mm',
      category: 'PE İzolasyonlu Borular',
      description: 'Yüksek kaliteli PE izolasyonlu 22mm bakır boru. Endüstriyel uygulamalar için özel üretim.',
      technicalInfo: 'Çap: 22mm, İzolasyon Kalınlığı: 9mm, Maksimum Sıcaklık: 95°C',
      image: '/images/products/pe-22mm.jpg',
      features: 'UV dayanımlı, Yüksek ısı yalıtımı, Korozyona dayanıklı, 50 yıl ömür garantisi',
    },
    {
      name: 'Endüstriyel Bakır Boru 28mm',
      slug: 'endustriyel-bakir-boru-28mm',
      category: 'Endüstriyel Borular',
      description: 'Ağır sanayi uygulamaları için özel üretim 28mm bakır boru.',
      technicalInfo: 'Çap: 28mm, Et Kalınlığı: 1.5mm, Maksimum Basınç: 40 bar',
      image: '/images/products/industrial-28mm.jpg',
      features: 'Yüksek basınç dayanımı, Endüstriyel standartlara uygun, Özel alaşım',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log(`Created product: ${product.name}`);
  }

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });