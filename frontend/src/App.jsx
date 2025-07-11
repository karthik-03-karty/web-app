import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import GlassDashboard from './pages/GlassDashboard'

// Simple test component
const TestPage = () => (
  <div className="min-h-screen bg-slate-900 text-white p-8">
    <h1 className="text-4xl font-bold">App is Working!</h1>
    <p className="text-xl mt-4">React is rendering correctly</p>
    <a href="/dashboard" className="text-blue-400 underline block mt-4">Go to Dashboard</a>
  </div>
)

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
