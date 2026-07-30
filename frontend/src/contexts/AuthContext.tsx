import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User, LoginRequest, LoginResponse } from '../types/auth'
import AuthenticationService from '../services/AuthenticationService'

/**
 * Authentication Context Type Definition
 */
interface AuthContextType {
  // State
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean

  // Actions
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  checkAuth: () => void
}

/**
 * Create Authentication Context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Authentication Provider Component
 * Wraps the entire application to provide authentication state
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  /**
   * Check if user is authenticated on app mount
   * Load token from localStorage if exists
   */
  useEffect(() => {
    checkAuth()
  }, [])

  /**
   * Check authentication status
   * Load token from localStorage if exists
   */
  const checkAuth = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
      // Note: In real app, could decode JWT to get user info or call API
      // For now, just set authenticated state
    }
    setLoading(false)
  }

  /**
   * Login with email and password
   * Save token to localStorage and update context state
   */
  const login = async (credentials: LoginRequest): Promise<void> => {
    setLoading(true)
    try {
      const response: LoginResponse = await AuthenticationService.login(credentials)

      // Save token to localStorage
      localStorage.setItem('token', response.token)

      // Update context state
      setToken(response.token)
      setUser({
        userId: response.userId,
        fullName: response.fullName,
        email: response.email,
      })
      setIsAuthenticated(true)
    } catch (error) {
      // Clear state on error
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
      setIsAuthenticated(false)
      throw error
    } finally {
      setLoading(false)
    }
  }

  /**
   * Logout - Clear token and user state
   */
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token')

    // Clear context state
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to use Authentication Context
 * @returns AuthContext value
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
