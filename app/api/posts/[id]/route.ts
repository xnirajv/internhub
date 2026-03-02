import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// GET single post
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerClient()
  
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      users (
        full_name,
        avatar_url,
        user_type,
        bio,
        location
      )
    `)
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json({ post })
}

// UPDATE post
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  
  const { data, error } = await supabase
    .from('posts')
    .update(body)
    .eq('id', params.id)
    .eq('user_id', user.id) // Ensure user owns the post
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ post: data })
}

// DELETE post
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}