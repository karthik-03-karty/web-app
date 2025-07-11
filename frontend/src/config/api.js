// API Configuration
const API_CONFIG = {
  // In Docker Compose, services can communicate using service names
  // But for browser requests, we need to use localhost
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'http://localhost:8081/api/v1'  // Production (Docker)
    : 'http://localhost:8081/api/v1', // Development
  
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile'
    },
    DASHBOARD: {
      STATS: '/dashboard/stats',
      RECENT: '/dashboard/recent'
    },
    SESSIONS: {
      LIST: '/sessions',
      CREATE: '/sessions',
      UPDATE: '/sessions',
      DELETE: '/sessions'
    }
  }
}

// API Helper Functions
export const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API GET Error:', error)
      throw error
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API POST Error:', error)
      throw error
    }
  }
}

export default API_CONFIG
