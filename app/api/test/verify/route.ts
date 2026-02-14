import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: Request) {
  const supabase = createClient()
  const { testId } = await req.json()

  // Get the actual authenticated user from the session, don't trust the request body
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ authorized: false, message: "Not authenticated" }, { status: 401 })
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select('status')
    .eq('user_id', user.id) // Use the secure ID from auth.getUser()
    .eq('test_id', testId)
    .eq('status', 'PAID')
    .single()

  if (error || !order) {
    return NextResponse.json({ authorized: false, message: "Payment not verified" }, { status: 403 })
  }

  return NextResponse.json({ authorized: true })
}
