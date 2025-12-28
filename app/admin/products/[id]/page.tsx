import { prisma } from '@/lib/prisma';
import ProductEditForm from '@/components/admin/ProductEditForm';
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  const product = await prisma.products.findUnique({
    where: { id },
    include: {
      categories: true,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
}

async function getCategories() {
  const categories = await prisma.categories.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return categories;
}

export default async function ProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories(),
  ]);

  // Convert Prisma types to plain objects
  const productData = {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ürün Düzenle</h1>
        <p className="text-gray-500">{product.name}</p>
      </div>

      <ProductEditForm product={productData} categories={categories} />
    </div>
  );
}
