'use client'

import { useState } from 'react'
import { Briefcase, Users, MessageSquare, Eye } from 'lucide-react'
import Card, { CardBody, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import PostAvailability from '@/components/forms/PostAvailability'

export default function DashboardPage() {
  const [showPostForm, setShowPostForm] = useState(false)

  // Mock data
  const stats = [
    { label: 'Profile Views', value: '156', icon: Eye, change: '+12%' },
    { label: 'Company Reachouts', value: '8', icon: Users, change: '+4' },
    { label: 'Messages', value: '12', icon: MessageSquare, change: '+3' },
    { label: 'Applications', value: '5', icon: Briefcase, change: '+2' }
  ]

  const recentActivity = [
    { id: 1, type: 'view', company: 'Google', time: '2 hours ago' },
    { id: 2, type: 'message', company: 'Microsoft', message: 'Interested in your profile', time: '1 day ago' },
    { id: 3, type: 'offer', company: 'Startup XYZ', message: 'Internship offer', time: '2 days ago' }
  ]

  if (showPostForm) {
    return (
      <div className="container-custom py-8">
        <button
          onClick={() => setShowPostForm(false)}
          className="mb-4 text-blue-600 hover:text-blue-700"
        >
          ← Back to Dashboard
        </button>
        <PostAvailability onSubmit={(data) => {
          console.log('Posted:', data)
          setShowPostForm(false)
        }} />
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your profile</p>
        </div>
        <Button onClick={() => setShowPostForm(true)}>
          + Post Availability
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardBody>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm text-green-600">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.company}</p>
                      <p className="text-sm text-gray-600">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Profile Completion */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Profile Strength</h2>
            </CardHeader>
            <CardBody>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
                  75%
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Basic Info</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Skills</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Portfolio</span>
                  <span className="text-yellow-600">Pending</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Resume</span>
                  <span className="text-yellow-600">Upload</span>
                </div>
              </div>
              <Button variant="outline" fullWidth className="mt-4">
                Complete Profile
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}