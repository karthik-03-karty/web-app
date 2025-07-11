import React from 'react'
import { Link } from 'react-router-dom'

const SimpleDashboard = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1e293b', 
      color: 'white', 
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '5px' }}>SynapMentor Dashboard</h1>
          <p style={{ color: '#94a3b8' }}>Welcome back! Here's your learning overview.</p>
        </div>
        <div>
          <Link to="/" style={{ 
            color: '#ef4444', 
            textDecoration: 'none',
            padding: '8px 16px',
            border: '1px solid #ef4444',
            borderRadius: '6px'
          }}>
            Logout
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '10px' }}>Total Sessions</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>24</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>+3 this week</p>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ color: '#10b981', marginBottom: '10px' }}>Earnings</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>$1,250</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>+$180 this week</p>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '10px' }}>Rating</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>4.8</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Based on 18 reviews</p>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '10px' }}>Streak</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>12 days</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Keep it up!</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#3b82f6' }}>Quick Actions</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px'
        }}>
          <button style={{
            padding: '15px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Schedule Session
          </button>
          <button style={{
            padding: '15px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            View Analytics
          </button>
          <button style={{
            padding: '15px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Manage Profile
          </button>
          <button style={{
            padding: '15px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Check Wallet
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#3b82f6' }}>Recent Activity</h2>
        <div style={{ space: '10px' }}>
          {[
            { action: 'Completed session with Sarah Chen', time: '2 hours ago', type: 'session' },
            { action: 'Received 5-star rating', time: '4 hours ago', type: 'rating' },
            { action: 'Earned $75 from React tutoring', time: '6 hours ago', type: 'earning' },
            { action: 'New booking request from Mike Johnson', time: '1 day ago', type: 'booking' }
          ].map((activity, index) => (
            <div key={index} style={{
              padding: '15px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: '0', fontSize: '14px' }}>{activity.action}</p>
                <p style={{ margin: '0', fontSize: '12px', color: '#94a3b8' }}>{activity.time}</p>
              </div>
              <div style={{
                padding: '4px 8px',
                backgroundColor: activity.type === 'session' ? '#3b82f6' : 
                                activity.type === 'rating' ? '#f59e0b' :
                                activity.type === 'earning' ? '#10b981' : '#8b5cf6',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {activity.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SimpleDashboard
