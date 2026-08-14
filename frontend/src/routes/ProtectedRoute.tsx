import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'

interface ProtectedRouteProps {
  children: ReactNode
  title?: string
  message?: string
}

export default function ProtectedRoute({
  children,
  title = 'Login Required',
  message = 'You need to be logged in to access this page.',
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginRequiredNotice title={title} message={message} from={location} />
  }

  return <>{children}</>
}

function LoginRequiredNotice({
  title,
  message,
  from,
}: {
  title: string
  message: string
  from: ReturnType<typeof useLocation>
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-lg mx-auto mt-10">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-10 text-center">
            <div className="h-14 w-14 mx-auto rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/login"
                state={{ from }}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors w-full sm:w-auto"
              >
                Go to Login
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 px-6 py-3 font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
