'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const skillOptions = [
  'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'Java', 'C++', 'AWS', 'MongoDB', 'PostgreSQL',
  'GraphQL', 'Docker', 'Kubernetes', 'Machine Learning',
  'Data Science', 'UI/UX', 'Mobile Development', 'DevOps'
]

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [skills, setSkills] = useState<string[]>(
    searchParams.get('skills')?.split(',') || []
  )
  const [location, setLocation] = useState(searchParams.get('location') || '')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (type) params.set('type', type)
    if (skills.length) params.set('skills', skills.join(','))
    if (location) params.set('location', location)
    
    router.push(`/search?${params.toString()}`)
  }

  const toggleSkill = (skill: string) => {
    setSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="font-semibold text-lg">Filters</h2>

      <Input
        label="Search"
        placeholder="Job title, skills..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium mb-2">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">All</option>
          <option value="internship">Internship</option>
          <option value="job">Job</option>
          <option value="freelance">Freelance</option>
          <option value="project">Project</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Skills</label>
        <div className="max-h-48 overflow-y-auto border rounded-lg p-2">
          {skillOptions.map((skill) => (
            <label key={skill} className="flex items-center gap-2 p-1">
              <input
                type="checkbox"
                checked={skills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              {skill}
            </label>
          ))}
        </div>
      </div>

      <Input
        label="Location"
        placeholder="City, Remote..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Button onClick={handleSearch} fullWidth>
        Apply Filters
      </Button>
    </div>
  )
}