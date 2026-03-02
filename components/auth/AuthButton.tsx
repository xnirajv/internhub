'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      router.refresh()
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href="/login" className="px-4 py-2 text-blue-600">
          Login
        </Link>
        <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
        Dashboard
      </Link>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
      >
        Sign Out
      </button>
    </div>
  )
}