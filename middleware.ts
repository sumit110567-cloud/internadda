import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { pathname, searchParams } = req.nextUrl;
  const token = searchParams.get('token');

  // --- LAYER 1: TOKEN BYPASS (STRICT 60s WINDOW) ---
  if (pathname.startsWith('/test') && token) {
    try {
      const [timestampStr] = token.split('_');
      const tokenTime = parseInt(timestampStr);
      const currentTime = Math.floor(Date.now() / 1000);

      // Link expires in 60 seconds for maximum security
      if (currentTime - tokenTime < 60) {
        return res;
      }
    } catch (e) {
      console.error("Middleware token validation failed");
    }
  }

  // --- LAYER 2: SESSION CHECK ---
  const { data: { session } } = await supabase.auth.getSession();

  if (pathname.startsWith('/test') || pathname.startsWith('/apply')) {
    if (!session) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/auth/signin';
      redirectUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: ['/test/:path*', '/apply/:path*'],
};
