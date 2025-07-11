import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import {
  SunIcon,
  ChartBarIcon,
  UserIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  BellIcon,
  PencilIcon,
  CameraIcon,
  StarIcon,
  TrophyIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const ProfilePage = () => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const sidebarItems = [
    { name: 'Dashboard', icon: ChartBarIcon, route: '/dashboard' },
    { name: 'Analytics', icon: ChartBarIcon, route: '/analytics' },
    { name: 'Profile', icon: UserIcon, active: true, route: '/profile' },
    { name: 'Sessions', icon: CalendarIcon, route: '/sessions' },
    { name: 'Content', icon: CurrencyDollarIcon, route: '/content' },
    { name: 'Wallet', icon: CurrencyDollarIcon, route: '/wallet' },
    { name: 'Community', icon: UserIcon, route: '/community' },
    { name: 'Settings', icon: Cog6ToothIcon, route: '/settings' },
    { name: 'Support', icon: ChartBarIcon, route: '/support' }
  ]

  const profileStats = [
    { label: 'Total Sessions', value: '1,247', icon: CalendarIcon, color: 'text-primary' },
    { label: 'Client Rating', value: '4.9/5', icon: StarIcon, color: 'text-primary' },
    { label: 'Hours Taught', value: '3,456h', icon: ClockIcon, color: 'text-primary' },
    { label: 'Certifications', value: '12', icon: AcademicCapIcon, color: 'text-primary' }
  ]

  const achievements = [
    { title: 'Top Performer', description: 'Ranked in top 5% of consultants', icon: '🏆', date: 'Dec 2024' },
    { title: 'Client Favorite', description: '100+ five-star reviews', icon: '⭐', date: 'Nov 2024' },
    { title: 'Expert Consultant', description: 'Completed 1000+ sessions', icon: '🎯', date: 'Oct 2024' },
    { title: 'Knowledge Master', description: 'Certified in 10+ domains', icon: '🧠', date: 'Sep 2024' }
  ]

  const skills = [
    { name: 'IT Consulting', level: 95, category: 'Expert' },
    { name: 'Digital Marketing', level: 88, category: 'Advanced' },
    { name: 'Business Strategy', level: 92, category: 'Expert' },
    { name: 'Data Analytics', level: 85, category: 'Advanced' },
    { name: 'Cloud Solutions', level: 78, category: 'Intermediate' },
    { name: 'Project Management', level: 90, category: 'Expert' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Flowing Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large flowing orb - top right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-60 animate-float-slow"
             style={{
               background: 'radial-gradient(circle, rgba(0, 0, 26, 0.4) 0%, rgba(59, 130, 246, 0.3) 40%, transparent 70%)',
               filter: 'blur(40px)'
             }}></div>

        {/* Medium flowing orb - bottom left */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-40 animate-float-delayed"
             style={{
               background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)',
               filter: 'blur(30px)'
             }}></div>

        {/* Small accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-30 animate-pulse"
             style={{
               background: 'radial-gradient(circle, rgba(0, 0, 26, 0.3) 0%, transparent 70%)',
               filter: 'blur(20px)',
               animationDelay: '2s'
             }}></div>

        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full opacity-25 animate-float"
             style={{
               background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
               filter: 'blur(15px)',
               animationDelay: '4s'
             }}></div>

        {/* Large bottom flowing orbs */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-50 animate-float-slow"
             style={{
               background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.3) 30%, transparent 70%)',
               filter: 'blur(60px)',
               animationDelay: '1s'
             }}></div>

        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full opacity-40 animate-float-delayed"
             style={{
               background: 'radial-gradient(circle, rgba(0, 0, 26, 0.5) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
               filter: 'blur(50px)',
               animationDelay: '3s'
             }}></div>

        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-35 animate-pulse"
             style={{
               background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)',
               filter: 'blur(45px)',
               animationDelay: '5s',
               animationDuration: '8s'
             }}></div>

        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full opacity-30 animate-float"
             style={{
               background: 'radial-gradient(circle, rgba(0, 0, 26, 0.3) 0%, rgba(139, 92, 246, 0.2) 60%, transparent 80%)',
               filter: 'blur(25px)',
               animationDelay: '6s'
             }}></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 p-6 space-y-6">
          {/* Logo */}
          <div className="glass-panel p-4 rounded-2xl border border-glass-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <div className="text-text-primary font-semibold">SynapMentor</div>
                <div className="text-xs text-text-secondary">Tutoring Platform</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.route && navigate(item.route)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                  item.active
                    ? 'glass-panel border border-glass-border bg-primary/10 text-primary'
                    : 'hover:glass-panel hover:border hover:border-glass-border text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="space-y-2 mt-auto">
            <div className="flex items-center space-x-3 p-3 rounded-xl hover:glass-panel hover:border hover:border-glass-border text-text-secondary hover:text-text-primary transition-all duration-300">
              <Cog6ToothIcon className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-xl hover:glass-panel hover:border hover:border-glass-border text-text-secondary hover:text-text-primary transition-all duration-300">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Top Header */}
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search for Orders, products, customers..."
                    className="w-full pl-10 pr-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all duration-300"
                  />
                </div>
              </div>

              <button className="p-3 glass-panel rounded-xl border border-glass-border hover:bg-glass-hover transition-all duration-300 relative">
                <BellIcon className="w-5 h-5 text-text-secondary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
              </button>

              <div className="flex items-center space-x-3 glass-panel p-3 rounded-xl border border-glass-border">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600"></div>
                <ChevronDownIcon className="w-4 h-4 text-text-secondary" />
              </div>

              <button onClick={toggleTheme} className="p-3 glass-panel rounded-xl border border-glass-border hover:bg-glass-hover transition-all duration-300">
                {isDark ? <SunIcon className="w-5 h-5 text-text-secondary" /> : <div className="w-5 h-5 text-text-secondary">🌙</div>}
              </button>
            </div>
          </div>

          {/* Profile Header */}
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Profile</h1>
            <p className="text-text-secondary">Manage your professional profile and settings</p>
          </div>

          {/* Profile Overview */}
          <div className="glass-panel p-8 rounded-2xl border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-6">
                  {/* Profile Picture */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      JD
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/80 transition-colors">
                      <CameraIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Basic Info */}
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold text-text-primary">John Doe</h2>
                      <div className="flex items-center space-x-1 bg-primary/20 text-primary px-2 py-1 rounded-full text-sm">
                        <ShieldCheckIcon className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    </div>
                    <p className="text-text-secondary mb-1">Senior IT Consultant & Business Strategist</p>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>Mumbai, India</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>Member since 2022</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-4 py-2 glass-panel border border-glass-border rounded-xl text-text-secondary hover:text-text-primary transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </button>
              </div>

              {/* Profile Stats */}
              <div className="grid grid-cols-4 gap-6">
                {profileStats.map((stat, index) => (
                  <div key={index} className="glass-panel p-4 rounded-xl border border-glass-border/50 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-text-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Profile Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Personal Information */}
            <div className="col-span-8 space-y-6">
              {/* Personal Information */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-primary mb-6">Personal Information</h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary focus:outline-none focus:border-primary/50 transition-all duration-300 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary focus:outline-none focus:border-primary/50 transition-all duration-300 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary focus:outline-none focus:border-primary/50 transition-all duration-300 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+91 98765 43210"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary focus:outline-none focus:border-primary/50 transition-all duration-300 disabled:opacity-60"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-2">Bio</label>
                      <textarea
                        rows={4}
                        defaultValue="Experienced IT consultant with 10+ years in digital transformation, cloud solutions, and business strategy. Passionate about helping businesses leverage technology for growth."
                        disabled={!isEditing}
                        className="w-full px-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary focus:outline-none focus:border-primary/50 transition-all duration-300 disabled:opacity-60 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-primary mb-6">Professional Information</h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Job Title</label>
                      <input
                        type="text"
                        defaultValue="Senior IT Consultant"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary focus:outline-none focus:border-primary/50 transition-all duration-300 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Company</label>
                      <input
                        type="text"
                        defaultValue="TechConsult Pro"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary focus:outline-none focus:border-primary/50 transition-all duration-300 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Experience</label>
                      <select
                        defaultValue="10+ years"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary focus:outline-none focus:border-primary/50 transition-all duration-300 disabled:opacity-60"
                      >
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">Hourly Rate</label>
                      <input
                        type="text"
                        defaultValue="₹3,750/hr"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary focus:outline-none focus:border-primary/50 transition-all duration-300 disabled:opacity-60"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-text-secondary mb-2">Specializations</label>
                      <div className="flex flex-wrap gap-2">
                        {['IT Consulting', 'Digital Marketing', 'Business Strategy', 'Data Analytics', 'Cloud Solutions', 'Project Management'].map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                        {isEditing && (
                          <button className="px-3 py-1 glass-panel border border-glass-border rounded-full text-text-secondary hover:text-text-primary transition-colors text-sm">
                            + Add Skill
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills & Expertise */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-primary mb-6">Skills & Expertise</h3>

                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-text-primary">{skill.name}</span>
                            <span className="text-sm text-text-secondary">({skill.category})</span>
                          </div>
                          <span className="text-sm font-medium text-primary">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-glass-border/30 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Achievements & Activity */}
            <div className="col-span-4 space-y-6">
              {/* Achievements */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-primary mb-6">Achievements</h3>

                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium text-text-primary mb-1">{achievement.title}</div>
                            <div className="text-sm text-text-secondary mb-2">{achievement.description}</div>
                            <div className="text-xs text-primary">{achievement.date}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-primary mb-6">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-text-secondary" />
                      <span className="text-text-primary">john.doe@example.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="w-5 h-5 text-text-secondary" />
                      <span className="text-text-primary">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPinIcon className="w-5 h-5 text-text-secondary" />
                      <span className="text-text-primary">Mumbai, India</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GlobeAltIcon className="w-5 h-5 text-text-secondary" />
                      <span className="text-text-primary">www.johndoe-consulting.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-primary mb-6">Recent Activity</h3>

                  <div className="space-y-4">
                    {[
                      { action: 'Completed consultation with TechCorp Ltd', time: '2 hours ago', type: 'session' },
                      { action: 'Received 5-star rating', time: '4 hours ago', type: 'rating' },
                      { action: 'Updated profile information', time: '1 day ago', type: 'profile' },
                      { action: 'Added new certification', time: '3 days ago', type: 'achievement' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'session' ? 'bg-primary' :
                          activity.type === 'rating' ? 'bg-yellow-500' :
                          activity.type === 'profile' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="text-sm text-text-primary">{activity.action}</div>
                          <div className="text-xs text-text-secondary">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
