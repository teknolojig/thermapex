import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Set pathname header for all requests
  const response = pathname.startsWith('/urun-kategori/')
    ? (() => {
        const url = request.nextUrl.clone();
        url.pathname = '/urunler';
        const res = NextResponse.rewrite(url);
        res.headers.set('x-category-path', pathname);
        return res;
      })()
    : NextResponse.next();

  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: ['/urun-kategori/:path*', '/admin/:path*'],
};
