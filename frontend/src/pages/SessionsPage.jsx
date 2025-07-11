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
  ClockIcon,
  VideoCameraIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  UserGroupIcon,
  DocumentTextIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PlusIcon,
  FilterIcon
} from '@heroicons/react/24/outline'

const SessionsPage = () => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('upcoming')
  const [filterStatus, setFilterStatus] = useState('all')

  const sidebarItems = [
    { name: 'Dashboard', icon: ChartBarIcon, route: '/dashboard' },
    { name: 'Analytics', icon: ChartBarIcon, route: '/analytics' },
    { name: 'Profile', icon: UserIcon, route: '/profile' },
    { name: 'Sessions', icon: CalendarIcon, active: true, route: '/sessions' },
    { name: 'Content', icon: CurrencyDollarIcon, route: '/content' },
    { name: 'Wallet', icon: CurrencyDollarIcon, route: '/wallet' },
    { name: 'Community', icon: UserIcon, route: '/community' },
    { name: 'Settings', icon: Cog6ToothIcon, route: '/settings' },
    { name: 'Support', icon: ChartBarIcon, route: '/support' }
  ]

  const sessionStats = [
    { label: 'Total Sessions', value: '1,247', change: '+18', icon: CalendarIcon, color: 'text-primary' },
    { label: 'Hours This Month', value: '156h', change: '+23h', icon: ClockIcon, color: 'text-primary' },
    { label: 'Active Clients', value: '89', change: '+12', icon: UserGroupIcon, color: 'text-primary' },
    { label: 'Avg. Rating', value: '4.9/5', change: '+0.2', icon: StarIcon, color: 'text-primary' }
  ]

  const upcomingSessions = [
    {
      id: 1,
      client: 'TechCorp Ltd',
      subject: 'IT Infrastructure Consulting',
      time: '2:00 PM',
      date: 'Today',
      duration: '1h 30m',
      status: 'confirmed',
      type: 'video',
      rate: '₹4,500',
      avatar: 'TC'
    },
    {
      id: 2,
      client: 'MarketPro Inc',
      subject: 'Digital Marketing Strategy',
      time: '4:30 PM',
      date: 'Today',
      duration: '1h',
      status: 'pending',
      type: 'video',
      rate: '₹3,750',
      avatar: 'MP'
    },
    {
      id: 3,
      client: 'DataFlow Systems',
      subject: 'Analytics Implementation',
      time: '10:00 AM',
      date: 'Tomorrow',
      duration: '2h',
      status: 'confirmed',
      type: 'video',
      rate: '₹7,500',
      avatar: 'DF'
    },
    {
      id: 4,
      client: 'CloudTech Solutions',
      subject: 'Cloud Migration Planning',
      time: '2:30 PM',
      date: 'Dec 12',
      duration: '1h 15m',
      status: 'review',
      type: 'video',
      rate: '₹4,688',
      avatar: 'CT'
    }
  ]

  const recentSessions = [
    {
      id: 1,
      client: 'InnovateTech',
      subject: 'Business Process Optimization',
      date: 'Dec 8, 2024',
      duration: '1h 45m',
      status: 'completed',
      rating: 5,
      earnings: '₹6,563',
      avatar: 'IT'
    },
    {
      id: 2,
      client: 'StartupHub',
      subject: 'Digital Transformation',
      date: 'Dec 7, 2024',
      duration: '2h',
      status: 'completed',
      rating: 5,
      earnings: '₹7,500',
      avatar: 'SH'
    },
    {
      id: 3,
      client: 'Enterprise Solutions',
      subject: 'Data Analytics Setup',
      date: 'Dec 6, 2024',
      duration: '1h 30m',
      status: 'completed',
      rating: 4,
      earnings: '₹5,625',
      avatar: 'ES'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-600'
      case 'pending': return 'bg-yellow-500/20 text-yellow-600'
      case 'review': return 'bg-blue-500/20 text-blue-600'
      case 'completed': return 'bg-primary/20 text-primary'
      case 'cancelled': return 'bg-red-500/20 text-red-600'
      default: return 'bg-gray-500/20 text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return CheckCircleIcon
      case 'pending': return ClockIcon
      case 'review': return ExclamationTriangleIcon
      case 'completed': return CheckCircleIcon
      case 'cancelled': return XCircleIcon
      default: return ClockIcon
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
                    placeholder="Search sessions, clients..."
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

          {/* Sessions Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Sessions</h1>
              <p className="text-text-secondary">Manage your consultation sessions and schedule</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors">
              <PlusIcon className="w-5 h-5" />
              <span>Schedule Session</span>
            </button>
          </div>

          {/* Session Stats */}
          <div className="grid grid-cols-4 gap-6">
            {sessionStats.map((stat, index) => (
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

          {/* Session Tabs */}
          <div className="glass-panel p-2 rounded-2xl border border-glass-border">
            <div className="flex space-x-2">
              {[
                { id: 'upcoming', label: 'Upcoming Sessions', count: upcomingSessions.length },
                { id: 'recent', label: 'Recent Sessions', count: recentSessions.length },
                { id: 'requests', label: 'Session Requests', count: 8 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-glass-hover'
                  }`}
                >
                  <span className="font-medium">{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-primary/20 text-primary'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sessions Content */}
          <div className="grid grid-cols-12 gap-6">
            {/* Main Sessions List */}
            <div className="col-span-8">
              {activeTab === 'upcoming' && (
                <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-text-primary">Upcoming Sessions</h3>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 glass-panel border border-glass-border rounded-lg hover:bg-glass-hover transition-colors">
                          <FilterIcon className="w-4 h-4 text-text-secondary" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {upcomingSessions.map((session) => {
                        const StatusIcon = getStatusIcon(session.status)
                        return (
                          <div key={session.id} className="glass-panel p-6 rounded-xl border border-glass-border/50 hover:border-glass-border transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                {/* Client Avatar */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                                  {session.avatar}
                                </div>

                                {/* Session Details */}
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-1">
                                    <h4 className="font-semibold text-text-primary">{session.client}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(session.status)}`}>
                                      {session.status}
                                    </span>
                                  </div>
                                  <p className="text-text-secondary mb-2">{session.subject}</p>
                                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                                    <div className="flex items-center space-x-1">
                                      <CalendarIcon className="w-4 h-4" />
                                      <span>{session.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <ClockIcon className="w-4 h-4" />
                                      <span>{session.time} • {session.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <VideoCameraIcon className="w-4 h-4" />
                                      <span>Video Call</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Session Actions */}
                              <div className="flex items-center space-x-3">
                                <div className="text-right">
                                  <div className="font-semibold text-text-primary">{session.rate}</div>
                                  <div className="text-sm text-text-secondary">{session.duration}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {session.status === 'confirmed' && (
                                    <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
                                      <PlayIcon className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button className="p-2 glass-panel border border-glass-border rounded-lg hover:bg-glass-hover transition-colors">
                                    <EyeIcon className="w-4 h-4 text-text-secondary" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'recent' && (
                <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-text-primary">Recent Sessions</h3>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 glass-panel border border-glass-border rounded-lg hover:bg-glass-hover transition-colors">
                          <FilterIcon className="w-4 h-4 text-text-secondary" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {recentSessions.map((session) => (
                        <div key={session.id} className="glass-panel p-6 rounded-xl border border-glass-border/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {/* Client Avatar */}
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                                {session.avatar}
                              </div>

                              {/* Session Details */}
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                  <h4 className="font-semibold text-text-primary">{session.client}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(session.status)}`}>
                                    {session.status}
                                  </span>
                                </div>
                                <p className="text-text-secondary mb-2">{session.subject}</p>
                                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                                  <div className="flex items-center space-x-1">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span>{session.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>{session.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                      <StarIcon
                                        key={i}
                                        className={`w-4 h-4 ${i < session.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Session Earnings */}
                            <div className="text-right">
                              <div className="font-semibold text-text-primary">{session.earnings}</div>
                              <div className="text-sm text-text-secondary">Earned</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'requests' && (
                <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-text-primary">Session Requests</h3>
                      <div className="text-sm text-text-secondary">8 pending requests</div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { id: 1, client: 'Anonymous Client', subject: 'Advanced Data Analytics', time: 'Tomorrow 3:00 PM', duration: '2h', rate: '₹7,500', difficulty: 'Advanced' },
                        { id: 2, client: 'Anonymous Client', subject: 'Cloud Architecture Review', time: 'Dec 12, 5:00 PM', duration: '1.5h', rate: '₹5,625', difficulty: 'Expert' },
                        { id: 3, client: 'Anonymous Client', subject: 'Digital Marketing Strategy', time: 'Dec 13, 2:00 PM', duration: '1h', rate: '₹3,750', difficulty: 'Intermediate' }
                      ].map((request) => (
                        <div key={request.id} className="glass-panel p-6 rounded-xl border border-glass-border/50">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-text-primary mb-1">{request.subject}</h4>
                              <p className="text-text-secondary mb-2">{request.client}</p>
                              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="w-4 h-4" />
                                  <span>{request.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <ClockIcon className="w-4 h-4" />
                                  <span>{request.duration}</span>
                                </div>
                                <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                                  {request.difficulty}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-text-primary mb-1">{request.rate}</div>
                              <div className="text-sm text-text-secondary">{request.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button className="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
                              Accept
                            </button>
                            <button className="flex-1 py-2 px-4 glass-panel border border-glass-border text-text-secondary rounded-lg hover:bg-glass-hover transition-colors">
                              Decline
                            </button>
                            <button className="py-2 px-4 glass-panel border border-glass-border text-text-secondary rounded-lg hover:bg-glass-hover transition-colors">
                              Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Quick Actions */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-primary mb-6">Quick Actions</h3>

                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 p-3 glass-panel border border-glass-border rounded-xl hover:bg-glass-hover transition-colors">
                      <PlusIcon className="w-5 h-5 text-primary" />
                      <span className="text-text-primary">Schedule New Session</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 glass-panel border border-glass-border rounded-xl hover:bg-glass-hover transition-colors">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      <span className="text-text-primary">View Calendar</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 glass-panel border border-glass-border rounded-xl hover:bg-glass-hover transition-colors">
                      <DocumentTextIcon className="w-5 h-5 text-primary" />
                      <span className="text-text-primary">Session Reports</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 glass-panel border border-glass-border rounded-xl hover:bg-glass-hover transition-colors">
                      <Cog6ToothIcon className="w-5 h-5 text-primary" />
                      <span className="text-text-primary">Session Settings</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-primary mb-6">Today's Schedule</h3>

                  <div className="space-y-4">
                    {[
                      { time: '2:00 PM', client: 'TechCorp Ltd', status: 'upcoming' },
                      { time: '4:30 PM', client: 'MarketPro Inc', status: 'pending' },
                      { time: '6:00 PM', client: 'Free Slot', status: 'available' }
                    ].map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-3 glass-panel border border-glass-border/50 rounded-lg">
                        <div>
                          <div className="font-medium text-text-primary">{slot.time}</div>
                          <div className="text-sm text-text-secondary">{slot.client}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          slot.status === 'upcoming' ? 'bg-primary/20 text-primary' :
                          slot.status === 'pending' ? 'bg-yellow-500/20 text-yellow-600' :
                          'bg-green-500/20 text-green-600'
                        }`}>
                          {slot.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Session Analytics */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-text-primary mb-6">This Week</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Sessions Completed</span>
                      <span className="font-semibold text-text-primary">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Hours Taught</span>
                      <span className="font-semibold text-text-primary">18.5h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Earnings</span>
                      <span className="font-semibold text-text-primary">₹69,375</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Avg. Rating</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-text-primary">4.8</span>
                        <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                      </div>
                    </div>
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

export default SessionsPage
