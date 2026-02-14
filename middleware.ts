  import { createServerClient, type CookieOptions } from '@supabase/ssr'
  import { NextResponse, type NextRequest } from 'next/server'
  
  export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )
  
    /**
     * IMPORTANT: Use getUser() instead of getSession() for secure server-side verification.
     * getUser() re-validates the user with Supabase's auth server to prevent spoofing
     * and ensures the token hasn't been revoked.
     */
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    const { pathname } = request.nextUrl
  
    // 1. If logged in and trying to access auth pages (signin/signup), redirect home
    if (user && pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  
    // 2. Protected routes logic: Users must be logged in to apply or take tests
    const isProtectedPage =
      pathname.startsWith('/test') ||
      pathname.startsWith('/apply')
  
    if (isProtectedPage && !user) {
      const redirectUrl = new URL('/auth/signin', request.url)
      // callbackUrl allows the user to return to their intended page after logging in
      redirectUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(redirectUrl)
    }
  
    return response
  }
  
  export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * - common image extensions
       */
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
  }
