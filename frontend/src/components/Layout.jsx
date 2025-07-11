import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import {
  HomeIcon,
  UserIcon,
  CalendarIcon,
  BookOpenIcon,
  WalletIcon,
  UsersIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  // Mock user data for now
  const user = {
    first_name: 'John',
    last_name: 'Doe',
    role: 'mentor'
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Sessions', href: '/sessions', icon: CalendarIcon },
    { name: 'Content', href: '/content', icon: BookOpenIcon },
    { name: 'Wallet', href: '/wallet', icon: WalletIcon },
    { name: 'Community', href: '/community', icon: UsersIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
    { name: 'Support', href: '/support', icon: QuestionMarkCircleIcon },
  ]

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 glass-panel border-r border-glass-border">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-primary neon-text">SynapMentor</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-glass-hover transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <nav className="mt-8 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/30 neon-glow'
                      : 'text-text-secondary hover:text-text-primary hover:bg-glass-hover'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="glass-panel border-r border-glass-border">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-primary neon-text">SynapMentor</h1>
          </div>
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/30 neon-glow'
                      : 'text-text-secondary hover:text-text-primary hover:bg-glass-hover'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 glass-panel border-b border-glass-border">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-glass-hover transition-colors lg:hidden"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-glass-hover transition-colors"
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-5 h-5" style={{ color: '#00001a' }} />
                )}
              </button>

              {/* User menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-xs text-text-secondary capitalize">{user?.role}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-text-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-text-primary">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-glass-hover transition-colors text-text-secondary hover:text-red-400"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
