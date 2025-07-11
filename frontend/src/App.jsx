import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import GlassDashboard from './pages/GlassDashboard'
import { api } from './config/api'

// Enhanced test component with backend connectivity check
const TestPage = () => {
  const [backendStatus, setBackendStatus] = useState('checking')
  const [backendMessage, setBackendMessage] = useState('')

  useEffect(() => {
    checkBackendConnection()
  }, [])

  const checkBackendConnection = async () => {
    try {
      // Try to connect to backend health endpoint
      const response = await fetch('http://localhost:8081/health', {
        method: 'GET',
        timeout: 5000
      })

      if (response.ok) {
        setBackendStatus('connected')
        setBackendMessage('Backend is running!')
      } else {
        setBackendStatus('error')
        setBackendMessage('Backend responded with error')
      }
    } catch (error) {
      setBackendStatus('disconnected')
      setBackendMessage('Backend is not running. Please start the backend server.')
    }
  }

  const getStatusColor = () => {
    switch (backendStatus) {
      case 'connected': return 'text-green-400'
      case 'disconnected': return 'text-red-400'
      case 'error': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold">SynapMentor App is Working!</h1>
      <p className="text-xl mt-4">React frontend is rendering correctly</p>

      <div className="mt-6 p-4 bg-slate-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Backend Status:</h2>
        <p className={`text-lg ${getStatusColor()}`}>
          {backendStatus === 'checking' ? 'Checking...' : backendMessage}
        </p>
        <button
          onClick={checkBackendConnection}
          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Recheck Backend
        </button>
      </div>

      <div className="mt-6">
        {backendStatus === 'connected' ? (
          <Link
            to="/dashboard"
            className="text-blue-400 underline text-lg hover:text-blue-300"
          >
            Go to Dashboard (Backend Connected) →
          </Link>
        ) : (
          <p className="text-gray-400">
            Dashboard will be available when backend is running
          </p>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-400">
        <p>Frontend: http://localhost (this page)</p>
        <p>Backend: http://localhost:8081</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TestPage />} />
          <Route path="/dashboard" element={<GlassDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
