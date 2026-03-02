// User Types
export type UserType = 'student' | 'company' | 'admin'

export type Availability = 'internship' | 'job' | 'freelance' | 'project'

export interface User {
  id: string
  email: string
  name: string
  userType: UserType
  avatar?: string
  createdAt: Date
}

export interface Student extends User {
  userType: 'student'
  skills: string[]
  experience: string // years or description
  education: Education[]
  portfolio?: string
  github?: string
  linkedin?: string
  resume?: string
  availability: Availability[]
  bio: string
  location: string
}

export interface Company extends User {
  userType: 'company'
  companyName: string
  website: string
  industry: string
  size: string
  description: string
  location: string
  logo?: string
}

export interface Education {
  institution: string
  degree: string
  fieldOfStudy: string
  startYear: number
  endYear?: number
  current: boolean
}

export interface Post {
  id: string
  userId: string
  userType: 'student' | 'company'
  content: string
  skills: string[]
  availability?: Availability[]
  createdAt: Date
  likes: number
  comments: number
}

export interface Message {
  id: string
  fromUserId: string
  toUserId: string
  content: string
  createdAt: Date
  read: boolean
}