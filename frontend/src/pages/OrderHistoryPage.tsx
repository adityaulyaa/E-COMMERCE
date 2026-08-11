import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Header from '../components/Header'
import OrderList from '../components/OrderList'
import OrderService from '../services/OrderService'
import type { OrderSummary } from '../types/order'

export default function OrderHistoryPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<OrderSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadOrderHistory = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await OrderService.getOrderHistory()
      setOrders(response.orders ?? [])
    } catch (err: any) {
      setError(err.message || 'Failed to load order history. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderHistory()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Order History
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View all of your transactions
          </p>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={loadOrderHistory} />
        ) : orders.length === 0 ? (
          <EmptyState />
        ) : (
          <OrderList orders={orders} />
        )}
      </main>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading your orders...</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-16 text-center">
      <Package className="w-14 h-14 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        No Order History Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        You have not made any transactions yet. Start shopping to create your first order.
      </p>
      <button
        type="button"
        onClick={() => window.location.assign('/products')}
        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        Start Shopping
      </button>
    </div>
  )
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg p-12 text-center">
      <AlertCircle className="w-12 h-12 mx-auto text-red-600 dark:text-red-400 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Failed to Load Orders
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  )
}
