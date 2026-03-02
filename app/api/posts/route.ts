import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET all posts
export async function GET() {
  const supabase = await createServerClient()
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      users (
        full_name,
        avatar_url,
        user_type
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ posts })
}

// POST new post
export async function POST(req: Request) {
  const supabase = await createServerClient()
  
  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  
  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...body,
      user_id: user.id
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ post: data })
}