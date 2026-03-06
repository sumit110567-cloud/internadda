import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { testId } = await req.json()

    // 1. Get the secure user session from cookies
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ authorized: false, message: "Not authenticated" }, { status: 401 })
    }

    // 2. Check the database for a successful 'PAID' order
    const { data: order, error } = await supabase
      .from('orders')
      .select('status')
      .eq('user_id', user.id)
      .eq('test_id', String(testId))
      .eq('status', 'PAID')
      .single()

    if (error || !order) {
      return NextResponse.json({ authorized: false, message: "Payment not verified" }, { status: 403 })
    }

    // 3. Access granted
    return NextResponse.json({ authorized: true })
    
  } catch (error) {
    console.error('Verify API Error:', error)
    return NextResponse.json({ authorized: false }, { status: 500 })
  }
}
