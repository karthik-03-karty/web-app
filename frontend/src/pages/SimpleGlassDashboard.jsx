import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import {
  SunIcon,
  ChartBarIcon,
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

const SimpleGlassDashboard = () => {
  const { isDark, toggleTheme } = useTheme()

  const sidebarItems = [
    { name: 'Dashboard', icon: ChartBarIcon, active: true },
    { name: 'Analytics', icon: ChartBarIcon },
    { name: 'Profile', icon: UserIcon },
    { name: 'Sessions', icon: CalendarIcon },
    { name: 'Content', icon: CurrencyDollarIcon },
    { name: 'Wallet', icon: CurrencyDollarIcon },
    { name: 'Community', icon: UserIcon },
    { name: 'Settings', icon: Cog6ToothIcon },
    { name: 'Support', icon: ChartBarIcon }
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
      </div>

      <div className="flex relative z-10">
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
              <div key={index} className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                item.active
                  ? 'glass-panel border border-glass-border bg-primary/10 text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:glass-panel hover:border hover:border-glass-border'
              }`}>
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Top Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
              <p className="text-text-secondary">Last 30 days • 9 Nov - 9 Dec</p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search for Orders, products, customers..."
                  className="w-80 pl-10 pr-4 py-3 glass-panel border border-glass-border rounded-xl bg-transparent text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary/50 transition-all duration-300"
                />
              </div>

              <button className="p-3 glass-panel rounded-xl border border-glass-border hover:bg-glass-hover transition-all duration-300 relative">
                <BellIcon className="w-5 h-5 text-text-secondary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
              </button>

              <div className="flex items-center space-x-3 glass-panel p-3 rounded-xl border border-glass-border">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">John Doe</div>
                  <div className="text-xs text-text-secondary">Mentor</div>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-text-secondary" />
              </div>

              <button
                onClick={toggleTheme}
                className="p-3 glass-panel rounded-xl border border-glass-border hover:bg-glass-hover transition-all duration-300"
              >
                {isDark ? <SunIcon className="w-5 h-5 text-text-secondary" /> : <div className="w-5 h-5 text-text-secondary">🌙</div>}
              </button>
            </div>
          </div>

          {/* Top Stats Row */}
          <div className="grid grid-cols-4 gap-6">
            {/* Total Students Card */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Total Students</h3>
                  <span className="text-blue-400 text-sm font-medium">+12.3%</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-2">1,247</div>
                <div className="text-xs text-text-secondary">Active learners</div>
              </div>
            </div>

            {/* Session Completion Rate Card */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Session Completion</h3>
                  <span className="text-blue-400 text-sm font-medium">+8.7%</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-2">94.2%</div>
                <div className="text-xs text-text-secondary">This month</div>
              </div>
            </div>

            {/* Monthly Revenue Card */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Monthly Revenue</h3>
                  <span className="text-blue-400 text-sm font-medium">+15.4%</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-2">$24,890</div>
                <div className="text-xs text-text-secondary">From tutoring sessions</div>
              </div>
            </div>

            {/* Average Rating Card */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-text-secondary">Average Rating</h3>
                  <span className="text-blue-400 text-sm font-medium">+0.3</span>
                </div>
                <div className="text-2xl font-bold text-text-primary">4.8/5</div>
                <div className="text-xs text-text-secondary">From 892 reviews</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid - Double Layer */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Side - Main Chart */}
            <div className="col-span-8 glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">Student Progress</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-blue-400 text-sm font-medium">+18.2%</span>
                      <span className="text-text-secondary text-sm">Improvement this month</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-xs bg-text-primary/20 text-text-primary rounded-full">Subject breakdown</button>
                    <button className="px-3 py-1 text-xs glass-panel border border-glass-border text-text-secondary rounded-full">Full Report</button>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="h-64 glass-panel rounded-xl border border-glass-border/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-text-primary/10"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center">
                      <ChartBarIcon className="w-16 h-16 text-text-primary mx-auto mb-4 opacity-50" />
                      <p className="text-text-secondary">Student Progress Chart</p>
                      <p className="text-sm text-text-secondary mt-2">Performance analytics visualization</p>
                    </div>
                  </div>
                </div>

                {/* Subject Performance Breakdown */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-text-primary">Mathematics</div>
                    <div className="text-sm text-text-secondary">Average Score</div>
                    <div className="text-xs text-blue-400">87.3% (+5.2%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-text-primary">Science</div>
                    <div className="text-sm text-text-secondary">Average Score</div>
                    <div className="text-xs text-blue-400">91.7% (+3.8%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-text-primary">English</div>
                    <div className="text-sm text-text-secondary">Average Score</div>
                    <div className="text-xs text-purple-400">84.2% (+2.1%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Learning Progress */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-purple-500/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-text-primary">Learning Progress</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400 text-sm font-medium">+3.8%</span>
                    </div>
                  </div>

                  {/* Progress Chart */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary font-medium">Enrolled Students</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-text-primary">1,247</div>
                          <div className="text-xs text-text-secondary">100%</div>
                        </div>
                      </div>
                      <div className="w-full bg-glass-border rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary font-medium">Active Learners</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-text-primary">1,089</div>
                          <div className="text-xs text-text-secondary">87.3%</div>
                        </div>
                      </div>
                      <div className="w-full bg-glass-border rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '87.3%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary font-medium">Completed Courses</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-text-primary">892</div>
                          <div className="text-xs text-text-secondary">71.5%</div>
                        </div>
                      </div>
                      <div className="w-full bg-glass-border rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full" style={{ width: '71.5%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Enrollment */}
              <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 via-transparent to-primary/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-text-primary">Subject Enrollment</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-text-primary">Mathematics</span>
                      </div>
                      <span className="font-semibold text-text-primary">342 students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-text-primary">Science</span>
                      </div>
                      <span className="font-semibold text-text-primary">298 students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-text-primary">English</span>
                      </div>
                      <span className="font-semibold text-text-primary">267 students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        <span className="text-text-primary">History</span>
                      </div>
                      <span className="font-semibold text-text-primary">189 students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                        <span className="text-text-primary">Art</span>
                      </div>
                      <span className="font-semibold text-text-primary">151 students</span>
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

export default SimpleGlassDashboard
