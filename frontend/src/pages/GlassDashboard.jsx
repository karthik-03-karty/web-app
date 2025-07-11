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
  Bars3Icon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  TrophyIcon,
  FireIcon,
  EyeIcon,
  PlayIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as TimeIcon,
  UsersIcon,
  CameraIcon,
  LinkIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

const GlassDashboard = () => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('Dashboard')

  const handleSectionChange = (section) => {
    if (section === 'Logout') {
      // Handle logout logic here
      localStorage.removeItem('authToken') // Example logout logic
      navigate('/login')
    } else {
      setActiveSection(section)
    }
  }

  const sidebarItems = [
    { name: 'Dashboard', icon: ChartBarIcon, section: 'Dashboard' },
    { name: 'Bookings & Sessions', icon: CalendarIcon, section: 'BookingsAndSessions' },
    { name: 'Profile', icon: UserIcon, section: 'Profile' },
    { name: 'Skill Verification', icon: AcademicCapIcon, section: 'SkillVerification' },
    { name: 'Identity Verification', icon: ShieldCheckIcon, section: 'IdentityVerification' },
    { name: 'Wallet', icon: CurrencyDollarIcon, section: 'Wallet' },
    { name: 'Payment Gateway', icon: CreditCardIcon, section: 'PaymentGateway' },
    { name: 'Content (Resources)', icon: DocumentTextIcon, section: 'Content' },
    { name: 'Teams', icon: UserGroupIcon, section: 'Teams' },
    { name: 'Community', icon: UsersIcon, section: 'Community' },
    { name: 'Notifications', icon: BellIcon, section: 'Notifications' },
    { name: 'Settings', icon: Cog6ToothIcon, section: 'Settings' },
    { name: 'Support', icon: QuestionMarkCircleIcon, section: 'Support' },
    { name: 'Logout', icon: ArrowRightOnRectangleIcon, section: 'Logout' }
  ]

  const revenueData = [
    { month: '16 Nov', value: 1225000 },
    { month: '22 Nov', value: 1470000 },
    { month: '30 Nov', value: 1798000 },
    { month: '07 Dec', value: 2045000 },
    { month: '15 Dec', value: 2289000 }
  ]

  const learningProgressData = [
    { stage: 'Active Clients', value: 1247, percentage: 100, color: '#00001a' },
    { stage: 'Ongoing Projects', value: 1089, percentage: 87.3, color: '#00001a' },
    { stage: 'Completed Projects', value: 892, percentage: 71.5, color: '#00001a' }
  ]

  const subjectBreakdown = [
    { category: 'IT Consulting', value: '342 clients', color: '#00001a', percentage: 75 },
    { category: 'Digital Marketing', value: '298 clients', color: '#00001a', percentage: 65 },
    { category: 'Business Strategy', value: '267 clients', color: '#00001a', percentage: 58 },
    { category: 'Data Analytics', value: '189 clients', color: '#00001a', percentage: 41 },
    { category: 'Cloud Solutions', value: '151 clients', color: '#00001a', percentage: 33 }
  ]

  // Analytics Data for Dashboard
  const analyticsData = {
    contentGrowth: { value: 245, change: '+12.5%', trend: 'up' },
    solvedProblems: { value: 1847, change: '+8.3%', trend: 'up' },
    earnings: { value: '$24,890', change: '+15.4%', trend: 'up' },
    streak: { value: 47, change: '+2 days', trend: 'up' },
    badges: { value: 23, change: '+3 new', trend: 'up' },
    reachedContent: { value: '89.2%', change: '+5.1%', trend: 'up' },
    totalSessions: { value: 342, change: '+18', trend: 'up' },
    hoursTaught: { value: 1247, change: '+67h', trend: 'up' }
  }

  // Leaderboard Data
  const leaderboardData = [
    { rank: 1, name: 'Alex Johnson', points: 2847, badge: '🏆', change: '+12' },
    { rank: 2, name: 'Sarah Chen', points: 2634, badge: '🥈', change: '+8' },
    { rank: 3, name: 'Mike Rodriguez', points: 2521, badge: '🥉', change: '+15' },
    { rank: 4, name: 'Emma Wilson', points: 2398, badge: '⭐', change: '+5' },
    { rank: 5, name: 'David Kim', points: 2287, badge: '⭐', change: '+3' }
  ]

  // Available Slots Data
  const availableSlots = [
    { day: 'Today', date: 'Dec 9', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
    { day: 'Tomorrow', date: 'Dec 10', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] },
    { day: 'Dec 11', date: 'Wed', slots: ['9:00 AM', '1:00 PM', '3:00 PM'] }
  ]

  // Upcoming Sessions Data
  const upcomingSessions = [
    { id: 1, student: 'TechCorp Ltd', subject: 'IT Infrastructure', time: '2:00 PM', duration: '1h', status: 'confirmed' },
    { id: 2, student: 'MarketPro Inc', subject: 'Digital Strategy', time: '3:30 PM', duration: '45m', status: 'pending' },
    { id: 3, student: 'DataFlow Systems', subject: 'Analytics Setup', time: '5:00 PM', duration: '1h 30m', status: 'confirmed' },
    { id: 4, student: 'CloudTech Solutions', subject: 'Cloud Migration', time: '7:00 PM', duration: '1h', status: 'review' }
  ]

  // Anonymous Consultation Pools
  const doubtPools = [
    { id: 1, subject: 'Cloud Architecture', question: 'Microservices deployment strategy', time: '5 min ago', status: 'active' },
    { id: 2, subject: 'Digital Marketing', question: 'SEO optimization techniques', time: '12 min ago', status: 'active' },
    { id: 3, subject: 'Data Analytics', question: 'Machine learning model selection', time: '1h ago', status: 'completed' }
  ]

  // Bookings and Sessions Data
  const bookingsSessionsData = {
    profileBookingLink: 'https://synapmentor.com/book/your-profile',
    upcomingSessions: [
      { id: 1, student: 'John Doe', subject: 'Advanced Mathematics', date: '2024-12-10', time: '2:00 PM', duration: '1h', status: 'confirmed', type: 'individual', faceVerification: true },
      { id: 2, student: 'Jane Smith', subject: 'Physics Problem Solving', date: '2024-12-10', time: '4:00 PM', duration: '45m', status: 'pending', type: 'individual', faceVerification: false },
      { id: 3, student: 'Team Alpha', subject: 'Data Science Workshop', date: '2024-12-11', time: '10:00 AM', duration: '2h', status: 'confirmed', type: 'team', faceVerification: true },
      { id: 4, student: 'Bob Wilson', subject: 'Chemistry Lab Help', date: '2024-12-11', time: '3:00 PM', duration: '1.5h', status: 'rescheduled', type: 'individual', faceVerification: true }
    ],
    activeSessions: [
      { id: 1, student: 'Alice Brown', subject: 'Calculus Integration', startTime: '1:30 PM', duration: '1h', timeLeft: '25 min', status: 'ongoing' }
    ],
    completedSessions: [
      { id: 1, student: 'Mike Johnson', subject: 'Linear Algebra', date: '2024-12-08', duration: '1h', rating: 5, recorded: true, earnings: '$45' },
      { id: 2, student: 'Sarah Davis', subject: 'Organic Chemistry', date: '2024-12-07', duration: '1.5h', rating: 4.8, recorded: true, earnings: '$67.50' },
      { id: 3, student: 'Team Beta', subject: 'Machine Learning', date: '2024-12-06', duration: '2h', rating: 4.9, recorded: false, earnings: '$120' }
    ],
    rescheduledSessions: [
      { id: 1, student: 'Emma Wilson', subject: 'Statistics', originalDate: '2024-12-09', newDate: '2024-12-12', time: '2:00 PM', reason: 'Student request' }
    ],
    cancelledSessions: [
      { id: 1, student: 'David Kim', subject: 'Probability Theory', date: '2024-12-08', reason: 'Technical issues', refunded: true }
    ],
    bulkMinuteSessions: [
      { id: 1, package: '10 Hours Package', student: 'Corporate Client A', remaining: '7h 30m', used: '2h 30m', expires: '2024-12-31' }
    ],
    teamSessions: [
      { id: 1, teamName: 'Engineering Team', members: 8, subject: 'Advanced Algorithms', nextSession: '2024-12-11 10:00 AM', totalSessions: 12, completed: 8 }
    ],
    availabilityAnalytics: {
      totalSlots: 40,
      bookedSlots: 28,
      availableSlots: 12,
      weeklyHours: 35,
      peakHours: ['2:00 PM - 4:00 PM', '7:00 PM - 9:00 PM']
    }
  }

  // Bookings and Sessions Component
  const renderBookingsAndSessions = () => (
    <div className="space-y-6">
      {/* Bookings and Sessions Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Bookings & Sessions</h1>
        <p className="text-text-secondary">Manage your tutoring sessions and bookings</p>
      </div>

      {/* Profile Booking Link */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-text-primary">Profile Booking Link</h3>
            <LinkIcon className="w-5 h-5 text-text-secondary" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1 glass-panel p-3 rounded-xl border border-glass-border/50">
              <span className="text-text-secondary text-sm">{bookingsSessionsData.profileBookingLink}</span>
            </div>
            <button className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors">
              Copy Link
            </button>
            <button className="px-4 py-2 glass-panel border border-glass-border text-text-secondary rounded-xl hover:bg-glass-hover transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Overview Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-text-secondary">Upcoming Sessions</h3>
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-2">{bookingsSessionsData.upcomingSessions.length}</div>
            <div className="text-xs text-text-secondary">Next: Today 2:00 PM</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-text-secondary">Active Sessions</h3>
              <VideoCameraIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-2">{bookingsSessionsData.activeSessions.length}</div>
            <div className="text-xs text-text-secondary">25 min remaining</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-text-secondary">Completed Sessions</h3>
              <CheckCircleIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-2">{bookingsSessionsData.completedSessions.length}</div>
            <div className="text-xs text-text-secondary">This week</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-text-secondary">Availability</h3>
              <ClockIcon className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-2">{bookingsSessionsData.availabilityAnalytics.availableSlots}</div>
            <div className="text-xs text-text-secondary">Available slots</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Upcoming Sessions */}
        <div className="col-span-8 glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">Upcoming Sessions</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full">All</button>
                <button className="px-3 py-1 text-xs glass-panel border border-glass-border text-text-secondary rounded-full">Individual</button>
                <button className="px-3 py-1 text-xs glass-panel border border-glass-border text-text-secondary rounded-full">Team</button>
              </div>
            </div>

            <div className="space-y-4">
              {bookingsSessionsData.upcomingSessions.map((session) => (
                <div key={session.id} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{session.student.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{session.subject}</div>
                        <div className="text-sm text-text-secondary">{session.student} • {session.date} at {session.time}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-text-secondary">{session.duration}</span>
                          <span className="text-xs text-text-secondary">•</span>
                          <span className="text-xs text-text-secondary capitalize">{session.type}</span>
                          {session.faceVerification && (
                            <>
                              <span className="text-xs text-text-secondary">•</span>
                              <span className="text-xs text-green-500 flex items-center">
                                <CameraIcon className="w-3 h-3 mr-1" />
                                Face Verification
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        session.status === 'confirmed' ? 'bg-green-500/20 text-green-500' :
                        session.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        session.status === 'rescheduled' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-gray-500/20 text-gray-500'
                      }`}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                      <button className="p-2 glass-panel border border-glass-border rounded-lg hover:bg-glass-hover transition-colors">
                        <PhoneIcon className="w-4 h-4 text-text-secondary" />
                      </button>
                      <button className="p-2 glass-panel border border-glass-border rounded-lg hover:bg-glass-hover transition-colors">
                        <ChatBubbleLeftRightIcon className="w-4 h-4 text-text-secondary" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Sessions & Quick Actions */}
        <div className="col-span-4 space-y-4">
          {/* Active Sessions */}
          <div className="glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Active Sessions</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {bookingsSessionsData.activeSessions.length > 0 ? (
                <div className="space-y-3">
                  {bookingsSessionsData.activeSessions.map((session) => (
                    <div key={session.id} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium text-text-primary">{session.subject}</div>
                          <div className="text-sm text-text-secondary">{session.student}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-500">{session.timeLeft} left</div>
                          <div className="text-xs text-text-secondary">Started {session.startTime}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="flex-1 py-2 px-3 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors text-sm">
                          Join Session
                        </button>
                        <button className="py-2 px-3 glass-panel border border-glass-border text-text-secondary rounded-lg hover:bg-glass-hover transition-colors text-sm">
                          Extend
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <VideoCameraIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-text-primary font-medium mb-2">No Active Sessions</div>
                  <div className="text-sm text-text-secondary">Your next session starts at 2:00 PM</div>
                </div>
              )}
            </div>
          </div>

          {/* Availability Analytics */}
          <div className="glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Availability</h3>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">Manage</button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Total Slots</span>
                  <span className="font-medium text-text-primary">{bookingsSessionsData.availabilityAnalytics.totalSlots}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Booked</span>
                  <span className="font-medium text-text-primary">{bookingsSessionsData.availabilityAnalytics.bookedSlots}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Available</span>
                  <span className="font-medium text-primary">{bookingsSessionsData.availabilityAnalytics.availableSlots}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-glass-border/30 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(bookingsSessionsData.availabilityAnalytics.bookedSlots / bookingsSessionsData.availabilityAnalytics.totalSlots) * 100}%` }}
                  ></div>
                </div>

                <div className="text-sm text-text-secondary">
                  <div className="font-medium mb-2">Peak Hours:</div>
                  {bookingsSessionsData.availabilityAnalytics.peakHours.map((hour, index) => (
                    <div key={index} className="text-xs">{hour}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Sessions, Rescheduled, Cancelled */}
      <div className="grid grid-cols-12 gap-6">
        {/* Completed Sessions */}
        <div className="col-span-6 glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">Completed Sessions</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-xs bg-green-500/20 text-green-500 rounded-full">Recorded</button>
                <button className="px-3 py-1 text-xs glass-panel border border-glass-border text-text-secondary rounded-full">All</button>
              </div>
            </div>

            <div className="space-y-4">
              {bookingsSessionsData.completedSessions.map((session) => (
                <div key={session.id} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{session.subject}</div>
                        <div className="text-sm text-text-secondary">{session.student} • {session.date}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-text-secondary">{session.duration}</span>
                          <span className="text-xs text-text-secondary">•</span>
                          <span className="text-xs text-text-secondary">Rating: {session.rating}/5</span>
                          {session.recorded && (
                            <>
                              <span className="text-xs text-text-secondary">•</span>
                              <span className="text-xs text-green-500">Recorded</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-text-primary">{session.earnings}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        {session.recorded && (
                          <button className="p-1 glass-panel border border-glass-border rounded hover:bg-glass-hover transition-colors">
                            <PlayIcon className="w-4 h-4 text-text-secondary" />
                          </button>
                        )}
                        <button className="p-1 glass-panel border border-glass-border rounded hover:bg-glass-hover transition-colors">
                          <EyeIcon className="w-4 h-4 text-text-secondary" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rescheduled & Cancelled Sessions */}
        <div className="col-span-6 space-y-4">
          {/* Rescheduled Sessions */}
          <div className="glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Rescheduled Sessions</h3>
                <span className="text-sm text-text-secondary">{bookingsSessionsData.rescheduledSessions.length}</span>
              </div>

              <div className="space-y-3">
                {bookingsSessionsData.rescheduledSessions.map((session) => (
                  <div key={session.id} className="glass-panel p-3 rounded-xl border border-glass-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary">{session.subject}</div>
                        <div className="text-sm text-text-secondary">{session.student}</div>
                        <div className="text-xs text-text-secondary mt-1">
                          {session.originalDate} → {session.newDate} at {session.time}
                        </div>
                      </div>
                      <div className="text-xs text-blue-500">{session.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cancelled Sessions */}
          <div className="glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Cancelled Sessions</h3>
                <span className="text-sm text-text-secondary">{bookingsSessionsData.cancelledSessions.length}</span>
              </div>

              <div className="space-y-3">
                {bookingsSessionsData.cancelledSessions.map((session) => (
                  <div key={session.id} className="glass-panel p-3 rounded-xl border border-glass-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-primary">{session.subject}</div>
                        <div className="text-sm text-text-secondary">{session.student} • {session.date}</div>
                        <div className="text-xs text-text-secondary mt-1">{session.reason}</div>
                      </div>
                      <div className="text-xs text-green-500">
                        {session.refunded ? 'Refunded' : 'No Refund'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Sessions & Team Sessions */}
      <div className="grid grid-cols-12 gap-6">
        {/* Bulk Minute Sessions */}
        <div className="col-span-6 glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">Bulk Minute Sessions</h3>
              <ClockIcon className="w-5 h-5 text-purple-500" />
            </div>

            <div className="space-y-4">
              {bookingsSessionsData.bulkMinuteSessions.map((package_item) => (
                <div key={package_item.id} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-text-primary">{package_item.package}</div>
                      <div className="text-sm text-text-secondary">{package_item.student}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-purple-500">{package_item.remaining} left</div>
                      <div className="text-xs text-text-secondary">Used: {package_item.used}</div>
                    </div>
                  </div>
                  <div className="w-full bg-glass-border/30 rounded-full h-2 mb-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="text-xs text-text-secondary">Expires: {package_item.expires}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Sessions */}
        <div className="col-span-6 glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-indigo-500/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">Team Sessions</h3>
              <UsersIcon className="w-5 h-5 text-indigo-500" />
            </div>

            <div className="space-y-4">
              {bookingsSessionsData.teamSessions.map((team) => (
                <div key={team.id} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-text-primary">{team.teamName}</div>
                      <div className="text-sm text-text-secondary">{team.members} members • {team.subject}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-indigo-500">{team.completed}/{team.totalSessions}</div>
                      <div className="text-xs text-text-secondary">Sessions</div>
                    </div>
                  </div>
                  <div className="w-full bg-glass-border/30 rounded-full h-2 mb-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${(team.completed / team.totalSessions) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-text-secondary">Next: {team.nextSession}</div>
                    <button className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors">
                      Manage Team →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Profile Management Component
  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Profile Management</h1>
        <p className="text-text-secondary">Manage your professional profile and settings</p>
      </div>

      {/* Profile Overview Card */}
      <div className="glass-panel p-8 rounded-2xl border border-glass-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Profile Picture Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                JD
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/80 transition-all duration-300 shadow-lg">
                <CameraIcon className="w-5 h-5" />
              </button>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-3xl font-bold text-text-primary">John Doe</h2>
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    Pro Mentor
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
                    Verified
                  </div>
                </div>
              </div>
              <p className="text-lg text-text-secondary mb-4">Senior Full Stack Developer & Technical Mentor</p>
              <p className="text-text-secondary mb-6 max-w-2xl">
                Passionate software engineer with 8+ years of experience in full-stack development.
                Specialized in React, Node.js, and cloud architecture. Helping students and professionals
                master modern web development technologies.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel p-4 rounded-xl border border-glass-border/50 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">4.9</div>
                  <div className="text-sm text-text-secondary">Rating</div>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-glass-border/50 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">1,247</div>
                  <div className="text-sm text-text-secondary">Students</div>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-glass-border/50 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">89</div>
                  <div className="text-sm text-text-secondary">Following</div>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-glass-border/50 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">95%</div>
                  <div className="text-sm text-text-secondary">Complete</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
              <button className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition-all duration-300 font-medium">
                Edit Profile
              </button>
              <button className="px-6 py-3 glass-panel border border-glass-border text-text-primary rounded-xl hover:bg-glass-hover transition-all duration-300 font-medium">
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Personal Information</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-text-secondary mb-1 block">First Name</label>
                <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                  <span className="text-text-primary">John</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-text-secondary mb-1 block">Last Name</label>
                <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                  <span className="text-text-primary">Doe</span>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1 block">Email</label>
              <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                <span className="text-text-primary">john.doe@example.com</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-text-secondary mb-1 block">Phone</label>
                <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                  <span className="text-text-primary">+1 (555) 123-4567</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-text-secondary mb-1 block">Location</label>
                <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                  <span className="text-text-primary">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Professional Information</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-text-secondary mb-1 block">Title</label>
              <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                <span className="text-text-primary">Senior Full Stack Developer</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1 block">Experience Level</label>
              <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                <span className="text-text-primary">8+ Years</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1 block">Hourly Rate</label>
              <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                <span className="text-text-primary">$75/hour</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1 block">Languages</label>
              <div className="flex flex-wrap gap-2">
                {['English', 'Spanish', 'French'].map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Skills & Expertise</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-text-secondary mb-2 block">Technical Skills</label>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'AWS', 'Docker', 'MongoDB'].map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-2 block">Teaching Subjects</label>
              <div className="flex flex-wrap gap-2">
                {['Web Development', 'Full Stack', 'Backend Development', 'Database Design', 'System Architecture'].map((subject, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full text-sm font-medium">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-2 block">Skill Level Distribution</label>
              <div className="space-y-3">
                {[
                  { skill: 'React/Frontend', level: 95, color: '#3b82f6' },
                  { skill: 'Node.js/Backend', level: 90, color: '#10b981' },
                  { skill: 'Database Design', level: 85, color: '#8b5cf6' },
                  { skill: 'DevOps/Cloud', level: 80, color: '#f59e0b' }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-primary">{item.skill}</span>
                      <span className="text-text-secondary">{item.level}%</span>
                    </div>
                    <div className="w-full bg-glass-border/30 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${item.level}%`,
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Availability & Preferences */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Availability & Preferences</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-text-secondary mb-2 block">Weekly Availability</label>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-text-secondary mb-1">{day}</div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      index < 5 ? 'bg-primary/20 text-primary' : 'bg-glass-border/30 text-text-secondary'
                    }`}>
                      {index < 5 ? '✓' : '×'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-text-secondary mb-1 block">Preferred Hours</label>
                <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                  <span className="text-text-primary">9:00 AM - 6:00 PM</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-text-secondary mb-1 block">Time Zone</label>
                <div className="glass-panel p-3 rounded-xl border border-glass-border/50">
                  <span className="text-text-primary">PST (UTC-8)</span>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-2 block">Session Types</label>
              <div className="flex flex-wrap gap-2">
                {['1-on-1 Tutoring', 'Group Sessions', 'Code Review', 'Project Mentoring', 'Career Guidance'].map((type, index) => (
                  <span key={index} className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Showcase */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Portfolio Showcase</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'E-commerce Platform', tech: 'React, Node.js, MongoDB', image: '🛒', status: 'Live' },
              { title: 'Task Management App', tech: 'Vue.js, Express, PostgreSQL', image: '📋', status: 'Live' },
              { title: 'Real-time Chat App', tech: 'Socket.io, React, Redis', image: '💬', status: 'Demo' },
              { title: 'API Gateway Service', tech: 'Node.js, Docker, AWS', image: '🔗', status: 'Live' }
            ].map((project, index) => (
              <div key={index} className="glass-panel p-4 rounded-xl border border-glass-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">{project.image}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'Live' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h4 className="font-medium text-text-primary mb-2">{project.title}</h4>
                <p className="text-sm text-text-secondary mb-3">{project.tech}</p>
                <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                  View Project →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Certifications */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Achievements</h3>
            <TrophyIcon className="w-5 h-5 text-text-secondary" />
          </div>
          <div className="space-y-4">
            {[
              { title: 'Top Mentor 2024', date: 'Jan 2024', icon: '🏆', color: 'text-yellow-500' },
              { title: 'AWS Certified', date: 'Mar 2024', icon: '☁️', color: 'text-blue-500' },
              { title: '1000+ Students', date: 'Jun 2024', icon: '🎓', color: 'text-green-500' },
              { title: 'Perfect Rating', date: 'Dec 2024', icon: '⭐', color: 'text-purple-500' }
            ].map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 glass-panel rounded-xl border border-glass-border/50">
                <div className={`text-xl ${achievement.color}`}>{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-text-primary text-sm">{achievement.title}</div>
                  <div className="text-xs text-text-secondary">{achievement.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Reviews & Testimonials */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Student Reviews & Testimonials</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">4.9</span>
            <div className="flex text-yellow-500">
              {'★'.repeat(5)}
            </div>
            <span className="text-text-secondary">(247 reviews)</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Sarah Chen', rating: 5, review: 'Excellent mentor! John helped me understand React concepts clearly and provided practical examples.', subject: 'React Development', date: '2 days ago' },
            { name: 'Mike Rodriguez', rating: 5, review: 'Great teaching style and very patient. The Node.js session was incredibly helpful for my project.', subject: 'Backend Development', date: '1 week ago' },
            { name: 'Emily Johnson', rating: 5, review: 'John is amazing at breaking down complex topics. Highly recommend for anyone learning full-stack development.', subject: 'Full Stack', date: '2 weeks ago' }
          ].map((review, index) => (
            <div key={index} className="glass-panel p-4 rounded-xl border border-glass-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-text-primary text-sm">{review.name}</div>
                    <div className="text-xs text-text-secondary">{review.date}</div>
                  </div>
                </div>
                <div className="flex text-yellow-500 text-sm">
                  {'★'.repeat(review.rating)}
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-2">{review.review}</p>
              <div className="text-xs text-primary">{review.subject}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Skill Verification Component
  const renderSkillVerification = () => (
    <div className="space-y-6">
      {/* Skill Verification Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Skill Verification</h1>
        <p className="text-text-secondary">Verify your skills and expertise to build trust with students</p>
      </div>

      {/* Verification Overview */}
      <div className="glass-panel p-8 rounded-2xl border border-glass-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-text-primary">Verification Status</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-500 font-medium">85% Verified</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary">Overall Skill Verification Progress</span>
              <span className="text-text-primary">85%</span>
            </div>
            <div className="w-full bg-glass-border/30 rounded-full h-3">
              <div className="h-3 bg-gradient-to-r from-primary to-green-500 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Verification Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { category: 'Technical Skills', verified: 12, total: 15, percentage: 80, color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
              { category: 'Certifications', verified: 8, total: 10, percentage: 80, color: 'text-green-500', bgColor: 'bg-green-500/20' },
              { category: 'Experience', verified: 5, total: 5, percentage: 100, color: 'text-purple-500', bgColor: 'bg-purple-500/20' }
            ].map((item, index) => (
              <div key={index} className="glass-panel p-6 rounded-xl border border-glass-border/50 text-center">
                <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <AcademicCapIcon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">{item.category}</h4>
                <div className="text-2xl font-bold text-text-primary mb-1">{item.verified}/{item.total}</div>
                <div className="text-sm text-text-secondary mb-3">Verified</div>
                <div className="w-full bg-glass-border/30 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500`}
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color.replace('text-', '').replace('-500', '')
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Assessment Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Skill Assessment Tests</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <PencilIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { skill: 'React.js', status: 'completed', score: 95, level: 'Expert', date: '2024-12-01' },
              { skill: 'Node.js', status: 'completed', score: 88, level: 'Advanced', date: '2024-11-28' },
              { skill: 'JavaScript', status: 'completed', score: 92, level: 'Expert', date: '2024-11-25' },
              { skill: 'Python', status: 'pending', score: null, level: null, date: null },
              { skill: 'Database Design', status: 'available', score: null, level: null, date: null }
            ].map((test, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    test.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                    test.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {test.status === 'completed' ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : test.status === 'pending' ? (
                      <ClockIcon className="w-5 h-5" />
                    ) : (
                      <AcademicCapIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{test.skill}</div>
                    {test.status === 'completed' && (
                      <div className="text-sm text-text-secondary">
                        Score: {test.score}% • {test.level} • {test.date}
                      </div>
                    )}
                    {test.status === 'pending' && (
                      <div className="text-sm text-yellow-500">Assessment in progress</div>
                    )}
                    {test.status === 'available' && (
                      <div className="text-sm text-text-secondary">Ready to take assessment</div>
                    )}
                  </div>
                </div>
                <div>
                  {test.status === 'completed' && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
                      Verified
                    </span>
                  )}
                  {test.status === 'pending' && (
                    <button className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium">
                      View Progress
                    </button>
                  )}
                  {test.status === 'available' && (
                    <button className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-colors">
                      Start Test
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification Uploads */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Certifications & Credentials</h3>
            <button className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors">
              Upload New
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', status: 'verified', date: '2024-03-15', expiry: '2027-03-15' },
              { name: 'React Developer Certification', issuer: 'Meta', status: 'verified', date: '2024-01-20', expiry: '2026-01-20' },
              { name: 'Google Cloud Professional', issuer: 'Google Cloud', status: 'pending', date: '2024-12-01', expiry: null },
              { name: 'MongoDB Certified Developer', issuer: 'MongoDB Inc.', status: 'expired', date: '2022-06-10', expiry: '2024-06-10' }
            ].map((cert, index) => (
              <div key={index} className="p-4 glass-panel rounded-xl border border-glass-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">{cert.name}</h4>
                    <p className="text-sm text-text-secondary mb-2">{cert.issuer}</p>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <span>Issued: {cert.date}</span>
                      {cert.expiry && <span>Expires: {cert.expiry}</span>}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cert.status === 'verified' ? 'bg-green-500/20 text-green-500' :
                    cert.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                    View Certificate →
                  </button>
                  {cert.status === 'expired' && (
                    <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                      Renew
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Identity Verification Component
  const renderIdentityVerification = () => (
    <div className="space-y-6">
      {/* Identity Verification Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Identity Verification</h1>
        <p className="text-text-secondary">Complete your identity verification to unlock all platform features</p>
      </div>

      {/* Verification Level Status */}
      <div className="glass-panel p-8 rounded-2xl border border-glass-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-text-primary">Verification Level</h3>
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="w-6 h-6 text-green-500" />
              <span className="text-green-500 font-medium">Standard Verified</span>
            </div>
          </div>

          {/* Verification Levels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                level: 'Light',
                status: 'completed',
                description: 'Email & Phone verification',
                features: ['Basic profile access', 'Limited sessions', 'Community participation'],
                color: 'text-blue-500',
                bgColor: 'bg-blue-500/20'
              },
              {
                level: 'Standard',
                status: 'completed',
                description: 'Identity document verification',
                features: ['Full platform access', 'Unlimited sessions', 'Payment processing'],
                color: 'text-green-500',
                bgColor: 'bg-green-500/20'
              },
              {
                level: 'Full',
                status: 'available',
                description: 'Background check & face verification',
                features: ['Premium features', 'Higher trust score', 'Priority support'],
                color: 'text-purple-500',
                bgColor: 'bg-purple-500/20'
              }
            ].map((level, index) => (
              <div key={index} className={`glass-panel p-6 rounded-xl border ${
                level.status === 'completed' ? 'border-green-500/30 bg-green-500/5' :
                level.status === 'current' ? 'border-primary/30 bg-primary/5' :
                'border-glass-border/50'
              }`}>
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 ${level.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    {level.status === 'completed' ? (
                      <CheckCircleIcon className={`w-8 h-8 ${level.color}`} />
                    ) : (
                      <ShieldCheckIcon className={`w-8 h-8 ${level.color}`} />
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2">{level.level} Verification</h4>
                  <p className="text-sm text-text-secondary mb-4">{level.description}</p>
                </div>

                <div className="space-y-2 mb-4">
                  {level.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {level.status === 'completed' && (
                  <div className="text-center">
                    <span className="px-4 py-2 bg-green-500/20 text-green-500 rounded-xl text-sm font-medium">
                      ✓ Completed
                    </span>
                  </div>
                )}
                {level.status === 'available' && (
                  <div className="text-center">
                    <button className="px-4 py-2 bg-primary/20 text-primary rounded-xl text-sm font-medium hover:bg-primary/30 transition-colors">
                      Start Verification
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Document Verification</h3>
            <DocumentTextIcon className="w-5 h-5 text-text-secondary" />
          </div>
          <div className="space-y-4">
            {[
              {
                type: 'Government ID',
                status: 'verified',
                document: 'Driver\'s License',
                uploadDate: '2024-11-15',
                expiryDate: '2028-03-20'
              },
              {
                type: 'Address Proof',
                status: 'verified',
                document: 'Utility Bill',
                uploadDate: '2024-11-16',
                expiryDate: null
              },
              {
                type: 'Educational Certificate',
                status: 'pending',
                document: 'Bachelor\'s Degree',
                uploadDate: '2024-12-01',
                expiryDate: null
              },
              {
                type: 'Professional License',
                status: 'not_uploaded',
                document: null,
                uploadDate: null,
                expiryDate: null
              }
            ].map((doc, index) => (
              <div key={index} className="p-4 glass-panel rounded-xl border border-glass-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      doc.status === 'verified' ? 'bg-green-500/20 text-green-500' :
                      doc.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      {doc.status === 'verified' ? (
                        <CheckCircleIcon className="w-5 h-5" />
                      ) : doc.status === 'pending' ? (
                        <ClockIcon className="w-5 h-5" />
                      ) : (
                        <DocumentTextIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{doc.type}</h4>
                      {doc.document && (
                        <p className="text-sm text-text-secondary">{doc.document}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doc.status === 'verified' ? 'bg-green-500/20 text-green-500' :
                    doc.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-gray-500/20 text-gray-500'
                  }`}>
                    {doc.status === 'not_uploaded' ? 'Not Uploaded' :
                     doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </div>

                {doc.uploadDate && (
                  <div className="text-xs text-text-secondary mb-2">
                    Uploaded: {doc.uploadDate}
                    {doc.expiryDate && ` • Expires: ${doc.expiryDate}`}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {doc.status === 'not_uploaded' ? (
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                      Upload Document →
                    </button>
                  ) : (
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                      View Document →
                    </button>
                  )}

                  {doc.status === 'verified' && (
                    <button className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      Replace
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Biometric Verification */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Biometric Verification</h3>
            <CameraIcon className="w-5 h-5 text-text-secondary" />
          </div>

          {/* Face Verification */}
          <div className="space-y-6">
            <div className="p-4 glass-panel rounded-xl border border-glass-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                    <CameraIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Face Verification</h4>
                    <p className="text-sm text-text-secondary">Live face scan completed</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                  Verified
                </span>
              </div>
              <div className="text-xs text-text-secondary mb-3">
                Last verified: 2024-11-20 • Confidence: 98.5%
              </div>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                Re-verify Face →
              </button>
            </div>

            {/* Voice Verification */}
            <div className="p-4 glass-panel rounded-xl border border-glass-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Voice Verification</h4>
                    <p className="text-sm text-text-secondary">Optional voice biometric</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs font-medium">
                  Optional
                </span>
              </div>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                Set Up Voice Print →
              </button>
            </div>

            {/* Background Check */}
            <div className="p-4 glass-panel rounded-xl border border-glass-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/20 text-purple-500 rounded-full flex items-center justify-center">
                    <ShieldCheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Background Check</h4>
                    <p className="text-sm text-text-secondary">Professional background verification</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs font-medium">
                  Available
                </span>
              </div>
              <div className="text-xs text-text-secondary mb-3">
                Includes: Criminal history, Employment verification, Education verification
              </div>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                Start Background Check →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Analytics */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Verification Analytics</h3>
          <TrophyIcon className="w-5 h-5 text-text-secondary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Trust Score', value: '94.5%', change: '+2.1%', color: 'text-green-500' },
            { label: 'Verification Level', value: 'Standard', change: 'Complete', color: 'text-blue-500' },
            { label: 'Documents Verified', value: '3/4', change: '75%', color: 'text-purple-500' },
            { label: 'Last Updated', value: '2 days ago', change: 'Recent', color: 'text-primary' }
          ].map((stat, index) => (
            <div key={index} className="glass-panel p-4 rounded-xl border border-glass-border/50 text-center">
              <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary mb-2">{stat.label}</div>
              <div className={`text-xs font-medium ${stat.color}`}>{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Verification Timeline */}
        <div className="mt-8">
          <h4 className="font-medium text-text-primary mb-4">Verification Timeline</h4>
          <div className="space-y-3">
            {[
              { event: 'Email verification completed', date: '2024-10-15', status: 'completed' },
              { event: 'Phone number verified', date: '2024-10-16', status: 'completed' },
              { event: 'Government ID uploaded and verified', date: '2024-11-15', status: 'completed' },
              { event: 'Address proof verified', date: '2024-11-16', status: 'completed' },
              { event: 'Face verification completed', date: '2024-11-20', status: 'completed' },
              { event: 'Educational certificate under review', date: '2024-12-01', status: 'pending' },
              { event: 'Background check available', date: null, status: 'available' }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 glass-panel rounded-lg border border-glass-border/50">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'completed' ? 'bg-green-500' :
                  item.status === 'pending' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{item.event}</div>
                  {item.date && (
                    <div className="text-xs text-text-secondary">{item.date}</div>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                  item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-gray-500/20 text-gray-500'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Wallet Management Component
  const renderWallet = () => (
    <div className="space-y-6">
      {/* Wallet Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Wallet Management</h1>
        <p className="text-text-secondary">Manage your earnings, payments, and financial transactions</p>
      </div>

      {/* Wallet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Available Balance',
            amount: '$2,847.50',
            change: '+$425.00',
            changeType: 'positive',
            icon: CurrencyDollarIcon,
            color: 'text-green-500',
            bgColor: 'bg-green-500/20'
          },
          {
            title: 'Pending Earnings',
            amount: '$425.00',
            change: '+$125.00',
            changeType: 'positive',
            icon: ClockIcon,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500/20'
          },
          {
            title: 'Total Earnings',
            amount: '$15,420.75',
            change: '+$1,250.00',
            changeType: 'positive',
            icon: TrophyIcon,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/20'
          },
          {
            title: 'Monthly Earnings',
            amount: '$1,250.00',
            change: '+18.5%',
            changeType: 'positive',
            icon: ChartBarIcon,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/20'
          }
        ].map((card, index) => (
          <div key={index} className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className={`text-sm font-medium ${card.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {card.change}
                </div>
              </div>
              <div>
                <p className="text-text-secondary text-sm font-medium mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-text-primary">{card.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { action: 'Withdraw Funds', icon: CurrencyDollarIcon, color: 'text-green-500', bgColor: 'bg-green-500/20' },
            { action: 'Add Payment Method', icon: CreditCardIcon, color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
            { action: 'View Statements', icon: DocumentTextIcon, color: 'text-purple-500', bgColor: 'bg-purple-500/20' },
            { action: 'Transfer Settings', icon: Cog6ToothIcon, color: 'text-primary', bgColor: 'bg-primary/20' }
          ].map((action, index) => (
            <button key={index} className="p-4 glass-panel rounded-xl border border-glass-border/50 hover:border-primary/30 transition-all duration-300 group">
              <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-6 h-6 ${action.color}`} />
              </div>
              <div className="text-sm font-medium text-text-primary text-center">{action.action}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction History & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Recent Transactions</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, type: 'earning', description: 'Session with Sarah Chen', amount: 75.00, date: '2024-12-16', status: 'completed' },
              { id: 2, type: 'withdrawal', description: 'Bank transfer to Chase', amount: -500.00, date: '2024-12-15', status: 'completed' },
              { id: 3, type: 'earning', description: 'Group session - React Basics', amount: 120.00, date: '2024-12-14', status: 'completed' },
              { id: 4, type: 'refund', description: 'Cancelled session refund', amount: -50.00, date: '2024-12-13', status: 'pending' },
              { id: 5, type: 'earning', description: 'Session with Mike Rodriguez', amount: 90.00, date: '2024-12-12', status: 'completed' }
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'earning' ? 'bg-green-500/20 text-green-500' :
                    transaction.type === 'withdrawal' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {transaction.type === 'earning' ? (
                      <TrophyIcon className="w-5 h-5" />
                    ) : transaction.type === 'withdrawal' ? (
                      <CurrencyDollarIcon className="w-5 h-5" />
                    ) : (
                      <XCircleIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{transaction.description}</div>
                    <div className="text-sm text-text-secondary">{transaction.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Payment Methods</h3>
            <button className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors">
              Add Method
            </button>
          </div>
          <div className="space-y-4">
            {[
              { id: 1, type: 'bank', name: 'Chase Bank', details: '****1234', primary: true, verified: true },
              { id: 2, type: 'paypal', name: 'PayPal', details: 'user@example.com', primary: false, verified: true },
              { id: 3, type: 'card', name: 'Visa Card', details: '****5678', primary: false, verified: false }
            ].map((method) => (
              <div key={method.id} className="p-4 glass-panel rounded-xl border border-glass-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      method.type === 'bank' ? 'bg-blue-500/20 text-blue-500' :
                      method.type === 'paypal' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-purple-500/20 text-purple-500'
                    }`}>
                      {method.type === 'bank' ? (
                        <CurrencyDollarIcon className="w-5 h-5" />
                      ) : method.type === 'paypal' ? (
                        <CreditCardIcon className="w-5 h-5" />
                      ) : (
                        <CreditCardIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">{method.name}</div>
                      <div className="text-sm text-text-secondary">{method.details}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.verified && (
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    )}
                    {method.primary && (
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                        Primary
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Edit Method
                  </button>
                  {!method.verified && (
                    <button className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors">
                      Verify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Payment Gateway Component
  const renderPaymentGateway = () => (
    <div className="space-y-6">
      {/* Payment Gateway Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Payment Gateway</h1>
        <p className="text-text-secondary">Configure payment processing and billing settings</p>
      </div>

      {/* Payment Gateway Status */}
      <div className="glass-panel p-8 rounded-2xl border border-glass-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-text-primary">Gateway Status</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-500 font-medium">Active & Verified</span>
            </div>
          </div>

          {/* Gateway Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Processing Rate', value: '2.9%', description: 'Per transaction', color: 'text-blue-500' },
              { label: 'Success Rate', value: '99.8%', description: 'Last 30 days', color: 'text-green-500' },
              { label: 'Settlement Time', value: '2-3 days', description: 'Business days', color: 'text-purple-500' },
              { label: 'Monthly Volume', value: '$12,450', description: 'This month', color: 'text-primary' }
            ].map((stat, index) => (
              <div key={index} className="glass-panel p-4 rounded-xl border border-glass-border/50 text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm font-medium text-text-primary mb-1">{stat.label}</div>
                <div className="text-xs text-text-secondary">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Processing Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Payment Processing</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                setting: 'Auto-Accept Payments',
                description: 'Automatically process session payments',
                enabled: true,
                type: 'toggle'
              },
              {
                setting: 'Payment Notifications',
                description: 'Email alerts for payment events',
                enabled: true,
                type: 'toggle'
              },
              {
                setting: 'Refund Policy',
                description: '24-hour cancellation policy',
                value: '24 hours',
                type: 'select'
              },
              {
                setting: 'Currency',
                description: 'Primary payment currency',
                value: 'USD',
                type: 'select'
              }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div>
                  <div className="font-medium text-text-primary">{setting.setting}</div>
                  <div className="text-sm text-text-secondary">{setting.description}</div>
                </div>
                {setting.type === 'toggle' ? (
                  <div className={`w-12 h-6 rounded-full ${setting.enabled ? 'bg-primary' : 'bg-gray-300'} relative transition-colors`}>
                    <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </div>
                ) : (
                  <div className="text-sm text-primary font-medium">{setting.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Billing & Invoicing */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Billing & Invoicing</h3>
            <button className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors">
              Generate Invoice
            </button>
          </div>
          <div className="space-y-4">
            {[
              { invoice: 'INV-2024-001', client: 'Sarah Chen', amount: '$75.00', date: '2024-12-16', status: 'paid' },
              { invoice: 'INV-2024-002', client: 'Mike Rodriguez', amount: '$90.00', date: '2024-12-15', status: 'paid' },
              { invoice: 'INV-2024-003', client: 'Emily Johnson', amount: '$120.00', date: '2024-12-14', status: 'pending' },
              { invoice: 'INV-2024-004', client: 'David Wilson', amount: '$60.00', date: '2024-12-13', status: 'overdue' }
            ].map((invoice, index) => (
              <div key={index} className="p-4 glass-panel rounded-xl border border-glass-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-text-primary">{invoice.invoice}</div>
                    <div className="text-sm text-text-secondary">{invoice.client} • {invoice.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-text-primary">{invoice.amount}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === 'paid' ? 'bg-green-500/20 text-green-500' :
                      invoice.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    View Invoice →
                  </button>
                  {invoice.status === 'overdue' && (
                    <button className="text-sm text-red-500 hover:text-red-400 transition-colors">
                      Send Reminder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Analytics */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Payment Analytics</h3>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm glass-panel border border-glass-border rounded-lg text-text-secondary hover:text-text-primary transition-colors">
              Last 7 days
            </button>
            <button className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-lg">
              Last 30 days
            </button>
            <button className="px-3 py-1 text-sm glass-panel border border-glass-border rounded-lg text-text-secondary hover:text-text-primary transition-colors">
              Last 90 days
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Total Revenue',
              value: '$12,450.00',
              change: '+18.5%',
              changeType: 'positive',
              description: 'Compared to last month'
            },
            {
              title: 'Transaction Count',
              value: '156',
              change: '+12.3%',
              changeType: 'positive',
              description: 'Total transactions'
            },
            {
              title: 'Average Transaction',
              value: '$79.81',
              change: '+5.2%',
              changeType: 'positive',
              description: 'Per transaction'
            }
          ].map((metric, index) => (
            <div key={index} className="glass-panel p-6 rounded-xl border border-glass-border/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-text-secondary">{metric.title}</h4>
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-text-primary mb-2">{metric.value}</div>
              <div className="text-sm text-text-secondary">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Payment Methods Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-text-primary mb-4">Payment Methods Distribution</h4>
            <div className="space-y-3">
              {[
                { method: 'Credit/Debit Cards', percentage: 65, amount: '$8,092.50', color: 'bg-blue-500' },
                { method: 'PayPal', percentage: 25, amount: '$3,112.50', color: 'bg-yellow-500' },
                { method: 'Bank Transfer', percentage: 8, amount: '$996.00', color: 'bg-green-500' },
                { method: 'Other', percentage: 2, amount: '$249.00', color: 'bg-gray-500' }
              ].map((method, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-primary">{method.method}</span>
                    <span className="text-text-secondary">{method.percentage}% • {method.amount}</span>
                  </div>
                  <div className="w-full bg-glass-border/30 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${method.color}`}
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-text-primary mb-4">Recent Payment Activity</h4>
            <div className="space-y-3">
              {[
                { time: '2 hours ago', event: 'Payment received from Sarah Chen', amount: '+$75.00', type: 'success' },
                { time: '5 hours ago', event: 'Refund processed for cancelled session', amount: '-$50.00', type: 'refund' },
                { time: '1 day ago', event: 'Payment received from Mike Rodriguez', amount: '+$90.00', type: 'success' },
                { time: '2 days ago', event: 'Withdrawal to Chase Bank', amount: '-$500.00', type: 'withdrawal' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 glass-panel rounded-lg border border-glass-border/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'refund' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{activity.event}</div>
                      <div className="text-xs text-text-secondary">{activity.time}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    activity.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {activity.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Security & Compliance</h3>
          <ShieldCheckIcon className="w-5 h-5 text-green-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              feature: 'PCI DSS Compliant',
              status: 'active',
              description: 'Payment card industry security standards',
              icon: ShieldCheckIcon
            },
            {
              feature: 'SSL Encryption',
              status: 'active',
              description: '256-bit SSL encryption for all transactions',
              icon: ShieldCheckIcon
            },
            {
              feature: 'Fraud Detection',
              status: 'active',
              description: 'AI-powered fraud prevention system',
              icon: ShieldCheckIcon
            }
          ].map((feature, index) => (
            <div key={index} className="glass-panel p-4 rounded-xl border border-glass-border/50 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-medium text-text-primary mb-2">{feature.feature}</h4>
              <p className="text-sm text-text-secondary mb-3">{feature.description}</p>
              <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Content (Resources) Component
  const renderContent = () => (
    <div className="space-y-6">
      {/* Content Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Content & Resources</h1>
        <p className="text-text-secondary">Manage your educational content, resources, and learning materials</p>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Content', count: '47', change: '+5', icon: DocumentTextIcon, color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
          { title: 'Published', count: '42', change: '+3', icon: CheckCircleIcon, color: 'text-green-500', bgColor: 'bg-green-500/20' },
          { title: 'Draft', count: '5', change: '+2', icon: ClockIcon, color: 'text-yellow-500', bgColor: 'bg-yellow-500/20' },
          { title: 'Total Views', count: '12.5K', change: '+1.2K', icon: EyeIcon, color: 'text-purple-500', bgColor: 'bg-purple-500/20' }
        ].map((stat, index) => (
          <div key={index} className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-green-500">{stat.change}</span>
              </div>
              <div>
                <p className="text-text-secondary text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-text-primary">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Content */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Recent Content</h3>
            <button className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors">
              Create New
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'React Hooks Complete Guide', type: 'Video', status: 'published', views: '2.1K', date: '2024-12-15' },
              { title: 'JavaScript ES6 Features', type: 'Blog', status: 'published', views: '1.8K', date: '2024-12-14' },
              { title: 'Node.js Best Practices', type: 'PDF', status: 'draft', views: '0', date: '2024-12-13' },
              { title: 'Database Design Patterns', type: 'Video', status: 'published', views: '3.2K', date: '2024-12-12' }
            ].map((content, index) => (
              <div key={index} className="p-4 glass-panel rounded-xl border border-glass-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-text-primary">{content.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <span>{content.type}</span>
                      <span>•</span>
                      <span>{content.date}</span>
                      <span>•</span>
                      <span>{content.views} views</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    content.status === 'published' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Edit Content →
                  </button>
                  <button className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Categories */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Content Categories</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              Manage →
            </button>
          </div>
          <div className="space-y-4">
            {[
              { category: 'Web Development', count: 18, percentage: 38, color: 'bg-blue-500' },
              { category: 'JavaScript', count: 12, percentage: 26, color: 'bg-yellow-500' },
              { category: 'React', count: 8, percentage: 17, color: 'bg-green-500' },
              { category: 'Node.js', count: 6, percentage: 13, color: 'bg-purple-500' },
              { category: 'Database', count: 3, percentage: 6, color: 'bg-red-500' }
            ].map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-primary font-medium">{cat.category}</span>
                  <span className="text-text-secondary">{cat.count} items</span>
                </div>
                <div className="w-full bg-glass-border/30 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${cat.color}`}
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Teams Component
  const renderTeams = () => (
    <div className="space-y-6">
      {/* Teams Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Teams Management</h1>
        <p className="text-text-secondary">Collaborate with other mentors and manage team projects</p>
      </div>

      {/* Teams Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Active Teams', count: '3', icon: UserGroupIcon, color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
          { title: 'Team Members', count: '12', icon: UsersIcon, color: 'text-green-500', bgColor: 'bg-green-500/20' },
          { title: 'Team Projects', count: '8', icon: DocumentTextIcon, color: 'text-purple-500', bgColor: 'bg-purple-500/20' }
        ].map((stat, index) => (
          <div key={index} className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-text-secondary text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-text-primary">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* My Teams */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">My Teams</h3>
          <button className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors">
            Create Team
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Frontend Masters', members: 5, projects: 3, role: 'Lead', status: 'active' },
            { name: 'React Specialists', members: 4, projects: 2, role: 'Member', status: 'active' },
            { name: 'Full Stack Team', members: 3, projects: 3, role: 'Admin', status: 'active' }
          ].map((team, index) => (
            <div key={index} className="glass-panel p-6 rounded-xl border border-glass-border/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-text-primary">{team.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  team.role === 'Lead' ? 'bg-purple-500/20 text-purple-500' :
                  team.role === 'Admin' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-green-500/20 text-green-500'
                }`}>
                  {team.role}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Members</span>
                  <span className="text-text-primary">{team.members}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Projects</span>
                  <span className="text-text-primary">{team.projects}</span>
                </div>
              </div>
              <button className="w-full py-2 glass-panel border border-glass-border rounded-lg text-text-primary hover:bg-glass-hover transition-colors">
                View Team
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Community Component
  const renderCommunity = () => (
    <div className="space-y-6">
      {/* Community Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Community</h1>
        <p className="text-text-secondary">Connect with fellow mentors and students in our learning community</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Community Members', count: '2,847', icon: UsersIcon, color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
          { title: 'Active Discussions', count: '156', icon: ChatBubbleLeftRightIcon, color: 'text-green-500', bgColor: 'bg-green-500/20' },
          { title: 'Your Posts', count: '23', icon: DocumentTextIcon, color: 'text-purple-500', bgColor: 'bg-purple-500/20' },
          { title: 'Reputation Score', count: '1,247', icon: TrophyIcon, color: 'text-yellow-500', bgColor: 'bg-yellow-500/20' }
        ].map((stat, index) => (
          <div key={index} className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-text-secondary text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-text-primary">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Discussions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Recent Discussions</h3>
            <button className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors">
              Start Discussion
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Best practices for React performance optimization', author: 'Sarah Chen', replies: 12, time: '2 hours ago', category: 'React' },
              { title: 'How to handle authentication in Node.js apps?', author: 'Mike Rodriguez', replies: 8, time: '4 hours ago', category: 'Node.js' },
              { title: 'Database design patterns for scalable applications', author: 'Emily Johnson', replies: 15, time: '6 hours ago', category: 'Database' },
              { title: 'Career advice for junior developers', author: 'David Wilson', replies: 23, time: '1 day ago', category: 'Career' }
            ].map((discussion, index) => (
              <div key={index} className="p-4 glass-panel rounded-xl border border-glass-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-2">{discussion.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <span>by {discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.time}</span>
                      <span>•</span>
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">
                        {discussion.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{discussion.replies} replies</span>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Join Discussion →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Top Contributors</h3>
            <button className="text-primary hover:text-primary/80 transition-colors">
              View Leaderboard →
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Alex Thompson', points: 2847, badge: 'Expert', avatar: 'AT', rank: 1 },
              { name: 'Maria Garcia', points: 2156, badge: 'Mentor', avatar: 'MG', rank: 2 },
              { name: 'John Doe', points: 1847, badge: 'Mentor', avatar: 'JD', rank: 3 },
              { name: 'Lisa Wang', points: 1456, badge: 'Helper', avatar: 'LW', rank: 4 }
            ].map((contributor, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-text-secondary">#{contributor.rank}</span>
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-medium">
                      {contributor.avatar}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{contributor.name}</div>
                    <div className="text-sm text-text-secondary">{contributor.points} points</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  contributor.badge === 'Expert' ? 'bg-purple-500/20 text-purple-500' :
                  contributor.badge === 'Mentor' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-green-500/20 text-green-500'
                }`}>
                  {contributor.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Notifications Component
  const renderNotifications = () => (
    <div className="space-y-6">
      {/* Notifications Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Notifications</h1>
        <p className="text-text-secondary">Manage your notification preferences and view recent alerts</p>
      </div>

      {/* Notification Settings */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Notification Preferences</h3>
          <button className="text-primary hover:text-primary/80 transition-colors">
            Save Changes
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { category: 'Session Notifications', settings: [
              { name: 'New session bookings', enabled: true },
              { name: 'Session reminders', enabled: true },
              { name: 'Session cancellations', enabled: true },
              { name: 'Session completions', enabled: false }
            ]},
            { category: 'Payment Notifications', settings: [
              { name: 'Payment received', enabled: true },
              { name: 'Withdrawal confirmations', enabled: true },
              { name: 'Payment failures', enabled: true },
              { name: 'Monthly statements', enabled: false }
            ]},
            { category: 'Community Notifications', settings: [
              { name: 'New discussion replies', enabled: false },
              { name: 'Mentions in discussions', enabled: true },
              { name: 'New followers', enabled: true },
              { name: 'Weekly digest', enabled: true }
            ]},
            { category: 'System Notifications', settings: [
              { name: 'Security alerts', enabled: true },
              { name: 'Feature updates', enabled: false },
              { name: 'Maintenance notices', enabled: true },
              { name: 'Marketing emails', enabled: false }
            ]}
          ].map((category, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-medium text-text-primary">{category.category}</h4>
              <div className="space-y-3">
                {category.settings.map((setting, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 glass-panel rounded-lg border border-glass-border/50">
                    <span className="text-text-primary">{setting.name}</span>
                    <div className={`w-12 h-6 rounded-full ${setting.enabled ? 'bg-primary' : 'bg-gray-300'} relative transition-colors`}>
                      <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Recent Notifications</h3>
          <button className="text-primary hover:text-primary/80 transition-colors">
            Mark All Read
          </button>
        </div>
        <div className="space-y-4">
          {[
            { type: 'session', title: 'New session booked with Sarah Chen', time: '2 hours ago', read: false },
            { type: 'payment', title: 'Payment of $75.00 received', time: '3 hours ago', read: false },
            { type: 'community', title: 'New reply to your discussion', time: '5 hours ago', read: true },
            { type: 'system', title: 'Profile verification completed', time: '1 day ago', read: true },
            { type: 'session', title: 'Session reminder: Tomorrow at 2:00 PM', time: '1 day ago', read: true }
          ].map((notification, index) => (
            <div key={index} className={`p-4 glass-panel rounded-xl border border-glass-border/50 ${
              !notification.read ? 'bg-primary/5 border-primary/20' : ''
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    !notification.read ? 'bg-primary' : 'bg-transparent'
                  }`}></div>
                  <div>
                    <div className="font-medium text-text-primary">{notification.title}</div>
                    <div className="text-sm text-text-secondary">{notification.time}</div>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  notification.type === 'session' ? 'bg-blue-500/20 text-blue-500' :
                  notification.type === 'payment' ? 'bg-green-500/20 text-green-500' :
                  notification.type === 'community' ? 'bg-purple-500/20 text-purple-500' :
                  'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {notification.type === 'session' ? (
                    <CalendarIcon className="w-4 h-4" />
                  ) : notification.type === 'payment' ? (
                    <CurrencyDollarIcon className="w-4 h-4" />
                  ) : notification.type === 'community' ? (
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  ) : (
                    <BellIcon className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Settings Component
  const renderSettings = () => (
    <div className="space-y-6">
      {/* Settings Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your account settings and preferences</p>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Account Settings</h3>
          <div className="space-y-4">
            {[
              { setting: 'Profile Visibility', description: 'Control who can see your profile', value: 'Public', type: 'select' },
              { setting: 'Online Status', description: 'Show when you\'re online', enabled: true, type: 'toggle' },
              { setting: 'Session Auto-Accept', description: 'Automatically accept session requests', enabled: false, type: 'toggle' },
              { setting: 'Email Notifications', description: 'Receive notifications via email', enabled: true, type: 'toggle' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div>
                  <div className="font-medium text-text-primary">{setting.setting}</div>
                  <div className="text-sm text-text-secondary">{setting.description}</div>
                </div>
                {setting.type === 'toggle' ? (
                  <div className={`w-12 h-6 rounded-full ${setting.enabled ? 'bg-primary' : 'bg-gray-300'} relative transition-colors`}>
                    <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </div>
                ) : (
                  <div className="text-sm text-primary font-medium">{setting.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Security Settings</h3>
          <div className="space-y-4">
            {[
              { setting: 'Two-Factor Authentication', description: 'Add extra security to your account', enabled: true, type: 'toggle' },
              { setting: 'Login Alerts', description: 'Get notified of new logins', enabled: true, type: 'toggle' },
              { setting: 'Session Timeout', description: 'Auto-logout after inactivity', value: '30 minutes', type: 'select' },
              { setting: 'Password Strength', description: 'Current password security level', value: 'Strong', type: 'status' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div>
                  <div className="font-medium text-text-primary">{setting.setting}</div>
                  <div className="text-sm text-text-secondary">{setting.description}</div>
                </div>
                {setting.type === 'toggle' ? (
                  <div className={`w-12 h-6 rounded-full ${setting.enabled ? 'bg-primary' : 'bg-gray-300'} relative transition-colors`}>
                    <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </div>
                ) : setting.type === 'status' ? (
                  <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                    {setting.value}
                  </span>
                ) : (
                  <div className="text-sm text-primary font-medium">{setting.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Privacy Settings</h3>
          <div className="space-y-4">
            {[
              { setting: 'Data Analytics', description: 'Help improve our services', enabled: true, type: 'toggle' },
              { setting: 'Marketing Communications', description: 'Receive promotional emails', enabled: false, type: 'toggle' },
              { setting: 'Profile Indexing', description: 'Allow search engines to index profile', enabled: true, type: 'toggle' },
              { setting: 'Activity Status', description: 'Show your activity to others', enabled: true, type: 'toggle' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div>
                  <div className="font-medium text-text-primary">{setting.setting}</div>
                  <div className="text-sm text-text-secondary">{setting.description}</div>
                </div>
                <div className={`w-12 h-6 rounded-full ${setting.enabled ? 'bg-primary' : 'bg-gray-300'} relative transition-colors`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Appearance Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
              <div>
                <div className="font-medium text-text-primary">Theme</div>
                <div className="text-sm text-text-secondary">Choose your preferred theme</div>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-4 py-2 glass-panel border border-glass-border rounded-lg hover:bg-glass-hover transition-colors"
              >
                <SunIcon className="w-4 h-4" />
                <span className="text-sm">{isDark ? 'Dark' : 'Light'}</span>
              </button>
            </div>
            {[
              { setting: 'Compact Mode', description: 'Use smaller interface elements', enabled: false, type: 'toggle' },
              { setting: 'Animations', description: 'Enable interface animations', enabled: true, type: 'toggle' },
              { setting: 'Sound Effects', description: 'Play notification sounds', enabled: false, type: 'toggle' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div>
                  <div className="font-medium text-text-primary">{setting.setting}</div>
                  <div className="text-sm text-text-secondary">{setting.description}</div>
                </div>
                <div className={`w-12 h-6 rounded-full ${setting.enabled ? 'bg-primary' : 'bg-gray-300'} relative transition-colors`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Support Component
  const renderSupport = () => (
    <div className="space-y-6">
      {/* Support Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Support Center</h1>
        <p className="text-text-secondary">Get help and support for your SynopMentor experience</p>
      </div>

      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Knowledge Base', description: 'Browse our comprehensive help articles', icon: DocumentTextIcon, color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
          { title: 'Live Chat', description: 'Chat with our support team', icon: ChatBubbleLeftRightIcon, color: 'text-green-500', bgColor: 'bg-green-500/20' },
          { title: 'Video Tutorials', description: 'Watch step-by-step guides', icon: PlayIcon, color: 'text-purple-500', bgColor: 'bg-purple-500/20' }
        ].map((help, index) => (
          <button key={index} className="p-6 glass-panel rounded-2xl border border-glass-border hover:border-primary/30 transition-all duration-300 text-left group">
            <div className={`w-12 h-12 ${help.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <help.icon className={`w-6 h-6 ${help.color}`} />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">{help.title}</h3>
            <p className="text-sm text-text-secondary">{help.description}</p>
          </button>
        ))}
      </div>

      {/* Support Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">My Support Tickets</h3>
            <button className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-colors">
              New Ticket
            </button>
          </div>
          <div className="space-y-4">
            {[
              { id: 'TICK-001', subject: 'Payment processing issue', status: 'open', priority: 'high', date: '2024-12-15' },
              { id: 'TICK-002', subject: 'Profile verification question', status: 'resolved', priority: 'medium', date: '2024-12-10' },
              { id: 'TICK-003', subject: 'Feature request: Dark mode', status: 'closed', priority: 'low', date: '2024-12-05' }
            ].map((ticket, index) => (
              <div key={index} className="p-4 glass-panel rounded-xl border border-glass-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-text-primary">{ticket.subject}</div>
                    <div className="text-sm text-text-secondary">#{ticket.id} • {ticket.date}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                      ticket.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'open' ? 'bg-blue-500/20 text-blue-500' :
                      ticket.status === 'resolved' ? 'bg-green-500/20 text-green-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  View Ticket →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-glass-border">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              { question: 'How do I verify my identity?', category: 'Verification' },
              { question: 'What are the payment processing fees?', category: 'Payments' },
              { question: 'How can I increase my session rates?', category: 'Earnings' },
              { question: 'How do I cancel a scheduled session?', category: 'Sessions' },
              { question: 'What happens if a student doesn\'t show up?', category: 'Sessions' }
            ].map((faq, index) => (
              <button key={index} className="w-full p-4 glass-panel rounded-xl border border-glass-border/50 hover:border-primary/30 transition-all duration-300 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-text-primary">{faq.question}</div>
                    <div className="text-sm text-text-secondary">{faq.category}</div>
                  </div>
                  <ChevronDownIcon className="w-4 h-4 text-text-secondary" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { method: 'Email Support', contact: 'support@synapmentor.com', hours: '24/7', icon: ChatBubbleLeftRightIcon },
            { method: 'Phone Support', contact: '+1 (555) 123-4567', hours: 'Mon-Fri 9AM-6PM PST', icon: PhoneIcon },
            { method: 'Live Chat', contact: 'Available in app', hours: 'Mon-Fri 9AM-6PM PST', icon: ChatBubbleLeftRightIcon }
          ].map((contact, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <contact.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium text-text-primary mb-2">{contact.method}</h4>
              <p className="text-sm text-text-secondary mb-1">{contact.contact}</p>
              <p className="text-xs text-text-secondary">{contact.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

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

        {/* Large bottom flowing orbs - like reference */}
        {/* Bottom center large orb */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-50 animate-float-slow"
             style={{
               background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.3) 30%, transparent 70%)',
               filter: 'blur(60px)',
               animationDelay: '1s'
             }}></div>

        {/* Bottom right large orb */}
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full opacity-40 animate-float-delayed"
             style={{
               background: 'radial-gradient(circle, rgba(0, 0, 26, 0.5) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
               filter: 'blur(50px)',
               animationDelay: '3s'
             }}></div>

        {/* Bottom left large orb */}
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-35 animate-pulse"
             style={{
               background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)',
               filter: 'blur(45px)',
               animationDelay: '5s',
               animationDuration: '8s'
             }}></div>

        {/* Additional flowing accent in bottom area */}
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
                onClick={() => handleSectionChange(item.section)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                  activeSection === item.section
                    ? 'glass-panel border border-glass-border bg-primary/10 text-primary'
                    : 'hover:glass-panel hover:border hover:border-glass-border text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Top Header */}
          <div className="flex items-center justify-end">
            {/* Right Actions */}
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

          {/* Dynamic Content Based on Active Section */}
          {activeSection === 'BookingsAndSessions' && renderBookingsAndSessions()}
          {activeSection === 'Profile' && renderProfile()}
          {activeSection === 'SkillVerification' && renderSkillVerification()}
          {activeSection === 'IdentityVerification' && renderIdentityVerification()}
          {activeSection === 'Wallet' && renderWallet()}
          {activeSection === 'PaymentGateway' && renderPaymentGateway()}
          {activeSection === 'Content' && renderContent()}
          {activeSection === 'Teams' && renderTeams()}
          {activeSection === 'Community' && renderCommunity()}
          {activeSection === 'Notifications' && renderNotifications()}
          {activeSection === 'Settings' && renderSettings()}
          {activeSection === 'Support' && renderSupport()}
          {activeSection === 'Dashboard' && (
            <>
              {/* Dashboard Title */}
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
                <p className="text-text-secondary">Last 30 days • 9 Nov - 9 Dec</p>
              </div>

          {/* Analytics Top Stats Row - Comprehensive Dashboard */}
          <div className="grid grid-cols-4 gap-6">
            {/* Content Growth */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Content Growth</h3>
                  <span className="text-primary text-sm font-medium">{analyticsData.contentGrowth.change}</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-2">{analyticsData.contentGrowth.value}</div>
                <div className="text-xs text-text-secondary">New content pieces</div>
              </div>
            </div>

            {/* Solved Problems */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Solved Problems</h3>
                  <span className="text-primary text-sm font-medium">{analyticsData.solvedProblems.change}</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-2">{analyticsData.solvedProblems.value}</div>
                <div className="text-xs text-text-secondary">Total solutions</div>
              </div>
            </div>

            {/* Earnings */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Earnings</h3>
                  <span className="text-primary text-sm font-medium">{analyticsData.earnings.change}</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-2">{analyticsData.earnings.value}</div>
                <div className="text-xs text-text-secondary">This month</div>
              </div>
            </div>

            {/* Streak & Badges */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Streak & Badges</h3>
                  <span className="text-primary text-sm font-medium">{analyticsData.badges.change}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-xl font-bold text-text-primary">{analyticsData.streak.value}</div>
                    <div className="text-xs text-text-secondary">Day streak</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-text-primary">{analyticsData.badges.value}</div>
                    <div className="text-xs text-text-secondary">Badges</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Analytics Row */}
          <div className="grid grid-cols-4 gap-6">
            {/* Reached Content */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Reached Content</h3>
                  <span className="text-primary text-sm font-medium">{analyticsData.reachedContent.change}</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-2">{analyticsData.reachedContent.value}</div>
                <div className="text-xs text-text-secondary">Content engagement</div>
              </div>
            </div>

            {/* Total Sessions */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Total Sessions</h3>
                  <span className="text-primary text-sm font-medium">{analyticsData.totalSessions.change}</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-2">{analyticsData.totalSessions.value}</div>
                <div className="text-xs text-text-secondary">Sessions completed</div>
              </div>
            </div>

            {/* Hours Taught */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Hours Taught</h3>
                  <span className="text-primary text-sm font-medium">{analyticsData.hoursTaught.change}</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-2">{analyticsData.hoursTaught.value}</div>
                <div className="text-xs text-text-secondary">Teaching hours</div>
              </div>
            </div>

            {/* Graph Placeholder */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Analytics Graph</h3>
                  <ChartBarIcon className="w-5 h-5 text-text-secondary" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">View Details</div>
                  <div className="text-xs text-text-secondary">Click to expand</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Earnings Graph - Large */}
            <div className="col-span-8 glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden h-fit">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">Earnings</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-primary text-sm font-medium">+15.4%</span>
                      <span className="text-text-secondary text-sm">Growth this month</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full">Monthly</button>
                    <button className="px-3 py-1 text-xs glass-panel border border-glass-border text-text-secondary rounded-full">Weekly</button>
                  </div>
                </div>

                {/* Compact Earnings Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center glass-panel p-4 rounded-xl border border-glass-border/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
                    <div className="relative">
                      <div className="text-2xl font-bold text-text-primary">₹6,84,430</div>
                      <div className="text-sm text-text-secondary">This Week</div>
                      <div className="text-xs text-primary flex items-center justify-center gap-1 mt-1">
                        <span>↗</span> +12.3%
                      </div>
                      {/* Mini bar chart */}
                      <div className="flex justify-center gap-1 mt-2">
                        {[40, 60, 80, 100, 85, 90, 95].map((height, i) => (
                          <div key={i} className="w-1 bg-primary/60 rounded-full" style={{ height: `${height/3}px` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center glass-panel p-4 rounded-xl border border-glass-border/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
                    <div className="relative">
                      <div className="text-2xl font-bold text-text-primary">₹20,24,890</div>
                      <div className="text-sm text-text-secondary">This Month</div>
                      <div className="text-xs text-primary flex items-center justify-center gap-1 mt-1">
                        <span>↗</span> +15.4%
                      </div>
                      {/* Mini area chart */}
                      <div className="flex justify-center gap-1 mt-2">
                        {[30, 45, 60, 75, 90, 85, 100].map((height, i) => (
                          <div key={i} className="w-1 bg-primary/60 rounded-full" style={{ height: `${height/3}px` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center glass-panel p-4 rounded-xl border border-glass-border/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
                    <div className="relative">
                      <div className="text-2xl font-bold text-text-primary">₹72,89,240</div>
                      <div className="text-sm text-text-secondary">This Quarter</div>
                      <div className="text-xs text-primary flex items-center justify-center gap-1 mt-1">
                        <span>↗</span> +18.7%
                      </div>
                      {/* Mini line chart */}
                      <div className="flex justify-center gap-1 mt-2">
                        {[50, 65, 70, 85, 95, 90, 100].map((height, i) => (
                          <div key={i} className="w-1 bg-primary/60 rounded-full" style={{ height: `${height/3}px` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Row */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="glass-panel p-3 rounded-lg border border-glass-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-text-secondary">Avg. Hourly Rate</div>
                        <div className="text-lg font-semibold text-text-primary">₹3,750/hr</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary text-sm">💰</span>
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel p-3 rounded-lg border border-glass-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-text-secondary">Total Consultations</div>
                        <div className="text-lg font-semibold text-text-primary">1,247</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary text-sm">📊</span>
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel p-3 rounded-lg border border-glass-border/50">
                    <div className="text-center">
                      <div className="text-sm text-text-secondary mb-1">Monthly Goal</div>
                      <div className="w-full bg-glass-border/30 rounded-full h-2 mb-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '83%' }}></div>
                      </div>
                      <div className="text-xs text-text-secondary">83% Complete</div>
                    </div>
                  </div>
                </div>

                {/* Earnings Chart */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-text-primary">Monthly Earnings Trend</h4>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <span className="w-3 h-3 bg-primary rounded-full"></span>
                      <span>Earnings</span>
                      <span className="w-3 h-3 bg-blue-400 rounded-full ml-4"></span>
                      <span>Sessions</span>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="relative h-52 glass-panel p-4 rounded-xl border border-glass-border/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-xl"></div>
                    <div className="relative h-full flex items-end justify-between space-x-2">
                      {[
                        { month: 'Jan', earnings: 65, sessions: 45 },
                        { month: 'Feb', earnings: 78, sessions: 52 },
                        { month: 'Mar', earnings: 82, sessions: 58 },
                        { month: 'Apr', earnings: 75, sessions: 48 },
                        { month: 'May', earnings: 88, sessions: 65 },
                        { month: 'Jun', earnings: 92, sessions: 70 },
                        { month: 'Jul', earnings: 95, sessions: 72 },
                        { month: 'Aug', earnings: 100, sessions: 78 },
                        { month: 'Sep', earnings: 85, sessions: 62 },
                        { month: 'Oct', earnings: 90, sessions: 68 },
                        { month: 'Nov', earnings: 96, sessions: 75 },
                        { month: 'Dec', earnings: 98, sessions: 80 }
                      ].map((data, i) => (
                        <div key={i} className="flex flex-col items-center space-y-1 flex-1">
                          <div className="flex items-end space-x-1 h-36">
                            <div
                              className="w-3 bg-primary rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                              style={{ height: `${data.earnings}%` }}
                            ></div>
                            <div
                              className="w-3 bg-blue-400 rounded-t-sm opacity-60 hover:opacity-100 transition-opacity"
                              style={{ height: `${data.sessions}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-text-secondary">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    <div className="text-center p-2 glass-panel rounded-lg border border-glass-border/30">
                      <div className="text-lg font-semibold text-primary">₹4.8L</div>
                      <div className="text-xs text-text-secondary">Best Month</div>
                    </div>
                    <div className="text-center p-3 glass-panel rounded-lg border border-glass-border/30">
                      <div className="text-lg font-semibold text-blue-400">156</div>
                      <div className="text-xs text-text-secondary">Peak Sessions</div>
                    </div>
                    <div className="text-center p-3 glass-panel rounded-lg border border-glass-border/30">
                      <div className="text-lg font-semibold text-green-400">94%</div>
                      <div className="text-xs text-text-secondary">Growth Rate</div>
                    </div>
                    <div className="text-center p-3 glass-panel rounded-lg border border-glass-border/30">
                      <div className="text-lg font-semibold text-purple-400">4.9★</div>
                      <div className="text-xs text-text-secondary">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-4">
              {/* Leaderboard */}
              <div className="glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-text-primary">Leaderboard</h3>
                    <div className="text-sm text-text-secondary">Top Solvers</div>
                  </div>

                  <div className="space-y-3">
                    {leaderboardData.map((user) => (
                      <div key={user.rank} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600">
                              <span className="text-sm font-bold text-white">{user.rank}</span>
                            </div>
                            <div>
                              <div className="font-medium text-text-primary">{user.name}</div>
                              <div className="text-sm text-text-secondary">{user.points} points</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{user.badge}</span>
                            <span className="text-xs text-primary">{user.change}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 py-2 glass-panel border border-glass-border rounded-xl text-text-secondary hover:text-text-primary transition-colors">
                    View Full Leaderboard
                  </button>
                </div>
              </div>

              {/* Sales Breakdown */}
              <div className="glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-text-primary">Service Portfolio</h3>
                    <button className="text-xs glass-panel border border-glass-border px-3 py-1 rounded-full text-text-secondary">Full Report</button>
                  </div>
          
                  <div className="space-y-4">
                    {subjectBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-text-primary">{item.category}</span>
                        </div>
                        <span className="font-semibold text-text-primary">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bar Chart */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">100%</span>
                      <span className="text-text-secondary">75%</span>
                      <span className="text-text-secondary">50%</span>
                      <span className="text-text-secondary">25%</span>
                      <span className="text-text-secondary">0%</span>
                    </div>
                    <div className="flex items-end space-x-2 h-32">
                      {subjectBreakdown.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                            style={{
                              height: `${item.percentage}%`,
                              backgroundColor: item.color
                            }}
                          ></div>
                          <span className="text-xs text-text-secondary mt-2 text-center">{item.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Dashboard Sections */}
          <div className="grid grid-cols-12 gap-6">
            {/* Available Slots (Calendar) */}
            <div className="col-span-6 glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text-primary">Available Slots</h3>
                  <CalendarIcon className="w-5 h-5 text-text-secondary" />
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-text-secondary p-1">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 28 }, (_, i) => (
                    <div key={i} className={`aspect-square flex items-center justify-center text-xs rounded-md transition-all duration-300 ${
                      i % 7 === 0 || i % 7 === 6 ? 'text-text-secondary' :
                      Math.random() > 0.7 ? 'bg-primary/20 text-primary cursor-pointer hover:bg-primary/30' :
                      'text-text-secondary hover:bg-glass-hover cursor-pointer'
                    }`}>
                      {((i % 31) + 1)}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-text-secondary">
                    <span className="inline-block w-3 h-3 bg-primary/20 rounded mr-2"></span>
                    Available slots
                  </div>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Manage Schedule →
                  </button>
                </div>
              </div>
            </div>

            {/* Review Sessions Before Accepting */}
            <div className="col-span-6 glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text-primary">Review Sessions</h3>
                  <div className="text-sm text-text-secondary">Pending Approval</div>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 1, student: 'Anonymous Student', subject: 'Advanced Calculus', time: 'Tomorrow 3:00 PM', duration: '2h', difficulty: 'Advanced', rate: '$45/hr' },
                    { id: 2, student: 'Anonymous Student', subject: 'Organic Chemistry', time: 'Dec 12, 5:00 PM', duration: '1.5h', difficulty: 'Intermediate', rate: '$35/hr' },
                    { id: 3, student: 'Anonymous Student', subject: 'Data Structures', time: 'Dec 13, 2:00 PM', duration: '1h', difficulty: 'Beginner', rate: '$30/hr' }
                  ].map((session) => (
                    <div key={session.id} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium text-text-primary">{session.subject}</div>
                          <div className="text-sm text-text-secondary">{session.time} • {session.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-text-primary">{session.rate}</div>
                          <div className="text-xs text-text-secondary">{session.difficulty}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="flex-1 py-2 px-4 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm">
                          Accept
                        </button>
                        <button className="flex-1 py-2 px-4 glass-panel border border-glass-border text-text-secondary rounded-lg hover:bg-glass-hover transition-colors text-sm">
                          Decline
                        </button>
                        <button className="py-2 px-4 glass-panel border border-glass-border text-text-secondary rounded-lg hover:bg-glass-hover transition-colors text-sm">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule and Interests Row */}
          <div className="grid grid-cols-12 gap-4">
            {/* Schedule */}
            <div className="col-span-8 glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text-primary">Today's Schedule</h3>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full">Today</button>
                    <button className="px-3 py-1 text-xs glass-panel border border-glass-border text-text-secondary rounded-full">Week</button>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { time: '09:00 AM', title: 'Mathematics Tutoring', student: 'John Doe', duration: '1h', status: 'upcoming' },
                    { time: '11:30 AM', title: 'Physics Problem Solving', student: 'Jane Smith', duration: '45m', status: 'upcoming' },
                    { time: '02:00 PM', title: 'Chemistry Lab Help', student: 'Bob Wilson', duration: '1.5h', status: 'in-progress' },
                    { time: '04:30 PM', title: 'Biology Review', student: 'Alice Brown', duration: '1h', status: 'upcoming' },
                    { time: '07:00 PM', title: 'Computer Science Project', student: 'Mike Johnson', duration: '2h', status: 'upcoming' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 glass-panel p-4 rounded-xl border border-glass-border/50">
                      <div className="text-sm font-medium text-text-secondary w-20">{item.time}</div>
                      <div className="flex-1">
                        <div className="font-medium text-text-primary">{item.title}</div>
                        <div className="text-sm text-text-secondary">{item.student} • {item.duration}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        item.status === 'in-progress' ? 'bg-primary/20 text-primary' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {item.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="col-span-4 glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text-primary">Interests</h3>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">Edit</button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'IT Consulting', level: 'Expert', color: 'bg-primary' },
                    { name: 'Digital Marketing', level: 'Advanced', color: 'bg-primary' },
                    { name: 'Business Strategy', level: 'Intermediate', color: 'bg-primary' },
                    { name: 'Data Analytics', level: 'Expert', color: 'bg-primary' },
                    { name: 'Cloud Solutions', level: 'Beginner', color: 'bg-primary' }
                  ].map((interest, index) => (
                    <div key={index} className="flex items-center justify-between glass-panel p-3 rounded-lg border border-glass-border/50">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${interest.color}`}></div>
                        <span className="text-text-primary font-medium">{interest.name}</span>
                      </div>
                      <span className="text-sm text-text-secondary">{interest.level}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2 glass-panel border border-glass-border rounded-xl text-text-secondary hover:text-text-primary transition-colors">
                  + Add Interest
                </button>
              </div>
            </div>
          </div>

          {/* Anonymous Doubt Pools */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 glass-panel p-4 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text-primary">Consultation Requests</h3>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full">Active Requests</button>
                    <button className="px-3 py-1 text-xs glass-panel border border-glass-border text-text-secondary rounded-full">My Solutions</button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* Active Requests */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-text-primary mb-4">Active Requests</h4>
                    {[
                      { id: 1, subject: 'Calculus', question: 'Help with integration by parts', time: '5 min ago', difficulty: 'Medium', bounty: '$15' },
                      { id: 2, subject: 'Physics', question: 'Quantum mechanics wave function', time: '12 min ago', difficulty: 'Hard', bounty: '$25' },
                      { id: 3, subject: 'Chemistry', question: 'Organic reaction mechanisms', time: '18 min ago', difficulty: 'Easy', bounty: '$10' }
                    ].map((request) => (
                      <div key={request.id} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary">{request.subject}</span>
                          <span className="text-xs text-text-secondary">{request.time}</span>
                        </div>
                        <div className="text-sm text-text-primary mb-3">{request.question}</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              request.difficulty === 'Easy' ? 'bg-primary/20 text-primary' :
                              request.difficulty === 'Medium' ? 'bg-primary/20 text-primary' :
                              'bg-primary/20 text-primary'
                            }`}>
                              {request.difficulty}
                            </span>
                            <span className="text-xs font-medium text-text-primary">{request.bounty}</span>
                          </div>
                          <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                            Respond →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View Details and Respond */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-text-primary mb-4">View Details & Respond</h4>
                    <div className="glass-panel p-4 rounded-xl border border-glass-border/50">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <DocumentTextIcon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-text-primary font-medium mb-2">Select a Request</div>
                        <div className="text-sm text-text-secondary mb-4">Choose an active request to view details and provide your solution</div>
                        <button className="w-full py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors">
                          Browse All Requests
                        </button>
                      </div>
                    </div>

                    <div className="glass-panel p-4 rounded-xl border border-glass-border/50">
                      <div className="text-sm font-medium text-text-primary mb-2">Quick Stats</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Pending Requests</span>
                          <span className="text-text-primary">23</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Your Response Rate</span>
                          <span className="text-primary">94.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Avg Response Time</span>
                          <span className="text-primary">8 min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Completed Solutions */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-text-primary mb-4">My Solutions</h4>
                    {[
                      { id: 1, subject: 'Mathematics', solution: 'Derivative chain rule explanation', rating: 4.8, earnings: '$20', status: 'Completed' },
                      { id: 2, subject: 'Physics', solution: 'Momentum conservation problem', rating: 4.9, earnings: '$30', status: 'Completed' },
                      { id: 3, subject: 'Chemistry', solution: 'Balancing chemical equations', rating: 4.7, earnings: '$15', status: 'Under Review' }
                    ].map((solution) => (
                      <div key={solution.id} className="glass-panel p-4 rounded-xl border border-glass-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary">{solution.subject}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            solution.status === 'Completed' ? 'bg-primary/20 text-primary' :
                            'bg-primary/20 text-primary'
                          }`}>
                            {solution.status}
                          </span>
                        </div>
                        <div className="text-sm text-text-primary mb-3">{solution.solution}</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-text-secondary">⭐ {solution.rating}</span>
                            <span className="text-xs font-medium text-text-primary">{solution.earnings}</span>
                          </div>
                          <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                            View →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default GlassDashboard
