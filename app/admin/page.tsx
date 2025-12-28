import { prisma } from '@/lib/prisma';
import { Mail, Package, Users, TrendingUp } from 'lucide-react';

async function getDashboardStats() {
  const [newsletterCount, productsCount, usersCount, activeNewsletterCount] = await Promise.all([
    prisma.newsletters.count(),
    prisma.products.count(),
    prisma.users.count(),
    prisma.newsletters.count({ where: { active: true } }),
  ]);

  return {
    newsletterCount,
    productsCount,
    usersCount,
    activeNewsletterCount,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: 'Toplam E-Bülten Abonesi',
      value: stats.newsletterCount,
      icon: Mail,
      color: 'bg-blue-500',
      description: `${stats.activeNewsletterCount} aktif abone`,
    },
    {
      title: 'Toplam Ürün',
      value: stats.productsCount,
      icon: Package,
      color: 'bg-green-500',
      description: 'Sistemdeki ürün sayısı',
    },
    {
      title: 'Toplam Kullanıcı',
      value: stats.usersCount,
      icon: Users,
      color: 'bg-purple-500',
      description: 'Admin kullanıcıları',
    },
    {
      title: 'Aktif Aboneler',
      value: stats.activeNewsletterCount,
      icon: TrendingUp,
      color: 'bg-orange-500',
      description: 'E-bülten alıyor',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500">Hoş geldiniz! Sistem istatistikleriniz aşağıda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
              <p className="text-sm text-gray-400">{card.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Son Aktiviteler</h2>
          <p className="text-gray-500">Yakında eklenecek...</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h2>
          <div className="space-y-3">
            <a
              href="/admin/newsletter"
              className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              E-Bülten Abonelerini Görüntüle
            </a>
            <a
              href="/admin/products"
              className="block px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Ürünleri Yönet
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
