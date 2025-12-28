'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchParamsHandler({ 
  onSearchChange 
}: { 
  onSearchChange: (search: string) => void 
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  useEffect(() => {
    onSearchChange(search);
  }, [search, onSearchChange]);

  return null;
}
