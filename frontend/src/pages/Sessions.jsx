import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import LoadingSpinner from '../components/LoadingSpinner'
import axios from 'axios'
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  VideoCameraIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  LinkIcon,
  CameraIcon,
  UserGroupIcon,
  DocumentTextIcon,
  StarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  PlayIcon,
  PauseIcon,
  StopIcon
} from '@heroicons/react/24/outline'

const Sessions = () => {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [sessions, setSessions] = useState({
    upcoming: [],
    active: [],
    completed: [],
    rescheduled: [],
    cancelled: []
  })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showFaceVerification, setShowFaceVerification] = useState(false)
  const [profileBookingLink, setProfileBookingLink] = useState('')
  const [availabilityCalendar, setAvailabilityCalendar] = useState([])
  const [bulkSessions, setBulkSessions] = useState([])
  const [teamSessions, setTeamSessions] = useState([])

  useEffect(() => {
    fetchSessionsData()
  }, [])

  const fetchSessionsData = async () => {
    try {
      setLoading(true)
      // In a real app, this would fetch from the API
      generateMockSessionsData()
    } catch (error) {
      console.error('Failed to fetch sessions data:', error)
      generateMockSessionsData()
    } finally {
      setLoading(false)
    }
  }

  const generateMockSessionsData = () => {
    const mockUpcoming = [
      {
        id: 1,
        title: 'React Advanced Patterns',
        student: 'Sarah Chen',
        date: '2024-12-18',
        time: '14:00',
        duration: 60,
        price: 75,
        type: 'video',
        status: 'confirmed',
        description: 'Deep dive into React patterns and best practices',
        faceVerified: true
      },
      {
        id: 2,
        title: 'JavaScript ES6+ Features',
        student: 'Mike Johnson',
        date: '2024-12-19',
        time: '10:00',
        duration: 90,
        price: 100,
        type: 'video',
        status: 'pending',
        description: 'Modern JavaScript features and syntax',
        faceVerified: false
      },
      {
        id: 3,
        title: 'Node.js Backend Development',
        student: 'Emma Davis',
        date: '2024-12-20',
        time: '16:00',
        duration: 120,
        price: 150,
        type: 'video',
        status: 'confirmed',
        description: 'Building scalable backend applications',
        faceVerified: true
      }
    ]

    const mockActive = [
      {
        id: 4,
        title: 'Database Design Workshop',
        student: 'Alex Wilson',
        startTime: '13:30',
        duration: 90,
        price: 120,
        type: 'video',
        status: 'live',
        timeElapsed: 25,
        recording: true
      }
    ]

    const mockCompleted = [
      {
        id: 5,
        title: 'CSS Grid & Flexbox',
        student: 'Lisa Brown',
        date: '2024-12-15',
        time: '15:00',
        duration: 60,
        price: 75,
        rating: 5,
        feedback: 'Excellent session! Very clear explanations.',
        recorded: true,
        earnings: 75
      },
      {
        id: 6,
        title: 'Python Data Analysis',
        student: 'John Smith',
        date: '2024-12-14',
        time: '11:00',
        duration: 90,
        price: 100,
        rating: 4,
        feedback: 'Good session, would like more examples.',
        recorded: true,
        earnings: 100
      }
    ]

    setSessions({
      upcoming: mockUpcoming,
      active: mockActive,
      completed: mockCompleted,
      rescheduled: [],
      cancelled: []
    })

    setProfileBookingLink(`https://synapmentor.com/book/${user?.id || 'user123'}`)

    // Mock availability calendar
    const availability = Array.from({ length: 14 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() + i)
      return {
        date: date.toISOString().split('T')[0],
        slots: [
          { time: '09:00', available: Math.random() > 0.3 },
          { time: '10:00', available: Math.random() > 0.3 },
          { time: '11:00', available: Math.random() > 0.3 },
          { time: '14:00', available: Math.random() > 0.3 },
          { time: '15:00', available: Math.random() > 0.3 },
          { time: '16:00', available: Math.random() > 0.3 }
        ]
      }
    })
    setAvailabilityCalendar(availability)
  }

  const tabs = [
    { id: 'upcoming', name: 'Upcoming', count: sessions.upcoming.length, icon: CalendarIcon },
    { id: 'active', name: 'Active', count: sessions.active.length, icon: PlayIcon },
    { id: 'completed', name: 'Completed', count: sessions.completed.length, icon: CheckCircleIcon },
    { id: 'rescheduled', name: 'Rescheduled', count: sessions.rescheduled.length, icon: ArrowPathIcon },
    { id: 'cancelled', name: 'Cancelled', count: sessions.cancelled.length, icon: XCircleIcon }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Bookings & Sessions</h1>
          <p className="text-text-secondary">Manage your tutoring sessions and bookings</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFaceVerification(true)}
            className="glass-button text-sm"
          >
            <CameraIcon className="w-4 h-4 mr-2" />
            Face Verification
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="glass-button text-sm bg-primary/20 border-primary/30 text-primary"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Session
          </button>
        </div>
      </div>

      {/* Profile Booking Link */}
      <div className="glass-panel p-6 rounded-xl border border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Profile Booking Link</h2>
          <button className="text-xs text-primary hover:text-primary/80">Share</button>
        </div>
        <div className="flex items-center gap-3 p-3 bg-glass-bg/30 rounded-lg">
          <LinkIcon className="w-5 h-5 text-text-secondary" />
          <input
            type="text"
            value={profileBookingLink}
            readOnly
            className="flex-1 bg-transparent text-text-primary text-sm outline-none"
          />
          <button
            onClick={() => navigator.clipboard.writeText(profileBookingLink)}
            className="px-3 py-1 text-xs bg-primary/20 text-primary rounded hover:bg-primary/30"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-panel rounded-xl border border-glass-border overflow-hidden">
        <div className="flex border-b border-glass-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-glass-hover'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
                {tab.count > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {sessions.upcoming.length > 0 ? (
                sessions.upcoming.map((session) => (
                  <div key={session.id} className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary">{session.title}</h3>
                        <p className="text-sm text-text-secondary mt-1">{session.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                          <div className="flex items-center gap-1">
                            <UserIcon className="w-4 h-4" />
                            <span>{session.student}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>{session.time} ({session.duration}min)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CurrencyDollarIcon className="w-4 h-4" />
                            <span>${session.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          session.status === 'confirmed'
                            ? 'bg-green-400/20 text-green-400'
                            : 'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {session.status}
                        </span>
                        {session.faceVerified && (
                          <span className="px-2 py-1 text-xs bg-blue-400/20 text-blue-400 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <VideoCameraIcon className="w-4 h-4 text-text-secondary" />
                        <span className="text-xs text-text-secondary">Video Session</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-glass-hover transition-colors">
                          <EyeIcon className="w-4 h-4 text-text-secondary" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-glass-hover transition-colors">
                          <PencilIcon className="w-4 h-4 text-text-secondary" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-glass-hover transition-colors">
                          <ArrowPathIcon className="w-4 h-4 text-text-secondary" />
                        </button>
                        <button className="px-3 py-1 text-xs bg-primary/20 text-primary rounded hover:bg-primary/30">
                          Join Session
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                  <p className="text-text-secondary">No upcoming sessions</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-4">
              {sessions.completed.length > 0 ? (
                sessions.completed.map((session) => (
                  <div key={session.id} className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary">{session.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                          <div className="flex items-center gap-1">
                            <UserIcon className="w-4 h-4" />
                            <span>{session.student}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>{session.duration}min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CurrencyDollarIcon className="w-4 h-4" />
                            <span>${session.earnings}</span>
                          </div>
                        </div>
                        {session.feedback && (
                          <p className="text-sm text-text-secondary mt-2 italic">"{session.feedback}"</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${i < session.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        {session.recorded && (
                          <span className="px-2 py-1 text-xs bg-blue-400/20 text-blue-400 rounded-full">
                            Recorded
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircleIcon className="w-12 h-12 text-text-secondary mx-auto mb-3" />
                  <p className="text-text-secondary">No completed sessions</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sessions
