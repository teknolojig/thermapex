import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      where: { active: true },
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { order: 'asc' },
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
