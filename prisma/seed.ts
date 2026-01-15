import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Kategorileri oluştur
  const ciftliKategori = await prisma.categories.upsert({
    where: { slug: 'ciftli-beyaz-polietilen' },
    update: {},
    create: {
      id: 'cat-ciftli-beyaz',
      name: 'Çiftli Beyaz Polietilen',
      slug: 'ciftli-beyaz-polietilen',
      description: '9mm Çiftli Beyaz Polietilen İzolasyonlu Bakır Borular - Split ve VRV sistemler için',
      image: '/images/products/cift.jpg',
      order: 1,
      active: true,
      updatedAt: new Date(),
    },
  });

  const tekliKategori = await prisma.categories.upsert({
    where: { slug: 'tekli-beyaz-polietilen' },
    update: {},
    create: {
      id: 'cat-tekli-beyaz',
      name: 'Tekli Beyaz Polietilen',
      slug: 'tekli-beyaz-polietilen',
      description: '9mm Tekli Beyaz Polietilen İzolasyonlu Bakır Borular - Split ve VRV sistemler için',
      image: '/images/products/tek.jpg',
      order: 2,
      active: true,
      updatedAt: new Date(),
    },
  });

  const kaucukKategori = await prisma.categories.upsert({
    where: { slug: 'kaucuk-izolasyonlu-bakir-boru' },
    update: {},
    create: {
      id: 'cat-kaucuk',
      name: 'Kauçuk İzolasyonlu Bakır Boru',
      slug: 'kaucuk-izolasyonlu-bakir-boru',
      description: '13mm Siyah Kauçuk İzolasyonlu Bakır Borular - Split ve VRF sistemler için',
      image: '/images/products/kaucuk.jpg',
      order: 3,
      active: true,
      updatedAt: new Date(),
    },
  });

  console.log('Kategoriler oluşturuldu:', { ciftliKategori, tekliKategori, kaucukKategori });

  // Çiftli Ürünler
  const ciftliUrunler = [
    { code: 'THERMP00001', olcu: '1/4x0,70-3/8x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00002', olcu: '1/4x0,70-1/2x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00003', olcu: '1/4x0,70-5/8x0,80mm', sistem: 'SPLİT' },
    { code: 'THERMP00004', olcu: '3/8x0,70-5/8x0,80mm', sistem: 'SPLİT' },
    { code: 'THERMP00005', olcu: '1/4x0,80-3/8x0,80mm', sistem: 'VRV' },
    { code: 'THERMP00006', olcu: '1/4x0,80-1/2x0,80mm', sistem: 'VRV' },
    { code: 'THERMP00007', olcu: '1/4x0,80-5/8x1,00mm', sistem: 'VRV' },
    { code: 'THERMP00008', olcu: '3/8x0,80-5/8x1,00mm', sistem: 'VRV' },
    { code: 'THERMP00009', olcu: '3/8x0,80-3/4x1,00mm', sistem: 'VRV' },
    { code: 'THERMP00010', olcu: '1/2x0,80-3/4x1,00mm', sistem: 'VRV' },
  ];

  // Tekli Ürünler
  const tekliUrunler = [
    { code: 'THERMP00011', olcu: '1/4x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00012', olcu: '3/8x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00013', olcu: '1/2x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00014', olcu: '5/8x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00015', olcu: '3/4x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00016', olcu: '1/4x0,80mm', sistem: 'VRV' },
    { code: 'THERMP00017', olcu: '3/8x0,80mm', sistem: 'VRV' },
    { code: 'THERMP00018', olcu: '1/2x0,80mm', sistem: 'VRV' },
    { code: 'THERMP00019', olcu: '5/8x1,00mm', sistem: 'VRV' },
    { code: 'THERMP00020', olcu: '3/4x1,00mm', sistem: 'VRV' },
    { code: 'THERMP00021', olcu: '7/8x1,00mm', sistem: 'VRV' },
  ];

  // Slug oluşturma fonksiyonu - Türkçe karakterleri ASCII'ye çevir
  const createSlug = (olcu: string, sistem: string, tip: string) => {
    const turkishToAscii = (str: string) => {
      return str
        .replace(/İ/g, 'I')
        .replace(/ı/g, 'i')
        .replace(/Ğ/g, 'G')
        .replace(/ğ/g, 'g')
        .replace(/Ü/g, 'U')
        .replace(/ü/g, 'u')
        .replace(/Ş/g, 'S')
        .replace(/ş/g, 's')
        .replace(/Ö/g, 'O')
        .replace(/ö/g, 'o')
        .replace(/Ç/g, 'C')
        .replace(/ç/g, 'c')
        .toLowerCase();
    };
    return `${tip}-${olcu.replace(/[\/x,]/g, '-').replace(/\./g, '').toLowerCase()}-${turkishToAscii(sistem)}`;
  };

  // Çiftli ürünleri ekle
  for (let i = 0; i < ciftliUrunler.length; i++) {
    const urun = ciftliUrunler[i];
    const slug = createSlug(urun.olcu, urun.sistem, 'ciftli');

    await prisma.products.upsert({
      where: { code: urun.code },
      update: {},
      create: {
        id: `prod-${urun.code.toLowerCase()}`,
        categoryId: ciftliKategori.id,
        name: `Çiftli İzolasyonlu Bakır Boru ${urun.olcu}`,
        code: urun.code,
        slug: slug,
        description: `9mm Çiftli Beyaz Polietilen İzolasyonlu Bakır Boru - Ölçü: ${urun.olcu} - Sistem: ${urun.sistem} - Menşei: Türkiye`,
        mainImage: '/images/products/cift.jpg',
        images: [],
        specifications: {
          marka: 'THERMAPEX',
          izolasyonTuru: '9mm Çiftli Beyaz Polietilen',
          boruTipi: 'İzolasyonlu Bakır Boru',
          olcu: urun.olcu,
          sistem: urun.sistem,
          mensei: 'Türkiye',
        },
        metaTitle: `${urun.olcu} Çiftli İzolasyonlu Bakır Boru | Thermapex`,
        metaDescription: `Thermapex ${urun.olcu} ölçüsünde 9mm çiftli beyaz polietilen izolasyonlu bakır boru. ${urun.sistem} sistemler için ideal. Türkiye menşeli, yüksek kalite.`,
        metaKeywords: `çiftli bakır boru, izolasyonlu bakır boru, ${urun.olcu}, ${urun.sistem}, polietilen izolasyon`,
        featured: i < 3,
        active: true,
        order: i + 1,
        updatedAt: new Date(),
      },
    });
  }

  // Tekli ürünleri ekle
  for (let i = 0; i < tekliUrunler.length; i++) {
    const urun = tekliUrunler[i];
    const slug = createSlug(urun.olcu, urun.sistem, 'tekli');

    await prisma.products.upsert({
      where: { code: urun.code },
      update: {},
      create: {
        id: `prod-${urun.code.toLowerCase()}`,
        categoryId: tekliKategori.id,
        name: `Tekli İzolasyonlu Bakır Boru ${urun.olcu}`,
        code: urun.code,
        slug: slug,
        description: `9mm Tekli Beyaz Polietilen İzolasyonlu Bakır Boru - Ölçü: ${urun.olcu} - Sistem: ${urun.sistem} - Menşei: Türkiye`,
        mainImage: '/images/products/tek.jpg',
        images: [],
        specifications: {
          marka: 'THERMAPEX',
          izolasyonTuru: '9mm Tekli Beyaz Polietilen',
          boruTipi: 'İzolasyonlu Bakır Boru',
          olcu: urun.olcu,
          sistem: urun.sistem,
          mensei: 'Türkiye',
        },
        metaTitle: `${urun.olcu} Tekli İzolasyonlu Bakır Boru | Thermapex`,
        metaDescription: `Thermapex ${urun.olcu} ölçüsünde 9mm tekli beyaz polietilen izolasyonlu bakır boru. ${urun.sistem} sistemler için ideal. Türkiye menşeli, yüksek kalite.`,
        metaKeywords: `tekli bakır boru, izolasyonlu bakır boru, ${urun.olcu}, ${urun.sistem}, polietilen izolasyon`,
        featured: i < 3,
        active: true,
        order: i + 1,
        updatedAt: new Date(),
      },
    });
  }

  // Kauçuk Ürünler
  const kaucukUrunler = [
    { code: 'THERMP00022', olcu: '1/4x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00023', olcu: '3/8x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00024', olcu: '1/2x0,70mm', sistem: 'SPLİT' },
    { code: 'THERMP00025', olcu: '5/8x0,80mm', sistem: 'SPLİT' },
    { code: 'THERMP00026', olcu: '1/4x0,80mm', sistem: 'VRF' },
    { code: 'THERMP00027', olcu: '3/8x0,80mm', sistem: 'VRF' },
    { code: 'THERMP00028', olcu: '1/2x0,80mm', sistem: 'VRF' },
    { code: 'THERMP00029', olcu: '5/8x1,00mm', sistem: 'VRF' },
    { code: 'THERMP00030', olcu: '7/8x1,00mm', sistem: 'VRF' },
  ];

  // Kauçuk ürünleri ekle
  for (let i = 0; i < kaucukUrunler.length; i++) {
    const urun = kaucukUrunler[i];
    const slug = createSlug(urun.olcu, urun.sistem, 'kaucuk');

    await prisma.products.upsert({
      where: { code: urun.code },
      update: {},
      create: {
        id: `prod-${urun.code.toLowerCase()}`,
        categoryId: kaucukKategori.id,
        name: `Kauçuk İzolasyonlu Bakır Boru ${urun.olcu}`,
        code: urun.code,
        slug: slug,
        description: `13mm Siyah Kauçuk İzolasyonlu Bakır Boru - Ölçü: ${urun.olcu} - Sistem: ${urun.sistem} - Menşei: Türkiye`,
        mainImage: '/images/products/kaucuk.jpg',
        images: [],
        specifications: {
          marka: 'THERMAPEX',
          izolasyonTuru: '13mm Siyah Kauçuk',
          boruTipi: 'Kauçuk İzolasyonlu Bakır Boru',
          olcu: urun.olcu,
          sistem: urun.sistem,
          mensei: 'Türkiye',
        },
        metaTitle: `${urun.olcu} Kauçuk İzolasyonlu Bakır Boru | Thermapex`,
        metaDescription: `Thermapex ${urun.olcu} ölçüsünde 13mm siyah kauçuk izolasyonlu bakır boru. ${urun.sistem} sistemler için ideal. Türkiye menşeli, yüksek kalite.`,
        metaKeywords: `kauçuk bakır boru, kauçuk izolasyonlu bakır boru, ${urun.olcu}, ${urun.sistem}, siyah kauçuk izolasyon`,
        featured: i < 3,
        active: true,
        order: i + 1,
        updatedAt: new Date(),
      },
    });
  }

  console.log('Ürünler oluşturuldu: 30 ürün');

  // Admin kullanıcı oluştur
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.users.upsert({
    where: { email: 'admin@thermapex.com' },
    update: {},
    create: {
      id: 'user-admin',
      email: 'admin@thermapex.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
      active: true,
      updatedAt: new Date(),
    },
  });

  console.log('Admin kullanıcı oluşturuldu: admin@thermapex.com / admin123');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
