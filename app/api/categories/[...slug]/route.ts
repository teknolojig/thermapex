import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    // Slug array'ini join et: ["bakir-urunler", "lwc-bakir-borular"] -> "bakir-urunler/lwc-bakir-borular"
    const categorySlug = Array.isArray(slug) ? slug.join('/') : slug;

    const category = await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category || !category.active) {
      return NextResponse.json(
        { error: 'Kategori bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Category fetch error:', error);
    return NextResponse.json(
      { error: 'Kategori yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
