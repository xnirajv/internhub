'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [userType, setUserType] = useState<'student' | 'company'>('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 1. Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType,
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // 2. Create user in users table
    if (authData.user) {
      const { error: profileError } = await supabase.from('users').insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        user_type: userType,
      })

      if (profileError) {
        console.error('Error creating profile:', profileError)
      }
    }

    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4 max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center">Create Account</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg">
          {error}
        </div>
      )}

      <Input
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      <div>
        <label className="block text-sm font-medium mb-2">I am a</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={userType === 'student'}
              onChange={() => setUserType('student')}
            />
            Student
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={userType === 'company'}
              onChange={() => setUserType('company')}
            />
            Company
          </label>
        </div>
      </div>

      <Button type="submit" isLoading={loading} fullWidth>
        Sign Up
      </Button>
    </form>
  )
}