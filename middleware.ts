import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get('host');

  // 1. Enforce non-www domain canonicalization for all routes
  if (host === 'www.engravingnation.store') {
    return NextResponse.redirect(
      `https://engravingnation.store${pathname}${search}`,
      301
    );
  }
  
  // 2. Protect routes under /admin
  if (pathname.startsWith('/admin')) {
    // Exclude the login page from protection to avoid infinite loops
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    const session = request.cookies.get('admin_session');
    
    // If no session cookie, redirect to login
    if (!session || session.value !== 'authenticated') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
