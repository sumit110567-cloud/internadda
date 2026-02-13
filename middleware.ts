// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  // Agar user /test page par ja raha hai aur session nahi hai
  if (req.nextUrl.pathname.startsWith('/test') && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}
