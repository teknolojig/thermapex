import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm ürünleri getir
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    const where = categoryId ? { categoryId } : {};

    const products = await prisma.products.findMany({
      where,
      include: {
        categories: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { error: 'Ürünler yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST - Yeni ürün oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      categoryId,
      name,
      code,
      slug,
      description,
      mainImage,
      images,
      specifications,
      metaTitle,
      metaDescription,
      metaKeywords,
      featured,
      active,
      order,
    } = body;

    // Specifications'ın JSON olduğundan emin ol
    const specs = typeof specifications === 'string'
      ? JSON.parse(specifications)
      : specifications;

    const product = await prisma.products.create({
      data: {
        categoryId,
        name,
        code,
        slug,
        description,
        mainImage,
        images: images || [],
        specifications: specs,
        metaTitle,
        metaDescription,
        metaKeywords,
        featured: featured || false,
        active: active !== undefined ? active : true,
        order: order || 0,
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Ürün oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
}
