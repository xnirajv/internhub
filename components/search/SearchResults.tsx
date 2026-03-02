import Link from 'next/link'
import { MapPin, Briefcase, Calendar } from 'lucide-react'

interface Post {
  id: string
  title: string
  description: string
  skills: string[]
  availability: string[]
  location: string
  experience: string
  created_at: string
  users: {
    full_name: string
    avatar_url: string
    user_type: string
  }
}

export default function SearchResults({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              {post.users.avatar_url ? (
                <img src={post.users.avatar_url} alt="" className="w-12 h-12 rounded-full" />
              ) : (
                <span className="text-xl">{post.users.full_name?.[0]}</span>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-600 mt-1">{post.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {post.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {post.availability.join(', ')}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {post.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}