import React from 'react'
import Link from 'next/link'
import { Briefcase, Github, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">InternHub</span>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting talented students with amazing companies. Post your skills, get hired.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Students</h3>
            <ul className="space-y-2">
              <li><Link href="/internships" className="text-gray-600 hover:text-blue-600">Find Internships</Link></li>
              <li><Link href="/jobs" className="text-gray-600 hover:text-blue-600">Jobs</Link></li>
              <li><Link href="/projects" className="text-gray-600 hover:text-blue-600">Projects</Link></li>
              <li><Link href="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Companies</h3>
            <ul className="space-y-2">
              <li><Link href="/post-job" className="text-gray-600 hover:text-blue-600">Post a Job</Link></li>
              <li><Link href="/search" className="text-gray-600 hover:text-blue-600">Search Students</Link></li>
              <li><Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact Sales</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} InternHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer