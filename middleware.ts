import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect routes under /admin
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
  matcher: ['/admin/:path*'],
};
