'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Card, { CardBody, CardHeader } from '../ui/Card'
import { Availability } from '@/lib/types'

interface PostAvailabilityProps {
  onSubmit?: (data: {
    title: string;
    description: string;
    availability: Availability[];
    experience: string;
    location: string;
    skills: string[];
  }) => void
}

const PostAvailability: React.FC<PostAvailabilityProps> = ({ onSubmit }) => {
  const [skills, setSkills] = useState<string[]>([])
  const [currentSkill, setCurrentSkill] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    availability: [] as Availability[],
    experience: '',
    location: ''
  })

  const availabilityOptions: { value: Availability; label: string }[] = [
    { value: 'internship', label: 'Internship' },
    { value: 'job', label: 'Full-time Job' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'project', label: 'Project-based' }
  ]

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()])
      setCurrentSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({ ...formData, skills })
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">Post Your Availability</h2>
        <p className="text-gray-600 mt-1">Let companies know you&apos;re looking for opportunities</p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Input
            label="Title"
            placeholder="e.g., Looking for React Internship"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              placeholder="Tell companies about yourself and what you're looking for..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Availability Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Looking for
            </label>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    const newAvailability = formData.availability.includes(option.value)
                      ? formData.availability.filter(a => a !== option.value)
                      : [...formData.availability, option.value]
                    setFormData({ ...formData, availability: newAvailability })
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.availability.includes(option.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="e.g., React, Python, AWS"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={handleAddSkill} variant="secondary">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-blue-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <Input
            label="Experience"
            placeholder="e.g., 1 year, 2 years, fresher"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            required
          />

          {/* Location */}
          <Input
            label="Location"
            placeholder="e.g., Remote, Mumbai, Delhi"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />

          {/* Submit */}
          <Button type="submit" fullWidth>
            Post Availability
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default PostAvailability