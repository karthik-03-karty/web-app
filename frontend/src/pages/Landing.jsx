import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import {
  AcademicCapIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'

const Landing = () => {
  const { isDark, toggleTheme } = useTheme()

  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Expert Tutoring',
      description: 'Connect with skilled tutors across various subjects and technologies'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Learning',
      description: 'Join a vibrant community of learners and share knowledge'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Earn & Learn',
      description: 'Monetize your expertise or invest in your learning journey'
    },
    {
      icon: ChartBarIcon,
      title: 'Track Progress',
      description: 'Monitor your learning progress with detailed analytics'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-panel border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary neon-text">SynapMentor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-glass-hover transition-colors"
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-blue-400" />
                )}
              </button>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-text-primary hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors neon-glow"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-text-primary mb-6">
              Master Skills with
              <span className="text-primary neon-text block">Expert Mentorship</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Connect with industry experts, learn cutting-edge technologies, and accelerate your career
              in our EVE Online-inspired learning universe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-all duration-300 neon-glow transform hover:scale-105"
              >
                Start Learning
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 glass-panel border border-glass-border text-text-primary rounded-lg font-semibold hover:bg-glass-hover transition-all duration-300"
              >
                Become a Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-glass-bg/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Why Choose SynapMentor?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Experience the future of learning with our advanced platform designed for the digital age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-panel p-6 rounded-xl border border-glass-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="glass-panel p-8 rounded-xl border border-glass-border">
              <div className="text-4xl font-bold text-primary neon-text mb-2">1000+</div>
              <div className="text-text-secondary">Expert Mentors</div>
            </div>
            <div className="glass-panel p-8 rounded-xl border border-glass-border">
              <div className="text-4xl font-bold text-primary neon-text mb-2">5000+</div>
              <div className="text-text-secondary">Learning Sessions</div>
            </div>
            <div className="glass-panel p-8 rounded-xl border border-glass-border">
              <div className="text-4xl font-bold text-primary neon-text mb-2">95%</div>
              <div className="text-text-secondary">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Join thousands of learners and mentors in our advanced learning ecosystem.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-all duration-300 neon-glow transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel border-t border-glass-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary neon-text mb-4">SynapMentor</h3>
            <p className="text-text-secondary mb-4">
              Empowering minds through expert mentorship and cutting-edge technology.
            </p>
            <div className="flex justify-center space-x-6">
              <Link to="/login" className="text-text-secondary hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="text-text-secondary hover:text-primary transition-colors">
                Register
              </Link>
              <Link to="/support" className="text-text-secondary hover:text-primary transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
