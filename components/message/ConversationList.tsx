'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface User {
  id: string
  full_name: string
  avatar_url: string
  user_type: string
}

export default function ConversationList({ 
  users}: { 
  users: User[] 
  currentUserId: string 
}) {
  const searchParams = useSearchParams()
  const selectedUserId = searchParams.get('userId')

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <Link
          key={user.id}
          href={`/messages?userId=${user.id}`}
          className={`block p-3 rounded-lg hover:bg-gray-50 transition ${
            selectedUserId === user.id ? 'bg-blue-50 border border-blue-200' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="" className="w-10 h-10 rounded-full" />
              ) : (
                <span className="text-lg">{user.full_name?.[0]}</span>
              )}
            </div>
            <div>
              <p className="font-medium">{user.full_name}</p>
              <p className="text-sm text-gray-500 capitalize">{user.user_type}</p>
            </div>
          </div>
        </Link>
      ))}

      {users.length === 0 && (
        <p className="text-gray-500 text-center py-4">No conversations yet</p>
      )}
    </div>
  )
}