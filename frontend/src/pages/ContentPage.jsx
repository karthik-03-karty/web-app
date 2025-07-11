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
  DocumentTextIcon,
  FolderIcon,
  CloudArrowUpIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  PlusIcon,
  FilterIcon,
  ArrowDownTrayIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentIcon,
  PresentationChartBarIcon,
  ArchiveBoxIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const ContentPage = () => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const sidebarItems = [
    { name: 'Dashboard', icon: ChartBarIcon, route: '/dashboard' },
    { name: 'Analytics', icon: ChartBarIcon, route: '/analytics' },
    { name: 'Profile', icon: UserIcon, route: '/profile' },
    { name: 'Sessions', icon: CalendarIcon, route: '/sessions' },
    { name: 'Content', icon: CurrencyDollarIcon, active: true, route: '/content' },
    { name: 'Wallet', icon: CurrencyDollarIcon, route: '/wallet' },
    { name: 'Community', icon: UserIcon, route: '/community' },
    { name: 'Settings', icon: Cog6ToothIcon, route: '/settings' },
    { name: 'Support', icon: ChartBarIcon, route: '/support' }
  ]

  const contentStats = [
    { label: 'Total Files', value: '245', change: '+12', icon: DocumentTextIcon, color: 'text-primary' },
    { label: 'Storage Used', value: '2.4 GB', change: '+0.3 GB', icon: ArchiveBoxIcon, color: 'text-primary' },
    { label: 'Shared Items', value: '89', change: '+5', icon: ShareIcon, color: 'text-primary' },
    { label: 'Downloads', value: '1,247', change: '+156', icon: ArrowDownTrayIcon, color: 'text-primary' }
  ]

  const contentItems = [
    {
      id: 1,
      name: 'IT Infrastructure Guide.pdf',
      type: 'document',
      size: '2.4 MB',
      modified: '2 hours ago',
      shared: true,
      downloads: 45,
      rating: 4.8,
      folder: 'IT Consulting'
    },
    {
      id: 2,
      name: 'Digital Marketing Strategy.pptx',
      type: 'presentation',
      size: '5.1 MB',
      modified: '1 day ago',
      shared: true,
      downloads: 32,
      rating: 4.9,
      folder: 'Marketing'
    },
    {
      id: 3,
      name: 'Data Analytics Tutorial.mp4',
      type: 'video',
      size: '125 MB',
      modified: '3 days ago',
      shared: false,
      downloads: 78,
      rating: 4.7,
      folder: 'Analytics'
    },
    {
      id: 4,
      name: 'Cloud Architecture Diagram.png',
      type: 'image',
      size: '890 KB',
      modified: '1 week ago',
      shared: true,
      downloads: 23,
      rating: 4.6,
      folder: 'Cloud Solutions'
    },
    {
      id: 5,
      name: 'Business Process Template.docx',
      type: 'document',
      size: '1.2 MB',
      modified: '2 weeks ago',
      shared: true,
      downloads: 67,
      rating: 4.9,
      folder: 'Business Strategy'
    },
    {
      id: 6,
      name: 'Project Management Checklist.pdf',
      type: 'document',
      size: '756 KB',
      modified: '3 weeks ago',
      shared: false,
      downloads: 34,
      rating: 4.5,
      folder: 'Project Management'
    }
  ]

  const folders = [
    { name: 'IT Consulting', count: 45, color: 'bg-blue-500' },
    { name: 'Digital Marketing', count: 32, color: 'bg-green-500' },
    { name: 'Business Strategy', count: 28, color: 'bg-purple-500' },
    { name: 'Data Analytics', count: 23, color: 'bg-orange-500' },
    { name: 'Cloud Solutions', count: 19, color: 'bg-cyan-500' },
    { name: 'Project Management', count: 15, color: 'bg-pink-500' }
  ]

  const getFileIcon = (type) => {
    switch (type) {
      case 'document': return DocumentIcon
      case 'presentation': return PresentationChartBarIcon
      case 'video': return VideoCameraIcon
      case 'image': return PhotoIcon
      default: return DocumentTextIcon
    }
  }

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'document': return 'text-blue-600'
      case 'presentation': return 'text-orange-600'
      case 'video': return 'text-red-600'
      case 'image': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

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
                    placeholder="Search files and folders..."
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

          {/* Content Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Content Management</h1>
              <p className="text-text-secondary">Organize and share your educational resources</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors">
              <CloudArrowUpIcon className="w-5 h-5" />
              <span>Upload Content</span>
            </button>
          </div>

          {/* Content Stats */}
          <div className="grid grid-cols-4 gap-6">
            {contentStats.map((stat, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <span className="text-primary text-sm font-medium">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Library Placeholder */}
          <div className="glass-panel p-8 rounded-2xl border border-glass-border text-center">
            <DocumentTextIcon className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">Content Library</h3>
            <p className="text-text-secondary">Your educational content will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPage
