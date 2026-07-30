import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor for adding JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token
      localStorage.removeItem('token')
      
      // Only redirect to login if NOT already on public auth pages
      const currentPath = window.location.pathname
      const isAuthPage = currentPath === '/login' || currentPath === '/register'
      
      if (!isAuthPage) {
        // User is on protected page, redirect to login
        window.location.href = '/login'
      }
      // If already on /login or /register, let the component handle the error
    }
    return Promise.reject(error)
  }
)

export default apiClient
