import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Configure axios defaults
const API_BASE_URL = '/api/v1'
axios.defaults.baseURL = API_BASE_URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Set up axios interceptor for token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // Mock user data instead of API call
          const mockUser = {
            id: 1,
            email: 'test@example.com',
            first_name: 'John',
            last_name: 'Doe',
            role: 'solver'
          }
          setUser(mockUser)
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem('token')
          setToken(null)
          delete axios.defaults.headers.common['Authorization']
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [token])

  const login = async (email, password) => {
    try {
      // Mock login - accept any email/password
      const mockToken = 'mock-jwt-token-' + Date.now()
      const mockUser = {
        id: 1,
        email: email,
        first_name: 'John',
        last_name: 'Doe',
        role: 'solver'
      }

      localStorage.setItem('token', mockToken)
      setToken(mockToken)
      setUser(mockUser)

      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      const message = 'Login failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const register = async (userData) => {
    try {
      // Mock registration
      const mockToken = 'mock-jwt-token-' + Date.now()
      const mockUser = {
        id: 1,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role
      }

      localStorage.setItem('token', mockToken)
      setToken(mockToken)
      setUser(mockUser)

      toast.success('Registration successful!')
      return { success: true }
    } catch (error) {
      console.error('❌ Registration error:', error)
      console.error('❌ Error response:', error.response?.data)
      console.error('❌ Error status:', error.response?.status)
      console.error('❌ Error message:', error.message)
      const message = error.response?.data?.error || error.message || 'Registration failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
    toast.success('Logged out successfully')
  }

  const updateProfile = async (profileData) => {
    try {
      await axios.put('/profile', profileData)
      // Refresh user data
      const response = await axios.get('/profile')
      setUser(response.data)
      toast.success('Profile updated successfully!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.error || 'Profile update failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const refreshToken = async () => {
    try {
      const response = await axios.post('/refresh-token')
      const newToken = response.data.token
      localStorage.setItem('token', newToken)
      setToken(newToken)
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    isAuthenticated: !!token && !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
