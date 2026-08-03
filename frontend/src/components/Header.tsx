import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingCart, User, Sun, Moon, Menu, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

// Custom ShoppingBag icon (matching LoginPage & RegisterPage)
function ShoppingBag({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
    </svg>
  )
}

export default function Header() {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark')
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const toggleDarkMode = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    setIsDarkMode(html.classList.contains('dark'))
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light')
  }

  const handleLogout = () => {
    logout()
    setIsProfileDropdownOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity mr-12">
            <ShoppingBag className="w-8 h-8 text-gray-900 dark:text-white" />
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Aladin.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Shop
            </Link>
            <button
              disabled
              className="text-sm font-medium text-gray-400 dark:text-gray-600 cursor-not-allowed"
            >
              Categories
            </button>
            <button
              disabled
              className="text-sm font-medium text-gray-400 dark:text-gray-600 cursor-not-allowed"
            >
              Deals
            </button>
            <button
              disabled
              className="text-sm font-medium text-gray-400 dark:text-gray-600 cursor-not-allowed"
            >
              About Us
            </button>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                disabled
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-not-allowed opacity-60"
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button
              disabled
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-not-allowed opacity-60"
              title="Wishlist (Coming Soon)"
            >
              <Heart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Cart */}
            <button
              disabled
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-not-allowed opacity-60"
              title="Cart (Coming Soon)"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title={isAuthenticated ? user?.fullName || 'Profile' : 'Account'}
              >
                <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user?.fullName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        disabled
                        className="w-full text-left px-4 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      >
                        Profile
                      </button>
                      <button
                        disabled
                        className="w-full text-left px-4 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      >
                        Orders
                      </button>
                      <button
                        disabled
                        className="w-full text-left px-4 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      >
                        Settings
                      </button>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Shop
              </Link>
              <button
                disabled
                className="text-left px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 cursor-not-allowed"
              >
                Categories
              </button>
              <button
                disabled
                className="text-left px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 cursor-not-allowed"
              >
                Deals
              </button>
              <button
                disabled
                className="text-left px-4 py-2 text-sm font-medium text-gray-400 dark:text-gray-600 cursor-not-allowed"
              >
                About Us
              </button>
            </nav>

            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  disabled
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 cursor-not-allowed opacity-60"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
