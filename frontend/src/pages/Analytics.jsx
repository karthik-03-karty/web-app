import React, { useState } from 'react'
import { 
  ChartBarIcon, 
  TrendingUpIcon, 
  TrendingDownIcon,
  EyeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30')

  const metrics = [
    {
      title: 'Total Revenue',
      value: '₹1,24,67,000',
      change: '+24.5%',
      trend: 'up',
      icon: CurrencyDollarIcon,
      color: 'text-primary'
    },
    {
      title: 'Active Clients',
      value: '1,847',
      change: '+18.2%',
      trend: 'up',
      icon: UserGroupIcon,
      color: 'text-primary'
    },
    {
      title: 'Consultation Hours',
      value: '3,456',
      change: '+12.8%',
      trend: 'up',
      icon: ClockIcon,
      color: 'text-primary'
    },
    {
      title: 'Avg. Session Rate',
      value: '₹3,750/hr',
      change: '+8.4%',
      trend: 'up',
      icon: ChartBarIcon,
      color: 'text-primary'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary neon-text">Analytics</h1>
          <p className="text-text-secondary mt-1">Track your performance and growth</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="glass-panel px-4 py-2 rounded-xl border border-glass-border text-text-primary bg-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="glass-panel p-6 rounded-2xl border border-glass-border hover:border-primary/30 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center text-sm font-medium text-primary">
                  <TrendingUpIcon className="w-4 h-4 mr-1" />
                  {metric.change}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-text-primary">{metric.value}</div>
                <div className="text-sm text-text-secondary">{metric.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">Revenue Trends</h3>
              <EyeIcon className="w-5 h-5 text-text-secondary" />
            </div>
            <div className="h-64 glass-panel rounded-xl border border-glass-border/50 flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                <p className="text-text-secondary">Revenue Chart</p>
                <p className="text-sm text-text-secondary mt-2">Monthly performance in ₹ INR</p>
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Analytics */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">Consultation Analytics</h3>
              <CalendarIcon className="w-5 h-5 text-text-secondary" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div>
                  <div className="font-medium text-text-primary">Average Consultation Duration</div>
                  <div className="text-sm text-text-secondary">Per client session</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary">2.5 hrs</div>
                  <div className="text-sm text-primary">+12%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50">
                <div>
                  <div className="font-medium text-text-primary">Consultations This Week</div>
                  <div className="text-sm text-text-secondary">Total completed</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary">89</div>
                  <div className="text-sm text-primary">+18%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 pointer-events-none"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Completed consultation with TechCorp Ltd', time: '2 hours ago', type: 'Consultation' },
              { action: 'Received 5-star rating from client', time: '4 hours ago', type: 'Rating' },
              { action: 'Payment received ₹15,000', time: '1 day ago', type: 'Payment' },
              { action: 'New enterprise client onboarded', time: '2 days ago', type: 'Client' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-glass-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div>
                    <div className="font-medium text-text-primary">{activity.action}</div>
                    <div className="text-sm text-text-secondary">{activity.time}</div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
