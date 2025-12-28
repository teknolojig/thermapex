import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Tüm kategorileri getir
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);
    return NextResponse.json(
      { error: 'Kategoriler yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// POST - Yeni kategori oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, image, order, active } = body;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Category creation error:', error);
    return NextResponse.json(
      { error: 'Kategori oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
}
