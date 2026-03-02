import SearchFilters from '@/components/search/SearchFilters';
import SearchResults from '@/components/search/SearchResults';
import { createServerClient } from '@/lib/supabase/server'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; type?: string; skills?: string; location?: string }
}) {
  const supabase = await createServerClient()
  
  let query = supabase
    .from('posts')
    .select(`
      *,
      users (
        full_name,
        avatar_url,
        user_type,
        location
      )
    `)

  // Apply filters
  if (searchParams.q) {
    query = query.or(`title.ilike.%${searchParams.q}%,description.ilike.%${searchParams.q}%`)
  }

  if (searchParams.skills) {
    const skills = searchParams.skills.split(',')
    query = query.contains('skills', skills)
  }

  if (searchParams.location) {
    query = query.ilike('location', `%${searchParams.location}%`)
  }

  if (searchParams.type) {
    query = query.contains('availability', [searchParams.type])
  }

  const { data: posts } = await query.order('created_at', { ascending: false })

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold mb-6">Search Opportunities</h1>
      
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SearchFilters />
        </div>
        
        <div className="md:col-span-3">
          <SearchResults posts={posts || []} />
        </div>
      </div>
    </div>
  )
}