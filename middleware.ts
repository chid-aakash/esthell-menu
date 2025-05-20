import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Check if the path is the root ("/")
  if (pathname === '/') {
    // Check if the 'r' query parameter (roomId) is missing
    if (!searchParams.has('r') || !searchParams.get('r')) {
      // If 'r' is missing, redirect to the /invalid-qr page
      const url = request.nextUrl.clone();
      url.pathname = '/invalid-qr';
      url.search = ''; // Clear existing search params for the invalid-qr page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/', // Only run this middleware on the root path
}; 