import { prisma } from '@/lib/prisma';
import { Package, Folder, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

async function getProducts() {
  const products = await prisma.products.findMany({
    include: {
      categories: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ürünler</h1>
          <p className="text-gray-500">Toplam {products.length} ürün</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ürün
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ürün Kodu
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.mainImage ? (
                        <div className="relative w-10 h-10 mr-3 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={product.mainImage}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 mr-3 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 font-mono">
                      {product.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Folder className="w-4 h-4 mr-1 text-primary" />
                      {product.categories.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-primary hover:text-primary-dark inline-flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Düzenle
                      </Link>
                      <Link
                        href={`/urun/${product.slug}`}
                        target="_blank"
                        className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Görüntüle
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Henüz ürün bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  );
}
