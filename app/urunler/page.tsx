import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductsContent from './ProductsContent';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">Yükleniyor...</div>
    </div>
  );
}

async function getInitialData(categorySlug?: string) {
  try {
    // Fetch categories
    const categories = await prisma.categories.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: { products: true }
        }
      }
    });

    // Build where clause for products
    const where: any = {
      active: true,
      categories: { active: true }
    };

    if (categorySlug) {
      const category = await prisma.categories.findUnique({
        where: { slug: categorySlug }
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    // Fetch products
    const products = await prisma.products.findMany({
      where,
      include: {
        categories: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        },
      },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });

    return { categories, products };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    return { categories: [], products: [] };
  }
}

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const categorySlug = params.category;
  const { categories, products } = await getInitialData(categorySlug);

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <ProductsContent
          initialCategories={categories}
          initialProducts={products}
          initialCategorySlug={categorySlug || ''}
        />
      </Suspense>
      <Footer />
    </>
  );
}
