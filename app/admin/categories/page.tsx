import { prisma } from '@/lib/prisma';
import { Folder, Package, Edit } from 'lucide-react';
import Link from 'next/link';

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      order: 'asc',
    },
  });

  return categories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kategoriler</h1>
          <p className="text-gray-500">Toplam {categories.length} kategori</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <Folder className="w-6 h-6 text-primary" />
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  category.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {category.active ? 'Aktif' : 'Pasif'}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {category.name}
            </h3>

            {category.description && (
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {category.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <Package className="w-4 h-4 mr-1" />
                <span>{category._count.products} ürün</span>
              </div>

              <Link
                href={`/urun-kategori/${category.slug}`}
                target="_blank"
                className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1 text-sm font-medium"
              >
                Görüntüle
              </Link>
            </div>

            <div className="mt-3 text-xs text-gray-400">
              Slug: {category.slug}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
