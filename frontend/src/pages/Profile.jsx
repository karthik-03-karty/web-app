import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import {
  UserIcon,
  CameraIcon,
  PencilIcon,
  StarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  TrophyIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CogIcon
} from '@heroicons/react/24/outline'

const Profile = () => {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const [profileData, setProfileData] = useState({
    completionPercentage: 85,
    followers: 1247,
    following: 89,
    rating: 4.8,
    totalEarnings: 15420,
    skills: ['React', 'JavaScript', 'Node.js', 'Python', 'Database Design'],
    languages: ['English', 'Spanish', 'French'],
    experience: [
      { title: 'Senior Developer', company: 'Tech Corp', duration: '2020-Present' },
      { title: 'Full Stack Developer', company: 'StartupXYZ', duration: '2018-2020' }
    ],
    achievements: [
      { title: 'Top Mentor 2024', date: '2024-01-15', icon: '🏆' },
      { title: 'Problem Solver', date: '2024-02-20', icon: '🧩' },
      { title: 'Community Leader', date: '2024-03-10', icon: '👑' }
    ],
    projects: [
      { name: 'E-commerce Platform', tech: 'React, Node.js', status: 'Completed' },
      { name: 'Learning Management System', tech: 'Python, Django', status: 'In Progress' }
    ]
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-xl border border-glass-border">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
              <CameraIcon className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-text-primary">
                {user?.first_name} {user?.last_name}
              </h1>
              <button className="p-1 rounded hover:bg-glass-hover transition-colors">
                <PencilIcon className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
            <p className="text-text-secondary mb-4">Senior Full Stack Developer & Mentor</p>

            {/* Profile Completion */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-secondary">Profile Completion</span>
                <span className="text-sm font-medium text-text-primary">{profileData.completionPercentage}%</span>
              </div>
              <div className="w-full bg-glass-bg/30 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${profileData.completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xl font-bold text-text-primary">{profileData.followers}</p>
                <p className="text-xs text-text-secondary">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-text-primary">{profileData.following}</p>
                <p className="text-xs text-text-secondary">Following</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-text-primary">{profileData.rating}</p>
                <p className="text-xs text-text-secondary">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-text-primary">${profileData.totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-text-secondary">Earnings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Personal Information</h2>
            <button className="text-xs text-primary hover:text-primary/80">Edit</button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-text-secondary">Email</label>
              <p className="text-text-primary">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-text-secondary">Role</label>
              <p className="text-text-primary capitalize">{user?.role}</p>
            </div>
            <div>
              <label className="text-sm text-text-secondary">Location</label>
              <p className="text-text-primary">San Francisco, CA</p>
            </div>
            <div>
              <label className="text-sm text-text-secondary">Bio</label>
              <p className="text-text-primary">Passionate educator with 5+ years of experience in full-stack development and mentoring.</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Skills</h2>
            <button className="text-xs text-primary hover:text-primary/80">Manage</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full border border-primary/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Languages</h2>
            <button className="text-xs text-primary hover:text-primary/80">Edit</button>
          </div>
          <div className="space-y-2">
            {profileData.languages.map((language, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-text-primary">{language}</span>
                <span className="text-xs text-text-secondary">Fluent</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="glass-panel p-6 rounded-xl border border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Experience</h2>
            <button className="text-xs text-primary hover:text-primary/80">Add</button>
          </div>
          <div className="space-y-3">
            {profileData.experience.map((exp, index) => (
              <div key={index} className="p-3 rounded-lg bg-glass-bg/30">
                <h3 className="font-medium text-text-primary">{exp.title}</h3>
                <p className="text-sm text-text-secondary">{exp.company}</p>
                <p className="text-xs text-text-secondary">{exp.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="glass-panel p-6 rounded-xl border border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Achievements</h2>
          <button className="text-xs text-primary hover:text-primary/80">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profileData.achievements.map((achievement, index) => (
            <div key={index} className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h3 className="font-medium text-primary">{achievement.title}</h3>
              <p className="text-xs text-text-secondary">{achievement.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="glass-panel p-6 rounded-xl border border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Projects</h2>
          <button className="text-xs text-primary hover:text-primary/80">Add Project</button>
        </div>
        <div className="space-y-3">
          {profileData.projects.map((project, index) => (
            <div key={index} className="p-4 rounded-lg bg-glass-bg/30 border border-glass-border">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-text-primary">{project.name}</h3>
                  <p className="text-sm text-text-secondary">{project.tech}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'Completed'
                    ? 'bg-green-400/20 text-green-400'
                    : 'bg-yellow-400/20 text-yellow-400'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
