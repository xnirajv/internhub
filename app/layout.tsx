import './globals.css'
import AuthButton from '@/components/auth/AuthButton'
import { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: 'Internship Platform - Get Hired by Companies',
  description: 'Post your skills, get hired by top companies',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b">
          <div className="container-custom py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              InternHub
            </Link>
            <AuthButton />
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}