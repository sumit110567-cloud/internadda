import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: Request) {
  try {
    // 🔥 Await the client initialization
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ... (rest of your Cashfree and DB logic)
  } catch (error) {
    console.error('Create Order Crash:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
