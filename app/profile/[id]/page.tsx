'use client'

import { MapPin, Github, Linkedin, Globe, Mail, Briefcase, GraduationCap } from 'lucide-react'
import Card, { CardBody, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function ProfilePage() {

  // Mock data - In real app, fetch based on userId
  const profile = {
    name: 'John Doe',
    title: 'Computer Science Student | Full Stack Developer',
    location: 'Mumbai, India',
    email: 'john@example.com',
    bio: 'Passionate CS student with experience in building web applications. Looking for internship opportunities in full-stack development.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'AWS'],
    education: [
      {
        degree: 'B.Tech Computer Science',
        institution: 'IIT Bombay',
        year: '2022-2026',
        cgpa: '8.5'
      }
    ],
    experience: [
      {
        role: 'Full Stack Developer Intern',
        company: 'Tech Startup',
        duration: 'Summer 2024',
        description: 'Built REST APIs and React components'
      }
    ],
    social: {
      github: 'github.com/johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      portfolio: 'johndoe.dev'
    }
  }

  return (
    <div className="container-custom py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-blue-600">JD</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600 mt-1">{profile.title}</p>
              
              <div className="flex items-center justify-center gap-1 mt-2 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profile.location}</span>
              </div>

              <div className="flex justify-center gap-3 mt-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Mail className="h-5 w-5" />
                </a>
              </div>

              <Button fullWidth className="mt-6">Contact</Button>
            </CardBody>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Bio */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700">{profile.bio}</p>
            </CardBody>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
            </CardHeader>
            <CardBody>
              {profile.experience.map((exp, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-medium text-gray-900">{exp.role}</h3>
                  <p className="text-blue-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Education</h2>
            </CardHeader>
            <CardBody>
              {profile.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year} | CGPA: {edu.cgpa}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}