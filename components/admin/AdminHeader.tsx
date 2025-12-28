'use client';

import { signOut } from 'next-auth/react';
import { LogOut, User } from 'lucide-react';

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
          <p className="text-sm text-gray-500">Thermapex Admin</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </header>
  );
}
