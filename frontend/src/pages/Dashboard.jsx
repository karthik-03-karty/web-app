import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import LoadingSpinner from '../components/LoadingSpinner'
import axios from 'axios'
import {
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  EyeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  FireIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  TrophyIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentTextIcon,
  MicrophoneIcon,
  LinkIcon,
  HashtagIcon,
  ShareIcon,
  TrashIcon,
  PencilIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  PhotoIcon,
  FolderIcon,
  TagIcon,
  GlobeAltIcon,
  LanguageIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  WalletIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  Bars3Icon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

const Dashboard = () => {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const [loading, setLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState('30')
  const [activeSection, setActiveSection] = useState('dashboard')

  // Dashboard Data States
  const [stats, setStats] = useState(null)
  const [recentSessions, setRecentSessions] = useState([])
  const [upcomingSessions, setUpcomingSessions] = useState([])
  const [notifications, setNotifications] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [anonymousDoubts, setAnonymousDoubts] = useState([])
  const [contentGrowth, setContentGrowth] = useState([])
  const [earningsData, setEarningsData] = useState([])
  const [streakData, setStreakData] = useState({ current: 0, longest: 0 })
  const [badges, setBadges] = useState([])
  const [reachedContent, setReachedContent] = useState(0)
  const [totalSessions, setTotalSessions] = useState(0)
  const [hoursTaught, setHoursTaught] = useState(0)

  // Profile & Settings States
  const [profileData, setProfileData] = useState({})
  const [walletData, setWalletData] = useState({})
  const [contentData, setContentData] = useState([])
  const [teamSessions, setTeamSessions] = useState([])
  const [communityData, setCommunityData] = useState({})
  const [settingsData, setSettingsData] = useState({})
  const [supportTickets, setSupportTickets] = useState([])

  // UI States
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOptions, setFilterOptions] = useState({})
  const [selectedContent, setSelectedContent] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls - in production, these would be real API endpoints
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Generate comprehensive mock data
      generateMockData()
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      generateMockData()
    } finally {
      setLoading(false)
    }
  }

  const generateMockData = () => {
    // Analytics Data
    const mockContentGrowth = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.floor(Math.random() * 100) + 50,
      views: Math.floor(Math.random() * 500) + 100
    }))
    setContentGrowth(mockContentGrowth)

    const mockEarnings = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: Math.floor(Math.random() * 500) + 100,
      sessions: Math.floor(Math.random() * 10) + 1
    }))
    setEarningsData(mockEarnings)

    // Stats
    setStats({
      total_sessions: 89,
      completed_sessions: 76,
      total_earnings: 149757,
      total_content: 45,
      total_views: 12450,
      followers: 1250,
      following: 89,
      wallet_balance: 5420,
      profile_complete: 85,
      abandonment_rate: 61.4,
      revenue_growth: 4.97,
      session_completion_rate: 85.4
    })

    // Streak and Badges
    setStreakData({ current: 15, longest: 42 })
    setBadges([
      { name: 'Top Mentor', icon: '🏆', earned: true, description: 'Ranked in top 10 mentors' },
      { name: 'Problem Solver', icon: '🧩', earned: true, description: 'Solved 100+ problems' },
      { name: 'Content Creator', icon: '📝', earned: false, description: 'Upload 50+ pieces of content' },
      { name: 'Community Leader', icon: '👑', earned: true, description: 'Active community participant' },
      { name: 'Streak Master', icon: '🔥', earned: true, description: '30-day learning streak' },
      { name: 'Verified Expert', icon: '✅', earned: true, description: 'Completed skill verification' }
    ])

    // Metrics
    setReachedContent(12450)
    setTotalSessions(89)
    setHoursTaught(156)

    // Leaderboard
    setLeaderboard([
      { name: 'Alex Johnson', points: 2450, rank: 1, avatar: 'AJ', earnings: '$3,200', sessions: 45 },
      { name: 'Sarah Chen', points: 2380, rank: 2, avatar: 'SC', earnings: '$2,980', sessions: 42 },
      { name: 'Mike Wilson', points: 2290, rank: 3, avatar: 'MW', earnings: '$2,750', sessions: 38 },
      { name: 'Emma Davis', points: 2150, rank: 4, avatar: 'ED', earnings: '$2,400', sessions: 35 },
      { name: 'You', points: 1980, rank: 5, avatar: user?.first_name?.[0] + user?.last_name?.[0] || 'YU', earnings: '$1,850', sessions: 32 }
    ])

    // Notifications
    setNotifications([
      { id: 1, type: 'session', title: 'New session booked', message: 'Sarah Chen booked a session for tomorrow', time: '2 min ago', read: false },
      { id: 2, type: 'payment', title: 'Payment received', message: 'You received $75 for your last session', time: '1 hour ago', read: false },
      { id: 3, type: 'content', title: 'Content milestone', message: 'Your tutorial reached 1000 views!', time: '3 hours ago', read: true },
      { id: 4, type: 'achievement', title: 'New badge earned', message: 'You unlocked the Problem Solver badge', time: '1 day ago', read: true },
      { id: 5, type: 'doubt', title: 'Anonymous question', message: 'New question in JavaScript category', time: '2 days ago', read: true }
    ])

    // Available Slots
    setAvailableSlots([
      { id: 1, date: 'Today', time: '2:00 PM - 3:00 PM', status: 'available', type: 'individual' },
      { id: 2, date: 'Today', time: '4:00 PM - 5:00 PM', status: 'booked', type: 'individual', student: 'John Doe' },
      { id: 3, date: 'Tomorrow', time: '10:00 AM - 11:00 AM', status: 'available', type: 'group' },
      { id: 4, date: 'Tomorrow', time: '2:00 PM - 3:00 PM', status: 'available', type: 'individual' },
      { id: 5, date: 'Dec 18', time: '1:00 PM - 2:00 PM', status: 'pending', type: 'team', company: 'TechCorp' }
    ])

    // Anonymous Doubts
    setAnonymousDoubts([
      { id: 1, topic: 'React Hooks', category: 'JavaScript', responses: 3, time: '5 min ago', urgent: true, difficulty: 'intermediate' },
      { id: 2, topic: 'Database Design', category: 'SQL', responses: 1, time: '15 min ago', urgent: false, difficulty: 'advanced' },
      { id: 3, topic: 'Machine Learning', category: 'Python', responses: 7, time: '1 hour ago', urgent: false, difficulty: 'beginner' },
      { id: 4, topic: 'CSS Grid Layout', category: 'CSS', responses: 2, time: '2 hours ago', urgent: true, difficulty: 'intermediate' }
    ])

    // Profile Data
    setProfileData({
      completionPercentage: 85,
      followers: 1250,
      following: 89,
      interests: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
      personalInfo: {
        firstName: user?.first_name || 'John',
        lastName: user?.last_name || 'Doe',
        country: 'United States',
        city: 'San Francisco',
        gender: 'Male',
        dob: '1990-05-15',
        bio: 'Passionate software engineer with 5+ years of experience in full-stack development.',
        profilePic: null
      },
      bankAccount: {
        accountNumber: '****1234',
        routingNumber: '****5678',
        bankName: 'Chase Bank'
      },
      languages: ['English (Native)', 'Spanish (Intermediate)', 'French (Beginner)'],
      skills: [
        { name: 'JavaScript', level: 'Expert', verified: true },
        { name: 'React', level: 'Expert', verified: true },
        { name: 'Node.js', level: 'Advanced', verified: false },
        { name: 'Python', level: 'Intermediate', verified: true }
      ],
      projects: [
        { name: 'E-commerce Platform', description: 'Full-stack web application', tech: ['React', 'Node.js', 'MongoDB'] },
        { name: 'Mobile App', description: 'React Native application', tech: ['React Native', 'Firebase'] }
      ],
      experience: [
        { company: 'TechCorp', position: 'Senior Developer', duration: '2020-Present' },
        { company: 'StartupXYZ', position: 'Full Stack Developer', duration: '2018-2020' }
      ],
      achievements: [
        { title: 'Research Paper Published', description: 'AI in Education', year: '2023' },
        { title: 'Conference Speaker', description: 'React Summit 2022', year: '2022' }
      ],
      rateLimit: { hourly: 50, daily: 200, monthly: 1000 }
    })

    // Wallet Data
    setWalletData({
      balance: 5420,
      pendingEarnings: 850,
      totalEarnings: 149757,
      sessionEarnings: mockEarnings.slice(-10),
      transactions: [
        { id: 1, type: 'earning', amount: 75, description: 'Session with Sarah Chen', date: '2023-12-16', status: 'completed' },
        { id: 2, type: 'withdrawal', amount: -500, description: 'Bank transfer', date: '2023-12-15', status: 'completed' },
        { id: 3, type: 'earning', amount: 120, description: 'Group session', date: '2023-12-14', status: 'completed' }
      ],
      autoPayments: {
        enabled: true,
        frequency: 'weekly',
        threshold: 1000
      }
    })

    // Content Data
    setContentData([
      { id: 1, type: 'video', title: 'React Hooks Tutorial', views: 1250, likes: 89, category: 'JavaScript', status: 'published', uploadDate: '2023-12-10' },
      { id: 2, type: 'blog', title: 'Understanding Async/Await', views: 890, likes: 67, category: 'JavaScript', status: 'published', uploadDate: '2023-12-08' },
      { id: 3, type: 'pdf', title: 'Python Cheat Sheet', views: 2100, likes: 156, category: 'Python', status: 'published', uploadDate: '2023-12-05' },
      { id: 4, type: 'video', title: 'CSS Grid Masterclass', views: 0, likes: 0, category: 'CSS', status: 'draft', uploadDate: '2023-12-16' }
    ])

    // Team Sessions
    setTeamSessions([
      { id: 1, title: 'React Training for TechCorp', participants: 15, duration: '2 hours', status: 'scheduled', date: '2023-12-18' },
      { id: 2, title: 'JavaScript Bootcamp', participants: 8, duration: '4 hours', status: 'completed', date: '2023-12-15' }
    ])

    // Community Data
    setCommunityData({
      activeMembers: 2450,
      discussions: [
        { id: 1, title: 'Best practices for React performance', author: 'Alex Johnson', replies: 23, lastActivity: '2 hours ago' },
        { id: 2, title: 'Database optimization techniques', author: 'Sarah Chen', replies: 15, lastActivity: '4 hours ago' }
      ],
      topContributors: [
        { name: 'Alex Johnson', contributions: 145, avatar: 'AJ' },
        { name: 'Sarah Chen', contributions: 132, avatar: 'SC' }
      ],
      upcomingEvents: [
        { name: 'React Workshop', date: '2023-12-20', time: '2:00 PM', attendees: 45 },
        { name: 'Python Meetup', date: '2023-12-22', time: '6:00 PM', attendees: 32 }
      ]
    })

    // Settings Data
    setSettingsData({
      language: 'English',
      emailAlerts: true,
      pushNotifications: true,
      weeklyDigest: true,
      privacy: {
        profileVisibility: 'public',
        allowDirectMessages: true
      },
      mfa: {
        enabled: false,
        methods: ['sms', 'email', 'authenticator']
      }
    })

    // Support Tickets
    setSupportTickets([
      { id: 1, subject: 'Payment issue', status: 'open', priority: 'high', created: '2023-12-15' },
      { id: 2, subject: 'Content upload problem', status: 'resolved', priority: 'medium', created: '2023-12-10' }
    ])
  }

  // Chart color schemes
  const chartColors = {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#06B6D4'
  }

  // Helper functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getTimeAgo = (date) => {
    const now = new Date()
    const past = new Date(date)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-400/20'
      case 'booked': return 'text-blue-400 bg-blue-400/20'
      case 'pending': return 'text-yellow-400 bg-yellow-400/20'
      case 'completed': return 'text-green-400 bg-green-400/20'
      case 'cancelled': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-panel p-8 rounded-2xl border border-glass-border">
          <LoadingSpinner size="lg" />
          <p className="text-text-secondary mt-4 text-center">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Navigation items for sidebar
  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon, active: true },
    { id: 'analytics', name: 'Analytics', icon: TrendingUpIcon },
    { id: 'leaderboard', name: 'Leaderboard', icon: TrophyIcon },
    { id: 'calendar', name: 'Calendar', icon: CalendarIcon },
    { id: 'sessions', name: 'Sessions', icon: VideoCameraIcon },
    { id: 'bookings', name: 'Bookings', icon: ClockIcon },
    { id: 'profile', name: 'Profile', icon: UserGroupIcon },
    { id: 'verification', name: 'Verification', icon: ShieldCheckIcon },
    { id: 'wallet', name: 'Wallet', icon: WalletIcon },
    { id: 'content', name: 'Content', icon: DocumentTextIcon },
    { id: 'teams', name: 'Teams', icon: UserGroupIcon },
    { id: 'community', name: 'Community', icon: GlobeAltIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
    { id: 'support', name: 'Support', icon: QuestionMarkCircleIcon }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Glassmorphism Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-accent/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative flex">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="fixed left-0 top-0 h-full w-64 glass-panel border-r border-glass-border z-40"
        >
          {/* Logo/Brand */}
          <div className="p-6 border-b border-glass-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-text-primary">SynapMentor</h1>
                <p className="text-xs text-text-secondary">Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-glass-hover'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.button>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-glass-border/50">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-glass-bg/30">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-medium">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-text-secondary truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="text-text-secondary hover:text-primary transition-colors"
              >
                <EllipsisVerticalIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 ml-64">
          {/* Top Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-30 glass-panel border-b border-glass-border/50 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-text-primary capitalize">
                  {activeSection}
                </h1>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <span>Last {selectedTimeRange} days</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass-input pl-10 w-64"
                  />
                </div>

                {/* Time Range Selector */}
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="glass-input text-sm"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last year</option>
                </select>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="glass-button p-2 relative"
                  >
                    <BellIcon className="w-5 h-5" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full text-xs flex items-center justify-center text-white">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={() => {/* Theme toggle logic */}}
                  className="glass-button p-2"
                >
                  {isDark ? '🌙' : '☀️'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="p-6">
            {activeSection === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Main Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-panel p-6 rounded-xl border border-glass-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-text-secondary text-sm font-medium mb-1">Revenue</p>
                        <p className="text-3xl font-bold text-text-primary">
                          {formatCurrency(stats?.total_earnings || 149757)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                        <CurrencyDollarIcon className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">+4.97%</span>
                      </div>
                      <span className="text-xs text-text-secondary">Last 30 days</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-panel p-6 rounded-xl border border-glass-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-text-secondary text-sm font-medium mb-1">Abandonment Rate</p>
                        <p className="text-3xl font-bold text-text-primary">61.4%</p>
                      </div>
                      <div className="w-12 h-12 bg-red-400/20 rounded-lg flex items-center justify-center">
                        <ArrowTrendingDownIcon className="w-6 h-6 text-red-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowTrendingDownIcon className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-red-400">-3.05%</span>
                      </div>
                      <span className="text-xs text-text-secondary">Abandoned Carts: 3,704</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-panel p-6 rounded-xl border border-glass-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-text-secondary text-sm font-medium mb-1">Total Sales</p>
                        <p className="text-3xl font-bold text-text-primary">
                          {formatCurrency(stats?.total_sessions * 50 || 149757)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
                        <ChartBarIcon className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">+4.97%</span>
                      </div>
                      <span className="text-xs text-text-secondary">Sessions completed</span>
                    </div>
                  </motion.div>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {[
                    { title: 'Content Growth', value: stats?.total_content || 45, icon: BookOpenIcon, color: 'text-blue-400', bgColor: 'bg-blue-400/20' },
                    { title: 'Solved Problems', value: stats?.completed_sessions || 76, icon: CheckCircleIcon, color: 'text-green-400', bgColor: 'bg-green-400/20' },
                    { title: 'Current Streak', value: `${streakData.current} days`, icon: FireIcon, color: 'text-orange-400', bgColor: 'bg-orange-400/20' },
                    { title: 'Total Views', value: formatNumber(stats?.total_views || reachedContent), icon: EyeIcon, color: 'text-purple-400', bgColor: 'bg-purple-400/20' },
                    { title: 'Hours Taught', value: `${hoursTaught}h`, icon: ClockIcon, color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' },
                    { title: 'Followers', value: formatNumber(stats?.followers || 1250), icon: UserGroupIcon, color: 'text-pink-400', bgColor: 'bg-pink-400/20' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="glass-panel p-4 rounded-xl border border-glass-border hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                      </div>
                      <div>
                        <p className="text-text-secondary text-xs font-medium mb-1">{stat.title}</p>
                        <p className="text-xl font-bold text-text-primary">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts and Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue Chart */}
                  <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold text-text-primary">Revenue</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400 font-medium">+3.2%</span>
                          <span className="text-sm text-text-secondary">vs previous year</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs px-3 py-1 rounded-lg bg-primary/20 text-primary">Last year</button>
                        <button className="text-xs px-3 py-1 rounded-lg text-text-secondary hover:bg-glass-hover">Compare to previous year</button>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsData.slice(-12)}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis
                            dataKey="date"
                            stroke="rgba(255,255,255,0.5)"
                            fontSize={12}
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          />
                          <YAxis
                            stroke="rgba(255,255,255,0.5)"
                            fontSize={12}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(0,0,0,0.8)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                            formatter={(value) => [formatCurrency(value), 'Revenue']}
                            labelFormatter={(label) => new Date(label).toLocaleDateString()}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColors.primary}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Revenue Streams */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-text-secondary mb-3">Revenue streams</h3>
                        <div className="space-y-2">
                          {[
                            { name: 'Direct', amount: 68139, change: 5.5 },
                            { name: 'Organic Search', amount: 43629, change: 20.5 },
                            { name: 'Unknown', amount: 13637, change: -1 },
                            { name: 'Referral', amount: 11830, change: 7 }
                          ].map((stream, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-text-primary">{stream.name}</span>
                              <span className="text-sm font-medium text-text-primary">{formatCurrency(stream.amount)}</span>
                              <span className={`text-xs ${stream.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {stream.change > 0 ? '+' : ''}{stream.change}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar Analytics */}
                  <div className="space-y-6">
                    {/* Abandonment Rate */}
                    <div className="glass-panel p-6 rounded-xl border border-glass-border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-primary">Abandonment rate</h3>
                        <button className="text-xs text-text-secondary hover:text-primary">Full Report</button>
                      </div>
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-red-400 mb-1">61.4%</div>
                        <div className="text-sm text-red-400">-3.05% compare to the same period last year</div>
                      </div>
                      <div className="w-24 h-24 mx-auto mb-4 relative">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="rgba(239, 68, 68, 0.2)"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#EF4444"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${61.4 * 2.51} ${(100 - 61.4) * 2.51}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-red-400">61.4%</span>
                        </div>
                      </div>
                      <div className="text-center text-sm text-text-secondary">
                        Abandoned Carts: 3,704
                      </div>
                    </div>

                    {/* Total Sales */}
                    <div className="glass-panel p-6 rounded-xl border border-glass-border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-primary">Total Sales</h3>
                        <button className="text-xs text-text-secondary hover:text-primary">Full Report</button>
                      </div>
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-green-400 mb-1">{formatCurrency(149757)}</div>
                        <div className="text-sm text-green-400">+4.97%</div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { name: 'Cost', amount: 61078, color: 'bg-blue-400' },
                          { name: 'Net Profit', amount: 50713, color: 'bg-red-400' },
                          { name: 'Shipping', amount: 22552, color: 'bg-green-400' },
                          { name: 'Tax', amount: 8673, color: 'bg-yellow-400' },
                          { name: 'PayPal Fees', amount: 6741, color: 'bg-purple-400' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                              <span className="text-sm text-text-primary">{item.name}</span>
                            </div>
                            <span className="text-sm font-medium text-text-primary">{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leaderboard and Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Leaderboard */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-text-primary">Leaderboard</h2>
                      <button className="text-xs text-primary hover:text-primary/80">View All</button>
                    </div>

                    <div className="space-y-3">
                      {leaderboard.map((person, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                            person.name === 'You' ? 'bg-primary/10 border border-primary/30' : 'bg-glass-bg/30 hover:bg-glass-hover'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">{person.avatar}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text-primary">{person.name}</p>
                              <p className="text-xs text-text-secondary">{person.points} points • {person.sessions} sessions</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-sm font-bold ${
                              person.rank <= 3 ? 'text-yellow-400' : 'text-text-secondary'
                            }`}>
                              #{person.rank}
                            </span>
                            <p className="text-xs text-text-secondary">{person.earnings}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity & Notifications */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
                      <button className="text-xs text-primary hover:text-primary/80">View All</button>
                    </div>

                    <div className="space-y-4">
                      {notifications.slice(0, 5).map((activity, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-glass-bg/30 hover:bg-glass-hover transition-colors cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                            {activity.type === 'session' && <CalendarIcon className="w-4 h-4 text-primary" />}
                            {activity.type === 'payment' && <CurrencyDollarIcon className="w-4 h-4 text-primary" />}
                            {activity.type === 'content' && <EyeIcon className="w-4 h-4 text-primary" />}
                            {activity.type === 'achievement' && <StarIcon className="w-4 h-4 text-primary" />}
                            {activity.type === 'doubt' && <QuestionMarkCircleIcon className="w-4 h-4 text-primary" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary">{activity.title}</p>
                            <p className="text-xs text-text-secondary mt-1">{activity.message}</p>
                            <p className="text-xs text-text-secondary mt-1">{activity.time}</p>
                          </div>
                          {!activity.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Available Slots & Anonymous Doubts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Available Slots */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-text-primary">Available Slots</h2>
                      <button className="text-xs text-primary hover:text-primary/80">Manage Calendar</button>
                    </div>

                    <div className="space-y-3">
                      {availableSlots.map((slot, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-glass-bg/30 hover:bg-glass-hover transition-colors"
                        >
                          <div>
                            <p className="text-sm font-medium text-text-primary">{slot.date}</p>
                            <p className="text-xs text-text-secondary">{slot.time}</p>
                            {slot.student && (
                              <p className="text-xs text-primary mt-1">with {slot.student}</p>
                            )}
                            {slot.company && (
                              <p className="text-xs text-primary mt-1">{slot.company}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(slot.status)}`}>
                              {slot.status}
                            </span>
                            <p className="text-xs text-text-secondary mt-1">{slot.type}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Anonymous Doubt Pools */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-text-primary">Anonymous Doubt Pools</h2>
                      <button className="text-xs text-primary hover:text-primary/80">View All</button>
                    </div>

                    <div className="space-y-3">
                      {anonymousDoubts.map((doubt, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="p-3 rounded-lg bg-glass-bg/30 hover:bg-glass-hover transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-medium text-text-primary">{doubt.topic}</h3>
                                {doubt.urgent && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-400/20 text-red-400">Urgent</span>
                                )}
                              </div>
                              <p className="text-xs text-text-secondary mt-1">{doubt.category} • {doubt.difficulty}</p>
                            </div>
                            <span className="text-xs text-text-secondary">{doubt.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-secondary">{doubt.responses} responses</span>
                            <button className="text-xs text-primary hover:text-primary/80 px-2 py-1 rounded bg-primary/10">
                              Respond
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-panel p-6 rounded-xl border border-glass-border">
                  <h2 className="text-lg font-semibold text-text-primary mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {user?.role === 'solver' ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-200 text-left group"
                        >
                          <CalendarIcon className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-medium mb-1">Create Session</h3>
                          <p className="text-xs opacity-75">Schedule a new tutoring session</p>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveSection('analytics')}
                          className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border hover:border-primary/30 text-text-primary hover:text-primary transition-all duration-200 text-left group"
                        >
                          <ChartBarIcon className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-medium mb-1">View Analytics</h3>
                          <p className="text-xs opacity-75">Check your performance metrics</p>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveSection('wallet')}
                          className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border hover:border-primary/30 text-text-primary hover:text-primary transition-all duration-200 text-left group"
                        >
                          <CurrencyDollarIcon className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-medium mb-1">Manage Wallet</h3>
                          <p className="text-xs opacity-75">View earnings and transactions</p>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveSection('content')}
                          className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border hover:border-primary/30 text-text-primary hover:text-primary transition-all duration-200 text-left group"
                        >
                          <BookOpenIcon className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-medium mb-1">Upload Content</h3>
                          <p className="text-xs opacity-75">Share your knowledge</p>
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-200 text-left group"
                        >
                          <UserGroupIcon className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-medium mb-1">Find Mentors</h3>
                          <p className="text-xs opacity-75">Browse available tutors</p>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border hover:border-primary/30 text-text-primary hover:text-primary transition-all duration-200 text-left group"
                        >
                          <CalendarIcon className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-medium mb-1">Book Session</h3>
                          <p className="text-xs opacity-75">Schedule a learning session</p>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveSection('analytics')}
                          className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border hover:border-primary/30 text-text-primary hover:text-primary transition-all duration-200 text-left group"
                        >
                          <ChartBarIcon className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-medium mb-1">Track Progress</h3>
                          <p className="text-xs opacity-75">Monitor your learning journey</p>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border hover:border-primary/30 text-text-primary hover:text-primary transition-all duration-200 text-left group"
                        >
                          <QuestionMarkCircleIcon className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
                          <h3 className="font-medium mb-1">Ask Question</h3>
                          <p className="text-xs opacity-75">Get help anonymously</p>
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Analytics Section */}
            {activeSection === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Content Growth */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Content Growth</h3>
                      <BookOpenIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary mb-2">{stats?.total_content || 45}</div>
                    <div className="text-sm text-green-400">+12% this month</div>
                    <div className="mt-4 h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={contentGrowth.slice(-7)}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={chartColors.primary}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Solved Problems */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Solved Problems</h3>
                      <CheckCircleIcon className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary mb-2">{stats?.completed_sessions || 76}</div>
                    <div className="text-sm text-green-400">+8% this month</div>
                    <div className="mt-4">
                      <div className="w-full bg-glass-bg/30 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="text-xs text-text-secondary mt-2">85% completion rate</div>
                    </div>
                  </div>

                  {/* Earnings */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Earnings</h3>
                      <CurrencyDollarIcon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary mb-2">
                      {formatCurrency(stats?.total_earnings || 149757)}
                    </div>
                    <div className="text-sm text-green-400">+15% this month</div>
                    <div className="mt-4 h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsData.slice(-7)}>
                          <defs>
                            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={chartColors.warning} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={chartColors.warning} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColors.warning}
                            fillOpacity={1}
                            fill="url(#colorEarnings)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Streak */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Current Streak</h3>
                      <FireIcon className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary mb-2">{streakData.current} days</div>
                    <div className="text-sm text-text-secondary">Longest: {streakData.longest} days</div>
                    <div className="mt-4 flex items-center gap-1">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded ${
                            i < 5 ? 'bg-orange-400' : 'bg-glass-bg/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Content Performance */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-6">Content Performance</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={contentGrowth.slice(-10)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis
                            dataKey="date"
                            stroke="rgba(255,255,255,0.5)"
                            fontSize={12}
                            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          />
                          <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(0,0,0,0.8)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '8px',
                              color: 'white'
                            }}
                          />
                          <Bar dataKey="value" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
                          <Bar dataKey="views" fill={chartColors.secondary} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Session Analytics */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-6">Session Analytics</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Completed', value: 76, fill: chartColors.success },
                              { name: 'Cancelled', value: 8, fill: chartColors.danger },
                              { name: 'Rescheduled', value: 5, fill: chartColors.warning }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Badge Progress */}
                <div className="glass-panel p-6 rounded-xl border border-glass-border">
                  <h3 className="text-lg font-semibold text-text-primary mb-6">Badge Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badges.map((badge, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-lg border transition-all duration-200 ${
                          badge.earned
                            ? 'bg-primary/10 border-primary/30 text-primary'
                            : 'bg-glass-bg/30 border-glass-border text-text-secondary'
                        }`}
                      >
                        <div className="text-2xl mb-2">{badge.icon}</div>
                        <h4 className="font-medium mb-1">{badge.name}</h4>
                        <p className="text-xs opacity-75">{badge.description}</p>
                        {badge.earned && (
                          <div className="mt-2 text-xs text-green-400">✓ Earned</div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Leaderboard Section */}
            {activeSection === 'leaderboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="glass-panel p-6 rounded-xl border border-glass-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-text-primary">Global Leaderboard</h2>
                    <div className="flex items-center gap-2">
                      <select className="glass-input text-sm">
                        <option>This Month</option>
                        <option>All Time</option>
                        <option>This Year</option>
                      </select>
                      <button className="glass-button text-sm">
                        <FunnelIcon className="w-4 h-4 mr-2" />
                        Filter
                      </button>
                    </div>
                  </div>

                  {/* Top 3 Podium */}
                  <div className="flex items-end justify-center gap-4 mb-8">
                    {leaderboard.slice(0, 3).map((person, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
                      >
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                          index === 0 ? 'from-yellow-400 to-yellow-600' :
                          index === 1 ? 'from-gray-300 to-gray-500' :
                          'from-orange-400 to-orange-600'
                        } flex items-center justify-center mb-2`}>
                          <span className="text-white font-bold text-lg">{person.avatar}</span>
                        </div>
                        <div className={`h-${index === 0 ? '24' : index === 1 ? '20' : '16'} bg-gradient-to-t ${
                          index === 0 ? 'from-yellow-400/20 to-yellow-400/40' :
                          index === 1 ? 'from-gray-300/20 to-gray-300/40' :
                          'from-orange-400/20 to-orange-400/40'
                        } rounded-t-lg flex items-end justify-center pb-2`}>
                          <span className="text-2xl font-bold text-text-primary">#{person.rank}</span>
                        </div>
                        <p className="text-sm font-medium text-text-primary mt-2">{person.name}</p>
                        <p className="text-xs text-text-secondary">{person.points} pts</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Full Leaderboard */}
                  <div className="space-y-2">
                    {leaderboard.map((person, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                          person.name === 'You'
                            ? 'bg-primary/10 border border-primary/30 shadow-lg'
                            : 'bg-glass-bg/30 hover:bg-glass-hover'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            person.rank <= 3 ? 'bg-yellow-400/20 text-yellow-400' : 'bg-primary/20 text-primary'
                          }`}>
                            #{person.rank}
                          </div>
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">{person.avatar}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-primary">{person.name}</p>
                            <p className="text-xs text-text-secondary">{person.sessions} sessions completed</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-text-primary">{person.points} pts</p>
                          <p className="text-xs text-text-secondary">{person.earnings}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Section */}
            {activeSection === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Profile Header */}
                <div className="glass-panel p-6 rounded-xl border border-glass-border">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          {profileData.personalInfo?.firstName?.[0]}{profileData.personalInfo?.lastName?.[0]}
                        </span>
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <PencilIcon className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-text-primary mb-2">
                        {profileData.personalInfo?.firstName} {profileData.personalInfo?.lastName}
                      </h2>
                      <p className="text-text-secondary mb-4">{profileData.personalInfo?.bio}</p>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span>📍 {profileData.personalInfo?.city}, {profileData.personalInfo?.country}</span>
                        <span>👥 {profileData.followers} followers</span>
                        <span>⭐ {profileData.following} following</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-1">{profileData.completionPercentage}%</div>
                      <div className="text-sm text-text-secondary mb-2">Profile Complete</div>
                      <div className="w-20 bg-glass-bg/30 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${profileData.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
                      <button className="text-primary hover:text-primary/80">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-text-secondary">First Name</label>
                          <p className="text-sm text-text-primary">{profileData.personalInfo?.firstName}</p>
                        </div>
                        <div>
                          <label className="text-xs text-text-secondary">Last Name</label>
                          <p className="text-sm text-text-primary">{profileData.personalInfo?.lastName}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-text-secondary">Gender</label>
                          <p className="text-sm text-text-primary">{profileData.personalInfo?.gender}</p>
                        </div>
                        <div>
                          <label className="text-xs text-text-secondary">Date of Birth</label>
                          <p className="text-sm text-text-primary">{profileData.personalInfo?.dob}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-text-secondary">Bio</label>
                        <p className="text-sm text-text-primary">{profileData.personalInfo?.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Verification */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Skills & Verification</h3>
                      <button className="text-primary hover:text-primary/80">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {profileData.skills?.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-glass-bg/30">
                          <div>
                            <p className="text-sm font-medium text-text-primary">{skill.name}</p>
                            <p className="text-xs text-text-secondary">{skill.level}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {skill.verified && (
                              <span className="text-xs px-2 py-1 rounded-full bg-green-400/20 text-green-400">
                                ✓ Verified
                              </span>
                            )}
                            <button className="text-text-secondary hover:text-primary">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bank Account */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Bank Account</h3>
                      <button className="text-primary hover:text-primary/80">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-text-secondary">Bank Name</label>
                        <p className="text-sm text-text-primary">{profileData.bankAccount?.bankName}</p>
                      </div>
                      <div>
                        <label className="text-xs text-text-secondary">Account Number</label>
                        <p className="text-sm text-text-primary">{profileData.bankAccount?.accountNumber}</p>
                      </div>
                      <div>
                        <label className="text-xs text-text-secondary">Routing Number</label>
                        <p className="text-sm text-text-primary">{profileData.bankAccount?.routingNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Languages</h3>
                      <button className="text-primary hover:text-primary/80">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {profileData.languages?.map((language, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded bg-glass-bg/30">
                          <span className="text-sm text-text-primary">{language}</span>
                          <button className="text-text-secondary hover:text-primary">
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Projects & Experience */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Projects */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Projects</h3>
                      <button className="text-primary hover:text-primary/80">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {profileData.projects?.map((project, index) => (
                        <div key={index} className="p-4 rounded-lg bg-glass-bg/30">
                          <h4 className="font-medium text-text-primary mb-2">{project.name}</h4>
                          <p className="text-sm text-text-secondary mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, techIndex) => (
                              <span key={techIndex} className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Experience</h3>
                      <button className="text-primary hover:text-primary/80">
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {profileData.experience?.map((exp, index) => (
                        <div key={index} className="p-4 rounded-lg bg-glass-bg/30">
                          <h4 className="font-medium text-text-primary">{exp.position}</h4>
                          <p className="text-sm text-text-secondary">{exp.company}</p>
                          <p className="text-xs text-text-secondary mt-1">{exp.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Wallet Section */}
            {activeSection === 'wallet' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Wallet Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Current Balance</h3>
                      <WalletIcon className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary mb-2">
                      {formatCurrency(walletData.balance)}
                    </div>
                    <div className="text-sm text-green-400">Available for withdrawal</div>
                  </div>

                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Pending Earnings</h3>
                      <ClockIcon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary mb-2">
                      {formatCurrency(walletData.pendingEarnings)}
                    </div>
                    <div className="text-sm text-yellow-400">Processing payments</div>
                  </div>

                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Total Earnings</h3>
                      <TrophyIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-text-primary mb-2">
                      {formatCurrency(walletData.totalEarnings)}
                    </div>
                    <div className="text-sm text-blue-400">All time earnings</div>
                  </div>
                </div>

                {/* Earnings Chart */}
                <div className="glass-panel p-6 rounded-xl border border-glass-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-text-primary">Earnings Overview</h3>
                    <div className="flex items-center gap-2">
                      <button className="glass-button text-sm">
                        <BanknotesIcon className="w-4 h-4 mr-2" />
                        Withdraw
                      </button>
                      <button className="glass-button text-sm">
                        <Cog6ToothIcon className="w-4 h-4 mr-2" />
                        Auto-pay Settings
                      </button>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={walletData.sessionEarnings}>
                        <defs>
                          <linearGradient id="colorWalletEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartColors.success} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={chartColors.success} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="date"
                          stroke="rgba(255,255,255,0.5)"
                          fontSize={12}
                          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis
                          stroke="rgba(255,255,255,0.5)"
                          fontSize={12}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                          formatter={(value) => [formatCurrency(value), 'Earnings']}
                          labelFormatter={(label) => new Date(label).toLocaleDateString()}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={chartColors.success}
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorWalletEarnings)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Transaction History */}
                <div className="glass-panel p-6 rounded-xl border border-glass-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-text-primary">Transaction History</h3>
                    <button className="text-primary hover:text-primary/80 text-sm">View All</button>
                  </div>
                  <div className="space-y-3">
                    {walletData.transactions?.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-glass-bg/30">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            transaction.type === 'earning' ? 'bg-green-400/20' : 'bg-red-400/20'
                          }`}>
                            {transaction.type === 'earning' ? (
                              <ArrowTrendingUpIcon className="w-5 h-5 text-green-400" />
                            ) : (
                              <ArrowTrendingDownIcon className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-primary">{transaction.description}</p>
                            <p className="text-xs text-text-secondary">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${
                            transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                          </p>
                          <p className={`text-xs ${
                            transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                          }`}>
                            {transaction.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Auto-payment Settings */}
                <div className="glass-panel p-6 rounded-xl border border-glass-border">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Auto-payment Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-text-secondary mb-2 block">Status</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={walletData.autoPayments?.enabled}
                          className="rounded"
                        />
                        <span className="text-sm text-text-primary">
                          {walletData.autoPayments?.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary mb-2 block">Frequency</label>
                      <select className="glass-input text-sm w-full">
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="threshold">When threshold reached</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary mb-2 block">Threshold</label>
                      <input
                        type="number"
                        value={walletData.autoPayments?.threshold}
                        className="glass-input text-sm w-full"
                        placeholder="1000"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Content Management Section */}
            {activeSection === 'content' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Content Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-text-primary">Content Management</h2>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="glass-button bg-primary/20 text-primary border-primary/30"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Upload Content
                  </button>
                </div>

                {/* Content Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="glass-panel p-4 rounded-xl border border-glass-border">
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="w-8 h-8 text-blue-400" />
                      <div>
                        <p className="text-2xl font-bold text-text-primary">{contentData.length}</p>
                        <p className="text-xs text-text-secondary">Total Content</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-glass-border">
                    <div className="flex items-center gap-3">
                      <EyeIcon className="w-8 h-8 text-green-400" />
                      <div>
                        <p className="text-2xl font-bold text-text-primary">
                          {formatNumber(contentData.reduce((sum, item) => sum + item.views, 0))}
                        </p>
                        <p className="text-xs text-text-secondary">Total Views</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-glass-border">
                    <div className="flex items-center gap-3">
                      <HeartIcon className="w-8 h-8 text-red-400" />
                      <div>
                        <p className="text-2xl font-bold text-text-primary">
                          {formatNumber(contentData.reduce((sum, item) => sum + item.likes, 0))}
                        </p>
                        <p className="text-xs text-text-secondary">Total Likes</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-glass-border">
                    <div className="flex items-center gap-3">
                      <ShareIcon className="w-8 h-8 text-purple-400" />
                      <div>
                        <p className="text-2xl font-bold text-text-primary">
                          {contentData.filter(item => item.status === 'published').length}
                        </p>
                        <p className="text-xs text-text-secondary">Published</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Filters */}
                <div className="glass-panel p-4 rounded-xl border border-glass-border">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                      <input
                        type="text"
                        placeholder="Search content..."
                        className="glass-input pl-10 w-full"
                      />
                    </div>
                    <select className="glass-input">
                      <option>All Types</option>
                      <option>Videos</option>
                      <option>Blogs</option>
                      <option>PDFs</option>
                      <option>Links</option>
                    </select>
                    <select className="glass-input">
                      <option>All Categories</option>
                      <option>JavaScript</option>
                      <option>Python</option>
                      <option>CSS</option>
                      <option>React</option>
                    </select>
                    <select className="glass-input">
                      <option>All Status</option>
                      <option>Published</option>
                      <option>Draft</option>
                      <option>Pending</option>
                    </select>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contentData.map((content, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="glass-panel p-6 rounded-xl border border-glass-border hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {content.type === 'video' && <PlayIcon className="w-5 h-5 text-red-400" />}
                          {content.type === 'blog' && <DocumentTextIcon className="w-5 h-5 text-blue-400" />}
                          {content.type === 'pdf' && <DocumentTextIcon className="w-5 h-5 text-green-400" />}
                          {content.type === 'link' && <LinkIcon className="w-5 h-5 text-purple-400" />}
                          <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                            {content.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-text-secondary hover:text-primary">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button className="text-text-secondary hover:text-red-400">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-medium text-text-primary mb-2">{content.title}</h3>

                      <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                        <span>{formatNumber(content.views)} views</span>
                        <span>{content.likes} likes</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(content.status)}`}>
                          {content.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">{content.uploadDate}</span>
                        <div className="flex items-center gap-2">
                          <button className="text-xs text-primary hover:text-primary/80">View</button>
                          <button className="text-xs text-primary hover:text-primary/80">Share</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Settings Section */}
            {activeSection === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Platform Settings */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Platform Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-text-secondary mb-2 block">Language</label>
                        <select className="glass-input w-full">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-primary">Email Alerts</span>
                        <input type="checkbox" checked={settingsData.emailAlerts} className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-primary">Push Notifications</span>
                        <input type="checkbox" checked={settingsData.pushNotifications} className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-primary">Weekly Digest</span>
                        <input type="checkbox" checked={settingsData.weeklyDigest} className="rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Privacy & Security */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Privacy & Security</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-text-secondary mb-2 block">Profile Visibility</label>
                        <select className="glass-input w-full">
                          <option>Public</option>
                          <option>Private</option>
                          <option>Friends Only</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-primary">Allow Direct Messages</span>
                        <input type="checkbox" checked={settingsData.privacy?.allowDirectMessages} className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-primary">Two-Factor Authentication</span>
                        <button className="text-xs text-primary hover:text-primary/80">
                          {settingsData.mfa?.enabled ? 'Enabled' : 'Enable'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Support Section */}
            {activeSection === 'support' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Support Tickets */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">Support Tickets</h3>
                      <button className="glass-button text-sm">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        New Ticket
                      </button>
                    </div>
                    <div className="space-y-3">
                      {supportTickets.map((ticket, index) => (
                        <div key={index} className="p-3 rounded-lg bg-glass-bg/30">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-text-primary">{ticket.subject}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-text-secondary">
                            <span>Priority: {ticket.priority}</span>
                            <span>{ticket.created}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Help & FAQ */}
                  <div className="glass-panel p-6 rounded-xl border border-glass-border">
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Help & FAQ</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 rounded-lg bg-glass-bg/30 hover:bg-glass-hover transition-colors">
                        <div className="flex items-center gap-3">
                          <EnvelopeIcon className="w-5 h-5 text-primary" />
                          <span className="text-sm text-text-primary">Email Support</span>
                        </div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg bg-glass-bg/30 hover:bg-glass-hover transition-colors">
                        <div className="flex items-center gap-3">
                          <ChatBubbleOvalLeftIcon className="w-5 h-5 text-primary" />
                          <span className="text-sm text-text-primary">Live Chat</span>
                        </div>
                      </button>
                      <button className="w-full text-left p-3 rounded-lg bg-glass-bg/30 hover:bg-glass-hover transition-colors">
                        <div className="flex items-center gap-3">
                          <QuestionMarkCircleIcon className="w-5 h-5 text-primary" />
                          <span className="text-sm text-text-primary">FAQ</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Logout Button */}
            <div className="mt-8 text-center">
              <button className="glass-button text-red-400 border-red-400/30 hover:bg-red-400/10">
                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-20 right-6 w-80 glass-panel border border-glass-border rounded-xl p-4 z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text-primary">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-text-secondary hover:text-primary"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <div key={index} className={`p-3 rounded-lg ${notification.read ? 'bg-glass-bg/30' : 'bg-primary/10'}`}>
                    <h4 className="text-sm font-medium text-text-primary">{notification.title}</h4>
                    <p className="text-xs text-text-secondary mt-1">{notification.message}</p>
                    <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )

}

export default Dashboard

export default Dashboard
