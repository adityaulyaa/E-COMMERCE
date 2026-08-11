import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import type { LoginRequest } from '../types/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')
    setSuccessMessage('')

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await login(formData)
      setSuccessMessage('Login successful! Redirecting...')
      setTimeout(() => {
        const from = location.state?.from as { pathname?: string; search?: string } | undefined
        const redirectTarget = from?.pathname ? from.pathname + (from.search ?? '') : '/'
        navigate(redirectTarget)
      }, 1500)
    } catch (error: any) {
      setApiError(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section - Image with Text Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/src/assets/heroSectionRegisterpage.png"
          alt="Shopping"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for dark mode */}
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors duration-300" />
        
        {/* Overlay with Text on Left Wall */}
        <div className="absolute inset-0 flex items-start justify-start pt-16 pl-12">
          <div className="text-left max-w-md">
            <h2 className="text-4xl font-bold mb-6 animate-slide-up text-gray-900 leading-tight">
              Welcome back to<br />seamless shopping.
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 animate-slide-up text-gray-800">
                <Shield className="w-5 h-5 flex-shrink-0" />
                <span>Secure authentication</span>
              </div>
              <div className="flex items-center gap-3 animate-slide-up text-gray-800">
                <ShoppingBag className="w-5 h-5 flex-shrink-0" />
                <span>Your cart is waiting</span>
              </div>
              <div className="flex items-center gap-3 animate-slide-up text-gray-800">
                <Gift className="w-5 h-5 flex-shrink-0" />
                <span>Exclusive member deals</span>
              </div>
              <div className="flex items-center gap-3 animate-slide-up text-gray-800">
                <Zap className="w-5 h-5 flex-shrink-0" />
                <span>Fast checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-8 lg:py-0 lg:h-screen overflow-y-auto lg:overflow-y-auto">
        {/* Floating Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 lg:p-10 transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-gray-900 dark:text-white" />
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white" style={{ letterSpacing: '-0.5px' }}>
              Aladin.
            </h1>
          </div>
          <button
            onClick={() => {
              const html = document.documentElement
              html.classList.toggle('dark')
            }}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="Toggle dark mode"
          >
            <span className="text-sm">🌙</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-right mb-4">
          <a
            href="/register"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Don't have an account? Sign up
          </a>
        </div>

        {/* Title */}
        <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email and password to continue shopping.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Error Message */}
          {apiError && (
            <div className="p-2 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-xs">{apiError}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-2 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
              <p className="text-green-800 dark:text-green-200 text-xs">{successMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 mt-4"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="lg:hidden mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <img
            src="/src/assets/heroSectionRegisterpage.png"
            alt="Shopping"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

// Icon components (fallback if Lucide icons not imported properly)
function ShoppingBag({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
    </svg>
  )
}

function Shield({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function Gift({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  )
}

function Zap({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}
