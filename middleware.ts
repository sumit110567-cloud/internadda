import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  
  // --- LAYER 1: DYNAMIC TOKEN BYPASS (Sabse Pehle) ---
  const token = searchParams.get('token')
  if (pathname.startsWith('/test') && token) {
    try {
      const [timestampStr] = token.split('_')
      const tokenTime = parseInt(timestampStr)
      const currentTime = Math.floor(Date.now() / 1000)

      // Agar token 120 seconds (2 min) se purana nahi hai, toh allow karo
      if (currentTime - tokenTime < 120) {
        return NextResponse.next()
      }
    } catch (e) {
      console.error("Token verification failed")
    }
  }

  // --- LAYER 2: NORMAL SESSION CHECK ---
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // --- LAYER 3: PROTECTION ---
  if (pathname.startsWith('/test')) {
    if (!session) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/signin'
      redirectUrl.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: ['/test/:path*'],
}
