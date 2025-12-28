import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const {
      name,
      code,
      slug,
      description,
      mainImage,
      images,
      categoryId,
      active,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = body;

    // Validation
    if (!name || !code || !slug || !categoryId) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }

    // Check if slug or code is used by another product
    const duplicateCheck = await prisma.products.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [
              { slug },
              { code },
            ],
          },
        ],
      },
    });

    if (duplicateCheck) {
      return NextResponse.json(
        { error: 'Bu slug veya kod başka bir ürün tarafından kullanılıyor' },
        { status: 400 }
      );
    }

    // Update product
    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        name,
        code,
        slug,
        description: description || null,
        mainImage: mainImage || null,
        images: images || [],
        categoryId,
        active: active ?? true,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords: metaKeywords || null,
      },
    });

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyiniz.' },
      { status: 500 }
    );
  }
}
