import Link from 'next/link'
import { ArrowRight, Users, Briefcase, Award, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card, { CardBody } from '@/components/ui/Card'

export default function HomePage() {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: 'Post Your Skills',
      description: 'Create your profile and showcase your skills to hundreds of companies.'
    },
    {
      icon: <Briefcase className="h-6 w-6 text-blue-600" />,
      title: 'Get Hired',
      description: 'Companies directly reach out to you for internships and jobs.'
    },
    {
      icon: <Award className="h-6 w-6 text-blue-600" />,
      title: 'Build Portfolio',
      description: 'Work on real projects and build your professional portfolio.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: 'Grow Career',
      description: 'Connect with mentors and accelerate your tech career.'
    }
  ]

  const stats = [
    { label: 'Active Students', value: '10,000+' },
    { label: 'Partner Companies', value: '500+' },
    { label: 'Successful Hires', value: '2,500+' },
    { label: 'Projects Completed', value: '5,000+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-blue-50 to-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stop Applying. 
              <span className="text-blue-600"> Get Discovered.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create your profile, showcase your skills, and let companies reach out to you directly for internships, jobs, and projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started as Student
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/company-signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Hire Talent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The simplest way to start your tech career. No more endless applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} hover>
                <CardBody>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to start your career?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of students who found their dream internships through InternHub.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Create Your Profile Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}