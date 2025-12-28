import { prisma } from '@/lib/prisma';
import { Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

async function getNewsletterSubscribers() {
  const subscribers = await prisma.newsletters.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return subscribers;
}

export default async function NewsletterPage() {
  const subscribers = await getNewsletterSubscribers();
  const activeCount = subscribers.filter(s => s.active).length;
  const inactiveCount = subscribers.length - activeCount;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">E-Bülten Aboneleri</h1>
        <p className="text-gray-500">
          Toplam {subscribers.length} abone ({activeCount} aktif, {inactiveCount} pasif)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Toplam Abone</p>
              <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Aktif Abone</p>
              <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pasif Abone</p>
              <p className="text-2xl font-bold text-gray-900">{inactiveCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  E-posta
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kayıt Tarihi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Son Güncelleme
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {subscriber.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {subscriber.active ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Pasif
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(subscriber.createdAt).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subscriber.updatedAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {subscribers.length === 0 && (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Henüz abone bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  );
}
