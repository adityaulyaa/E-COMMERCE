import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertCircle, ArrowLeft, CreditCard, Package, RefreshCw } from 'lucide-react'
import Header from '../components/Header'
import StatusBadge from '../components/StatusBadge'
import OrderService from '../services/OrderService'
import type { OrderDetailResponse, OrderItemDetail, PaymentDetail } from '../types/order'
import type { PaymentMethod } from '../types/checkout'
import { formatToRupiah } from '../utils/formatCurrency'

export default function OrderDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<OrderDetailResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadOrderDetail = async () => {
    if (!id) return
    try {
      setLoading(true)
      setError(null)
      const response = await OrderService.getOrderDetail(Number(id))
      setOrder(response)
    } catch (err: any) {
      setError(err.message || 'Failed to load order details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderDetail()
  }, [id])

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
            Order Detail
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View complete transaction information
          </p>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={loadOrderDetail} />
        ) : order ? (
          <OrderDetailContent order={order} />
        ) : null}
      </main>
    </div>
  )
}

function OrderDetailContent({ order }: { order: OrderDetailResponse }) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                Order #{order.orderId}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(order.orderDate).toLocaleString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <StatusBadge type="payment" status={order.paymentDetail.paymentStatus} />
            <StatusBadge type="order" status={order.orderStatus} />
          </div>
        </div>
      </div>

      <OrderItemDetailList items={order.items} />

      <PaymentInfo paymentDetail={order.paymentDetail} />

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            Total Payment
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatToRupiah(order.totalAmount)}
          </p>
        </div>
      </div>
    </div>
  )
}

function OrderItemDetailList({ items }: { items: OrderItemDetail[] }) {
  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No items found for this order.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-gray-900 dark:text-white">Order Items</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((item, index) => (
          <div key={index} className="px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {item.productNameSnapshot}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Qty: {item.quantity}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Unit Price</p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {formatToRupiah(item.unitPriceSnapshot)}
                  </p>
                </div>
                <div className="text-right w-32">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Subtotal</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatToRupiah(item.subtotal)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PaymentInfo({ paymentDetail }: { paymentDetail: PaymentDetail }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="font-bold text-gray-900 dark:text-white">Payment Information</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Payment Method</p>
          <p className="mt-1 font-medium text-gray-900 dark:text-white">
            {paymentMethodLabel(paymentDetail.paymentMethod)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Payment Status</p>
          <div className="mt-1">
            <StatusBadge type="payment" status={paymentDetail.paymentStatus} />
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Payment Date</p>
          <p className="mt-1 font-medium text-gray-900 dark:text-white">
            {new Date(paymentDetail.paymentDate).toLocaleString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

function paymentMethodLabel(method: PaymentMethod): string {
  switch (method) {
    case 'BANK_TRANSFER':
      return 'Bank Transfer'
    case 'QRIS':
      return 'QRIS'
    case 'E_WALLET':
      return 'E-Wallet'
    default:
      return method
  }
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading order details...</p>
    </div>
  )
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900 rounded-lg p-12 text-center">
      <AlertCircle className="w-12 h-12 mx-auto text-red-600 dark:text-red-400 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Failed to Load Order
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
