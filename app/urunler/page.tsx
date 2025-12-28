'use client';

import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductsContent from './ProductsContent';

export const dynamic = 'force-dynamic';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">Yükleniyor...</div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </>
  );
}
