import React from 'react'

function TestApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1e293b', 
      color: 'white', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>SynapMentor Test</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        If you can see this, React is working properly.
      </p>
      
      <div style={{ 
        backgroundColor: 'rgba(59, 130, 246, 0.1)', 
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Test Panel</h2>
        <p>This is a glassmorphism test panel.</p>
        
        <div style={{ marginTop: '20px' }}>
          <a 
            href="/login" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '8px',
              marginRight: '10px'
            }}
          >
            Go to Login
          </a>
          
          <a 
            href="/register" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px', 
              backgroundColor: '#10b981', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '8px'
            }}
          >
            Go to Register
          </a>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
        <p>Current URL: {window.location.href}</p>
        <p>React Version: {React.version}</p>
      </div>
    </div>
  )
}

export default TestApp
